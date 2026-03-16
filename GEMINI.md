# Gemini Memory & Progress Tracker

## 🧠 Project Context
This file serves as a memory bank and progress tracker for the Gemini CLI agent. It persists context between sessions. Gemini CLI Agent must validate with automation tests that every API works. Frontend
routes should be tested via playwright.

Every API must have tests
Big coverage for e2e is must

## 📊 Progress Tracker

### Phase 1: Foundation [COMPLETED]
- [x] Initialize Next.js 16 (App Router) with TypeScript & Tailwind
- [x] Configure `next-intl` for i18n
- [x] Setup Prisma ORM with MySQL schema
- [x] Initialize Shadcn UI & core components
- [x] Create shared Zod validation layer (`src/lib/validations`)
- [x] Setup TanStack Query & Zustand
- [x] Configure Vitest for testing

### Phase 2: User, Team & Auth [IN PROGRESS]
- [x] Update Prisma Schema (Rename `Session` -> `GameSession`, Add Auth models)
- [x] Run Prisma Migration (`add_auth_models`)
- [x] Implement Auth.js (NextAuth) Config (`src/auth.ts`)
- [x] Signup & Login APIs
- [x] Register and Login forms
- [x] After completion, redirect to /dashboard (create, if missing)
- [ ] Team Creation Logic & API
- [ ] Team editing Logic & API
- [ ] Team removing logic & API
- [ ] Join Team Logic & API
- [ ] Remove user from Team Logic & API
- [ ] Basic User Role middleware
- [ ] Unit tests for all
- [ ] E2E tests for all

### Phase 3: Season & Session [TODO]
- [ ] Host Rotation Algorithm (Shuffle)
- [ ] Creating season
- [ ] Updating season
- [ ] Deleting season
- [ ] Creating session and questions
- [ ] Updating session and questions
- [ ] Removing session and questions 
- [ ] Unit tests for all
- [ ] E2E tests for all

### Next steps will be rewritten when time comes
### Phase 4: Host Dashboard [TODO]
- [ ] Keyboard Navigation Controller
- [ ] Dynamic Score Input Grid
- [ ] "Super Knowledge" Round Logic
- [ ] Optimistic UI Updates (TanStack Query)

### Phase 5: Public & Polish [TODO]
- [ ] Public Leaderboard Views
- [ ] "Projector Mode" (High Contrast)
- [ ] Accessibility Audit (Axe Core)
- [ ] Production Deployment Config

## 🛠️ Project Source of Truth: TriviaTally
- **Tech Stack:** Next.js 16, Prisma, Tailwind, Shadcn UI, NextAuth (Auth.js) v5, TanStack Query.
- **Database:** MySQL.
- **Key Conventions:
    - Use `GameSession` instead of `Session` for trivia games to avoid Auth.js conflict.
    - Zod schemas in `src/lib/validations`.
    - Components in `src/components/ui` (Shadcn).