export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-brand-cream mb-3" />
      <div className="h-3 bg-brand-cream rounded w-1/3 mb-2" />
      <div className="h-4 bg-brand-cream rounded w-2/3 mb-2" />
      <div className="h-4 bg-brand-cream rounded w-1/4" />
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      <div className="aspect-[3/4] bg-brand-cream" />
      <div className="space-y-4 pt-4">
        <div className="h-3 bg-brand-cream rounded w-1/4" />
        <div className="h-8 bg-brand-cream rounded w-3/4" />
        <div className="h-6 bg-brand-cream rounded w-1/3" />
        <div className="h-20 bg-brand-cream rounded" />
        <div className="flex gap-2">
          {[1,2,3].map(i => <div key={i} className="h-10 w-20 bg-brand-cream rounded" />)}
        </div>
        <div className="flex gap-2">
          {[1,2,3,4].map(i => <div key={i} className="h-12 w-12 bg-brand-cream rounded" />)}
        </div>
        <div className="h-12 bg-brand-cream rounded" />
      </div>
    </div>
  )
}