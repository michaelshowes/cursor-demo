import { NextRequest, NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { todos } from '@/db/schema';
import { eq } from 'drizzle-orm';

const pool = new Pool({
	connectionString: 'postgres://postgres@localhost:5432/cursor-demo'
});
const db = drizzle(pool);

export async function GET() {
	const allTodos = await db.select().from(todos).orderBy(todos.createdAt);
	return NextResponse.json(allTodos);
}

export async function POST(req: NextRequest) {
	const { title } = await req.json();
	if (!title) {
		return NextResponse.json({ error: 'Title is required' }, { status: 400 });
	}
	const [todo] = await db.insert(todos).values({ title }).returning();
	return NextResponse.json(todo);
}

export async function DELETE(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	if (searchParams.get('completed') === 'true') {
		await db.delete(todos).where(eq(todos.completed, true));
		return NextResponse.json({ success: true });
	}
	return NextResponse.json({ error: 'Not allowed' }, { status: 400 });
}
