'use client'

import { useState, useMemo } from 'react'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartSidebar from '@/components/cart/CartSidebar'
import ProductCard from '@/components/product/ProductCard'
import { SAMPLE_PRODUCTS, CATEGORIES } from '@/lib/data'



const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
]

export default function ProductsPage() {
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = [...SAMPLE_PRODUCTS]
    if (category !== 'all') list = list.filter((p) => p.category === category)
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'featured': list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break
    }
    return list
  }, [category, sort])

  return (
    <>
      <Navbar />
      <CartSidebar />
      <main>
        {/* Page Header */}
        <div className="bg-brand-cream py-16 text-center border-b border-brand-light-gray">
          <p className="section-label mb-3">Our Collection</p>
          <h1 className="heading-display text-5xl lg:text-6xl">Shop All</h1>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          {/* Filter & Sort Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-brand-light-gray">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`font-body text-xs tracking-[0.12em] uppercase px-4 py-2 transition-all duration-200 ${
                    category === cat.id
                      ? 'bg-brand-black text-brand-white'
                      : 'text-brand-slate hover:text-brand-black border border-transparent hover:border-brand-light-gray'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-transparent border border-brand-light-gray px-4 py-2 pr-8 font-body text-xs tracking-[0.12em] uppercase text-brand-charcoal focus:outline-none focus:border-brand-black cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-slate" />
            </div>
          </div>

          {/* Results Count */}
          <p className="font-body text-xs text-brand-slate tracking-wide mb-6">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </p>

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 4} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-display text-3xl font-light text-brand-slate mb-4">
                No products found
              </p>
              <button
                onClick={() => setCategory('all')}
                className="btn-outline"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
