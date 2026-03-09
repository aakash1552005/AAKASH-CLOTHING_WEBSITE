export interface Product {
  id: string
  name: string
  description: string
  price: number
  compare_at_price?: number
  category: 'shirts' | 'dresses' | 'pants' | 'accessories'
  images: string[]
  sizes: string[]
  colors: string[]
  stock: number
  featured: boolean
  slug: string
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

export interface Order {
  id: string
  user_id?: string
  email: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
  shipping_address: Address
  stripe_payment_intent_id: string
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  price: number
  quantity: number
  size: string
  color: string
}

export interface Address {
  name: string
  email: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  postal_code: string
  country: string
}

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  product_id?: string
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'customer' | 'admin'
}
