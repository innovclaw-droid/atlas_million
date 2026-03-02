# RealAI Mastery — Architecture Design Document
**Last Updated:** 2025-07-17 | **Version:** 1.0 | **Author:** Atlas (COO)

---

## 1. Overview

RealAI Mastery is a digital education platform teaching real estate agents how to use AI. It combines a course platform, community forum, and prompt marketplace into a single Next.js application.

**Business Model:** Course sales ($497-697) + community subscription ($49/mo) + prompt marketplace ($29/mo)
**Target:** $1M revenue in 12 months
**Users:** US-based real estate agents (TAM: 2M+ licensed agents)

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CLIENTS                           │
│  Browser (Desktop/Mobile) → Next.js App (Vercel)    │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                 NEXT.JS 14 (App Router)              │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  Marketing   │  │  Dashboard   │  │   API     │ │
│  │  Pages       │  │  (Auth'd)    │  │  Routes   │ │
│  │              │  │              │  │           │ │
│  │ - Landing    │  │ - Home       │  │ - /api/   │ │
│  │ - Pricing    │  │ - Courses    │  │   checkout│ │
│  │ - Blog       │  │ - Community  │  │   webhooks│ │
│  │              │  │ - Marketplace│  │   courses │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│                                                      │
│  Middleware: Clerk Auth (protects /dashboard/*)       │
└──────┬───────────┬──────────────┬───────────────────┘
       │           │              │
       ▼           ▼              ▼
┌──────────┐ ┌──────────┐ ┌──────────────┐
│  Clerk   │ │  Stripe  │ │  Supabase    │
│  Auth    │ │ Payments │ │  PostgreSQL  │
│          │ │          │ │  + Storage   │
│ - SSO    │ │ - Checkout│ │             │
│ - JWT    │ │ - Subs   │ │ - Users     │
│ - Webhook│ │ - Webhook│ │ - Courses   │
└──────────┘ └──────────┘ │ - Modules   │
                          │ - Lessons   │
                          │ - Progress  │
                          │ - Posts     │
                          │ - Prompts   │
                          │ - Purchases │
                          │ - Subs      │
                          └──────────────┘
```

---

## 3. Tech Stack

| Layer | Technology | Purpose | Status |
|-------|-----------|---------|--------|
| Framework | Next.js 14 (App Router) | Full-stack React | ✅ Deployed |
| Language | TypeScript | Type safety | ✅ |
| Styling | Tailwind CSS | Utility-first CSS | ✅ |
| Components | Lucide React | Icons | ✅ |
| UI Utils | clsx + tailwind-merge | Class merging | ✅ |
| Auth | Clerk | Authentication + user management | ✅ Built, needs keys |
| Database | PostgreSQL (Supabase) | Primary data store | ✅ Schema done, needs connection |
| ORM | Prisma 7 | Database access | ✅ |
| Payments | Stripe | Checkout + subscriptions | ✅ Built, needs keys |
| Hosting | Vercel | Frontend + API | ⏳ Pending deploy |
| Video | Bunny.net / Mux | Course video hosting | ⏳ Future |
| Email (Transactional) | Resend | Receipts, notifications | ⏳ Future |
| Email (Marketing) | ConvertKit / Loops | Drip campaigns, waitlist | ⏳ Future |
| File Storage | Supabase Storage / R2 | Prompt packs, PDFs | ⏳ Future |
| Analytics | PostHog / Plausible | Usage tracking | ⏳ Future |
| AI Integration | OpenAI / Claude API | "Try it" feature | ⏳ Future |

---

## 4. Database Schema

### Entity Relationship Diagram

```
User (1) ──── (N) Enrollment ──── (1) Course
  │                                      │
  │                                      │
  ├── (N) Subscription                   ├── (N) Module
  │                                      │        │
  ├── (N) Purchase ──── (1) PromptPack   │        └── (N) Lesson
  │                                      │              │
  ├── (N) Post                           │              ├── (N) LessonProgress ──── (1) User
  │    │                                 │              │
  │    └── (N) Comment                   │              └── (N) Resource
  │                                      │
  └── (N) Comment                        └── (N) Enrollment
```

### Models

| Model | Records (Projected Y1) | Key Fields |
|-------|----------------------|------------|
| User | 5,000 | clerkId, email, role, stripeId |
| Course | 1-3 | title, slug, price, published |
| Module | 8-24 | title, order, courseId |
| Lesson | 40-120 | title, slug, content, videoUrl, order |
| LessonProgress | 100,000 | userId, lessonId, completed |
| Enrollment | 2,000 | userId, courseId |
| PromptPack | 50-100 | title, category, price, prompts (JSON) |
| Purchase | 5,000 | userId, packId, stripePayId |
| Subscription | 1,000 | userId, stripeSubId, plan, status |
| Post | 2,000 | title, content, category, pinned |
| Comment | 10,000 | content, userId, postId |
| Resource | 200 | title, fileUrl, type, lessonId |

---

## 5. Application Routes

### Public Routes (no auth)
| Route | Type | Purpose |
|-------|------|---------|
| `/` | Static | Landing page + waitlist |
| `/pricing` | Static | Pricing tiers |
| `/blog/*` | Static/ISR | SEO blog posts |
| `/sign-in` | Clerk | Authentication |
| `/sign-up` | Clerk | Registration |
| `/api/webhooks/stripe` | API | Stripe webhook handler |
| `/api/webhooks/clerk` | API | Clerk webhook handler |

### Protected Routes (auth required)
| Route | Type | Purpose |
|-------|------|---------|
| `/dashboard` | SSR | Home — stats, progress, quick actions |
| `/dashboard/courses` | SSR | Course module list |
| `/dashboard/courses/module/[id]` | SSR | Lesson list per module |
| `/dashboard/courses/lesson/[id]` | Client | Video player + content + progress |
| `/dashboard/community` | SSR | Forum — posts, categories |
| `/dashboard/marketplace` | SSR | Prompt pack browsing + purchase |
| `/dashboard/profile` | SSR | User settings |

### API Routes
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/checkout` | POST | Create Stripe checkout session |
| `/api/webhooks/stripe` | POST | Handle Stripe events |
| `/api/webhooks/clerk` | POST | Sync Clerk users to DB |

---

## 6. Authentication & Authorization

**Provider:** Clerk
**Flow:** Clerk handles all auth UI (sign-in, sign-up, user management)
**Middleware:** `src/middleware.ts` — protects all `/dashboard/*` routes
**User Sync:** Clerk webhook → creates/updates User in PostgreSQL
**Roles:** STUDENT (default), ADMIN

```
Request → Clerk Middleware → Route Handler
                │
                ├── Public route? → Allow
                └── Protected? → Check JWT → Allow/Redirect to /sign-in
```

---

## 7. Payment Architecture

**Provider:** Stripe
**Modes:**
- `payment` — one-time course purchase ($497 or $697)
- `subscription` — monthly community/marketplace ($49/mo or $29/mo)

**Flow:**
```
User clicks "Enroll"
    → POST /api/checkout (creates Stripe Checkout Session)
    → Redirect to Stripe hosted checkout
    → Payment succeeds
    → Stripe webhook fires (checkout.session.completed)
    → Webhook handler creates Enrollment + Subscription in DB
    → User redirected to /dashboard/courses/[id]?success=true
```

**Subscription Lifecycle:**
```
Active → Stripe webhook (subscription.updated) → Update DB
Cancel → Stripe webhook (subscription.deleted) → Mark canceled in DB
Past due → Stripe webhook → Update status, send re-engagement email
```

---

## 8. Content Architecture

### Course Content
- **Storage:** Markdown files in `/content/` directory (current)
- **Future:** Database-driven with MDX rendering
- **Video:** Placeholder slots ready for Bunny.net/Mux URLs

### Content Inventory
| Content Type | Count | Status |
|-------------|-------|--------|
| Course modules | 8 | ✅ Written |
| Course lessons | 40 | ✅ Written |
| Email sequences | 15 emails across 4 sequences | ✅ Written |
| Blog posts | 2 written + 3 outlined | ✅ Partial |
| Prompt packs | 10 packs (103 prompts) | ✅ Designed |
| Tweet queue | 14 tweets | ✅ Ready |

---

## 9. Deployment Architecture

### Current (Development)
```
Local development → Git push → GitHub (innovclaw-droid/atlas_million)
```

### Target (Production)
```
Git push → GitHub → Vercel (auto-deploy)
                         │
                         ├── Edge: Static pages (landing, blog)
                         ├── Serverless: API routes + SSR pages
                         └── CDN: Static assets
                         
Supabase (managed PostgreSQL)
    └── Connection via Prisma (pooled connection string)

Bunny.net CDN
    └── Video files for course lessons

Resend
    └── Transactional emails (receipts, notifications)
    
ConvertKit
    └── Marketing emails (waitlist, nurture, launch)
```

### Environment Variables (Production)
```
DATABASE_URL=postgresql://...@supabase.co:5432/postgres
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_WEBHOOK_SECRET=whsec_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://realaimastery.com
```

---

## 10. Security

| Concern | Mitigation |
|---------|-----------|
| Auth | Clerk (industry-standard, SOC2) |
| API routes | Auth middleware on all protected routes |
| Payments | Stripe (PCI compliant), webhook signature verification |
| Data | Supabase RLS (row-level security) + Prisma |
| Secrets | Environment variables, never committed to git |
| XSS | React auto-escapes, CSP headers |
| CSRF | Clerk handles CSRF tokens |
| Rate limiting | Vercel built-in + Stripe rate limits |

---

## 11. Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| Landing page load | < 1.5s | Static generation, Vercel Edge |
| Dashboard load | < 2s | SSR with streaming |
| Video start | < 3s | Bunny.net CDN |
| API response | < 500ms | Prisma query optimization |
| Lighthouse score | > 90 | Image optimization, code splitting |
| Uptime | 99.9% | Vercel managed infrastructure |

---

## 12. Scaling Plan

### Phase 1: Launch (0-500 users)
- Vercel free/pro tier
- Supabase free tier
- Single PostgreSQL instance
- No caching needed

### Phase 2: Growth (500-5,000 users)
- Vercel Pro ($20/mo)
- Supabase Pro ($25/mo)
- Add Upstash Redis for session caching
- CDN for video delivery
- Email provider upgrade

### Phase 3: Scale (5,000-50,000 users)
- Vercel Enterprise or custom deployment
- Supabase Team or dedicated Postgres
- Read replicas for DB
- Background job processing (video encoding, email)
- API rate limiting per user

---

## 13. Development Roadmap

### Completed ✅
| Sprint | Deliverables | Date |
|--------|-------------|------|
| Sprint 1 | Project scaffold, landing page, Prisma schema | 2025-07-17 |
| Sprint 2 | Auth, payments, dashboard, course player, community, marketplace | 2025-07-17 |
| Content | All 8 modules (40 lessons), email sequences, blog posts, prompt catalog | 2025-07-17 |

### Upcoming
| Sprint | Deliverables | Target |
|--------|-------------|--------|
| Sprint 3 | Connect API keys, wire DB queries, seed course data | Pending keys |
| Sprint 4 | Video integration, resource downloads, progress tracking (live) | Week 3 |
| Sprint 5 | Email integration (waitlist capture, transactional), blog pages | Week 4 |
| Sprint 6 | Marketplace purchase flow, prompt display, "try it" feature | Week 5 |
| Sprint 7 | Community CRUD (create/edit/delete posts, comments, upvotes) | Week 6 |
| Sprint 8 | Admin panel, content management, analytics dashboard | Week 7 |
| Sprint 9 | SEO optimization, performance tuning, security audit | Week 8 |
| Sprint 10 | Beta launch, testing, bug fixes, polish | Week 9-10 |

### Post-Launch
- A/B testing on landing page
- Affiliate/referral program
- Mobile app (React Native or PWA)
- Additional courses (AI for Mortgage Brokers, AI for Property Managers)
- SaaS tool pivot (if marketplace proves product-market fit)

---

## 14. Cost Structure

### Monthly Operating Costs

| Phase | Revenue | Costs | Margin |
|-------|---------|-------|--------|
| Pre-launch | $0 | ~$1/mo | -$1 |
| Launch (Month 1) | $10-50K | ~$150/mo | 99%+ |
| Growth (Month 6) | $50-100K | ~$500/mo | 99%+ |
| Scale (Month 12) | $100K+ | ~$1,000/mo | 99% |

*Excludes Stripe transaction fees (2.9% + $0.30)*

---

## 15. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Low initial traction | Medium | High | Pre-launch waitlist, SEO content, X presence |
| H-1B compliance issue | Low | Critical | Consult immigration attorney, passive income structure |
| AI tools change rapidly | High | Medium | Course updated quarterly, community provides ongoing value |
| Stripe/Clerk outage | Low | Medium | Graceful error handling, status page monitoring |
| Content piracy | Medium | Low | Community + updates provide ongoing value beyond content |
| Competitor launches similar | Medium | Medium | First-mover advantage, community moat, prompt marketplace |

---

## 16. Change Log

| Date | Version | Changes |
|------|---------|---------|
| 2025-07-17 | 1.0 | Initial architecture document |

---

*Document maintained by Atlas | Updated weekly*
*Next review: 2025-07-24*
