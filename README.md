# TriviaTally 🏆

A professional pub quiz management system with rotating host logic and seasonal tracking.

## 🚀 Getting Started

### Prerequisites
*   Node.js 20+
*   pnpm (recommended) or npm
*   Docker (for local MySQL)

### 1. Database Setup
Start the local MySQL database using Docker Compose:

```bash
pnpm backend:start
```

Configure your `.env` file with the database connection string:
```env
DATABASE_URL="mysql://user:password@localhost:3306/triviatally"
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Database Schema
Push the Prisma schema to your database:
```bash
pnpm db:push
```
*(Or use `pnpm db:migrate` for versioned migrations)*

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

## 🌍 i18n & Translations
The project uses `next-intl` for internationalization.

### Adding a new language
1.  Create a new JSON file in `messages/` (e.g., `messages/fi.json`).
2.  Add the same keys as in `messages/en.json` with translated values.
3.  Add the new locale to the supported list if necessary (currently handled by `src/lib/locale.ts`).

### Using translations in code
```tsx
import {useTranslations} from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('MyNamespace');
  return <h1>{t('title')}</h1>;
}
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
| `pnpm backend:start` | Start local MySQL with Docker |
| `pnpm backend:stop` | Stop local MySQL |
| `npx prisma studio` | Open Database GUI |
| `pnpm db:push` | Sync schema with DB (Prototyping) |
| `npx shadcn@latest add [component]` | Add new UI component |