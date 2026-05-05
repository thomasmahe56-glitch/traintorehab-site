import ConfirmationPage from '@/components/ConfirmationPage'
import { PRODUCTS } from '@/app/checkout/products'

export default function ConfirmCoachingPage() {
  return (
    <ConfirmationPage
      product={PRODUCTS['perform-coaching']}
      nextSteps={[
        'Tu reçois la confirmation et les consignes de démarrage.',
        'Tu partages ton profil, ton historique et ton objectif.',
        'On lance le coaching avec un premier cadre de planification.',
      ]}
    />
  )
}
