'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Product, ProductKey } from '../products'

interface Props {
  product: Product
  productKey: ProductKey
}

export default function CheckoutForm({ product }: Props) {
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Stripe Payment Intent + confirmation — à brancher à l'étape 2
    setTimeout(() => setLoading(false), 1200)
  }

  return (
    <>
      <style>{`
        .co-checkout {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);
          min-height: calc(100vh - var(--nav-height));
          align-items: start;
        }

        /* ── Formulaire (gauche) ── */
        .co-main {
          background: var(--color-white);
          padding: 64px 80px 96px;
        }

        .co-breadcrumb {
          display: flex;
          gap: 8px;
          align-items: center;
          color: var(--color-gray-mid);
          font-size: 12px;
          margin-bottom: 32px;
        }
        .co-breadcrumb a {
          color: var(--color-gray-mid);
          text-decoration: none;
          transition: color 0.2s;
        }
        .co-breadcrumb a:hover { color: var(--color-gray-dark); }
        .co-breadcrumb span { color: var(--color-gray-light); }

        .co-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-gray-mid);
          margin-bottom: 16px;
        }

        .co-h1 {
          font-family: var(--font-heading);
          font-size: clamp(52px, 6.5vw, 88px);
          line-height: 0.92;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--color-navy);
          margin-bottom: 24px;
        }
        .co-h1 em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px var(--color-navy);
          opacity: 0.4;
        }

        .co-intro {
          max-width: 560px;
          font-size: 16px;
          font-weight: 300;
          line-height: 1.75;
          color: var(--color-gray-dark);
          margin-bottom: 40px;
        }
        .co-intro strong {
          font-weight: 500;
          color: var(--color-navy);
        }

        /* Form layout */
        .co-form {
          max-width: 680px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .co-section {
          border-top: 1px solid var(--color-gray-light);
          padding-top: 28px;
        }

        .co-section-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-navy);
          margin-bottom: 20px;
        }

        .co-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .co-label {
          display: flex;
          flex-direction: column;
          gap: 7px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-gray-dark);
        }

        .co-input,
        .co-select,
        .co-textarea {
          border: 1px solid var(--color-gray-light);
          border-radius: 6px;
          background: var(--color-off-white);
          padding: 13px 14px;
          font-family: var(--font-body);
          font-size: 14px;
          color: #12102e;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          width: 100%;
        }
        .co-input:focus,
        .co-select:focus,
        .co-textarea:focus {
          border-color: var(--color-navy);
          background: var(--color-white);
        }
        .co-textarea {
          min-height: 100px;
          resize: vertical;
          line-height: 1.6;
        }
        .co-full { grid-column: 1 / -1; }

        /* Payment box */
        .co-payment-box {
          border: 1px solid rgba(7,2,101,0.18);
          border-radius: 8px;
          background: var(--color-off-white);
          padding: 22px;
          display: grid;
          gap: 16px;
        }

        .co-card-row {
          display: grid;
          grid-template-columns: 1.5fr 0.7fr 0.7fr;
          gap: 12px;
        }

        .co-stripe-note {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 14px;
          background: rgba(7,2,101,0.04);
          border-radius: 6px;
          border: 1px solid rgba(7,2,101,0.08);
        }
        .co-lock {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--color-navy);
          color: var(--color-white);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 11px;
        }
        .co-stripe-note p {
          font-size: 12px;
          line-height: 1.6;
          color: var(--color-gray-mid);
        }
        .co-stripe-note strong {
          color: var(--color-navy);
          font-weight: 600;
        }

        /* Submit */
        .co-submit-row {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
          padding-top: 8px;
        }

        .co-btn-submit {
          border: 0;
          background: var(--color-navy);
          color: var(--color-white);
          border-radius: var(--radius-btn);
          padding: 16px 32px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s, opacity 0.2s;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .co-btn-submit:hover:not(:disabled) {
          background: var(--color-navy-deep);
          transform: translateY(-1px);
        }
        .co-btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .co-submit-note {
          font-size: 12px;
          color: var(--color-gray-mid);
          line-height: 1.5;
          max-width: 320px;
        }

        /* ── Résumé (droite, navy) ── */
        .co-summary {
          background: var(--color-navy);
          color: var(--color-white);
          padding: 64px 56px;
          position: sticky;
          top: var(--nav-height);
          height: calc(100vh - var(--nav-height));
          overflow-x: hidden;
          overflow-y: auto;
        }
        .co-summary::before {
          content: "TTR";
          position: absolute;
          right: -16px;
          bottom: -48px;
          font-family: var(--font-heading);
          font-size: 320px;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.04);
          pointer-events: none;
          line-height: 1;
        }

        .co-side { position: relative; z-index: 1; }

        .co-side-badge {
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 14px;
        }

        .co-side-name {
          font-family: var(--font-heading);
          font-size: 46px;
          line-height: 1;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .co-side-desc {
          font-size: 14px;
          line-height: 1.65;
          font-weight: 300;
          color: rgba(255,255,255,0.68);
          margin-bottom: 24px;
        }

        .co-price-row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          padding: 22px 0;
          border-top: 1px solid rgba(255,255,255,0.12);
          border-bottom: 1px solid rgba(255,255,255,0.12);
          margin-bottom: 24px;
        }
        .co-amount {
          font-family: var(--font-heading);
          font-size: 76px;
          line-height: 1;
        }
        .co-currency {
          font-family: var(--font-heading);
          font-size: 32px;
          line-height: 1;
          opacity: 0.85;
        }
        .co-period {
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.48);
          margin-left: 6px;
        }

        .co-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 11px;
          margin-bottom: 24px;
        }
        .co-features li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.8);
          line-height: 1.45;
        }
        .co-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.42;
          margin-top: 5px;
          flex-shrink: 0;
        }

        .co-total-box {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 16px 18px;
          margin-bottom: 14px;
        }
        .co-total-label {
          display: block;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.36);
          margin-bottom: 6px;
        }
        .co-total-value {
          font-size: 15px;
          font-weight: 600;
        }

        .co-notice {
          font-size: 11px;
          color: rgba(255,255,255,0.38);
          line-height: 1.65;
        }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .co-checkout { grid-template-columns: 1fr; }
          .co-summary {
            position: static;
            height: auto;
            overflow: visible;
            padding: 48px 28px 40px;
          }
          .co-main { padding: 48px 28px 72px; }
        }

        @media (max-width: 640px) {
          .co-grid { grid-template-columns: 1fr; }
          .co-card-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="co-checkout">

        {/* ── Formulaire ── */}
        <section className="co-main">
          <div className="co-breadcrumb">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <Link href={product.parent.href}>{product.parent.label}</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-gray-dark)' }}>Checkout</span>
          </div>

          <p className="co-eyebrow">TrainToRehab · Paiement sécurisé</p>

          <h1 className="co-h1">
            Finaliser<br />
            <em>l&apos;inscription.</em>
          </h1>

          <p className="co-intro">
            Renseigne tes informations ci-dessous pour finaliser ton inscription à{' '}
            <strong>{product.name}</strong>.{' '}
            Tu recevras une confirmation par email avec les prochaines étapes.
          </p>

          <form className="co-form" onSubmit={handleSubmit}>

            {/* Infos personnelles */}
            <section className="co-section">
              <h2 className="co-section-title">Informations personnelles</h2>
              <div className="co-grid">
                <label className="co-label">
                  Prénom
                  <input className="co-input" type="text" autoComplete="given-name" placeholder="Thomas" required />
                </label>
                <label className="co-label">
                  Nom
                  <input className="co-input" type="text" autoComplete="family-name" placeholder="Mahé" required />
                </label>
                <label className="co-label">
                  Email
                  <input className="co-input" type="email" autoComplete="email" placeholder="email@exemple.com" required />
                </label>
                <label className="co-label">
                  Téléphone
                  <input className="co-input" type="tel" autoComplete="tel" placeholder="+33 6 00 00 00 00" />
                </label>
              </div>
            </section>

            {/* Contexte sportif */}
            <section className="co-section">
              <h2 className="co-section-title">Contexte sportif</h2>
              <div className="co-grid">
                <label className="co-label">
                  Objectif principal
                  <select className="co-select" defaultValue="blessure">
                    <option value="blessure">Reprendre après blessure</option>
                    <option value="course">Préparer une course</option>
                    <option value="douleur">Comprendre une douleur / stagnation</option>
                    <option value="suivi">Être accompagné sur la durée</option>
                  </select>
                </label>
                <label className="co-label">
                  Niveau actuel
                  <select className="co-select" defaultValue="regulier">
                    <option value="debutant">Débutant (moins d&apos;un an de course)</option>
                    <option value="regulier">Régulier (1 à 3 ans)</option>
                    <option value="confirme">Confirmé (3 ans et plus)</option>
                    <option value="competition">Compétition / haut niveau</option>
                  </select>
                </label>
                <label className="co-label co-full">
                  Message pour préparer la suite
                  <textarea
                    className="co-textarea"
                    placeholder="Objectif, échéance, douleurs actuelles, volume hebdomadaire, contraintes de planning..."
                  />
                </label>
              </div>
            </section>

            {/* Paiement */}
            <section className="co-section">
              <h2 className="co-section-title">Paiement sécurisé</h2>
              <div className="co-payment-box">
                <div className="co-card-row">
                  <label className="co-label">
                    Numéro de carte
                    <input className="co-input" type="text" inputMode="numeric" placeholder="4242 4242 4242 4242" />
                  </label>
                  <label className="co-label">
                    Expiration
                    <input className="co-input" type="text" inputMode="numeric" placeholder="MM / AA" />
                  </label>
                  <label className="co-label">
                    CVC
                    <input className="co-input" type="text" inputMode="numeric" placeholder="123" />
                  </label>
                </div>
                <div className="co-stripe-note">
                  <span className="co-lock">✓</span>
                  <p>
                    <strong>Maquette visuelle.</strong> Dans la version finale, ces champs seront remplacés par{' '}
                    Stripe Elements — les données bancaires ne toucheront jamais les serveurs TrainToRehab.
                  </p>
                </div>
              </div>
            </section>

            <div className="co-submit-row">
              <button className="co-btn-submit" type="submit" disabled={loading}>
                {loading ? 'Traitement…' : product.buttonLabel}
              </button>
              <p className="co-submit-note">{product.notice}</p>
            </div>

          </form>
        </section>

        {/* ── Résumé produit ── */}
        <aside className="co-summary">
          <div className="co-side">
            <p className="co-side-badge">{product.badge}</p>
            <h2 className="co-side-name">{product.name}</h2>
            <p className="co-side-desc">{product.desc}</p>

            <div className="co-price-row">
              <span className="co-amount">{product.priceNum}</span>
              <span className="co-currency">€</span>
              <span className="co-period">{product.period}</span>
            </div>

            <ul className="co-features">
              {product.features.map((f) => (
                <li key={f}>
                  <span className="co-dot" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="co-total-box">
              <span className="co-total-label">Total</span>
              <strong className="co-total-value">{product.total}</strong>
            </div>

            <p className="co-notice">{product.notice}</p>
          </div>
        </aside>

      </div>
    </>
  )
}
