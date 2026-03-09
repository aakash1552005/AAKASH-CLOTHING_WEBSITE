import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, Instagram, Phone, Mail, MapPin } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartSidebar from '@/components/cart/CartSidebar'
import ProductCard from '@/components/product/ProductCard'
import { SAMPLE_PRODUCTS, BRAND_INFO } from '@/lib/data'

const REVIEWS = [
  {
    id: 1,
    author: 'Priya Sharma',
    location: 'Chennai',
    rating: 5,
    comment: 'Absolutely love the quality of the fabrics. The Silk Wrap Dress is stunning — I received so many compliments. Aakash Clothing never disappoints.',
  },
  {
    id: 2,
    author: 'Rahul Menon',
    location: 'Bangalore',
    rating: 5,
    comment: 'Been buying from Aakash for years. The linen shirts are perfectly tailored and incredibly comfortable even in Chennai\'s heat. Highly recommend.',
  },
  {
    id: 3,
    author: 'Deepa Krishnan',
    location: 'Mumbai',
    rating: 5,
    comment: 'Premium quality at reasonable prices. The tailored chinos fit like a dream. Fast shipping, beautiful packaging, and excellent customer service.',
  },
]

const CATEGORIES = [
  {
    id: 'shirts',
    label: 'Shirts',
    description: 'Oxford, linen & beyond',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=85',
  },
  {
    id: 'dresses',
    label: 'Dresses',
    description: 'Silk, wrap & midi',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=85',
  },
  {
    id: 'pants',
    label: 'Pants',
    description: 'Chinos & tailored fits',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=85',
  },
]

