import { createConnectionCentral } from '@/lib/db';
import { createConnection2 } from '@/lib/db';
import { createConnection3 } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);
    const offset = (page - 1) * limit;
    const search = url.searchParams.get('search') || '';

    try {
        let db = await createConnectionCentral();

        if (db == null) {
            console.log("CONNECTION FAILED, TRYING NODE 2");
            db = await createConnection2();
            if (db == null) {
                console.log("CONNECTION FAILED, TRYING NODE 3");
                db = await createConnection3();
                if (db == null) {
                    return NextResponse.json({error: "All nodes are offline"}, {status: 500});
                }
            }
        }
        const query = `
            SELECT * FROM all_games
            WHERE name LIKE ?
            LIMIT ? OFFSET ?`;
        const [games] = await db.query(query, [`%${search}%`, limit, offset]);

        const countQuery = `
            SELECT COUNT(*) as total
            FROM all_games
            WHERE name LIKE ?`;
        const total = await db.query(countQuery, [`%${search}%`]);

        return NextResponse.json({ games, total });

        

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json({ error: error.message });
        }
    }
}
