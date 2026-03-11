'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface Review {
  id: string
  name: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

const SAMPLE_REVIEWS: Review[] = [
  { id: '1', name: 'Priya S.', rating: 5, date: '2 weeks ago', comment: 'Absolutely love the quality! The fabric is so soft and the fit is perfect. Will definitely order more.', verified: true },
  { id: '2', name: 'Rahul M.', rating: 4, date: '1 month ago', comment: 'Great product, exactly as described. Shipping was fast too. Only minor feedback — the colour is slightly lighter than the photos.', verified: true },
  { id: '3', name: 'Ananya K.', rating: 5, date: '1 month ago', comment: 'Premium quality as always from Aakash Clothing. Been a customer since 2019 and they never disappoint!', verified: true },
]

function StarRating({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            size={14}
            className={`transition-colors ${
              star <= (hovered || rating)
                ? 'fill-brand-gold text-brand-gold'
                : 'fill-transparent text-brand-light-gray'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export default function ReviewsSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>(SAMPLE_REVIEWS)
  const [showForm, setShowForm] = useState(false)
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' })
  const [submitted, setSubmitted] = useState(false)

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
  }))

  const handleSubmit = () => {
    if (!newReview.name || !newReview.rating || !newReview.comment) return
    setReviews(prev => [{
      id: Date.now().toString(),
      name: newReview.name,
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment,
      verified: false,
    }, ...prev])
    setNewReview({ name: '', rating: 0, comment: '' })
    setShowForm(false)
    setSubmitted(true)
  }

  return (
    <section className="mt-20 pt-16 border-t border-brand-light-gray">
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="section-label mb-3">Customer Reviews</p>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-5xl font-light">{avgRating.toFixed(1)}</span>
            <div>
              <StarRating rating={Math.round(avgRating)} />
              <p className="font-body text-xs text-brand-slate mt-1">{reviews.length} reviews</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-secondary text-xs"
        >
          Write a Review
        </button>
      </div>

      {/* Rating Breakdown */}
      <div className="mb-10 space-y-2 max-w-xs">
        {ratingCounts.map(({ star, count }) => (
          <div key={star} className="flex items-center gap-3">
            <span className="font-body text-xs text-brand-slate w-4">{star}</span>
            <Star size={10} className="fill-brand-gold text-brand-gold flex-shrink-0" />
            <div className="flex-1 h-1.5 bg-brand-cream overflow-hidden">
              <div
                className="h-full bg-brand-gold transition-all"
                style={{ width: reviews.length ? `${(count / reviews.length) * 100}%` : '0%' }}
              />
            </div>
            <span className="font-body text-xs text-brand-slate w-4">{count}</span>
          </div>
        ))}
      </div>

      {/* Write Review Form */}
      {showForm && (
        <div className="mb-10 p-6 border border-brand-light-gray bg-brand-cream/30">
          <h3 className="font-body text-xs tracking-[0.15em] uppercase text-brand-charcoal mb-4">Your Review</h3>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs text-brand-slate mb-1 block">Your Rating</label>
              <StarRating rating={newReview.rating} interactive onRate={(r) => setNewReview(p => ({ ...p, rating: r }))} />
            </div>
            <input
              type="text"
              placeholder="Your name"
              value={newReview.name}
              onChange={e => setNewReview(p => ({ ...p, name: e.target.value }))}
              className="w-full border border-brand-light-gray bg-white px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-charcoal transition-colors"
            />
            <textarea
              placeholder="Share your experience..."
              value={newReview.comment}
              onChange={e => setNewReview(p => ({ ...p, comment: e.target.value }))}
              rows={4}
              className="w-full border border-brand-light-gray bg-white px-4 py-3 font-body text-sm focus:outline-none focus:border-brand-charcoal transition-colors resize-none"
            />
            <div className="flex gap-3">
              <button onClick={handleSubmit} className="btn-primary text-xs">Submit Review</button>
              <button onClick={() => setShowForm(false)} className="btn-secondary text-xs">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {submitted && (
        <p className="font-body text-xs text-green-600 mb-6">Thank you for your review!</p>
      )}

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-brand-light-gray pb-8 last:border-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-body text-sm font-medium text-brand-charcoal">{review.name}</span>
                  {review.verified && (
                    <span className="font-body text-[10px] text-green-600 tracking-wide">✓ Verified Purchase</span>
                  )}
                </div>
                <StarRating rating={review.rating} />
              </div>
              <span className="font-body text-xs text-brand-slate">{review.date}</span>
            </div>
            <p className="font-body text-sm text-brand-slate leading-relaxed mt-3">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  )
}