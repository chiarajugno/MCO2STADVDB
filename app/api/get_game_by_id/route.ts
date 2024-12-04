import { createConnectionCentral } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const appId = url.searchParams.get('appId');

    if (!appId) {
      return NextResponse.json({ error: 'appId is required' }, { status: 400 });
    }

    console.log('Received appId:', appId);

    const db = await createConnectionCentral();
    if (!db) {
      return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
    }

    const [rows] = await db.execute('SELECT * FROM all_games WHERE app_id = ?', [appId]);
    console.log('Query result:', rows);

    if (!Array.isArray(rows)) {
      return NextResponse.json({ error: 'Unexpected database response' }, { status: 500 });
    }

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }

    return NextResponse.json({ game: rows[0] });
  } catch (error) {
    console.error('Error fetching game by ID:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
