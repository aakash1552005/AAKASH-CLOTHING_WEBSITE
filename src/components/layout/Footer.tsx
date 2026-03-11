import Link from 'next/link'
import { Instagram, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { BRAND_INFO } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-cream">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-3xl font-light tracking-[0.08em] mb-2">AAKASH</h2>
            <p className="text-[9px] tracking-[0.35em] uppercase text-brand-gold font-body mb-4">
              Clothing · Est. {BRAND_INFO.established}
            </p>
            <p className="font-body text-sm text-brand-cream/60 leading-relaxed max-w-xs">
              {BRAND_INFO.description}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={`https://instagram.com/${BRAND_INFO.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={14} strokeWidth={1.5} />
              </a>
              <a
                href={`https://wa.me/${BRAND_INFO.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-brand-gold mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'New Arrivals', href: '/products?sort=newest' },
                { label: 'Shirts', href: '/products?category=shirts' },
                { label: 'Dresses', href: '/products?category=dresses' },
                { label: 'Pants', href: '/products?category=pants' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-brand-cream/60 hover:text-brand-cream transition-colors tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-brand-gold mb-5">
              Information
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/store/about' },
                { label: 'Size Guide', href: '/store/size-guide' },
                { label: 'Shipping & Returns', href: '/store/shipping' },
                { label: 'Care Instructions', href: '/store/care' },
                { label: 'Privacy Policy', href: '/store/privacy' },
                { label: 'Terms of Service', href: '/store/terms' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-brand-cream/60 hover:text-brand-cream transition-colors tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-brand-gold mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={14} strokeWidth={1.5} className="shrink-0 mt-0.5 text-brand-gold" />
                <span className="font-body text-sm text-brand-cream/60 leading-relaxed">
                  {BRAND_INFO.address}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={14} strokeWidth={1.5} className="shrink-0 text-brand-gold" />
                <a
                  href={`tel:${BRAND_INFO.phone}`}
                  className="font-body text-sm text-brand-cream/60 hover:text-brand-cream transition-colors"
                >
                  {BRAND_INFO.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={14} strokeWidth={1.5} className="shrink-0 text-brand-gold" />
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="font-body text-sm text-brand-cream/60 hover:text-brand-cream transition-colors"
                >
                  {BRAND_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-brand-cream/40 tracking-wide">
            © {new Date().getFullYear()} Aakash Clothing. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {['Visa', 'Mastercard', 'UPI', 'Stripe'].map((method) => (
              <span
                key={method}
                className="font-body text-[10px] tracking-[0.1em] uppercase px-2 py-1 border border-white/10 text-brand-cream/40"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}