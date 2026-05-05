'use client'

import Link from 'next/link'

const checkoutUrl = '/checkout/consulting'

export default function ConsultingPage() {
  return (
    <>
      <style>{`
        .consulting-hero {
          min-height: 84vh;
          background: #070265;
          color: #FEFEFE;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: center;
          padding: 96px 80px;
          position: relative;
          overflow: hidden;
        }
        .consulting-hero::before {
          content: "CONSULTING";
          position: absolute;
          right: -24px;
          bottom: -28px;
          font-family: var(--font-heading);
          font-size: 250px;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.03);
          pointer-events: none;
        }
        .consulting-breadcrumb {
          display: flex;
          gap: 8px;
          align-items: center;
          color: rgba(255,255,255,0.36);
          font-size: 12px;
          margin-bottom: 28px;
        }
        .consulting-breadcrumb a {
          color: rgba(255,255,255,0.36);
          transition: color 0.2s;
        }
        .consulting-breadcrumb a:hover { color: rgba(255,255,255,0.75); }
        .consulting-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.48);
          margin-bottom: 20px;
        }
        .consulting-title {
          font-family: var(--font-heading);
          font-size: clamp(58px, 7vw, 104px);
          line-height: 0.9;
          letter-spacing: 0.01em;
          margin-bottom: 28px;
        }
        .consulting-title em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px #FEFEFE;
          opacity: 0.58;
        }
        .consulting-hero-copy {
          max-width: 540px;
          font-size: 18px;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.76);
          margin-bottom: 38px;
        }
        .consulting-hero-statement {
          color: #FEFEFE;
          font-weight: 500;
        }
        .consulting-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .c-btn-white,
        .c-btn-ghost,
        .c-btn-navy,
        .c-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          transition: transform 0.2s, background 0.2s, border-color 0.2s;
          text-decoration: none;
        }
        .c-btn-white { background: #FEFEFE; color: #070265; }
        .c-btn-white:hover,
        .c-btn-navy:hover { transform: translateY(-1px); }
        .c-btn-ghost {
          color: rgba(255,255,255,0.86);
          border: 1px solid rgba(255,255,255,0.32);
        }
        .c-btn-ghost:hover { border-color: rgba(255,255,255,0.72); }
        .c-btn-navy { background: #070265; color: #FEFEFE; }
        .c-btn-outline { color: #070265; border: 1px solid #070265; }

        .consulting-price-card {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 12px;
          padding: 40px 36px;
        }
        .consulting-card-label {
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.46);
          margin-bottom: 18px;
        }
        .consulting-price {
          font-family: var(--font-heading);
          font-size: 86px;
          line-height: 1;
        }
        .consulting-price-note {
          color: rgba(255,255,255,0.56);
          font-size: 14px;
          margin-bottom: 26px;
        }
        .consulting-card-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.12);
          margin-bottom: 30px;
        }
        .consulting-card-list li {
          display: flex;
          gap: 10px;
          color: rgba(255,255,255,0.82);
          font-size: 14px;
          line-height: 1.45;
        }
        .c-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.55;
          margin-top: 7px;
          flex-shrink: 0;
        }

        .consulting-section { padding: 96px 80px; }
        .consulting-white { background: #FEFEFE; }
        .consulting-off { background: #F4F3F0; }
        .consulting-navy { background: #070265; color: #FEFEFE; }
        .consulting-inner { max-width: 760px; }
        .consulting-section-ey {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9B9A96;
          margin-bottom: 16px;
        }
        .consulting-h2 {
          font-family: var(--font-heading);
          font-size: clamp(40px, 4.5vw, 64px);
          line-height: 0.95;
          color: #070265;
          letter-spacing: 0.01em;
          margin-bottom: 28px;
        }
        .consulting-h2 em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px #070265;
          opacity: 0.35;
        }
        .consulting-navy .consulting-h2 { color: #FEFEFE; }
        .consulting-navy .consulting-h2 em { -webkit-text-stroke-color: #FEFEFE; }
        .consulting-prose p {
          font-size: 17px;
          font-weight: 300;
          color: #12102e;
          line-height: 1.8;
          margin-bottom: 22px;
        }
        .consulting-bridge {
          color: #070265;
          font-weight: 500;
          font-style: italic;
        }

        .consulting-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          max-width: 920px;
          margin-top: 42px;
        }
        .consulting-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          max-width: 980px;
          margin-top: 42px;
        }
        .consulting-card {
          background: #FEFEFE;
          border: 1px solid #E8E7E3;
          border-radius: 8px;
          padding: 30px;
        }
        .consulting-card.dark {
          background: #070265;
          color: #FEFEFE;
          border-color: #070265;
        }
        .consulting-card h3 {
          color: #070265;
          font-size: 17px;
          margin-bottom: 14px;
        }
        .consulting-card.dark h3 { color: #FEFEFE; }
        .consulting-card p,
        .consulting-card li {
          color: #3D3C38;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.65;
        }
        .consulting-card.dark p,
        .consulting-card.dark li { color: rgba(255,255,255,0.74); }
        .consulting-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .consulting-list li {
          display: flex;
          gap: 10px;
        }

        .consulting-steps {
          max-width: 760px;
          margin-top: 42px;
        }
        .consulting-step {
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 26px;
          padding: 28px 0;
          border-bottom: 1px solid #E8E7E3;
        }
        .consulting-step:last-child { border-bottom: none; }
        .consulting-step-num {
          font-family: var(--font-heading);
          font-size: 44px;
          color: rgba(7,2,101,0.22);
        }
        .consulting-step h3 {
          color: #070265;
          font-size: 16px;
          margin-bottom: 10px;
        }
        .consulting-step p {
          color: #3D3C38;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.65;
        }

        .consulting-final {
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .consulting-final::before {
          content: "97";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-heading);
          font-size: 420px;
          color: rgba(255,255,255,0.04);
          pointer-events: none;
        }
        .consulting-final > * { position: relative; }
        .consulting-final p {
          max-width: 520px;
          margin: 0 auto 36px;
          color: rgba(255,255,255,0.72);
          line-height: 1.65;
          font-weight: 300;
        }

        @media (max-width: 900px) {
          .consulting-hero {
            grid-template-columns: 1fr;
            padding: 72px 28px;
          }
          .consulting-section { padding: 72px 28px; }
          .consulting-grid-2,
          .consulting-grid-3 { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="consulting-hero">
        <div>
          <div className="consulting-breadcrumb">
            <Link href="/">Accueil</Link>
            <span>/</span>
            <span>Consulting</span>
          </div>
          <p className="consulting-eyebrow">Consulting individualisé</p>
          <h1 className="consulting-title">Comprendre<br />pour <em>décider.</em></h1>
          <p className="consulting-hero-copy">
            Consulting individualisé en course à pied et sports d’endurance, destiné aux sportifs qui veulent progresser sans compromettre leur santé ni leur trajectoire.
            <br /><br />
            Que tu sois amateur engagé ou sportif évoluant à haut niveau, le point de départ reste le même :
            <span className="consulting-hero-statement"> arrêter d’improviser et commencer à décider.</span>
          </p>
          <div className="consulting-actions">
            <a className="c-btn-white" href={checkoutUrl}>Réserver mon bilan — 97€</a>
            <a className="c-btn-ghost" href="#details">Voir le déroulé</a>
          </div>
        </div>

        <aside className="consulting-price-card">
          <p className="consulting-card-label">Bilan individualisé</p>
          <div className="consulting-price">97€</div>
          <p className="consulting-price-note">Paiement unique · sans reconduction</p>
          <ul className="consulting-card-list">
            <li><span className="c-dot" />1 heure d’échange individualisé</li>
            <li><span className="c-dot" />Analyse globale de ton contexte</li>
            <li><span className="c-dot" />Lecture entraînement, douleurs, contraintes</li>
            <li><span className="c-dot" />Axes prioritaires et décisions concrètes</li>
            <li><span className="c-dot" />Recommandations de suite</li>
          </ul>
          <a className="c-btn-white" href={checkoutUrl}>Réserver mon bilan</a>
        </aside>
      </section>

      <section className="consulting-section consulting-white">
        <div className="consulting-inner">
          <p className="consulting-section-ey">Le constat</p>
          <h2 className="consulting-h2">Le problème réel des <em>sportifs d’endurance.</em></h2>
          <div className="consulting-prose">
            <p>La majorité des sportifs sérieux font les choses “comme il faut”. Ils s’entraînent régulièrement, respectent des plans, sont encadrés ou bien informés.</p>
            <p>Et pourtant : les douleurs apparaissent, les blessures reviennent, les performances stagnent, et la confiance dans le processus diminue.</p>
            <p>Ce problème touche autant les amateurs engagés que les sportifs de haut niveau. Pas par manque de travail. Mais par <strong>manque de lecture globale</strong>.</p>
          </div>
        </div>
      </section>

      <section className="consulting-section consulting-off">
        <div className="consulting-inner">
          <p className="consulting-section-ey">L’analyse</p>
          <h2 className="consulting-h2">Pourquoi on peut s’entraîner correctement… <em>et se blesser.</em></h2>
          <div className="consulting-prose">
            <p>L’entraînement ne se résume pas à une charge ou à une séance. C’est l’accumulation du stress mécanique, du contexte de vie, de l’historique de blessures, des contraintes externes et des décisions prises semaine après semaine.</p>
            <p>Quand ces éléments ne sont pas lus ensemble, on ajuste trop tard, ou mal. Et le corps finit par signaler ce que la logique n’a pas anticipé.</p>
            <p className="consulting-bridge">Sans cadre clair, on navigue à vue.</p>
          </div>
        </div>
      </section>

      <section className="consulting-section consulting-white">
        <p className="consulting-section-ey">La clarté</p>
        <h2 className="consulting-h2">Ce que ce consulting est, <em>et n’est pas.</em></h2>
        <div className="consulting-grid-2">
          <div className="consulting-card dark">
            <h3>Ce que c’est</h3>
            <ul className="consulting-list">
              <li><span className="c-dot" />Un temps d’analyse stratégique de ton entraînement</li>
              <li><span className="c-dot" />Un regard extérieur, structuré et indépendant</li>
              <li><span className="c-dot" />Un espace pour comprendre ce qui crée réellement la contrainte</li>
              <li><span className="c-dot" />Un cadre pour prendre des décisions plus cohérentes</li>
            </ul>
          </div>
          <div className="consulting-card">
            <h3>Ce que ce n’est pas</h3>
            <ul className="consulting-list">
              <li><span className="c-dot" />Un programme d’entraînement complet</li>
              <li><span className="c-dot" />Un suivi quotidien</li>
              <li><span className="c-dot" />Un diagnostic médical à distance</li>
              <li><span className="c-dot" />Une promesse magique de performance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="consulting-section consulting-off">
        <p className="consulting-section-ey">Le profil</p>
        <h2 className="consulting-h2">À qui s’adresse <em>ce consulting ?</em></h2>
        <div className="consulting-grid-2">
          <div className="consulting-card">
            <h3>Pour toi si…</h3>
            <ul className="consulting-list">
              <li><span className="c-dot" />tu t’entraînes sérieusement mais tu sens qu’il manque une lecture globale</li>
              <li><span className="c-dot" />tu veux comprendre pourquoi une douleur ou une stagnation revient</li>
              <li><span className="c-dot" />tu as besoin d’un avis stratégique avant de modifier ton entraînement</li>
              <li><span className="c-dot" />tu veux repartir avec des décisions claires</li>
            </ul>
          </div>
          <div className="consulting-card">
            <h3>Pas pour toi si…</h3>
            <ul className="consulting-list">
              <li><span className="c-dot" />tu cherches un plan complet sur plusieurs mois</li>
              <li><span className="c-dot" />tu veux être suivi chaque semaine</li>
              <li><span className="c-dot" />tu attends une solution toute faite sans implication</li>
              <li><span className="c-dot" />tu as besoin d’une prise en charge médicale urgente</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="consulting-section consulting-white">
        <p className="consulting-section-ey">La méthode</p>
        <h2 className="consulting-h2">L’approche.</h2>
        <div className="consulting-grid-3">
          <div className="consulting-card">
            <h3>Comprendre avant d’agir</h3>
            <p>On commence par lire le contexte complet, pas seulement la dernière douleur ou la dernière séance ratée.</p>
          </div>
          <div className="consulting-card">
            <h3>Éduquer plutôt que corriger</h3>
            <p>Le but n’est pas de te donner une consigne isolée, mais de te rendre capable de mieux décider.</p>
          </div>
          <div className="consulting-card">
            <h3>Responsabiliser</h3>
            <p>Tu repars avec une lecture plus claire de ton corps, de ta charge et de tes priorités d’entraînement.</p>
          </div>
        </div>
      </section>

      <section className="consulting-section consulting-off" id="details">
        <p className="consulting-section-ey">Le processus</p>
        <h2 className="consulting-h2">Déroulement du <em>consulting.</em></h2>
        <div className="consulting-steps">
          <div className="consulting-step">
            <div className="consulting-step-num">01</div>
            <div>
              <h3>Avant l’appel</h3>
              <p>Tu prépares les informations clés : objectif, historique, douleurs, charge d’entraînement, contraintes, question principale.</p>
            </div>
          </div>
          <div className="consulting-step">
            <div className="consulting-step-num">02</div>
            <div>
              <h3>Pendant l’appel</h3>
              <p>On analyse ton contexte, on relie les éléments entre eux et on identifie ce qui pèse réellement sur ta progression ou ta santé.</p>
            </div>
          </div>
          <div className="consulting-step">
            <div className="consulting-step-num">03</div>
            <div>
              <h3>Après l’appel</h3>
              <p>Tu repars avec une hiérarchie claire : quoi surveiller, quoi modifier, quoi prioriser, et quelle suite logique envisager.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="consulting-section consulting-navy consulting-final">
        <p className="consulting-section-ey">Tarification</p>
        <h2 className="consulting-h2">Un prix. <em>Un cadre clair.</em></h2>
        <p>Un bilan individualisé d’une heure pour arrêter d’interpréter seul, poser une lecture globale, et prendre des décisions plus solides.</p>
        <div className="consulting-actions" style={{ justifyContent: 'center' }}>
          <a className="c-btn-white" href={checkoutUrl}>Réserver mon bilan — 97€</a>
          <Link className="c-btn-ghost" href="/coaching">Voir les coachings</Link>
        </div>
      </section>
    </>
  )
}
