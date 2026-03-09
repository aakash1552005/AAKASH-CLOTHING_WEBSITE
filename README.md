# AAKASH CLOTHING — Premium E-Commerce

A premium Next.js 14 e-commerce website for Aakash Clothing, built with Supabase, Stripe, and Tailwind CSS.

**Live Preview:** Deploy to Vercel (see instructions below)

---

## 🗂 Project Structure

```
aakash-clothing/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home page
│   │   ├── layout.tsx                  # Root layout + fonts
│   │   ├── globals.css                 # Global styles
│   │   ├── products/
│   │   │   ├── page.tsx                # Products listing
│   │   │   └── [slug]/page.tsx         # Product detail
│   │   ├── cart/page.tsx               # Cart page
│   │   ├── checkout/page.tsx           # Checkout page
│   │   ├── admin/
│   │   │   └── dashboard/page.tsx      # Admin dashboard
│   │   └── api/
│   │       ├── products/route.ts       # Products CRUD API
│   │       ├── orders/route.ts         # Orders API
│   │       └── stripe/
│   │           ├── create-checkout-session/route.ts
│   │           └── webhook/route.ts    # Stripe webhooks
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── product/
│   │   │   └── ProductCard.tsx
│   │   └── cart/
│   │       └── CartSidebar.tsx
│   ├── hooks/
│   │   └── useCart.ts                  # Zustand cart store
│   ├── lib/
│   │   ├── supabase.ts                 # Supabase client
│   │   ├── stripe.ts                   # Stripe utilities
│   │   └── data.ts                     # Sample product data
│   └── types/index.ts                  # TypeScript types
├── supabase-schema.sql                 # Full DB schema + seed
├── .github/workflows/deploy.yml        # CI/CD pipeline
├── tailwind.config.ts
├── next.config.js
└── .env.example
```

---

## ⚡ Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/aakash-clothing.git
cd aakash-clothing
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

Fill in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and paste the entire contents of `supabase-schema.sql`
3. Click **Run** — this creates all tables, RLS policies, and seeds sample data
4. Copy your Project URL and keys from **Settings → API**

### 4. Set Up Stripe

1. Create an account at [stripe.com](https://stripe.com)
2. Get your test keys from **Developers → API keys**
3. Set up a webhook at **Developers → Webhooks**:
   - URL: `https://your-domain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `payment_intent.payment_failed`
4. Copy the webhook signing secret

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗄 Database Schema

| Table | Description |
|-------|-------------|
| `users` | Customer profiles (extends Supabase auth) |
| `products` | Product catalogue with images, sizes, colors |
| `orders` | Customer orders with Stripe session tracking |
| `order_items` | Individual items within each order |

**Note:** Prices are stored in paise (₹1 = 100 paise) to avoid floating point issues.

---

## 💳 Stripe Integration

The checkout flow:

1. Customer fills shipping details on `/checkout`
2. `POST /api/stripe/create-checkout-session` creates a Stripe session
3. Customer is redirected to Stripe's hosted checkout page
4. On success, customer lands on `/checkout/success`
5. Stripe sends a webhook to `/api/stripe/webhook`
6. Webhook updates the order status in Supabase

---

## 🚀 Deploy to Vercel

### Option A: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/aakash-clothing)

### Option B: Manual Deploy

```bash
npm i -g vercel
vercel login
vercel --prod
```

Add all environment variables in **Vercel Dashboard → Settings → Environment Variables**.

### CI/CD via GitHub Actions

Add these secrets to your GitHub repository (**Settings → Secrets**):

| Secret | Value |
|--------|-------|
| `VERCEL_TOKEN` | From Vercel dashboard |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `NEXT_PUBLIC_APP_URL` | Your production URL |

Pushes to `main` will automatically build and deploy.

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `brand-black` | `#0A0A0A` | Primary text, buttons |
| `brand-white` | `#FAFAF8` | Page backgrounds |
| `brand-cream` | `#F5F0E8` | Card backgrounds |
| `brand-gold` | `#C9A84C` | Accents, badges |
| `brand-slate` | `#6B6B6B` | Secondary text |
| Font Display | Cormorant Garamond | Headings, prices |
| Font Body | Jost | UI text, labels |

---

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, categories, featured products, reviews |
| `/products` | Product listing with filter + sort |
| `/products/[slug]` | Product detail with image gallery |
| `/cart` | Cart with quantity management |
| `/checkout` | Checkout → Stripe payment |
| `/admin/dashboard` | Admin panel (orders, products) |

---

## 🔐 Admin Access

To make a user an admin, run in Supabase SQL editor:

```sql
UPDATE public.users SET role = 'admin' WHERE email = 'aakash1552005@gmail.com';
```

---

## 📞 Contact

**Aakash Clothing**  
No:12, Gandhi Second Street, Puzhal, Chennai, India  
📞 +91 8825909003  
📧 aakash1552005@gmail.com  
📸 [@_aakash.a1](https://instagram.com/_aakash.a1)
