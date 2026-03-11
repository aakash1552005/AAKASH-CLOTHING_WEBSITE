import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function CarePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <p className="section-label mb-4">Garment Care</p>
        <h1 className="heading-display text-5xl mb-8">Care Instructions</h1>
        <div className="space-y-8 font-body text-sm text-brand-slate leading-relaxed">
          {[
            { fabric: 'Silk', care: 'Hand wash in cold water with mild detergent. Do not wring. Lay flat to dry away from direct sunlight. Iron on low heat.' },
            { fabric: 'Linen', care: 'Machine wash at 30°C on a gentle cycle. Tumble dry on low or line dry. Iron while slightly damp for best results.' },
            { fabric: 'Cotton', care: 'Machine wash at 30–40°C. Tumble dry on medium. Iron on medium-high heat.' },
            { fabric: 'Chino / Stretch Cotton', care: 'Machine wash at 30°C. Do not bleach. Tumble dry low. Iron on medium heat.' },
          ].map(({ fabric, care }) => (
            <div key={fabric}>
              <h2 className="font-body text-xs tracking-[0.15em] uppercase text-brand-charcoal mb-2">{fabric}</h2>
              <p>{care}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}