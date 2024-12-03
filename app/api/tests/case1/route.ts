import { createConnectionCentral, createConnection2, createConnection3 } from '@/lib/db';

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode('data: Starting concurrency test...\n\n'));

      try {
        const db1 = await createConnectionCentral();
        const db2 = await createConnection2();
        const db3 = await createConnection3();

        const transactions = [
          async () => {
            await db1.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');
            await db1.query('START TRANSACTION');
            const result = await db1.query('SELECT * FROM all_games WHERE app_id = 1');
            controller.enqueue(encoder.encode(`Node 1 Result: ${JSON.stringify(result[0])}\n\n`));
            await db1.query('DO SLEEP(10)');
            controller.enqueue(encoder.encode('Sleeping...\n\n'));
            await db1.query('COMMIT');
            controller.enqueue(encoder.encode('data: Node 1: Committed\n\n'));
          },
          async () => {
            await db2.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');
            await db2.query('START TRANSACTION');
            const result = await db2.query('SELECT * FROM before_2020 WHERE app_id = 1');
            controller.enqueue(encoder.encode(`Node 2 Result: ${JSON.stringify(result[0])}\n\n`));
            await db1.query('DO SLEEP(10)');
            controller.enqueue(encoder.encode('Sleeping...\n\n'));
            await db2.query('COMMIT');
            controller.enqueue(encoder.encode('Node 2: Committed\n\n'));
          },
          async () => {
            await db3.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ');
            await db3.query('START TRANSACTION');
            const result = await db3.query('SELECT * FROM after_and_2020 WHERE app_id = 1');
            controller.enqueue(encoder.encode(`Node 3 Result: ${JSON.stringify(result[0])}\n\n`));
            await db1.query('DO SLEEP(5)');
            controller.enqueue(encoder.encode('Sleeping...\n\n'));
            await db3.query('COMMIT');
            controller.enqueue(encoder.encode('Node 3: Committed\n\n'));
          },
        ];

        for (const transaction of transactions) {
          await transaction();
        }

        controller.enqueue(encoder.encode('data: All transactions completed.\n\n'));
        controller.close();
      } catch (error) {
        controller.enqueue(encoder.encode(`data: Error: ${error}\n\n`));
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
