import ConfirmationPage from '@/components/ConfirmationPage'
import { PRODUCTS } from '@/app/checkout/products'

export default function ConfirmRestartPage() {
  return (
    <ConfirmationPage
      product={PRODUCTS.restart}
      nextSteps={[
        'Tu reçois un email de confirmation avec le récapitulatif.',
        'Tu remplis les informations de départ pour préparer ton bilan.',
        'Thomas revient vers toi pour lancer le cadre de reprise.',
      ]}
    />
  )
}
