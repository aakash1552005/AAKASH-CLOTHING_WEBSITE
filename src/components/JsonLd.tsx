import { Product } from '@/types'

export function ProductJsonLd({ product }: { product: Product }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: (product.price / 100).toFixed(2),
      availability: product.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Aakash Clothing',
      },
    },
    brand: {
      '@type': 'Brand',
      name: 'Aakash Clothing',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function StoreJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Aakash Clothing',
    description: 'Premium clothing crafted for the discerning individual since 2006.',
    foundingDate: '2006',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No:12, Gandhi Second Street, Puzhal',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8825909003',
      contactType: 'customer service',
    },
    sameAs: ['https://www.instagram.com/_aakash.a1'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
