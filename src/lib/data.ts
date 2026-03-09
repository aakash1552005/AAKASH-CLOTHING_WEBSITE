import { Product } from '@/types'

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silk Wrap Dress',
    description:
      'Crafted from the finest silk, this wrap dress drapes beautifully to flatter every silhouette. The adjustable tie waist and fluid fabric create an effortlessly elegant look perfect for both day and evening wear.',
    price: 4999,
    compare_at_price: 6500,
    category: 'dresses',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=85',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Dusty Rose', 'Midnight Navy'],
    stock: 25,
    featured: true,
    slug: 'silk-wrap-dress',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Navy Blue Oxford Shirt',
    description:
      'A timeless Oxford shirt in rich navy blue. Made from 100% combed cotton with a subtle texture that elevates any outfit. Features a button-down collar, chest pocket, and curved hem for a polished, versatile look.',
    price: 2499,
    compare_at_price: 3200,
    category: 'shirts',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=85',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=85',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy Blue', 'White', 'Light Blue'],
    stock: 40,
    featured: true,
    slug: 'navy-blue-oxford-shirt',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Classic Linen White Shirt',
    description:
      'Pure linen woven in a fine gauge for breathability and a refined drape. This classic white shirt transitions seamlessly from casual to formal settings. Pre-washed for immediate softness and relaxed elegance.',
    price: 2199,
    compare_at_price: 2800,
    category: 'shirts',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=85',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Ecru', 'Stone'],
    stock: 35,
    featured: true,
    slug: 'classic-linen-white-shirt',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Tailored Chinos',
    description:
      'Precision-tailored chinos in a refined stretch-cotton blend. A slim tapered cut creates a clean silhouette from office to weekend. Features a flat front, hidden button fly, and side seam pockets for a sleek profile.',
    price: 3299,
    compare_at_price: 4200,
    category: 'pants',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=85',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=85',
    ],
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Khaki', 'Olive', 'Charcoal', 'Navy'],
    stock: 50,
    featured: true,
    slug: 'tailored-chinos',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Floral Midi Dress',
    description:
      'A romantic floral print midi dress in lightweight viscose. The V-neckline, smocked waist, and flutter sleeves create a feminine silhouette perfect for warm-weather occasions.',
    price: 3799,
    category: 'dresses',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=85',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral White', 'Floral Black'],
    stock: 20,
    featured: false,
    slug: 'floral-midi-dress',
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Slim Fit Chinos',
    description:
      'Clean-cut slim fit chinos in durable cotton twill. A versatile wardrobe staple that pairs perfectly with casual shirts or blazers.',
    price: 2899,
    category: 'pants',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=85',
    ],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Beige', 'Black', 'Grey'],
    stock: 45,
    featured: false,
    slug: 'slim-fit-chinos',
    created_at: new Date().toISOString(),
  },
]

export const CATEGORIES = [
  { id: 'all', label: 'All', count: 6 },
  { id: 'shirts', label: 'Shirts', count: 2 },
  { id: 'dresses', label: 'Dresses', count: 2 },
  { id: 'pants', label: 'Pants', count: 2 },
]

export const BRAND_INFO = {
  name: 'Aakash Clothing',
  established: 2006,
  email: 'aakash1552005@gmail.com',
  phone: '+91 8825909003',
  whatsapp: '+91 8825909003',
  instagram: '_aakash.a1',
  address: 'No:12, Gandhi Second Street, Puzhal, Chennai, India',
  tagline: 'Wear the Sky',
  description: 'Premium clothing crafted for the discerning individual since 2006.',
}
