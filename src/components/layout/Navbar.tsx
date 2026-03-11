'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Search, Menu, X, Instagram, Heart } from 'lucide-react'
import { useCartHydrated } from '@/hooks/useCart'
import { useWishlistStore } from '@/hooks/useWishlist'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count, toggleCart } = useCartHydrated()
  const cartCount = count
  const wishlistCount = useWishlistStore((state) => state.items.length)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
  ]

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-brand-black text-brand-cream text-center py-2 text-[10px] tracking-[0.2em] uppercase font-body">
        Free shipping on orders above ₹3,000 · Est. 2006 · Chennai, India
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-brand-white'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center h-16 lg:h-20">

            {/* Mobile: Menu */}
            <button
              className="lg:hidden p-1 mr-4"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            {/* Logo */}
            <Link href="/" className="text-center mr-10">
              <span className="font-display text-2xl lg:text-3xl font-light tracking-[0.08em] text-brand-black block leading-none">
                AAKASH
              </span>
              <span className="text-[8px] tracking-[0.35em] uppercase font-body text-brand-gold block mt-0.5">
                Clothing
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-10 flex-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Icons — Right */}
            <div className="flex items-center gap-4 lg:gap-5 ml-auto">
              <button
                className="hidden lg:block p-1 hover:opacity-60 transition-opacity"
                aria-label="Search"
              >
                <Search size={17} strokeWidth={1.5} />
              </button>

              
                href="https://instagram.com/_aakash.a1"
                target="_blank"
                rel="noreferrer"
                className="hidden lg:block p-1 hover:opacity-60 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram size={17} strokeWidth={1.5} />
              </a>

              <Link
                href="/wishlist"
                className="relative p-1 hover:opacity-60 transition-opacity"
                aria-label="Wishlist"
              >
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[9px] font-body font-medium w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleCart}
                className="relative p-1 hover:opacity-60 transition-opacity"
                aria-label={`Cart (${cartCount})`}
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-body font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative bg-brand-white w-72 h-full flex flex-col p-8 animate-slide-in">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>

            <div className="mt-8 mb-10">
              <span className="font-display text-2xl font-light tracking-[0.08em]">AAKASH</span>
              <span className="text-[8px] tracking-[0.35em] uppercase font-body text-brand-gold block mt-0.5">
                Clothing
              </span>
            </div>

            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm tracking-[0.1em] uppercase text-brand-charcoal hover:text-brand-black transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/wishlist"
                className="font-body text-sm tracking-[0.1em] uppercase text-brand-charcoal hover:text-brand-black transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Wishlist
              </Link>
            </nav>

            <div className="mt-auto pt-8 border-t border-brand-light-gray">
              <p className="text-xs text-brand-slate font-body">+91 8825909003</p>
              <p className="text-xs text-brand-slate font-body mt-1">aakash1552005@gmail.com</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}