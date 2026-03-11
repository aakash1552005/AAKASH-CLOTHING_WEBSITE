import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const email = searchParams.get('email')

  if (!id || !email) {
    return NextResponse.json({ error: 'Missing order ID or email' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('orders')
    .select('id, status, total, created_at, customer_email')
    .eq('id', id)
    .eq('customer_email', email)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}