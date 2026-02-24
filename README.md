# RealAI Mastery

> The #1 AI Course for Real Estate Professionals

Master AI tools to generate more leads, write better listings, and close more deals.

## Tech Stack

- **Next.js 14** (App Router + TypeScript)
- **Tailwind CSS** + shadcn/ui
- **Prisma** + PostgreSQL (Supabase)
- **Clerk** (Auth)
- **Stripe** (Payments)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Fill in your API keys

# Run database migrations
npx prisma migrate dev

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # React components
├── lib/           # Utilities (db, stripe, auth, email)
prisma/
├── schema.prisma  # Database schema
```

## License

Proprietary — All rights reserved.
