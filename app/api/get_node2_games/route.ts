import { createConnection2 } from '@/lib/db2';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);
    const offset = (page - 1) * limit;

    try {
        const db = await createConnection2();
        const query = `SELECT * FROM before_2020 LIMIT ? OFFSET ?`;
        const [games] = await db.query(query, [limit, offset]);

        const countQuery = `SELECT COUNT(*) as total FROM before_2020`;
        const total = await db.query(countQuery);

        return NextResponse.json({ games, total });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return NextResponse.json({ error: error.message });
        }
    }
}
