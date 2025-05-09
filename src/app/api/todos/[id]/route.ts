import { NextRequest, NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { todos } from '@/db/schema';
import { eq } from 'drizzle-orm';

const pool = new Pool({
	connectionString: 'postgres://postgres@localhost:5432/cursor-demo'
});
const db = drizzle(pool);

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = Number(params.id);
	if (isNaN(id)) {
		return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
	}
	await db.delete(todos).where(eq(todos.id, id));
	return NextResponse.json({ success: true });
}
