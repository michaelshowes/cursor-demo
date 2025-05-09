import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	completed: boolean('completed').notNull().default(false),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
