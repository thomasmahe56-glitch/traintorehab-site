'use client'

import Link from 'next/link'
import { useEffect } from 'react'

const coachingCheckoutUrl = '/checkout/perform-coaching'
const autonomeCheckoutUrl = '/checkout/perform-autonome'

const plans = [
  {
    id: 'coaching',
    label: 'Performance accompagnée',
    name: 'TrainToPerform Coaching',
    price: '199',
    period: '€ / mois',
    description:
      'Tu veux un plan vivant, ajusté selon tes retours, avec un contact direct coach pour rester cohérent semaine après semaine.',
    features: [
      'Planification évolutive mensuelle',
      'Ajustements selon tes retours',
      'Contact direct coach sur WhatsApp',
      'Feedbacks fréquents',
      'Pédagogie derrière chaque séance',
    ],
    cta: 'Rejoindre le coaching',
    href: coachingCheckoutUrl,
    detailHref: '/coaching/perform-coaching',
    featured: true,
  },
  {
    id: 'autonome',
    label: 'Performance autonome',
    name: 'TrainToPerform Autonome',
    price: '89',
    period: '€ / mois',
    description:
      'Tu veux une structure claire sur un mois, sans contact coach, avec assez d’explications pour t’entraîner seul sans bricoler.',
    features: [
      'Plan structuré sur 4 semaines',
      'Volume et intensités adaptés',
      'Logique expliquée pour chaque séance',
      'Repères d’allure, RPE et récupération',
      'Pas d’ajustements en cours',
    ],
    cta: 'Démarrer en autonome',
    href: autonomeCheckoutUrl,
    detailHref: '/coaching/perform-autonome',
    featured: false,
  },
]

const comparison = [
  {
    title: 'Choisis Autonome si',
    points: [
      'tu sais t’organiser seul',
      'tu veux surtout une structure fiable',
      'tu n’as pas besoin de retours chaque semaine',
      'tu veux maîtriser ton budget',
    ],
  },
  {
    title: 'Choisis Coaching si',
    points: [
      'tes semaines changent souvent',
      'tu veux des ajustements selon tes sensations',
      'tu as besoin d’un regard extérieur',
      'tu veux une vraie relation de coaching',
    ],
  },
]

