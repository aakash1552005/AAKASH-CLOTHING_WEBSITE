import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { CartItem } from '@/types'

export async function POST(req: NextRequest) {
  const { items, shipping_address } = await req.json()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  try {
    const line_items = (items as CartItem[]).map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.product.name,
          images: [item.product.images[0]],
          description: `Size: ${item.size} | Colour: ${item.color}`,
        },
        unit_amount: item.product.price * 100, // Stripe uses paise
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: shipping_address.email,
      shipping_address_collection: { allowed_countries: ['IN'] },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart`,
      metadata: {
        customer_name: shipping_address.name,
        customer_phone: shipping_address.phone,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
