# 🌿 StrainHub — Next.js Setup

## ⚡ Quick Start (5 steps)

### Step 1 — Install Node.js
Download from **https://nodejs.org** → install the LTS version.
Verify in terminal: `node -v` (should say v20+)

### Step 2 — Install dependencies
Open terminal in this folder and run:
```bash
npm install
```

### Step 3 — Set up Supabase (free database)
1. Go to **https://supabase.com** → Sign up → New Project
2. Wait for project to be ready (~1 min)
3. Go to **SQL Editor** → New Query → paste the contents of `supabase-setup.sql` → Run
4. Go to **Settings → API** and copy:
   - Project URL (looks like `https://xxxxx.supabase.co`)
   - Anon/public key

### Step 4 — Add environment variables
Copy `.env.local.example` to `.env.local` and fill it in:
```bash
cp .env.local.example .env.local
```
Then edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 5 — Import your strains
Go to **Supabase → Table Editor → strains → Insert rows**
Or use the Supabase dashboard to import JSON.

Quick import via terminal:
```bash
node scripts/import-strains.js
```

### Step 6 — Run locally
```bash
npm run dev
```
Open **http://localhost:3000** 🎉

---

## 🚀 Deploy to Vercel (Free)

### Option A — CLI (fastest)
```bash
npm install -g vercel
vercel
```
Follow the prompts. It auto-detects Next.js.

### Option B — GitHub (recommended for teams)
1. Push this folder to a GitHub repo
2. Go to **https://vercel.com** → New Project → Import your repo
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel domain)
4. Deploy → done ✅

Every `git push` auto-deploys. Zero config needed.

---

## 📁 Project Structure
```
src/
  app/
    page.tsx              # Homepage
    strains/
      page.tsx            # Strain browser with filters
      [slug]/page.tsx     # Individual strain page (SSG)
    learn/
      page.tsx            # Learning hub
    api/
      strains/search/     # Search API endpoint
  components/
    NavBar.tsx            # Sticky top nav with search
    Footer.tsx            # Shared footer
    StrainCard.tsx        # Rich strain card component
  lib/
    supabase.ts           # DB client
    strains.ts            # All data fetching functions
    types.ts              # TypeScript types
    seo.ts                # Metadata + JSON-LD helpers
```

## 🔍 SEO Architecture
- Every strain = static page at `/strains/[slug]` (SSG at build time)
- Full JSON-LD schema (Drug + FAQ + BreadcrumbList) on every strain page
- Auto-generated sitemap via `next-sitemap`
- Proper `<title>`, meta description, OG tags per page
- FAQ section on every strain page = featured snippet targets

## 💰 Free Tier Limits
| Service | Free | Enough for... |
|---|---|---|
| Vercel | 100GB bandwidth/mo | ~50k visitors/mo |
| Supabase | 500MB DB | ~10k-15k strains |
| Both | Free forever | Early launch |

## ⬆️ When to Upgrade
- **Supabase Pro ($25/mo)** when you add 70k strains (need >500MB)
- **Vercel Pro ($20/mo)** when you hit 100k monthly visitors
