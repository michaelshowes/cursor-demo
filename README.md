# Cursor Demo Todo App

A full-stack Todo List app built with Next.js (App Router), TypeScript, Tailwind CSS, Drizzle ORM, and PostgreSQL. It features a modern UI, persistent todos, and CRUD operations via API routes.

## Tech Stack

- **Framework:** Next.js (App Router, TypeScript, Turbopack, Tailwind CSS, ESLint)
- **Database:** PostgreSQL (localhost:5432)
- **ORM:** Drizzle ORM
- **UI:** React, shadcn/ui, Radix UI, Lucide React, Tailwind CSS
- **Forms & Validation:** React Hook Form, Zod

## Installation

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Ensure PostgreSQL is running** on `localhost:5432` (default user: `postgres`, database: `cursor-demo`).
   - You can change the connection string in `drizzle.config.ts` and API route files if needed.
4. **Run database migrations** (if any):
   ```bash
   # Example (if using drizzle-kit):
   pnpm drizzle-kit push:pg
   ```
5. **Start the development server:**
   ```bash
   pnpm dev
   ```

## Usage

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Add, toggle, and delete todos using the UI.
- API Endpoints:
  - `GET /api/todos` - List todos
  - `POST /api/todos` - Add todo
  - `POST /api/todos/[id]/toggle` - Toggle completion
  - `DELETE /api/todos/[id]` - Delete todo
  - `DELETE /api/todos?completed=true` - Delete all completed

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
