'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const todoSchema = z.object({
	title: z.string().min(1, 'Title is required')
});

type Todo = {
	id: number;
	title: string;
	completed: boolean;
	createdAt: string;
};

type TodoForm = z.infer<typeof todoSchema>;

export default function Home() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TodoForm>({ resolver: zodResolver(todoSchema) });

	useEffect(() => {
		fetch('/api/todos')
			.then((res) => res.json())
			.then(setTodos);
	}, []);

	const onSubmit = async (data: TodoForm) => {
		const res = await fetch('/api/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		if (res.ok) {
			const todo = await res.json();
			setTodos((prev) => [todo, ...prev]);
			reset();
		}
	};

	const toggleTodo = async (id: number) => {
		const res = await fetch(`/api/todos/${id}/toggle`, { method: 'POST' });
		if (res.ok) {
			setTodos((prev) =>
				prev.map((todo) =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo
				)
			);
		}
	};

	const deleteTodo = async (id: number) => {
		const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
		if (res.ok) {
			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		}
	};

	const deleteCompletedTodos = async () => {
		const res = await fetch('/api/todos?completed=true', { method: 'DELETE' });
		if (res.ok) {
			setTodos((prev) => prev.filter((todo) => !todo.completed));
		}
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-start p-8 bg-gray-50'>
			<Card className='w-full max-w-md p-6 mb-8'>
				<div className='flex justify-between items-center mb-4'>
					<h1 className='text-2xl font-bold'>Todo List</h1>
					<Button
						variant='destructive'
						onClick={deleteCompletedTodos}
						disabled={todos.every((t) => !t.completed)}
					>
						Delete Completed
					</Button>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex gap-2 mb-4'
				>
					<Input
						placeholder='Add a new todo...'
						{...register('title')}
						className='flex-1'
					/>
					<Button type='submit'>Add</Button>
				</form>
				{errors.title && (
					<p className='text-red-500 text-sm mb-2'>{errors.title.message}</p>
				)}
				<ul className='space-y-2'>
					{todos.map((todo) => (
						<li
							key={todo.id}
							className='flex items-center justify-between p-2 rounded hover:bg-gray-100 transition'
						>
							<label className='flex items-center flex-1 cursor-pointer'>
								<input
									type='checkbox'
									checked={todo.completed}
									onChange={() => toggleTodo(todo.id)}
									className='mr-2 accent-primary'
								/>
								<span
									className={todo.completed ? 'line-through text-gray-400' : ''}
								>
									{todo.title}
								</span>
							</label>
							<div className='flex items-center gap-2'>
								<span className='text-xs text-gray-400'>
									{new Date(todo.createdAt).toLocaleString()}
								</span>
								<Button
									variant='outline'
									size='icon'
									onClick={() => deleteTodo(todo.id)}
									aria-label='Delete todo'
								>
									🗑️
								</Button>
							</div>
						</li>
					))}
				</ul>
			</Card>
		</main>
	);
}
