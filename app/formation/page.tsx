'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function FormationPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    if (!email || !email.includes('@')) {
      setError(true)
      return
    }
    setSubmitted(true)
  }

  return (
    <>
      <style>{`
        .formation-body {
          background: #070265;
          color: #FEFEFE;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* NAV spécifique formation, fond navy */
        .formation-nav {
          padding: 24px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .formation-logo {
          font-family: var(--font-heading);
          font-size: 22px;
          letter-spacing: 0.05em;
          color: #FEFEFE;
          text-decoration: none;
          opacity: 0.9;
        }
        .formation-back {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.2s;
        }
        .formation-back:hover { color: rgba(255,255,255,0.8); }

        /* MAIN */
        .formation-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .formation-main::before {
          content: 'BIENTÔT';
          position: absolute;
          font-family: var(--font-heading);
          font-size: 320px;
          color: rgba(255,255,255,0.025);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          pointer-events: none;
          letter-spacing: 0.05em;
        }

        .f-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 24px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards 0.2s;
        }
        .f-title {
          font-family: var(--font-heading);
          font-size: clamp(56px, 8vw, 112px);
          line-height: 0.9;
          color: #FEFEFE;
          letter-spacing: 0.01em;
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.4s;
        }
        .f-title em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px #FEFEFE;
          opacity: 0.5;
        }
        .f-subtitle {
          font-size: 18px;
          font-weight: 300;
          color: rgba(255,255,255,0.6);
          max-width: 520px;
          line-height: 1.65;
          margin-bottom: 56px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards 0.6s;
        }
        .f-subtitle strong { color: #FEFEFE; font-weight: 500; }

        /* FORM */
        .form-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 440px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards 0.8s;
        }
        .form-row {
          display: flex;
          width: 100%;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.2);
          transition: border-color 0.2s;
        }
        .form-row:focus-within { border-color: rgba(255,255,255,0.5); }
        .form-row.error { border-color: rgba(230,57,70,0.6); }
        .form-row input {
          flex: 1;
          background: rgba(255,255,255,0.07);
          border: none;
          outline: none;
          padding: 14px 20px;
          font-family: var(--font-body);
          font-size: 14px;
          color: #FEFEFE;
        }
        .form-row input::placeholder { color: rgba(255,255,255,0.35); }
        .form-row button {
          background: #FEFEFE;
          color: #070265;
          border: none;
          padding: 14px 24px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .form-row button:hover { background: #F4F3F0; }
        .form-note { font-size: 12px; color: rgba(255,255,255,0.3); line-height: 1.5; }

        /* SUCCESS */
        .success-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          animation: fadeUp 0.5s ease forwards;
        }
        .success-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
        }
        .success-text { font-size: 16px; font-weight: 300; color: rgba(255,255,255,0.7); }

        /* TAGS */
        .tags {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 48px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards 1s;
        }
        .tag {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          padding: 6px 14px;
        }

        /* FOOTER formation */
        .formation-footer {
          padding: 24px 48px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .f-footer-copy { font-size: 12px; color: rgba(255,255,255,0.2); }
        .f-footer-links { display: flex; gap: 24px; list-style: none; }
        .f-footer-links a { font-size: 12px; color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.2s; }
        .f-footer-links a:hover { color: rgba(255,255,255,0.6); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="formation-body">
        {/* NAV formation, remplace le layout global */}
        <nav className="formation-nav">
          <Link href="/" className="formation-logo">TrainToRehab</Link>
          <Link href="/" className="formation-back">← Retour à l&apos;accueil</Link>
        </nav>

        <main className="formation-main">
          <p className="f-eyebrow">Formation · Kinésithérapeutes</p>
          <h1 className="f-title">
            En cours<br />
            de <em>création</em>
          </h1>
          <p className="f-subtitle">
            Une formation pour les kinés qui veulent <strong>spécialiser leur pratique dans la course à pied</strong>.<br />
            Laisse ton email pour être notifié à l&apos;ouverture.
          </p>

          {!submitted ? (
            <div className="form-wrap">
              <div className={`form-row${error ? ' error' : ''}`}>
                <input
                  type="email"
                  placeholder="ton@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(false) }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button onClick={handleSubmit}>Me prévenir</button>
              </div>
              <p className="form-note">Aucun spam. Un seul email quand la formation ouvre.</p>
            </div>
          ) : (
            <div className="success-wrap">
              <div className="success-icon">✓</div>
              <p className="success-text">C&apos;est noté. Tu seras le premier informé.</p>
            </div>
          )}

          <div className="tags">
            {['Coureur blessé', 'Biomécanique', 'Réhabilitation', 'Coaching en ligne', 'Performance durable'].map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </main>

        <footer className="formation-footer">
          <span className="f-footer-copy">© {new Date().getFullYear()} TrainToRehab</span>
          <ul className="f-footer-links">
            <li><a href="https://instagram.com/traintorehab" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><Link href="/mentions-legales">Mentions légales</Link></li>
          </ul>
        </footer>
      </div>
    </>
  )
}
