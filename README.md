# Phonics Hub — Full-Stack Interactive Learning App

**Version:** 1.1.0 — Complete API Integration  
**Status:** Production Ready  
**Demo:** https://phonics77-app.vercel.app/

---

## Architecture Details

### Application Type
- **Frontend:** Static HTML/CSS/JavaScript (no build step)
- **Hosting:** Vercel (with serverless API route proxies in `api/` folder)
- **Backend API:** Render (Node.js/Express)
- **Database:** Neon PostgreSQL

### Request Flow
```
Browser (html pages) 
  → js/analytics.js sends events
  → Vercel API routes (api/ folder)
  → Render API backend
  → Neon PostgreSQL database
```

### Key Design Patterns
- **Fire-and-forget events:** `keepalive: true` ensures analytics survive page unload
- **Graceful degradation:** Missing API calls don't break the app
- **localStorage fallback:** Premium status cached locally
- **Hardcoded content fallback:** Stories/materials work offline

---

## System Architecture

Three apps, one backend, fully wired:

```
phonics77-app (Vercel)          →  App 1: Learning frontend
phonics-admin (GitHub Pages)    →  App 2: Admin dashboard
phonics-api (Render)            →  App 3: Backend API + PostgreSQL (Neon)
```

Data flow:

```
Parent opens phonics77-app
       ↓  POST /api/users/register        →  users table
       ↓  POST /api/events                →  events table (every page, every activity)
       ↓  POST /api/emails                →  email_leads table
       ↓  POST /api/subscriptions/checkout →  Stripe checkout
       ↓  GET  /api/stories               →  stories table (Story Time)

Admin opens phonics-admin
       ↓  POST /api/admin/login           →  JWT token
       ↓  GET  /api/admin/overview        →  live KPIs
       ↓  CRUD /api/stories               →  manage story library
```

---

## Live URLs

| App | URL | Host |
|-----|-----|------|
| Learning App | https://phonics77-app.vercel.app | Vercel |
| Admin Dashboard | https://athishsreeram.github.io/phonics-admin | GitHub Pages |
| Backend API | https://phonics-api-k43i.onrender.com | Render |
| API Health | https://phonics-api-k43i.onrender.com/health | — |

---

## Quick Start

```bash
git clone https://github.com/athishsreeram/phonics77-app.git
cd phonics77-app
npm install
npm run dev
# Opens http://localhost:8000 automatically
```

**Key characteristics:**
- Static site (no build step required) — raw HTML/JS/CSS
- All API calls are fire-and-forget with `keepalive: true`
- Works offline-first — degrades gracefully if backend is unreachable
- All backend logic lives in the Render API (`phonics-api` repo)

---

## Project Structure

```
phonics77-app/
├── index.html                     # Home — activity grid, onboarding, progress widget
├── story.html                     # Story Time — loads stories from API dynamically
├── parent-dashboard.html          # Parent view — syncs profile + premium from API
├── listen-choose.html             # Free: Sound Matching
├── alphabet.html                  # Free: Letter Recognition
├── phonic-set1.html               # Free: Blending Intro
├── digraphs.html                  # Premium: Digraph Practice
├── vowels.html                    # Premium: Vowel Blends
├── cvc.html                       # Premium: CVC Words
├── sight-words.html               # Premium: Sight Words
├── read.html                      # Premium: Sentence Reading
├── rhyme.html                     # Premium: Word Families
├── consonant-blend.html           # Premium: Consonant Blends
├── phonic-set2.html               # Premium: R-Controlled Vowels
├── magic-e.html                   # Premium: Silent E Words
├── digraph_fill.html              # Premium: Vowel Digraphs
├── phkids.html                    # Premium: Phonics Review
├── word-match.html                # Premium: Word Match
├── word-explore.html              # Premium: Word Explorer
├── trace.html                     # Premium: Alphabet Tracing
├── alphabet-ballon-pop.html       # Premium: Balloon Pop
├── read2.html                     # Premium: Reading Level 2
│
├── pages/
│   ├── success.html               # Post-payment — verifies session via API
│   ├── progress.html              # Progress view — syncs premium status from API
│   └── onboarding.html            # Onboarding flow
│
├── js/
│   ├── config.js                  # 🔧 API base URL — only file to edit when switching environments
│   ├── api.js                     # ⭐ Central API client for all Render backend operations
│   ├── analytics.js               # Event tracking framework → POST /api/events
│   ├── payment.js                 # Stripe checkout flow → POST /api/subscriptions/checkout
│   ├── activity-gating.js         # Free/premium access control and feature flags
│   ├── onboarding.js              # Onboarding flow (5 steps) → POST /api/users/register
│   ├── progress.js                # Progress widget rendering (index page)
│   ├── audio.js                   # Text-to-speech manager and playback controller
│   ├── materials.js               # Phonics data (alphabet, words, materials)
│   └── ui.js                      # Shared UI helpers (modals, buttons, alerts)
│
├── css/
│   ├── style.css                  # Index page + activity grid styles
│   ├── shared.css                 # Activity page styles (games)
│   └── payment.css                # Payment modal and checkout styles
│
├── api/                           # Vercel serverless functions (proxies to Render backend)
│   ├── create-subscription.js     # POST /api/subscriptions/checkout
│   ├── verify-subscription.js     # GET  /api/subscriptions/verify
│   ├── log-events.js              # POST /api/events
│   └── capture-email.js           # Dual-write to /api/emails + /api/users/register
│
├── vercel.json                    # Vercel deployment config
├── package.json                   # Dependencies (stripe, serve)
└── README.md                      # This file
```

