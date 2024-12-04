import { createConnection2 } from '@/lib/db';

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode('Starting concurrency test...\n\n'));

      try {
        const db2 = await createConnection2();

        const transaction = async () => {
          await db2.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');
          await db2.query('START TRANSACTION');
          controller.enqueue(encoder.encode(`Node 2: UPDATE before_2020 SET price = 77.99 WHERE app_id = 1\n`));
          await db2.query('UPDATE before_2020 SET price = 77.99 WHERE app_id = 1');
          controller.enqueue(encoder.encode('\n\nSleeping for 5 seconds...\n\n'));
          await db2.query('DO SLEEP(5)');
          controller.enqueue(encoder.encode('\n\nNode 2: Committed\n\n'));
          await db2.query('COMMIT');
        };

        // retry the transaction if deadlock detected
        const retryTransaction = async (retries = 3) => {
          while (retries > 0) {
            try {
              await transaction();
              return;
            } catch (error) {
              if (error instanceof Error) {
                if (error.message.includes('Lock deadlock')) { 
                  retries--;
                  controller.enqueue(encoder.encode(`Deadlock detected. Retrying... (${3 - retries}/3)\n`));
                } else {
                  throw error; 
                }
              } else {
                controller.enqueue(encoder.encode(`Unexpected error: ${String(error)}\n`));
                throw error;
              }
            }
            
          }
          throw new Error('Transaction failed after retries');
        };

        await retryTransaction();
        controller.close();
      } catch (error) {
        controller.enqueue(encoder.encode(`Error: ${error}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
