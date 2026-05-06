import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import CheckoutForm from './CheckoutForm'
import { PRODUCTS, type ProductKey } from '../products'

export function generateStaticParams() {
  return Object.keys(PRODUCTS).map((product) => ({ product }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>
}): Promise<Metadata> {
  const { product } = await params
  const data = PRODUCTS[product as ProductKey]
  if (!data) return {}
  return {
    title: `Checkout, ${data.name}`,
    description: data.desc,
  }
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ product: string }>
}) {
  const { product } = await params
  const data = PRODUCTS[product as ProductKey]
  if (!data) notFound()

  return <CheckoutForm product={data} productKey={product as ProductKey} />
}