### File Responsibilities

| File/Folder | Purpose | Who loads it |
|---|---|---|
| `config.js` | API endpoint configuration | Loaded first on every page via `<script>` tag |
| `api.js` | Central API client | Loaded second, exposes `window.PhonicsAPI` |
| `analytics.js` | Event tracking and user engagement | Loaded after api.js |
| `payment.js` | Stripe payment flow | Loaded when payment UI needed |
| `activity-gating.js` | Premium/free feature gates | Loaded on all pages |
| `pages/onboarding.html` | User registration UX | index.html → onboarding.js |
| `js/materials.js` | Phonics content (words, blends, etc.) | Activity pages load this |
| `api/` functions | Vercel-to-Render proxy layer | Called from browser, proxy to Render API |

---

## API Integration (js/api.js)

All API operations are centralised in `js/api.js`. This file is loaded on every page immediately after `config.js`.

**Exposed API:** `window.PhonicsAPI` — available globally

| Method | Endpoint | Triggered by | When |
|--------|----------|-------------|------|
| `POST` | `/api/events` | Every page | Auto on page load (page_view event) |
| `POST` | `/api/events` | Every activity | User starts/completes activity |
| `POST` | `/api/users/ping` | Every page | Auto on page load (updates last_seen) |
| `POST` | `/api/users/register` | Onboarding, email modal | User provides email + child info |
| `GET`  | `/api/users/me` | parent-dashboard, progress | Fetches premium status from server |
| `POST` | `/api/emails` | Email capture widget | User subscribes to tips |
| `GET`  | `/api/stories` | story.html | Page load — fetches all stories |
| `POST` | `/api/subscriptions/checkout` | Upgrade buttons | User initiates payment |
| `GET`  | `/api/subscriptions/verify` | pages/success.html | After Stripe redirect |

### Using the API client

```javascript
// Available globally as window.PhonicsAPI (auto-loaded on all pages)

// Event tracking
PhonicsAPI.logEvent('activity_start', { activity: 'digraph-practice' });

// User registration
await PhonicsAPI.registerUser('parent@email.com', 'Emma', 5);

// User profile
const user = await PhonicsAPI.getUser();
// Returns: { email, child_name, child_age, status: 'free'|'trial'|'active', ... }

// Email capture
await PhonicsAPI.captureEmail('parent@email.com', 'Jane', 'homepage_signup');

// Stories
const stories = await PhonicsAPI.getStories();

// Payment
await PhonicsAPI.startCheckout(successUrl, cancelUrl);

// Verify payment
const result = await PhonicsAPI.verifySession(sessionId);
```

**Graceful degradation:** If any API call fails, it logs a warning but does **not** break the page. Content continues to work offline.

---

## Activity Tracking

### Automatic Tracking

Every activity page automatically fires events on load and exit:

```javascript
// js/analytics.js auto-tracks on page load:
analytics.trackActivityStart('sound-matching');

// And at completion/exit:
analytics.trackActivityComplete('sound-matching', score, total);
```

