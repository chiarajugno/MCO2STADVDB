import { createConnectionCentral } from '@/lib/db';
import { createConnection2 } from '@/lib/db';
import { createConnection3 } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { appId, name, releaseDate, price, positiveRatings, negativeRatings } = body;

    if (!appId || !name || !releaseDate || !price || !positiveRatings || !negativeRatings) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    var db = await createConnectionCentral();

    if (db == null) {
        console.log("CONNECTION FAILED, TRYING NODE 2");
        db = await createConnection2();
        if (db == null) {
            console.log("CONNECTION FAILED, TRYING NODE 3");
            db = await createConnection3();
            if (db == null) {
                return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
            }
        }
    }
    const query = `
      INSERT INTO all_games (app_id, name, release_date, price, positive_ratings, negative_ratings)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      appId,
      name,
      releaseDate,
      price,
      positiveRatings,
      negativeRatings,
    ]);

    return NextResponse.json({ message: 'Game inserted successfully', result });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
