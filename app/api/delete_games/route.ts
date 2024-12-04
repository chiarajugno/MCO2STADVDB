import { createConnectionCentral } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ResultSetHeader } from 'mysql2';

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const appId = url.searchParams.get('appId');

    if (!appId) {
      return NextResponse.json({ error: 'appId is required' }, { status: 400 });
    }

    const db = await createConnectionCentral();
    if (!db) {
      return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
    }

    const query = `
      DELETE FROM all_games
      WHERE app_id = ?
    `;
    const [result] = await db.execute<ResultSetHeader>(query, [appId]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'No game found with the given appId' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Game deleted successfully', result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