**Events tracked:**
- `page_view` — Every page load
- `page_exit` — Every page exit (fire-and-forget with keepalive)
- `activity_start` — User enters game
- `activity_complete` — User finishes game
- `upgrade_click` — User clicks premium button
- `paywall_impression` — User hits premium paywall
- `email_captured` — Email widget filled
- `streak_milestone` — Streak reaches milestone (5, 10, 20, 30 days)
- And 5+ more edge cases

### Activity ID Reference

| Activity Page | ID |
|---|---|
| listen-choose.html | `sound-matching` |
| alphabet.html | `letter-recognition` |
| phonic-set1.html | `blending-intro` |
| digraphs.html | `digraph-practice` |
| vowels.html | `vowel-blends` |
| cvc.html | `cvc-words` |
| sight-words.html | `sight-words` |
| read.html | `sentence-reading` |
| rhyme.html | `word-families` |
| consonant-blend.html | `consonant-blends` |
| phonic-set2.html | `r-controlled-vowels` |
| magic-e.html | `silent-e-words` |
| digraph_fill.html | `vowel-digraphs` |
| phkids.html | `phonics-review` |
| word-match.html | `word-match` |
| word-explore.html | `word-explorer` |
| story.html | `story-time` |
| trace.html | `alphabet-tracing` |
| alphabet-ballon-pop.html | `balloon-pop` |
| read2.html | `reading-level-2` |

### Adding Custom Events

```javascript
// Call from anywhere on a page:
PhonicsAPI.logEvent('custom_event_name', { optional_metadata: 'value' });
```

All events include:
- Timestamp
- User email (if registered)
- Session ID
- User agent / browser info
- Page URL

---

## Environment Variables & Configuration

This app **stores NO secrets**. All configuration lives in code or is managed by backend and Vercel.

### Frontend Configuration

**File:** `js/config.js` (only file to edit when switching environments)

```javascript
window.PHONICS_API_BASE = 'https://phonics-api-k43i.onrender.com';
// For local dev: 'http://localhost:3001'
```

### Vercel Environment

**Set in Vercel Dashboard:**

| Key | Value |
|-----|-------|
| `PHONICS_API_BASE` | `https://phonics-api-k43i.onrender.com` |

This gets injected at build time (even though no build step runs, Vercel still processes `vercel.json`).

### Backend Secrets (Render only)

All backend secrets (JWT_SECRET, ADMIN_PASSWORD, Stripe keys, database URL) live in **Render environment variables only**. This frontend app has no access to them.

For details, see the `phonics-api` repository.

---

## Payment System

- **Provider:** Stripe
- **Price:** $9.99/month with 7-day free trial
- **Flow:** Upgrade button → `PhonicsAPI.startCheckout()` → Render API → Stripe → `pages/success.html` → `PhonicsAPI.verifySession()` → premium unlocked in localStorage

### Stripe Webhook

Endpoint: `https://phonics-api-k43i.onrender.com/api/subscriptions/webhook`

Events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`

### Test card

```
Number: 4242 4242 4242 4242
Exp: 12/25  CVC: 123
```

---

## Database Tables (Neon PostgreSQL)

| Table | Populated by |
|-------|-------------|
| `users` | `POST /api/users/register` — onboarding + email capture |
| `events` | `POST /api/events` — every page load and activity |
| `email_leads` | `POST /api/emails` — email capture widget |
| `stories` | Seeded via `seed.sql` or Admin Dashboard CRUD |
| `subscriptions` | Stripe webhook |

Seed initial data by running `seed.sql` in the Neon SQL Editor.

---

## Local Storage (Client-Side Cache)

This app caches user data in browser localStorage for offline availability and performance.

| Key | Purpose | Example Value |
|-----|---------|---|
| `ph_premium` | Premium subscription status | `'true'` or `'false'` |
| `ph_email` | Cached parent email | `'parent@example.com'` |
| `ph_user` | Cached user profile from API | `{ email, child_name, child_age, ... }` |
| `ph_profile` | Child profile (name, age, goals) | `{ name: 'Emma', age: 5 }` |
| `ph_session` | Current session ID | UUID string |
| `ph_progress` | Activity scores and history | `{ [activity_id]: score }` |
| `ph_streak` | Consecutive days of activity | `{ count: 5, last_date: '2026-03-30' }` |
| `ph_onboarded` | Onboarding completion flag | `'true'` after first registration |
| `alpha_mastered` | Mastered letter indices | Array of letter indices |

**Note:** All localStorage data is synced to server via API when user is registered. localStorage is a fallback for offline use only.

---

## Local Development

```bash
npm run dev   # http://localhost:8000

