'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, Heart } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/stripe'
import { useCartStore } from '@/hooks/useCart'
import { useWishlistStore } from '@/hooks/useWishlist'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const { addItem } = useCartStore()
  const { toggleItem, isWishlisted } = useWishlistStore()
  const wishlisted = isWishlisted(product.id)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    const defaultSize = product.sizes[0]
    const defaultColor = product.colors[0]
    addItem(product, defaultSize, defaultColor)
    toast.success(`${product.name} added to bag`)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleItem(product)
    toast.success(wishlisted ? `Removed from wishlist` : `Added to wishlist`)
  }

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : null

  return (
    <article
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-brand-cream aspect-[3/4] mb-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            className={`object-cover transition-transform duration-700 ease-luxury ${
              hovered && product.images[1] ? 'opacity-0' : 'opacity-100'
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} — alternate view`}
              fill
              className={`object-cover absolute inset-0 transition-opacity duration-700 ease-luxury ${
                hovered ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount && (
              <span className="bg-brand-gold text-brand-black text-[9px] tracking-[0.1em] uppercase font-body font-medium px-2 py-1">
                −{discount}%
              </span>
            )}
            {product.stock <= 5 && product.stock > 0 && (
              <span className="bg-brand-black text-brand-cream text-[9px] tracking-[0.1em] uppercase font-body px-2 py-1">
                Low Stock
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center
                        transition-all duration-300 ${
                          hovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
                        }`}
            aria-label="Add to wishlist"
          >
            <Heart
              size={13}
              strokeWidth={1.5}
              className={wishlisted ? 'fill-brand-black' : ''}
            />
          </button>

          {/* Quick Add */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-brand-black/90 py-3 text-center
                        transition-all duration-300 ${
                          hovered ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-full'
                        }`}
          >
            <button
              onClick={handleQuickAdd}
              className="flex items-center justify-center gap-2 w-full text-brand-cream text-[10px] tracking-[0.18em] uppercase font-body"
            >
              <ShoppingBag size={12} strokeWidth={1.5} />
              Quick Add
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-body text-sm font-medium text-brand-black leading-snug flex-1">
              {product.name}
            </h3>
          </div>
          <p className="font-body text-xs text-brand-slate mb-2 capitalize">
            {product.category}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-light text-brand-black">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="font-body text-xs text-brand-slate line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>
          <div className="flex gap-1.5 mt-2">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color}
                className="text-[9px] font-body tracking-wide text-brand-slate border border-brand-light-gray px-1.5 py-0.5"
              >
                {color}
              </span>
            ))}
            {product.colors.length > 4 && (
              <span className="text-[9px] font-body tracking-wide text-brand-slate">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}