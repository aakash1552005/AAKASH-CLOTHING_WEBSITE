import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="section-label mb-4">404</p>
          <h1 className="heading-display text-5xl lg:text-7xl mb-4">
            Page Not Found
          </h1>
          <p className="font-body text-sm text-brand-slate mb-8 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
