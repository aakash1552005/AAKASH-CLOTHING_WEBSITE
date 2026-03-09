import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aakash Clothing — Wear the Sky',
  description:
    'Premium clothing crafted for the discerning individual since 2006. Discover our curated collection of shirts, dresses, and pants.',
  keywords: ['clothing', 'fashion', 'premium', 'Chennai', 'India', 'Aakash'],
  openGraph: {
    title: 'Aakash Clothing',
    description: 'Wear the Sky — Premium fashion since 2006',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-brand-white font-body text-brand-black antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0A0A0A',
              color: '#FAFAF8',
              fontFamily: 'var(--font-jost)',
              fontSize: '13px',
              letterSpacing: '0.05em',
            },
          }}
        />
      </body>
    </html>
  )
}
