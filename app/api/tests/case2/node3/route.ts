import { createConnection3 } from '@/lib/db';

export async function GET() {
  let result;
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode('Starting concurrency test...\n\n'));

      try {
        const db1 = await createConnection3();

        const transaction = async () => {
            await db1.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');
            await db1.query('START TRANSACTION');
            controller.enqueue(encoder.encode(`Node 3: UPDATE after_and_2020 SET price = 99.99 WHERE app_id = 1;`));
            result = await db1.query('UPDATE after_and_2020 SET price = 99.99 WHERE app_id = 1;');
            controller.enqueue(encoder.encode('\n\nSleeping for 10 seconds...\n\n'));
            await db1.query('DO SLEEP(10)');
            controller.enqueue(encoder.encode('\n\nNode 3: Committed\n\n'));
            await db1.query('COMMIT');
            //controller.enqueue(encoder.encode(`\n\nReturned row: ${JSON.stringify(result[0])}\n\n`));
          };

        await transaction();

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
