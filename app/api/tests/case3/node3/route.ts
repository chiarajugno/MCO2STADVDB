import { createConnection3 } from '@/lib/db';

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode('Starting concurrency test...\n\n'));

      try {
        const db3 = await createConnection3();

        const transaction = async () => {
          await db3.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');
          await db3.query('START TRANSACTION');
          controller.enqueue(encoder.encode(`Node 3: UPDATE after_and_2020 SET price = 44.99 WHERE app_id = 1\n`));
          await db3.query('UPDATE after_and_2020 SET price = 44.99 WHERE app_id = 1');
          controller.enqueue(encoder.encode('\n\nNode 3: Committed\n\n'));
          await db3.query('COMMIT');
        };

        // retry the transaction if deadlock detected
        const retryTransaction = async (retries = 3) => {
          while (retries > 0) {
            try {
              await transaction();
              return;
            } catch (error) {
              if (error instanceof Error) {
                console.log("ERROR: ", error.message);
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