export default function PerformPage() {
  useEffect(() => {
    const nav = document.querySelector('nav')
    const handleScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    const revealEls = document.querySelectorAll('.reveal, .reveal-left')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    revealEls.forEach((el) => obs.observe(el))

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        .perform-hero { min-height: 78vh; background: #070265; color: #FEFEFE; display: flex; flex-direction: column; justify-content: center; padding: 96px 80px 84px; position: relative; overflow: hidden; }
        .perform-hero::before { content: 'PERFORM'; position: absolute; right: -20px; bottom: -30px; font-family: var(--font-heading); font-size: 270px; color: rgba(255,255,255,0.025); letter-spacing: 0.05em; pointer-events: none; }
        .perform-breadcrumb { display: flex; gap: 8px; align-items: center; font-size: 12px; color: rgba(255,255,255,0.35); margin-bottom: 30px; opacity: 0; animation: fadeUp 0.5s ease forwards 0.1s; }
        .perform-breadcrumb a { color: rgba(255,255,255,0.35); text-decoration: none; transition: color 0.2s; }
        .perform-breadcrumb a:hover { color: rgba(255,255,255,0.75); }
        .perform-ey { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 20px; opacity: 0; animation: fadeUp 0.5s ease forwards 0.2s; }
        .perform-title { font-family: var(--font-heading); font-size: clamp(56px, 7vw, 104px); line-height: 0.9; letter-spacing: 0.01em; margin-bottom: 28px; max-width: 820px; opacity: 0; animation: fadeUp 0.65s ease forwards 0.35s; }
        .perform-title em { font-style: normal; color: transparent; -webkit-text-stroke: 1.5px #FEFEFE; opacity: 0.55; }
        .perform-sub { max-width: 560px; font-size: 18px; font-weight: 300; line-height: 1.65; color: rgba(255,255,255,0.76); opacity: 0; animation: fadeUp 0.6s ease forwards 0.55s; }

        .plans-section { background: #F4F3F0; padding: 96px 80px; }
        .section-head { max-width: 760px; margin-bottom: 48px; }
        .ey { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #9B9A96; margin-bottom: 16px; }
        .h2 { font-family: var(--font-heading); font-size: clamp(38px, 4vw, 60px); color: #070265; line-height: 0.95; letter-spacing: 0.01em; margin-bottom: 20px; }
        .h2 em { font-style: normal; color: transparent; -webkit-text-stroke: 1.5px #070265; opacity: 0.35; }
        .head-text { font-size: 17px; color: #3D3C38; font-weight: 300; line-height: 1.7; max-width: 560px; }
        .plans-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; max-width: 980px; }
        .plan-card { background: #FEFEFE; border: 1px solid #E8E7E3; border-radius: 10px; padding: 34px 30px; display: flex; flex-direction: column; min-height: 100%; opacity: 0; transform: translateY(26px); transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.25s; }
        .plan-card.visible { opacity: 1; transform: translateY(0); }
        .plan-card:hover { box-shadow: 0 18px 50px rgba(7,2,101,0.08); }
        .plan-card.featured { border: 2px solid #070265; }
        .plan-label { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #9B9A96; margin-bottom: 14px; }
        .plan-name { font-family: var(--font-heading); font-size: 34px; color: #070265; line-height: 1; letter-spacing: 0.02em; margin-bottom: 14px; }
        .plan-desc { font-size: 15px; line-height: 1.65; color: #3D3C38; font-weight: 300; margin-bottom: 24px; }
        .price { display: flex; align-items: baseline; gap: 6px; padding-bottom: 22px; border-bottom: 1px solid #E8E7E3; margin-bottom: 22px; }
        .amount { font-family: var(--font-heading); font-size: 62px; color: #070265; line-height: 1; }
        .period { font-size: 14px; color: #9B9A96; }
        .features { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; flex: 1; }
        .features li { display: flex; gap: 10px; font-size: 14px; color: #3D3C38; line-height: 1.45; }
        .dot { width: 7px; height: 7px; border-radius: 50%; background: #070265; margin-top: 7px; flex-shrink: 0; }
        .plan-actions { display: flex; flex-direction: column; gap: 10px; }
        .primary { background: #070265; color: #FEFEFE; padding: 14px 18px; border-radius: 4px; font-size: 14px; font-weight: 600; text-align: center; text-decoration: none; transition: all 0.2s; }
        .primary:hover { background: #0a0399; transform: translateY(-1px); }
        .secondary { color: #070265; border: 1px solid #070265; padding: 13px 18px; border-radius: 4px; font-size: 14px; text-align: center; text-decoration: none; transition: all 0.2s; }
        .secondary:hover { background: #F4F3F0; }

        .compare-section { background: #FEFEFE; padding: 96px 80px; }
        .compare-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; max-width: 900px; margin-top: 42px; }
        .compare-card { background: #F4F3F0; border: 1px solid #E8E7E3; border-radius: 8px; padding: 30px; opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .compare-card.visible { opacity: 1; transform: translateY(0); }
        .compare-card h3 { font-size: 17px; color: #070265; margin-bottom: 18px; }
        .compare-card ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .compare-card li { display: flex; gap: 10px; color: #3D3C38; font-size: 14px; line-height: 1.5; font-weight: 300; }

        .cta-perform { background: #070265; color: #FEFEFE; text-align: center; padding: 92px 80px; position: relative; overflow: hidden; }
        .cta-perform::before { content: 'TTR'; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-family: var(--font-heading); font-size: 380px; color: rgba(255,255,255,0.04); pointer-events: none; }
        .cta-perform .ey { color: rgba(255,255,255,0.45); }
        .cta-perform .h2 { color: #FEFEFE; max-width: 680px; margin-left: auto; margin-right: auto; }
        .cta-sub { max-width: 520px; margin: 0 auto 36px; color: rgba(255,255,255,0.72); font-weight: 300; line-height: 1.65; position: relative; }
        .cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; }
        .btn-white { background: #FEFEFE; color: #070265; padding: 14px 28px; border-radius: 4px; font-weight: 600; font-size: 14px; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-white:hover { background: #F4F3F0; transform: translateY(-1px); }
        .btn-ghost { border: 1px solid rgba(255,255,255,0.32); color: rgba(255,255,255,0.86); padding: 14px 28px; border-radius: 4px; font-size: 14px; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.72); color: #FEFEFE; }

        .reveal, .reveal-left { opacity: 0; transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .reveal { transform: translateY(32px); }
        .reveal-left { transform: translateX(-36px); }
        .reveal.visible, .reveal-left.visible { opacity: 1; transform: translate(0); }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 900px) {
          .perform-hero, .plans-section, .compare-section, .cta-perform { padding-left: 28px; padding-right: 28px; }
          .plans-grid, .compare-grid { grid-template-columns: 1fr; }
          .perform-hero { min-height: 72vh; }
        }
      `}</style>

      <section className="perform-hero">
        <div className="perform-breadcrumb">
          <Link href="/">Accueil</Link><span>/</span>
          <Link href="/coaching">Coaching</Link><span>/</span>
          <span style={{ color: 'rgba(255,255,255,0.65)' }}>TrainToPerform</span>
        </div>
        <p className="perform-ey">Performance course à pied</p>
        <h1 className="perform-title">Deux façons de progresser.<br /><em>Une même logique.</em></h1>
        <p className="perform-sub">TrainToPerform existe en deux formats : un coaching avec ajustements et contact direct, ou une version autonome avec un plan clair sur un mois.</p>
      </section>

      <section className="plans-section">
        <div className="section-head reveal-left">
          <p className="ey">Les deux forfaits</p>
          <h2 className="h2">Choisis ton niveau <em>d’accompagnement.</em></h2>
          <p className="head-text">La différence n’est pas la qualité du plan. C’est le niveau de présence humaine autour du plan.</p>
        </div>
        <div className="plans-grid">
          {plans.map((plan, index) => (
            <article key={plan.id} id={plan.id} className={`plan-card reveal stagger-${index + 1}${plan.featured ? ' featured' : ''}`}>
              <p className="plan-label">{plan.label}</p>
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-desc">{plan.description}</p>
              <div className="price"><span className="amount">{plan.price}</span><span className="period">{plan.period}</span></div>
              <ul className="features">
                {plan.features.map((feature) => (
                  <li key={feature}><span className="dot" />{feature}</li>
                ))}
              </ul>
              <div className="plan-actions">
                <a href={plan.href} className="primary">{plan.cta}</a>
                <Link href={plan.detailHref} className="secondary">Lire la page détaillée</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="compare-section">
        <div className="section-head reveal-left">
          <p className="ey">Comment choisir</p>
          <h2 className="h2">La vraie question : as-tu besoin de <em>retours ?</em></h2>
          <p className="head-text">Si tu sais appliquer un cadre seul, Autonome suffit. Si tu veux que le plan s’adapte à ta vraie semaine, prends Coaching.</p>
        </div>
        <div className="compare-grid">
          {comparison.map((item, index) => (
            <div key={item.title} className={`compare-card reveal stagger-${index + 1}`}>
              <h3>{item.title}</h3>
              <ul>
                {item.points.map((point) => (
                  <li key={point}><span className="dot" />{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-perform">
        <div className="reveal">
          <p className="ey">Prochaine étape</p>
          <h2 className="h2">Tu n’as pas besoin d’un plan de plus. Tu as besoin du bon <em style={{ WebkitTextStrokeColor: '#FEFEFE' }}>format.</em></h2>
          <p className="cta-sub">Commence directement par le forfait adapté, ou réserve un appel si tu veux valider le choix avant de démarrer.</p>
          <div className="cta-actions">
            <a href={coachingCheckoutUrl} className="btn-white">Coaching — 199€/mois</a>
            <a href={autonomeCheckoutUrl} className="btn-ghost">Autonome — 89€/mois</a>
          </div>
        </div>
      </section>
    </>
  )
}
