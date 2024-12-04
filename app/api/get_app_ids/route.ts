import { createConnectionCentral } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const db = await createConnectionCentral();
    if (!db) {
      return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
    }

    const [rows] = await db.execute('SELECT app_id FROM all_games');


    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'No games found' }, { status: 404 });
    }


    const appIds = rows.map((row: any) => row.app_id);
    console.log(appIds)

    return NextResponse.json({ appIds });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
