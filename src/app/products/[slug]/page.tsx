'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag, Heart, Share2, ChevronDown } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartSidebar from '@/components/cart/CartSidebar'
import ProductCard from '@/components/product/ProductCard'
import { SAMPLE_PRODUCTS } from '@/lib/data'
import { formatPrice } from '@/lib/stripe'
import { useCartStore } from '@/hooks/useCart'
import toast from 'react-hot-toast'
import { ProductJsonLd } from '@/components/JsonLd'

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = SAMPLE_PRODUCTS.find((p) => p.slug === params.slug)
  const { addItem } = useCartStore()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [activeImage, setActiveImage] = useState(0)
  const [wishlist, setWishlist] = useState(false)

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl font-light mb-4">Product not found</h1>
            <Link href="/products" className="btn-primary">Back to Shop</Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const related = SAMPLE_PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error('Please select a size'); return }
    if (!selectedColor) { toast.error('Please select a colour'); return }
    addItem(product, selectedSize, selectedColor)
    toast.success(`${product.name} added to your bag`)
  }

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : null

  return (
    <>
    <ProductJsonLd product={product} />
      <Navbar />
      <CartSidebar />
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Breadcrumb */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-body text-xs tracking-[0.12em] uppercase text-brand-slate hover:text-brand-black transition-colors mb-8"
        >
          <ArrowLeft size={12} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-cream">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {discount && (
                <span className="absolute top-4 left-4 bg-brand-gold text-brand-black text-[9px] tracking-[0.1em] uppercase font-body font-medium px-3 py-1.5">
                  Save {discount}%
                </span>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-24 overflow-hidden transition-all ${
                      activeImage === i
                        ? 'ring-1 ring-brand-black'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <p className="section-label mb-2 capitalize">{product.category}</p>
            <h1 className="heading-display text-4xl lg:text-5xl mb-3">{product.name}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl font-light">{formatPrice(product.price)}</span>
              {product.compare_at_price && (
                <span className="font-body text-base text-brand-slate line-through">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
            </div>

            <p className="font-body text-sm text-brand-slate leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="mb-6">
              <p className="font-body text-xs tracking-[0.15em] uppercase text-brand-charcoal mb-3">
                Colour{selectedColor && <span className="text-brand-gold ml-2 normal-case tracking-normal">{selectedColor}</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`font-body text-xs tracking-wide px-3 py-2 border transition-all ${
                      selectedColor === color
                        ? 'border-brand-black bg-brand-black text-white'
                        : 'border-brand-light-gray text-brand-charcoal hover:border-brand-charcoal'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-body text-xs tracking-[0.15em] uppercase text-brand-charcoal">
                  Size{selectedSize && <span className="text-brand-gold ml-2 normal-case tracking-normal">{selectedSize}</span>}
                </p>
                <button className="font-body text-xs text-brand-slate underline underline-offset-2 hover:text-brand-black transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 font-body text-sm border transition-all ${
                      selectedSize === size
                        ? 'border-brand-black bg-brand-black text-white'
                        : 'border-brand-light-gray text-brand-charcoal hover:border-brand-charcoal'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={15} strokeWidth={1.5} />
                Add to Bag
              </button>
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`w-12 h-12 border transition-all flex items-center justify-center ${
                  wishlist
                    ? 'bg-brand-black border-brand-black text-white'
                    : 'border-brand-light-gray hover:border-brand-charcoal'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={16} strokeWidth={1.5} className={wishlist ? 'fill-white' : ''} />
              </button>
            </div>

            {/* Stock status */}
            <p className="font-body text-xs text-brand-slate mb-6">
              {product.stock > 10
                ? '✓ In Stock — Ships within 2-4 business days'
                : product.stock > 0
                ? `⚡ Only ${product.stock} left — Order soon`
                : '✗ Out of Stock'}
            </p>

            {/* Accordion Details */}
            <div className="border-t border-brand-light-gray divide-y divide-brand-light-gray">
              {[
                { label: 'Product Details', content: 'Premium quality materials sourced from certified suppliers. Machine washable at 30°C. Do not bleach. Tumble dry low.' },
                { label: 'Shipping & Returns', content: 'Free shipping on orders above ₹3,000. Standard delivery: 5-7 business days. Easy returns within 14 days.' },
                { label: 'Size & Fit', content: 'This product runs true to size. For an oversized look, we recommend sizing up. The model is 5\'8" and wears size S/M.' },
              ].map(({ label, content }) => (
                <details key={label} className="group py-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-body text-xs tracking-[0.12em] uppercase text-brand-charcoal">
                      {label}
                    </span>
                    <ChevronDown size={14} className="transition-transform group-open:rotate-180 text-brand-slate" />
                  </summary>
                  <p className="font-body text-sm text-brand-slate mt-3 leading-relaxed pr-4">
                    {content}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20 pt-16 border-t border-brand-light-gray">
            <div className="text-center mb-10">
              <p className="section-label mb-3">You May Also Like</p>
              <h2 className="heading-display text-4xl">Complete the Look</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
