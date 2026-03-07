# TriviaTally 🏆

A professional pub quiz management system with rotating host logic and seasonal tracking.

## 🚀 Getting Started

### Prerequisites
*   Node.js 20+
*   pnpm (recommended) or npm
*   PostgreSQL Database

### 1. Environment Setup
Copy the example environment file and configure your database connection:

```bash
cp .env .env.local
```

Update `.env` with your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/triviatally?schema=public"
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Database Setup
Push the Prisma schema to your database:
```bash
npx prisma db push
```
*(Or use `npx prisma migrate dev` for versioned migrations)*

### 4. Run Development Server
Start the Next.js development server:
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🧪 Testing
Run the test suite (Vitest):
```bash
pnpm test
```

## 🛠️ Project Structure
*   `src/app`: Next.js App Router (Frontend Pages & API Routes)
*   `src/components`: Reusable UI components (Shadcn UI)
*   `src/lib/validations`: **Shared Zod Schemas** (Single Source of Truth)
*   `src/lib/db`: Database connection & utilities
*   `messages/`: i18n translation files

## 📜 Commands Cheatsheet
| Command | Description |
| :--- | :--- |
| `pnpm dev` | Start local dev server |
| `pnpm build` | Build for production |
| `npx prisma studio` | Open Database GUI |
| `npx prisma db push` | Sync schema with DB (Prototyping) |
| `npx shadcn@latest add [component]` | Add new UI component |