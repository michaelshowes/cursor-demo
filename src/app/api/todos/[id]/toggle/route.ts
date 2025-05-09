import { NextRequest, NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { todos } from '@/db/schema';
import { eq } from 'drizzle-orm';

const pool = new Pool({
	connectionString: 'postgres://postgres@localhost:5432/cursor-demo'
});
const db = drizzle(pool);

export async function POST(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = Number(params.id);
	if (isNaN(id)) {
		return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
	}
	// Get current completed status
	const [todo] = await db.select().from(todos).where(eq(todos.id, id));
	if (!todo) {
		return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
	}
	const [updated] = await db
		.update(todos)
		.set({ completed: !todo.completed })
		.where(eq(todos.id, id))
		.returning();
	return NextResponse.json(updated);
}
