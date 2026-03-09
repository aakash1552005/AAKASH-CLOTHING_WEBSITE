'use client'

import { useState } from 'react'
import { Package, ShoppingCart, TrendingUp, Users, Plus, Edit2, Trash2, Eye } from 'lucide-react'
import { SAMPLE_PRODUCTS } from '@/lib/data'
import { formatPrice } from '@/lib/stripe'
import Image from 'next/image'

const STATS = [
  { label: 'Total Revenue', value: '₹1,24,500', icon: TrendingUp, change: '+12.5%' },
  { label: 'Total Orders', value: '48', icon: ShoppingCart, change: '+8.2%' },
  { label: 'Products', value: '24', icon: Package, change: '+2' },
  { label: 'Customers', value: '186', icon: Users, change: '+15' },
]

const RECENT_ORDERS = [
  { id: 'ORD-001', customer: 'Priya Sharma', product: 'Silk Wrap Dress', amount: 4999, status: 'delivered', date: '2024-05-20' },
  { id: 'ORD-002', customer: 'Rahul Menon', product: 'Navy Oxford Shirt', amount: 2499, status: 'shipped', date: '2024-05-21' },
  { id: 'ORD-003', customer: 'Deepa K', product: 'Tailored Chinos', amount: 3299, status: 'processing', date: '2024-05-22' },
  { id: 'ORD-004', customer: 'Arjun V', product: 'Linen White Shirt', amount: 2199, status: 'pending', date: '2024-05-23' },
]

const STATUS_STYLES: Record<string, string> = {
  delivered: 'bg-green-100 text-green-700',
  shipped: 'bg-blue-100 text-blue-700',
  processing: 'bg-yellow-100 text-yellow-700',
  pending: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-700',
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview')

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Admin Nav */}
      <header className="bg-brand-black text-brand-cream px-8 py-4 flex items-center justify-between">
        <div>
          <span className="font-display text-xl tracking-wider">AAKASH</span>
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-brand-gold ml-2">Admin</span>
        </div>
        <nav className="flex items-center gap-6">
          {(['overview', 'products', 'orders'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-body text-xs tracking-[0.12em] uppercase transition-colors ${
                activeTab === tab ? 'text-brand-gold' : 'text-white/60 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {STATS.map(({ label, value, icon: Icon, change }) => (
                <div key={label} className="bg-white p-5 lg:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Icon size={18} strokeWidth={1.5} className="text-brand-gold" />
                    <span className="font-body text-xs text-green-600">{change}</span>
                  </div>
                  <p className="font-display text-2xl lg:text-3xl font-light mb-1">{value}</p>
                  <p className="font-body text-xs text-brand-slate tracking-wide">{label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-6">
              <h2 className="font-body text-xs tracking-[0.2em] uppercase text-brand-charcoal mb-5">
                Recent Orders
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brand-light-gray">
                      {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'].map((h) => (
                        <th key={h} className="text-left font-body text-[10px] tracking-[0.15em] uppercase text-brand-slate pb-3 pr-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_ORDERS.map((order) => (
                      <tr key={order.id} className="border-b border-brand-light-gray last:border-0">
                        <td className="py-3 pr-4 font-body text-sm font-medium">{order.id}</td>
                        <td className="py-3 pr-4 font-body text-sm">{order.customer}</td>
                        <td className="py-3 pr-4 font-body text-sm text-brand-slate">{order.product}</td>
                        <td className="py-3 pr-4 font-display text-base font-light">{formatPrice(order.amount)}</td>
                        <td className="py-3 pr-4">
                          <span className={`font-body text-[10px] tracking-[0.1em] uppercase px-2 py-1 ${STATUS_STYLES[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 font-body text-sm text-brand-slate">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-display text-3xl">Products</h2>
              <button className="btn-primary flex items-center gap-2">
                <Plus size={14} /> Add Product
              </button>
            </div>
            <div className="bg-white overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-brand-light-gray">
                    {['Product', 'Category', 'Price', 'Stock', 'Featured', 'Actions'].map((h) => (
                      <th key={h} className="text-left font-body text-[10px] tracking-[0.15em] uppercase text-brand-slate px-4 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_PRODUCTS.map((product) => (
                    <tr key={product.id} className="border-b border-brand-light-gray last:border-0 hover:bg-brand-cream/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-12 bg-brand-cream overflow-hidden shrink-0">
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="40px" />
                          </div>
                          <span className="font-body text-sm font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-body text-sm text-brand-slate capitalize">{product.category}</td>
                      <td className="px-4 py-3 font-display text-base font-light">{formatPrice(product.price)}</td>
                      <td className="px-4 py-3 font-body text-sm">{product.stock}</td>
                      <td className="px-4 py-3">
                        <span className={`font-body text-[10px] tracking-wide px-2 py-1 ${product.featured ? 'bg-brand-gold/20 text-brand-gold' : 'bg-gray-100 text-gray-500'}`}>
                          {product.featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 hover:bg-brand-light-gray transition-colors" aria-label="View">
                            <Eye size={13} strokeWidth={1.5} />
                          </button>
                          <button className="p-1.5 hover:bg-brand-light-gray transition-colors" aria-label="Edit">
                            <Edit2 size={13} strokeWidth={1.5} />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 text-red-500 transition-colors" aria-label="Delete">
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="heading-display text-3xl mb-6">All Orders</h2>
            <div className="bg-white overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-brand-light-gray">
                    {['Order', 'Customer', 'Product', 'Amount', 'Status', 'Date', 'Action'].map((h) => (
                      <th key={h} className="text-left font-body text-[10px] tracking-[0.15em] uppercase text-brand-slate px-4 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map((order) => (
                    <tr key={order.id} className="border-b border-brand-light-gray last:border-0 hover:bg-brand-cream/50 transition-colors">
                      <td className="px-4 py-3 font-body text-sm font-medium">{order.id}</td>
                      <td className="px-4 py-3 font-body text-sm">{order.customer}</td>
                      <td className="px-4 py-3 font-body text-sm text-brand-slate">{order.product}</td>
                      <td className="px-4 py-3 font-display text-base font-light">{formatPrice(order.amount)}</td>
                      <td className="px-4 py-3">
                        <select
                          defaultValue={order.status}
                          className={`font-body text-[10px] tracking-wide px-2 py-1 border-0 focus:outline-none cursor-pointer ${STATUS_STYLES[order.status]}`}
                        >
                          {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 font-body text-sm text-brand-slate">{order.date}</td>
                      <td className="px-4 py-3">
                        <button className="font-body text-xs text-brand-gold hover:underline">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
