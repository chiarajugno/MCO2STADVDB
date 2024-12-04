import { createConnection2 } from '@/lib/db';

export async function GET() {
  let result;
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode('Starting concurrency test...\n\n'));

      try {
        const db1 = await createConnection2();

        const transaction = async () => {
            await db1.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');
            await db1.query('START TRANSACTION');
            controller.enqueue(encoder.encode(`Node 2: UPDATE before_2020 SET price = 77.99 WHERE app_id = 1`));
          result = await db1.query('UPDATE before_2020 SET price = 77.99 WHERE app_id = 1');
            controller.enqueue(encoder.encode('\n\nSleeping for 5 seconds...\n\n'));
            await db1.query('DO SLEEP(5)');
            controller.enqueue(encoder.encode('\n\nNode 2: Committed\n\n'));
            await db1.query('COMMIT');
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
