import Link from 'next/link'
import type { Product } from '@/app/checkout/products'

type ConfirmationPageProps = {
  product: Product
  nextSteps: string[]
  primaryAction?: {
    label: string
    href: string
  }
}

export default function ConfirmationPage({ product, nextSteps, primaryAction }: ConfirmationPageProps) {
  return (
    <>
      <style>{`
        .confirm-wrap {
          min-height: calc(100vh - var(--nav-height));
          background: var(--color-navy);
          color: var(--color-white);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(340px, 0.78fr);
          position: relative;
          overflow: hidden;
        }
        .confirm-wrap::before {
          content: "MERCI";
          position: absolute;
          right: -18px;
          bottom: -34px;
          font-family: var(--font-heading);
          font-size: 300px;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.035);
          pointer-events: none;
        }
        .confirm-main {
          padding: 92px 80px 96px;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .confirm-side {
          background: var(--color-white);
          color: var(--color-gray-dark);
          padding: 72px 56px;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .confirm-breadcrumb {
          display: flex;
          gap: 8px;
          align-items: center;
          color: rgba(255,255,255,0.36);
          font-size: 12px;
          margin-bottom: 34px;
        }
        .confirm-breadcrumb a {
          color: rgba(255,255,255,0.36);
          text-decoration: none;
        }
        .confirm-check {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--color-white);
          color: var(--color-navy);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 28px;
        }
        .confirm-ey {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.48);
          margin-bottom: 18px;
        }
        .confirm-title {
          font-family: var(--font-heading);
          font-size: clamp(56px, 7vw, 102px);
          line-height: 0.9;
          letter-spacing: 0.01em;
          margin-bottom: 28px;
          max-width: 760px;
        }
        .confirm-title em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px var(--color-white);
          opacity: 0.58;
        }
        .confirm-copy {
          max-width: 570px;
          color: rgba(255,255,255,0.74);
          font-size: 18px;
          font-weight: 300;
          line-height: 1.7;
          margin-bottom: 38px;
        }
        .confirm-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .confirm-btn-white,
        .confirm-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-btn);
          padding: 14px 28px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s, background 0.2s, border-color 0.2s, color 0.2s;
        }
        .confirm-btn-white {
          background: var(--color-white);
          color: var(--color-navy);
        }
        .confirm-btn-white:hover {
          background: var(--color-off-white);
          transform: translateY(-1px);
        }
        .confirm-btn-ghost {
          border: 1px solid rgba(255,255,255,0.32);
          color: rgba(255,255,255,0.86);
        }
        .confirm-btn-ghost:hover {
          border-color: rgba(255,255,255,0.72);
          color: var(--color-white);
        }
        .confirm-card-label {
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-gray-mid);
          margin-bottom: 14px;
        }
        .confirm-card-title {
          font-family: var(--font-heading);
          font-size: 44px;
          line-height: 1;
          color: var(--color-navy);
          letter-spacing: 0.02em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .confirm-card-copy {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.65;
          margin-bottom: 28px;
        }
        .confirm-steps {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
          border-top: 1px solid var(--color-gray-light);
          padding-top: 26px;
        }
        .confirm-steps li {
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 12px;
          align-items: start;
          font-size: 14px;
          line-height: 1.55;
        }
        .confirm-step-num {
          font-family: var(--font-heading);
          font-size: 28px;
          line-height: 1;
          color: rgba(7,2,101,0.24);
        }
        .confirm-note {
          margin-top: 28px;
          background: var(--color-off-white);
          border: 1px solid var(--color-gray-light);
          border-radius: 8px;
          padding: 18px;
          color: var(--color-gray-dark);
          font-size: 13px;
          font-weight: 300;
          line-height: 1.55;
        }
        .confirm-note strong {
          color: var(--color-navy);
          font-weight: 700;
        }
        @media (max-width: 980px) {
          .confirm-wrap { grid-template-columns: 1fr; }
          .confirm-main { padding: 72px 28px; }
          .confirm-side { padding: 48px 28px 64px; }
        }
      `}</style>

      <main className="confirm-wrap">
        <section className="confirm-main">
          <div className="confirm-breadcrumb">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <Link href={product.parent.href}>{product.parent.label}</Link>
            <span>/</span>
            <span>Confirmation</span>
          </div>

          <div className="confirm-check">✓</div>
          <p className="confirm-ey">Paiement confirmé</p>
          <h1 className="confirm-title">Inscription<br /><em>validée.</em></h1>
          <p className="confirm-copy">
            Merci pour ta confiance. Ton inscription à <strong>{product.name}</strong> est prise en compte. Tu vas recevoir un email de confirmation avec les prochaines étapes.
          </p>
          <div className="confirm-actions">
            {primaryAction ? (
              <a className="confirm-btn-white" href={primaryAction.href}>{primaryAction.label}</a>
            ) : null}
            <Link className="confirm-btn-ghost" href="/">Retour à l’accueil</Link>
          </div>
        </section>

        <aside className="confirm-side">
          <p className="confirm-card-label">{product.badge}</p>
          <h2 className="confirm-card-title">{product.name}</h2>
          <p className="confirm-card-copy">{product.desc}</p>
          <ul className="confirm-steps">
            {nextSteps.map((step, index) => (
              <li key={step}>
                <span className="confirm-step-num">{String(index + 1).padStart(2, '0')}</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
          <p className="confirm-note">
            <strong>À vérifier :</strong> si tu ne vois pas l’email dans quelques minutes, regarde les spams ou promotions.
          </p>
        </aside>
      </main>
    </>
  )
}