export default function HomePage() {
  const featured = SAMPLE_PRODUCTS.filter((p) => p.featured)

  return (
    <>
      <Navbar />
      <CartSidebar />
      <main>
        {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
        <section className="relative h-[85vh] min-h-[560px] max-h-[900px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&q=90"
            alt="Aakash Clothing — Wear the Sky"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/70 via-brand-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-20 max-w-7xl">
            <p className="section-label text-brand-gold mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Est. {BRAND_INFO.established} · Chennai, India
            </p>
            <h1
              className="heading-display text-5xl sm:text-6xl lg:text-8xl text-white max-w-lg lg:max-w-2xl mb-6 animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              Wear<br />
              <em className="italic font-light text-brand-gold-light">the Sky</em>
            </h1>
            <p
              className="font-body text-sm lg:text-base text-white/70 max-w-xs mb-8 leading-relaxed animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              Premium clothing for the discerning individual. Crafted with intention, worn with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <Link href="/products" className="btn-gold inline-flex items-center gap-2">
                Explore Collection
                <ArrowRight size={14} />
              </Link>
              <Link href="/products?category=new" className="btn-outline border-white text-white hover:bg-white hover:text-brand-black inline-flex items-center gap-2">
                New Arrivals
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40" />
            <span className="text-[9px] tracking-[0.3em] uppercase font-body">Scroll</span>
          </div>
        </section>

        {/* ═══════════════════════════ BRAND STRIP ════════════════════════════ */}
        <div className="bg-brand-cream py-4 border-y border-brand-light-gray overflow-hidden">
          <div className="flex items-center gap-12 whitespace-nowrap animate-[scroll_20s_linear_infinite]">
            {['Premium Fabrics', '·', 'Crafted Since 2006', '·', 'Free Shipping Above ₹3000', '·', '5-Star Rated', '·', 'Made in India', '·', 'Premium Fabrics', '·', 'Crafted Since 2006', '·', 'Free Shipping Above ₹3000', '·'].map(
              (item, i) => (
                <span
                  key={i}
                  className={`font-body text-xs tracking-[0.18em] uppercase ${
                    item === '·' ? 'text-brand-gold' : 'text-brand-slate'
                  }`}
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        {/* ═══════════════════════════ CATEGORIES ═════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Collections</p>
            <h2 className="heading-display text-4xl lg:text-5xl">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="group relative overflow-hidden aspect-[4/5] bg-brand-cream"
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 ease-luxury"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-display text-3xl font-light text-white mb-1">
                    {cat.label}
                  </h3>
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-white/70 mb-3">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-brand-gold text-xs tracking-[0.15em] uppercase font-body group-hover:gap-3 transition-all">
                    Shop Now <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ════════════════════════ FEATURED PRODUCTS ══════════════════════════ */}
        <section className="bg-brand-cream py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-3">Handpicked for You</p>
                <h2 className="heading-display text-4xl lg:text-5xl">Featured Pieces</h2>
              </div>
              <Link
                href="/products"
                className="hidden md:inline-flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-brand-charcoal hover:text-brand-black transition-colors group"
              >
                View All
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {featured.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 2} />
              ))}
            </div>
            <div className="text-center mt-10 md:hidden">
              <Link href="/products" className="btn-outline">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════ EDITORIAL BANNER ═══════════════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-square lg:aspect-auto lg:min-h-[500px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=85"
              alt="Craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="bg-brand-black flex flex-col justify-center px-10 lg:px-16 py-16">
            <p className="section-label text-brand-gold mb-4">Our Philosophy</p>
            <h2 className="heading-display text-4xl lg:text-5xl text-white mb-6">
              Crafted for<br />
              <em className="italic text-brand-gold-light">Every Moment</em>
            </h2>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-8 max-w-sm">
              For nearly two decades, Aakash Clothing has been synonymous with quality, elegance, and timeless style. Every piece is thoughtfully designed to complement your life — from the boardroom to the beach.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-white/10">
              {[['18+', 'Years of Craft'], ['5★', 'Customer Rating'], ['1000+', 'Happy Clients']].map(([num, label]) => (
                <div key={label}>
                  <p className="font-display text-3xl font-light text-brand-gold">{num}</p>
                  <p className="font-body text-xs text-white/50 tracking-wide mt-1">{label}</p>
                </div>
              ))}
            </div>
            <Link href="/products" className="btn-gold self-start">
              Explore Collection
            </Link>
          </div>
        </section>

        {/* ════════════════════════════ REVIEWS ════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Testimonials</p>
            <h2 className="heading-display text-4xl lg:text-5xl">What Our Clients Say</h2>
            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />
              ))}
              <span className="font-body text-sm text-brand-slate ml-2">5.0 — Based on 200+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-brand-cream p-7 lg:p-8">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="font-display text-lg font-light leading-relaxed text-brand-charcoal mb-6 italic">
                  "{review.comment}"
                </p>
                <div>
                  <p className="font-body text-sm font-medium text-brand-black">{review.author}</p>
                  <p className="font-body text-xs text-brand-slate">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════ INSTAGRAM STRIP ════════════════════════════ */}
        <section className="py-16 bg-brand-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="section-label mb-2">Follow Us</p>
                <a
                  href="https://instagram.com/_aakash.a1"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-display text-2xl font-light hover:text-brand-gold transition-colors"
                >
                  <Instagram size={22} strokeWidth={1.5} />
                  @_aakash.a1
                </a>
              </div>
            </div>
            <div className="grid grid-cols-4 lg:grid-cols-6 gap-2">
              {[
                'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&q=80',
                'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80',
                'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&q=80',
                'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&q=80',
                'https://images.unsplash.com/photo-1542574621-e088a4464792?w=300&q=80',
                'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80',
              ].map((src, i) => (
                <a
                  key={i}
                  href="https://instagram.com/_aakash.a1"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative aspect-square overflow-hidden bg-brand-light-gray"
                >
                  <Image
                    src={src}
                    alt={`Instagram post ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 25vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/30 transition-colors duration-300 flex items-center justify-center">
                    <Instagram size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ CONTACT/STORE INFO ══════════════════════════ */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-4">Visit Us</p>
              <h2 className="heading-display text-4xl lg:text-5xl mb-6">
                Find Our Store
              </h2>
              <p className="font-body text-sm text-brand-slate leading-relaxed mb-8">
                We're located in the heart of Puzhal, Chennai. Come visit us Monday through Saturday and explore our full collection in person.
              </p>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-cream flex items-center justify-center shrink-0">
                    <MapPin size={16} strokeWidth={1.5} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-[0.1em] uppercase text-brand-slate mb-1">Address</p>
                    <p className="font-body text-sm text-brand-black">{BRAND_INFO.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-cream flex items-center justify-center shrink-0">
                    <Phone size={16} strokeWidth={1.5} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-[0.1em] uppercase text-brand-slate mb-1">Phone & WhatsApp</p>
                    <a href={`tel:${BRAND_INFO.phone}`} className="font-body text-sm text-brand-black hover:text-brand-gold transition-colors">
                      {BRAND_INFO.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-cream flex items-center justify-center shrink-0">
                    <Mail size={16} strokeWidth={1.5} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-[0.1em] uppercase text-brand-slate mb-1">Email</p>
                    <a href={`mailto:${BRAND_INFO.email}`} className="font-body text-sm text-brand-black hover:text-brand-gold transition-colors">
                      {BRAND_INFO.email}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            {/* Map placeholder */}
            <div className="relative h-72 lg:h-96 bg-brand-cream overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=Puzhal,Chennai,Tamil+Nadu&output=embed"
                className="w-full h-full border-0 grayscale"
                loading="lazy"
                title="Store location map"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
