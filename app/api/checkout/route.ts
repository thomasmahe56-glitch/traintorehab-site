import { NextResponse } from 'next/server'
import { PRODUCTS, type ProductKey } from '@/app/checkout/products'

type CheckoutRequest = {
  productKey?: string
  planId?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  objective?: string
  level?: string
  message?: string
}

function getBaseUrl(request: Request) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '')
  const fallbackUrl = new URL(request.url).origin
  return configuredUrl || fallbackUrl
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Stripe n’est pas encore configuré côté serveur.' },
      { status: 500 }
    )
  }

  const body = (await request.json()) as CheckoutRequest
  const product = PRODUCTS[body.productKey as ProductKey]
  const plan = product?.plans.find((item) => item.id === body.planId)

  if (!product || !plan) {
    return NextResponse.json({ error: 'Offre Stripe introuvable.' }, { status: 400 })
  }

  const priceId = process.env[plan.stripePriceEnv]
  if (!priceId) {
    return NextResponse.json(
      { error: `Price ID manquant : ${plan.stripePriceEnv}` },
      { status: 500 }
    )
  }

  const baseUrl = getBaseUrl(request)
  const fullName = [body.firstName, body.lastName].filter(Boolean).join(' ').trim()
  const params = new URLSearchParams()

  params.set('mode', plan.mode)
  params.set('success_url', `${baseUrl}${product.confirmationPath}?session_id={CHECKOUT_SESSION_ID}`)
  params.set('cancel_url', `${baseUrl}/checkout/${body.productKey}`)
  params.set('line_items[0][price]', priceId)
  params.set('line_items[0][quantity]', '1')
  params.set('allow_promotion_codes', 'true')
  params.set('billing_address_collection', 'auto')
  params.set('customer_email', body.email || '')
  params.set('metadata[product]', body.productKey || '')
  params.set('metadata[plan]', body.planId || '')
  params.set('metadata[name]', fullName)
  params.set('metadata[phone]', body.phone || '')
  params.set('metadata[objective]', body.objective || '')
  params.set('metadata[level]', body.level || '')
  params.set('metadata[message]', body.message?.slice(0, 480) || '')

  const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })

  const session = await stripeResponse.json()

  if (!stripeResponse.ok || !session.url) {
    return NextResponse.json(
      { error: session.error?.message || 'Impossible de créer la session Stripe.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ url: session.url })
}
