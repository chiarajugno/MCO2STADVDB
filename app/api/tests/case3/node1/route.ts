import { createConnectionCentral } from '@/lib/db';

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode('Starting concurrency test...\n\n'));

      try {
        const db1 = await createConnectionCentral();

        const transaction = async () => {
          await db1.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');
          await db1.query('START TRANSACTION');
          controller.enqueue(encoder.encode(`Node 1: UPDATE all_games SET price = 88.99 WHERE app_id = 1\n`));
          await db1.query('UPDATE all_games SET price = 88.99 WHERE app_id = 1');
          controller.enqueue(encoder.encode('\n\nSleeping for 10 seconds...\n\n'));
          await db1.query('DO SLEEP(10)');
          controller.enqueue(encoder.encode('\n\nNode 1: Committed\n\n'));
          await db1.query('COMMIT');
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
