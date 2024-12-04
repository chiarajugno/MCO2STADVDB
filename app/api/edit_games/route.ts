import { createConnectionCentral } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { appId, name, releaseDate, price, positiveRatings, negativeRatings } = body;

    if (!appId) {
      return NextResponse.json({ error: 'appId is required' }, { status: 400 });
    }

    const db = await createConnectionCentral();
    if (!db) {
      return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
    }

    const query = `
      UPDATE all_games
      SET name = ?, release_date = ?, price = ?, positive_ratings = ?, negative_ratings = ?
      WHERE app_id = ?
    `;
    const [result] = await db.execute(query, [
      name,
      releaseDate,
      price,
      positiveRatings,
      negativeRatings,
      appId,
    ]);

    return NextResponse.json({ message: 'Game updated successfully', result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
