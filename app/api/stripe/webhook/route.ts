import { createHmac, timingSafeEqual } from 'crypto'
import { NextResponse } from 'next/server'

type StripeCheckoutSession = {
  id: string
  customer_details?: {
    email?: string
    name?: string
    phone?: string
  }
  customer_email?: string
  amount_total?: number
  currency?: string
  mode?: string
  payment_status?: string
  metadata?: Record<string, string>
}

type StripeEvent = {
  id: string
  type: string
  data: {
    object: StripeCheckoutSession
  }
}

function parseStripeSignature(signature: string) {
  return signature.split(',').reduce<Record<string, string[]>>((acc, part) => {
    const [key, value] = part.split('=')
    if (!key || !value) return acc
    acc[key] = [...(acc[key] || []), value]
    return acc
  }, {})
}

function verifyStripeSignature(payload: string, signature: string, secret: string) {
  const parsed = parseStripeSignature(signature)
  const timestamp = parsed.t?.[0]
  const signatures = parsed.v1 || []

  if (!timestamp || signatures.length === 0) return false

  const signedPayload = `${timestamp}.${payload}`
  const expected = createHmac('sha256', secret).update(signedPayload).digest('hex')
  const expectedBuffer = Buffer.from(expected)

  return signatures.some((candidate) => {
    const candidateBuffer = Buffer.from(candidate)
    return (
      candidateBuffer.length === expectedBuffer.length &&
      timingSafeEqual(candidateBuffer, expectedBuffer)
    )
  })
}

async function forwardToAutomation(event: StripeEvent) {
  const automationUrl = process.env.MAKE_WEBHOOK_URL || process.env.SYSTEME_WEBHOOK_URL

  if (!automationUrl) {
    return { forwarded: false, reason: 'No automation webhook configured' }
  }

  const session = event.data.object
  const response = await fetch(automationUrl.trim(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventId: event.id,
      eventType: event.type,
      checkoutSessionId: session.id,
      email: session.customer_details?.email || session.customer_email,
      name: session.customer_details?.name || session.metadata?.name,
      phone: session.customer_details?.phone || session.metadata?.phone,
      amountTotal: session.amount_total,
      currency: session.currency,
      mode: session.mode,
      paymentStatus: session.payment_status,
      product: session.metadata?.product,
      plan: session.metadata?.plan,
      objective: session.metadata?.objective,
      level: session.metadata?.level,
      message: session.metadata?.message,
    }),
  })

  return { forwarded: response.ok, status: response.status }
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const signature = request.headers.get('stripe-signature')
  const payload = await request.text()

  if (!webhookSecret || !signature) {
    return NextResponse.json({ error: 'Webhook Stripe non configuré.' }, { status: 400 })
  }

  if (!verifyStripeSignature(payload, signature, webhookSecret)) {
    return NextResponse.json({ error: 'Signature Stripe invalide.' }, { status: 400 })
  }

  const event = JSON.parse(payload) as StripeEvent

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true, ignored: event.type })
  }

  const result = await forwardToAutomation(event)
  return NextResponse.json({ received: true, ...result })
}
