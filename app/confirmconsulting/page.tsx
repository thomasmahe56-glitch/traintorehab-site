import ConfirmationPage from '@/components/ConfirmationPage'
import { PRODUCTS } from '@/app/checkout/products'

export default function ConfirmConsultingPage() {
  return (
    <ConfirmationPage
      product={PRODUCTS.consulting}
      nextSteps={[
        'Tu reçois un email de confirmation du paiement.',
        'Tu réserves ton créneau de bilan individualisé.',
        'Tu prépares ton contexte : objectif, douleurs, entraînement et contraintes.',
      ]}
    />
  )
}
