-- ================================================================
-- AAKASH CLOTHING — Supabase PostgreSQL Schema
-- Run these commands in your Supabase SQL Editor
-- ================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────────────────────
-- USERS (extends Supabase auth.users)
-- ────────────────────────────────────────────────────────────────
CREATE TABLE public.users (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  full_name   TEXT,
  avatar_url  TEXT,
  role        TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE USING (auth.uid() = id);

-- Auto-create user profile on sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ────────────────────────────────────────────────────────────────
-- PRODUCTS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE public.products (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name             TEXT NOT NULL,
  description      TEXT,
  price            INTEGER NOT NULL,          -- stored in paise (₹ * 100)
  compare_at_price INTEGER,
  category         TEXT NOT NULL CHECK (category IN ('shirts', 'dresses', 'pants', 'accessories')),
  images           TEXT[] DEFAULT '{}',
  sizes            TEXT[] DEFAULT '{}',
  colors           TEXT[] DEFAULT '{}',
  stock            INTEGER NOT NULL DEFAULT 0,
  featured         BOOLEAN DEFAULT FALSE,
  slug             TEXT NOT NULL UNIQUE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are publicly readable"
  ON public.products FOR SELECT USING (TRUE);

CREATE POLICY "Only admins can insert products"
  ON public.products FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Only admins can update products"
  ON public.products FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ────────────────────────────────────────────────────────────────
-- ORDERS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE public.orders (
  id                        UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id                   UUID REFERENCES public.users(id),
  email                     TEXT NOT NULL,
  status                    TEXT NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total                     INTEGER NOT NULL,
  shipping_address          JSONB NOT NULL,
  stripe_session_id         TEXT UNIQUE,
  stripe_payment_intent_id  TEXT UNIQUE,
  created_at                TIMESTAMPTZ DEFAULT NOW(),
  updated_at                TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Orders can be inserted by anyone (guest checkout)"
  ON public.orders FOR INSERT WITH CHECK (TRUE);

-- ────────────────────────────────────────────────────────────────
-- ORDER ITEMS
-- ────────────────────────────────────────────────────────────────
CREATE TABLE public.order_items (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id     UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id   UUID REFERENCES public.products(id) NOT NULL,
  product_name TEXT NOT NULL,
  price        INTEGER NOT NULL,
  quantity     INTEGER NOT NULL DEFAULT 1,
  size         TEXT NOT NULL,
  color        TEXT NOT NULL
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order items follow order access"
  ON public.order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_id
    AND (o.user_id = auth.uid() OR EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    ))
  ));

-- ────────────────────────────────────────────────────────────────
-- SEED SAMPLE DATA
-- ────────────────────────────────────────────────────────────────
INSERT INTO public.products (name, description, price, compare_at_price, category, images, sizes, colors, stock, featured, slug)
VALUES
  (
    'Silk Wrap Dress',
    'Crafted from the finest silk, this wrap dress drapes beautifully to flatter every silhouette.',
    499900, 650000, 'dresses',
    ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=85'],
    ARRAY['XS','S','M','L','XL'],
    ARRAY['Ivory','Dusty Rose','Midnight Navy'],
    25, TRUE, 'silk-wrap-dress'
  ),
  (
    'Navy Blue Oxford Shirt',
    'A timeless Oxford shirt in rich navy blue. Made from 100% combed cotton.',
    249900, 320000, 'shirts',
    ARRAY['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=85'],
    ARRAY['S','M','L','XL','XXL'],
    ARRAY['Navy Blue','White','Light Blue'],
    40, TRUE, 'navy-blue-oxford-shirt'
  ),
  (
    'Classic Linen White Shirt',
    'Pure linen woven in a fine gauge for breathability and a refined drape.',
    219900, 280000, 'shirts',
    ARRAY['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=85'],
    ARRAY['S','M','L','XL','XXL'],
    ARRAY['White','Ecru','Stone'],
    35, TRUE, 'classic-linen-white-shirt'
  ),
  (
    'Tailored Chinos',
    'Precision-tailored chinos in a refined stretch-cotton blend.',
    329900, 420000, 'pants',
    ARRAY['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=85'],
    ARRAY['28','30','32','34','36','38'],
    ARRAY['Khaki','Olive','Charcoal','Navy'],
    50, TRUE, 'tailored-chinos'
  );
