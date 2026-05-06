'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function CoachingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    // Nav scroll
    const nav = document.querySelector('nav')
    const handleScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    revealEls.forEach(el => revealObs.observe(el))

    // Process steps cascade
    const steps = document.querySelectorAll('.process-step')
    const stepsObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        steps.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 120))
        stepsObs.disconnect()
      }
    }, { threshold: 0.15 })
    if (steps[0]) stepsObs.observe(steps[0])

    // FAQ cascade
    const faqItems = document.querySelectorAll('.faq-item')
    const faqObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        faqItems.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 80))
        faqObs.disconnect()
      }
    }, { threshold: 0.1 })
    if (faqItems[0]) faqObs.observe(faqItems[0])

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const faqs = [
    {
      q: "Est-ce que c'est vraiment différent d'un plan d'entraînement classique ?",
      a: "Un plan classique est figé — il ne sait pas que tu as mal au genou ce mardi, ni que tu as dormi 5h. Le coaching TTR s'adapte à ce que tu vis réellement. Et surtout, tu comprends la logique derrière chaque décision, ce qui te permet de t'ajuster toi-même sur le long terme."
    },
    {
      q: "Je suis déjà suivi par un kiné. Est-ce compatible ?",
      a: "Oui, dans la grande majorité des cas. Le coaching TTR s'intègre à un suivi existant — il ne le remplace pas, il lui donne une cohérence côté entraînement. Si tu as un doute sur ta situation spécifique, on en parle lors de l'appel de clarification."
    },
    {
      q: "Combien de temps faut-il avant de voir des résultats ?",
      a: "La clarté arrive souvent dès les premières semaines — tu sais quoi faire et pourquoi, ce qui réduit le stress lié aux décisions. Les résultats physiques dépendent de ta situation de départ, mais la plupart des personnes vivent un changement significatif dans les 4 à 8 semaines."
    },
    {
      q: "Puis-je changer de formule en cours de suivi ?",
      a: "Oui. Si tu es sur TrainToPerform Autonome et que tu réalises que tu as besoin d'échanges réguliers, tu peux passer à Coaching. Inversement, si tu es prêt à plus d'autonomie, on peut ajuster. Ça se décide ensemble, en cours de suivi."
    },
    {
      q: "Y a-t-il un engagement minimum ?",
      a: "Les formules mensuelles sont sans engagement — tu peux arrêter à tout moment. Cela dit, les résultats durables se construisent sur plusieurs mois. Je recommande de s'engager mentalement sur 3 mois minimum pour que le travail ait du sens."
    }
  ]

  return (
    <>
      <style>{`
        /* HERO */
        .hero-coaching {
          min-height: 80vh;
          background: #070265;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 120px 80px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero-coaching::before {
          content: 'COACHING';
          position: absolute;
          font-family: var(--font-heading);
          font-size: 280px;
          color: rgba(255,255,255,0.025);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          pointer-events: none;
          letter-spacing: 0.05em;
        }
        .hero-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 20px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards 0.2s;
        }
        .hero-title-coaching {
          font-family: var(--font-heading);
          font-size: clamp(56px, 7vw, 100px);
          line-height: 0.9;
          color: #FEFEFE;
          letter-spacing: 0.01em;
          margin-bottom: 28px;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.4s;
        }
        .hero-title-coaching em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px #FEFEFE;
          opacity: 0.55;
        }
        .hero-sub {
          font-size: 18px;
          font-weight: 300;
          color: rgba(255,255,255,0.65);
          max-width: 540px;
          line-height: 1.65;
          margin: 0 auto 56px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards 0.6s;
        }

        /* BIFURCATION */
        .bifurcation {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          max-width: 820px;
          width: 100%;
          margin: 0 auto;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.8s;
        }
        .bifur-card {
          background: #FEFEFE;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s;
          text-decoration: none;
        }
        .bifur-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
        }
        .bifur-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #9B9A96;
        }
        .bifur-title {
          font-family: var(--font-heading);
          font-size: 32px;
          color: #070265;
          letter-spacing: 0.02em;
          line-height: 1;
        }
        .bifur-desc {
          font-size: 14px;
          font-weight: 300;
          color: #3D3C38;
          line-height: 1.6;
          flex: 1;
        }
        .bifur-link {
          font-size: 13px;
          font-weight: 600;
          color: #070265;
          display: flex;
          align-items: center;
          gap: 6px;
          padding-top: 16px;
          border-top: 1px solid #E8E7E3;
          transition: gap 0.2s;
        }
        .bifur-card:hover .bifur-link { gap: 12px; }

        .choice-transition {
          background: #F4F3F0;
          padding: 84px 80px;
          text-align: center;
        }
        .choice-transition p {
          max-width: 620px;
          margin: 0 auto;
          font-size: 18px;
          font-weight: 300;
          color: #3D3C38;
          line-height: 1.7;
        }
        .section-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9B9A96;
          margin-bottom: 16px;
        }
        .section-title {
          font-family: var(--font-heading);
          font-size: clamp(36px, 4vw, 56px);
          line-height: 0.95;
          color: #070265;
          letter-spacing: 0.01em;
          margin-bottom: 24px;
        }
        .section-title em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px #070265;
          opacity: 0.45;
        }
        /* PROCESS */
        .process-section { background: #FEFEFE; padding: 96px 80px; }
        .process-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .process-step {
          display: flex;
          gap: 24px;
          padding: 28px 0;
          border-bottom: 1px solid #E8E7E3;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.5s ease, transform 0.5s ease, padding-left 0.3s ease;
        }
        .process-step:last-child { border-bottom: none; }
        .process-step.visible { opacity: 1; transform: translateX(0); }
        .process-step.visible:hover { padding-left: 8px; }
        .step-num {
          font-family: var(--font-heading);
          font-size: 42px;
          color: #E8E7E3;
          line-height: 1;
          flex-shrink: 0;
          width: 48px;
          transition: color 0.3s;
        }
        .process-step:hover .step-num { color: #070265; }
        .step-title { font-size: 16px; font-weight: 600; color: #070265; margin-bottom: 6px; }
        .step-desc { font-size: 14px; font-weight: 300; color: #3D3C38; line-height: 1.6; }
        .process-visual {
          background: #F4F3F0;
          border-radius: 12px;
          padding: 40px;
          position: sticky;
          top: 88px;
        }
        .timeline { display: flex; flex-direction: column; position: relative; }
        .timeline::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 24px; bottom: 24px;
          width: 1px;
          background: #E8E7E3;
        }
        .timeline-item { display: flex; gap: 20px; align-items: flex-start; padding: 16px 0; }
        .tl-dot {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: #FEFEFE;
          border: 2px solid #E8E7E3;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-heading);
          font-size: 16px;
          color: #070265;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }
        .tl-dot.active { background: #070265; border-color: #070265; color: #FEFEFE; }
        .tl-label { font-size: 12px; font-weight: 500; color: #9B9A96; margin-bottom: 2px; }
        .tl-text { font-size: 14px; color: #3D3C38; line-height: 1.5; }

        /* FAQ */
        .faq-section { background: #070265; padding: 96px 80px; }
        .faq-layout { display: grid; grid-template-columns: 1fr 2fr; gap: 80px; align-items: start; }
        .faq-intro { font-size: 16px; font-weight: 300; color: rgba(255,255,255,0.6); line-height: 1.7; position: sticky; top: 88px; }
        .faq-item {
          border-bottom: 1px solid rgba(255,255,255,0.1);
          overflow: hidden;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .faq-item:first-child { border-top: 1px solid rgba(255,255,255,0.1); }
        .faq-item.visible { opacity: 1; transform: translateY(0); }
        .faq-q {
          width: 100%;
          background: none;
          border: none;
          padding: 24px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 500;
          color: #FEFEFE;
          text-align: left;
        }
        .faq-icon {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s, border-color 0.3s;
          font-size: 16px;
          color: rgba(255,255,255,0.6);
        }
        .faq-item.open .faq-icon { transform: rotate(45deg); border-color: rgba(255,255,255,0.5); }
        .faq-a { max-height: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.22,1,0.36,1); }
        .faq-item.open .faq-a { max-height: 300px; }
        .faq-a-inner { padding-bottom: 24px; font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.6); line-height: 1.7; }

        /* CTA */
        .cta-coaching { background: #F4F3F0; text-align: center; padding: 96px 80px; }
        .cta-title {
          font-family: var(--font-heading);
          font-size: clamp(40px, 5vw, 72px);
          color: #070265;
          line-height: 0.95;
          margin-bottom: 20px;
        }
        .cta-title em { font-style: normal; color: transparent; -webkit-text-stroke: 1.5px #070265; opacity: 0.45; }
        .cta-sub { font-size: 17px; font-weight: 300; color: #9B9A96; max-width: 440px; margin: 0 auto 48px; line-height: 1.6; }
        .btn-navy { background: #070265; color: #FEFEFE; padding: 14px 28px; border-radius: 4px; font-weight: 600; font-size: 14px; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-navy:hover { background: #0a0399; transform: translateY(-1px); }
        .btn-outline-navy { border: 1px solid #070265; color: #070265; padding: 14px 28px; border-radius: 4px; font-size: 14px; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-outline-navy:hover { background: #070265; color: #FEFEFE; }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .reveal-left { opacity: 0; transform: translateX(-36px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .reveal-right { opacity: 0; transform: translateX(36px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .reveal.visible, .reveal-left.visible, .reveal-right.visible { opacity: 1; transform: translate(0); }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.22s; }
        .stagger-3 { transition-delay: 0.34s; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* HERO */}
      <section className="hero-coaching">
        <p className="hero-eyebrow">Coaching course à pied · En ligne</p>
        <h1 className="hero-title-coaching">
          Un cadre.<br />
          <em>Pas</em> un plan.
        </h1>
        <p className="hero-sub">
          Tu es blessé et tu veux reprendre. Ou tu cours déjà et tu veux progresser. Dans les deux cas, il te faut un cadre clair — pas un protocole de plus à suivre aveuglément.
        </p>

        <div className="bifurcation">
          <Link href="/coaching/restart" className="bifur-card">
            <p className="bifur-label">Blessure &amp; douleur</p>
            <h2 className="bifur-title">TrainToRestart</h2>
            <p className="bifur-desc">Tu as des douleurs ou tu veux reprendre la course en toute sécurité. On reprend avec méthode, pas au hasard.</p>
            <span className="bifur-link">Découvrir l&apos;offre →</span>
          </Link>
          <Link href="/coaching/perform" className="bifur-card">
            <p className="bifur-label">Performance</p>
            <h2 className="bifur-title">TrainToPerform</h2>
            <p className="bifur-desc">Tu cours sans douleur et tu cherches à aller plus loin, plus vite. Avec ou sans accompagnement direct.</p>
            <span className="bifur-link">Découvrir les offres →</span>
          </Link>
        </div>
      </section>

      <section className="choice-transition">
        <p>
          L&apos;objectif ici est simple : t&apos;orienter vers le bon parcours. Si tu viens pour une douleur ou une reprise, commence par TrainToRestart. Si tu viens pour progresser, va vers TrainToPerform.
        </p>
      </section>

      {/* PROCESS */}
      <section className="process-section">
        <div className="process-layout">
          <div>
            <div className="reveal-left">
              <p className="section-eyebrow">Comment ça se passe</p>
              <h2 className="section-title">Le process,<br /><em>étape</em> par étape</h2>
              <p style={{ fontSize: '16px', fontWeight: 300, color: '#3D3C38', lineHeight: 1.7, marginBottom: '40px' }}>
                Pas de formulaire d&apos;inscription immédiate. On commence toujours par comprendre ta situation avant de te proposer quoi que ce soit.
              </p>
            </div>
            <div>
              {[
                { num: '01', title: 'Appel de clarification — 15 min', desc: "On fait le point sur ta situation. Je t'oriente vers l'offre la plus adaptée, ou je te dis honnêtement que ce n'est pas le bon moment." },
                { num: '02', title: 'Bilan initial structuré', desc: "Analyse de ton historique, tests ciblés (mobilité, force, tolérance à l'effort) et compréhension de ton contexte réel. Tu sais où tu en es." },
                { num: '03', title: 'Plan personnalisé & évolutif', desc: "Un fil conducteur clair adapté à toi — pas à une pathologie. Chaque étape a un pourquoi. Le plan s'ajuste selon tes retours." },
                { num: '04', title: 'Montée en autonomie', desc: "Tu apprends à lire les signaux de ton corps et à ajuster intelligemment. L'objectif : ne plus dépendre d'un accompagnement permanent." },
              ].map((step) => (
                <div key={step.num} className="process-step">
                  <span className="step-num">{step.num}</span>
                  <div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-right">
            <div className="process-visual">
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9B9A96', marginBottom: '28px' }}>
                Exemple de parcours — 3 mois
              </p>
              <div className="timeline">
                {[
                  { n: '1', label: 'Semaine 1', text: "Appel + bilan structuré. Tu comprends ton point de départ.", active: true },
                  { n: '2', label: 'Semaines 2–4', text: "Premiers blocs d'entraînement. Ajustements continus via WhatsApp.", active: true },
                  { n: '3', label: 'Mois 2', text: "Progression structurée. Tu commences à piloter toi-même.", active: true },
                  { n: '4', label: 'Mois 3', text: "Autonomie réelle. Tu sais quoi faire, pourquoi, et comment ajuster.", active: false },
                ].map((item) => (
                  <div key={item.n} className="timeline-item">
                    <div className={`tl-dot${item.active ? ' active' : ''}`}>{item.n}</div>
                    <div>
                      <p className="tl-label">{item.label}</p>
                      <p className="tl-text">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="faq-layout">
          <div>
            <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.4)' }}>Questions fréquentes</p>
            <h2 className="section-title" style={{ color: '#FEFEFE', marginBottom: '24px' }}>Les <em style={{ WebkitTextStrokeColor: '#FEFEFE' }}>vraies</em> questions</h2>
            <p className="faq-intro">
              Ce sont les questions que je reçois le plus souvent avant un premier appel. Si la tienne n&apos;est pas là, on en parle directement.
            </p>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-a">
                  <p className="faq-a-inner">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-coaching">
        <div className="reveal">
          <p className="section-eyebrow">Prochaine étape</p>
          <h2 className="cta-title">Pas sûr de<br />l&apos;option <em>la plus adaptée</em> ?</h2>
          <p className="cta-sub">Réserve un appel de 15 min. Je t&apos;oriente honnêtement — ou je te dis que ce n&apos;est pas le bon moment.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://calendly.com/traintorehab/traintorehab-thomas-mahe" className="btn-navy">Réserver l&apos;appel gratuit</a>
            <Link href="/coaching" className="btn-outline-navy">Voir toutes les offres</Link>
          </div>
        </div>
      </section>
    </>
  )
}
