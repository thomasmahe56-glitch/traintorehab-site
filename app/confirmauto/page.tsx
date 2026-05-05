import ConfirmationPage from '@/components/ConfirmationPage'
import { PRODUCTS } from '@/app/checkout/products'

export default function ConfirmAutoPage() {
  return (
    <ConfirmationPage
      product={PRODUCTS['perform-autonome']}
      nextSteps={[
        'Tu reçois la confirmation de ton inscription par email.',
        'Tu complètes ton profil sportif, ton objectif et tes contraintes.',
        'Ton plan TrainToPerform Autonome est préparé puis envoyé.',
      ]}
    />
  )
}