# To use local API, edit js/config.js:
window.PHONICS_API_BASE = 'http://localhost:3001';

# Restore production:
window.PHONICS_API_BASE = 'https://phonics-api-k43i.onrender.com';
```

**Development notes:**
- Serve package manages the local HTTP server
- No build or compilation step needed
- Changes to `.html`, `.js`, `.css` files are reflected immediately (refresh browser)
- API configuration lives in `js/config.js` — update this single file to switch API endpoints

---

## Deployment

### App 1 — Vercel (Automatic on push)

```bash
git add -A
git commit -m "your message"
git push
```

**Result:** All `.html`, `.js`, `.css`, and `api/` functions auto-deploy to production  
**Time to live:** ~30 seconds  
**Rollback:** `git revert <commit_hash>` then push

### App 2 — GitHub Pages (Separate: phonics-admin)

Admin dashboard is deployed separately. See the `phonics-admin` repository.

### App 3 — Render (phonics-api backend)

Backend API and database live in the separate `phonics-api` repository. First deployment requires:

```bash
# In Render Shell after first deploy:
node src/db/migrate-standalone.js
```

**Note:** This app only deploys the frontend. Backend deployments are managed in the `phonics-api` repo.

---

## API Testing

### Health Check

```bash
curl https://phonics-api-k43i.onrender.com/health
# Response: { "status": "ok", "timestamp": "..." }
```

### Manual Event Logging

```bash
curl -X POST https://phonics-api-k43i.onrender.com/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "event": "test_event",
    "email": "test@example.com",
    "metadata": {}
  }'
```

### Full Test Suite

See the `phonics-api` repository for comprehensive curl test suite.

---

## Admin Dashboard

URL: https://athishsreeram.github.io/phonics-admin

**Login credentials:** Use `ADMIN_EMAIL` and `ADMIN_PASSWORD` from Render backend environment variables

**Available tabs:**
- Overview (live KPIs and metrics)
- Stories (CRUD operations on story library)
- Events (view tracked user events)
- Email Leads (captured email addresses)
- Users (registered parent profiles)

---

## Browser Support

**Desktop:** Chrome, Firefox, Safari, Edge (latest 2 versions)  
**Mobile:** iOS Safari 14+, Chrome Android (latest 2 versions)

---

## Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| 1 | ✅ Done | Payment system + Stripe integration |
| 2 | ✅ Done | Full API integration — users, events, stories, subscriptions |
| 3 | 🔜 Next | Blog + SEO + launch marketing |
| 4 | 🔜 Next | ProductHunt launch campaign |
| 5 | 🔜 Next | Scale to $5k MRR |

---

## Support

**Email:** startdreamhere123@gmail.com  
**Issues:** https://github.com/athishsreeram/phonics77-app/issues

---

## Author

**Athish Sreeram** · [GitHub](https://github.com/athishsreeram) · [Portfolio](https://athishsreeram.github.io)

---

## Changelog

### v1.1.0 (March 2026) — Current Release
- ✅ Static site deployment architecture (no build step)
- ✅ Central API client (`js/api.js`) loaded on all 25+ pages
- ✅ User registration via onboarding flow and email capture widget
- ✅ Comprehensive event tracking (20+ event types)
- ✅ Story Time with dynamic API-driven stories + hardcoded fallback
- ✅ Server-side premium status verification via `GET /api/users/me`
- ✅ Stripe checkout integration through Render backend
- ✅ Vercel serverless proxy functions routing to Render
- ✅ Admin dashboard (separate GitHub Pages deployment)
- ✅ Activity tracking on all 20 phonics games
- ✅ Fire-and-forget event delivery with keepalive flag
- ✅ Email capture widget with inline engagement nudges
- ✅ Streak tracking across consecutive days
- ✅ Offline-first architecture with localStorage fallback

### v1.0.0 (Initial Release)
- ✅ 20+ phonics activity games
- ✅ Free/premium access control via activity gating
- ✅ Stripe payment system (7-day trial + $9.99/month)
- ✅ Client-side analytics pipeline
- ✅ Vercel deployment
- ✅ Responsive mobile design (iPad, iPhone, Android)