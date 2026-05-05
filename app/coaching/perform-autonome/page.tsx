'use client'

import Link from 'next/link'
import { useEffect } from 'react'

const checkoutUrl = '/checkout/perform-autonome'

const profiles = [
  {
    tag: 'Coureur régulier',
    title: 'Tu veux une structure claire',
    text: "Tu cours déjà plusieurs fois par semaine, mais tu ne veux plus bricoler tes séances au feeling ou recopier un plan qui ne te ressemble pas.",
  },
  {
    tag: 'Objectif 10km, semi ou marathon',
    title: 'Tu as une échéance précise',
    text: "Tu veux arriver préparé, sans te cramer trop tôt, avec une progression logique semaine après semaine.",
  },
  {
    tag: 'Autonomie assumée',
    title: 'Tu n’as pas besoin d’un coach au quotidien',
    text: "Tu sais t’organiser seul. Ce qu’il te manque, ce n’est pas quelqu’un derrière ton épaule, c’est une méthode fiable à suivre.",
  },
  {
    tag: 'Budget maîtrisé',
    title: 'Tu veux le cadre, pas le suivi premium',
    text: "Tu veux bénéficier de la logique TrainToPerform sans payer pour des échanges réguliers ou des ajustements en continu.",
  },
]

const steps = [
  {
    num: '01',
    title: 'Tu renseignes ton profil',
    text: 'Objectif, niveau actuel, volume habituel, contraintes, historique récent. Plus les informations sont claires, plus le plan peut être cohérent.',
  },
  {
    num: '02',
    title: 'Je construis ton mois d’entraînement',
    text: 'Tu reçois une planification structurée sur quatre semaines, avec les séances, les intensités, les volumes et la logique derrière chaque bloc.',
  },
  {
    num: '03',
    title: 'Tu t’entraînes en autonomie',
    text: 'Tu appliques le plan, tu notes tes sensations, tu apprends à reconnaître les signaux utiles : fatigue normale, alerte, adaptation nécessaire.',
  },
  {
    num: '04',
    title: 'Tu peux renouveler ou passer au coaching',
    text: 'Si le format te suffit, tu continues en autonome. Si tu sens que tu as besoin d’ajustements, tu peux basculer vers TrainToPerform Coaching.',
  },
]

const included = [
  'Plan d’entraînement structuré sur 4 semaines',
  'Volume et intensités adaptés à ton profil',
  'Objectif principal défini clairement',
  'Explication de la logique derrière chaque séance',
  'Repères d’allure, RPE et récupération',
  'Consignes pour ajuster sans faire n’importe quoi',
]

const testimonials = [
  {
    quote: "Je voulais préparer un semi sans reprendre un plan générique. Le format autonome m’a donné exactement ce qu’il me fallait : une structure claire, mais assez de liberté pour l’adapter à mon planning.",
    meta: 'Julien B. · 10km / semi · TrainToPerform Autonome',
  },
  {
    quote: "J’avais surtout besoin de comprendre pourquoi je faisais telle séance. Ça change tout : je ne subis plus le plan, je sais ce que je travaille.",
    meta: 'Camille R. · progression 10km · 4 semaines',
  },
  {
    quote: "Le plan était simple à suivre, mais pas simpliste. Les intensités étaient mieux dosées que ce que je faisais seul, et j’ai fini le mois avec plus de régularité.",
    meta: 'Nicolas M. · reprise performance · 1 mois',
  },
]

export default function PerformAutonomePage() {
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
        .a-hero { min-height: 86vh; background: #070265; color: #FEFEFE; display: grid; grid-template-columns: 1.1fr 0.9fr; padding: 80px; align-items: center; position: relative; overflow: hidden; }
        .a-hero::before { content: 'AUTONOME'; position: absolute; right: -24px; bottom: -24px; font-family: var(--font-heading); font-size: 250px; color: rgba(255,255,255,0.025); letter-spacing: 0.05em; pointer-events: none; }
        .a-breadcrumb { display: flex; gap: 8px; align-items: center; font-size: 12px; color: rgba(255,255,255,0.35); margin-bottom: 28px; opacity: 0; animation: fadeUp 0.5s ease forwards 0.1s; }
        .a-breadcrumb a { color: rgba(255,255,255,0.35); text-decoration: none; transition: color 0.2s; }
        .a-breadcrumb a:hover { color: rgba(255,255,255,0.75); }
        .a-badge { display: inline-flex; width: fit-content; border: 1px solid rgba(255,255,255,0.24); border-radius: 999px; padding: 7px 16px; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.65); margin-bottom: 24px; opacity: 0; animation: fadeUp 0.5s ease forwards 0.2s; }
        .a-title { font-family: var(--font-heading); font-size: clamp(52px, 6vw, 92px); line-height: 0.92; letter-spacing: 0.01em; margin-bottom: 28px; opacity: 0; animation: fadeUp 0.65s ease forwards 0.35s; }
        .a-title em { font-style: normal; color: transparent; -webkit-text-stroke: 1.5px #FEFEFE; opacity: 0.55; }
        .a-sub { max-width: 520px; font-size: 18px; font-weight: 300; line-height: 1.65; color: rgba(255,255,255,0.76); margin-bottom: 42px; opacity: 0; animation: fadeUp 0.6s ease forwards 0.55s; }
        .a-ctas { display: flex; gap: 16px; flex-wrap: wrap; opacity: 0; animation: fadeUp 0.6s ease forwards 0.72s; }
        .btn-a-white { background: #FEFEFE; color: #070265; padding: 14px 28px; border-radius: 4px; font-weight: 600; font-size: 14px; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-a-white:hover { background: #F4F3F0; transform: translateY(-1px); }
        .btn-a-ghost { border: 1px solid rgba(255,255,255,0.32); color: rgba(255,255,255,0.86); padding: 14px 28px; border-radius: 4px; font-size: 14px; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-a-ghost:hover { border-color: rgba(255,255,255,0.72); color: #FEFEFE; }
        .a-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 38px 34px; position: relative; z-index: 1; opacity: 0; animation: fadeUp 0.7s ease forwards 0.62s; }
        .a-card-label { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 16px; }
        .a-price { font-family: var(--font-heading); font-size: 80px; line-height: 1; }
        .a-period { color: rgba(255,255,255,0.55); font-size: 14px; margin-bottom: 26px; }
        .a-card-list { list-style: none; display: flex; flex-direction: column; gap: 12px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.12); margin-bottom: 28px; }
        .a-card-list li { display: flex; gap: 10px; color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.45; }
        .a-dot { width: 7px; height: 7px; border-radius: 50%; background: #FEFEFE; opacity: 0.55; margin-top: 7px; flex-shrink: 0; }

        .a-section { padding: 96px 80px; background: #FEFEFE; }
        .a-section.alt { background: #F4F3F0; }
        .a-inner { max-width: 720px; }
        .a-ey { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #9B9A96; margin-bottom: 16px; }
        .a-h2 { font-family: var(--font-heading); font-size: clamp(36px, 4vw, 58px); color: #070265; line-height: 0.95; letter-spacing: 0.01em; margin-bottom: 28px; }
        .a-h2 em { font-style: normal; color: transparent; -webkit-text-stroke: 1.5px #070265; opacity: 0.35; }
        .a-prose p { font-size: 17px; font-weight: 300; color: #12102e; line-height: 1.8; margin-bottom: 22px; }
        .a-bridge { font-size: 16px; color: #070265; font-weight: 500; font-style: italic; padding-top: 12px; }

        .profile-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; max-width: 860px; margin-top: 40px; }
        .profile-card { background: #FEFEFE; border: 1px solid #E8E7E3; border-radius: 8px; padding: 28px; opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.2s; }
        .profile-card.visible { opacity: 1; transform: translateY(0); }
        .profile-card:hover { box-shadow: 0 18px 50px rgba(7,2,101,0.08); }
        .profile-tag { display: inline-flex; background: #F4F3F0; color: #070265; border: 1px solid #E8E7E3; border-radius: 999px; padding: 5px 11px; font-size: 11px; margin-bottom: 14px; }
        .profile-card h3, .step-content h3 { font-size: 16px; color: #070265; font-weight: 600; margin-bottom: 8px; }
        .profile-card p, .step-content p, .include-item p { font-size: 14px; color: #3D3C38; line-height: 1.65; font-weight: 300; }

        .steps { max-width: 720px; margin-top: 42px; }
        .step { display: grid; grid-template-columns: 64px 1fr; gap: 26px; padding: 28px 0; border-bottom: 1px solid #E8E7E3; opacity: 0; transform: translateX(-24px); transition: opacity 0.6s ease, transform 0.6s ease, padding-left 0.25s; }
        .step.visible { opacity: 1; transform: translateX(0); }
        .step:hover { padding-left: 8px; }
        .step:last-child { border-bottom: none; }
        .step-num { font-family: var(--font-heading); font-size: 44px; color: rgba(7,2,101,0.2); line-height: 1; }

        .include-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; max-width: 760px; margin-top: 34px; }
        .include-item { display: flex; gap: 12px; align-items: flex-start; background: #FEFEFE; border: 1px solid #E8E7E3; border-radius: 6px; padding: 16px 18px; }
        .include-dot { width: 6px; height: 6px; border-radius: 50%; background: #070265; margin-top: 8px; flex-shrink: 0; }

        .compare { max-width: 860px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 42px; }
        .compare-card { border-radius: 8px; padding: 30px; border: 1px solid #E8E7E3; background: #FEFEFE; }
        .compare-card.featured { background: #070265; color: #FEFEFE; border-color: #070265; }
        .compare-card h3 { font-size: 18px; margin-bottom: 12px; color: #070265; }
        .compare-card.featured h3 { color: #FEFEFE; }
        .compare-card p { font-size: 14px; line-height: 1.65; color: #3D3C38; font-weight: 300; }
        .compare-card.featured p { color: rgba(255,255,255,0.72); }

        .testimonials { max-width: 780px; display: flex; flex-direction: column; gap: 20px; margin-top: 42px; }
        .testi { background: #F4F3F0; border-radius: 8px; border-left: 3px solid #070265; padding: 30px; opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .testi.visible { opacity: 1; transform: translateY(0); }
        .testi-quote { font-size: 16px; line-height: 1.75; color: #12102e; font-weight: 300; font-style: italic; margin-bottom: 18px; }
        .testi-meta { font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #9B9A96; }

        .cta-autonome { background: #070265; color: #FEFEFE; text-align: center; padding: 96px 80px; position: relative; overflow: hidden; }
        .cta-autonome::before { content: '89'; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-family: var(--font-heading); font-size: 420px; color: rgba(255,255,255,0.04); pointer-events: none; }
        .cta-autonome .a-ey { color: rgba(255,255,255,0.45); }
        .cta-autonome .a-h2 { color: #FEFEFE; }
        .cta-sub { max-width: 460px; margin: 0 auto 44px; color: rgba(255,255,255,0.72); font-weight: 300; line-height: 1.65; }

        .reveal, .reveal-left { opacity: 0; transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .reveal { transform: translateY(32px); }
        .reveal-left { transform: translateX(-36px); }
        .reveal.visible, .reveal-left.visible { opacity: 1; transform: translate(0); }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 900px) {
          .a-hero { grid-template-columns: 1fr; padding: 72px 28px; gap: 46px; }
          .a-section, .cta-autonome { padding: 72px 28px; }
          .profile-grid, .include-grid, .compare { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="a-hero">
        <div>
          <div className="a-breadcrumb">
            <Link href="/">Accueil</Link><span>/</span>
            <Link href="/coaching">Coaching</Link><span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.65)' }}>TrainToPerform Autonome</span>
          </div>
          <div className="a-badge">TrainToPerform Autonome</div>
          <h1 className="a-title">Tu veux progresser.<br />Mais garder la <em>main.</em></h1>
          <p className="a-sub">Un plan d’entraînement structuré sur un mois, pensé pour ton profil, ton objectif et tes contraintes. Sans suivi coach, mais avec une logique claire derrière chaque séance.</p>
          <div className="a-ctas">
            <a href={checkoutUrl} className="btn-a-white">Démarrer — 89€/mois</a>
            <a href="/coaching/perform-coaching" className="btn-a-ghost">Comparer avec le coaching</a>
          </div>
        </div>
        <div className="a-card">
          <p className="a-card-label">Performance autonome</p>
          <div className="a-price">89</div>
          <p className="a-period">€ / mois · sans suivi coach</p>
          <ul className="a-card-list">
            {included.slice(0, 5).map((item) => (
              <li key={item}><span className="a-dot" />{item}</li>
            ))}
          </ul>
          <a href={checkoutUrl} className="btn-a-white">Accéder au format autonome</a>
        </div>
      </section>

      <section className="a-section">
        <div className="a-inner reveal-left">
          <p className="a-ey">Ce que tu vis</p>
          <h2 className="a-h2">Tu n’as pas besoin de motivation. Tu as besoin d’un <em>cadre.</em></h2>
          <div className="a-prose">
            <p>Tu cours déjà. Tu sais enfiler les chaussures, sortir quand il faut, encaisser une séance difficile. Le problème n’est pas l’effort.</p>
            <p>Le problème, c’est que ton entraînement manque parfois de structure. Tu alternes entre semaines trop chargées, semaines trop légères, séances copiées sur internet et décisions prises selon l’humeur du jour.</p>
            <p>TrainToPerform Autonome est fait pour remettre de l’ordre : un mois clair, des séances cohérentes, une progression lisible, et suffisamment d’explications pour comprendre ce que tu fais.</p>
            <p className="a-bridge">Tu avances seul, mais pas au hasard.</p>
          </div>
        </div>
      </section>

      <section className="a-section alt">
        <div className="reveal">
          <p className="a-ey">C’est pour toi si</p>
          <h2 className="a-h2">Tu veux du sérieux, sans <em>accompagnement permanent.</em></h2>
        </div>
        <div className="profile-grid">
          {profiles.map((profile, index) => (
            <div key={profile.tag} className={`profile-card reveal stagger-${index + 1}`}>
              <span className="profile-tag">{profile.tag}</span>
              <h3>{profile.title}</h3>
              <p>{profile.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="a-section">
        <div className="a-inner reveal">
          <p className="a-ey">Ce qui change</p>
          <h2 className="a-h2">Un plan court. Une logique <em>solide.</em></h2>
          <div className="a-prose">
            <p>Un bon plan ne se limite pas à empiler des kilomètres. Il organise la fatigue, la récupération, les intensités, les séances clés et les semaines plus calmes.</p>
            <p>Le format autonome te donne une direction sur quatre semaines. Tu sais ce qui est prioritaire, ce qui est secondaire, et ce que chaque séance est censée produire.</p>
            <p>Il n’y a pas de suivi WhatsApp, pas d’ajustement hebdomadaire, pas d’appel mensuel. C’est précisément ce qui rend ce format plus accessible : tu achètes le cadre, pas la présence continue.</p>
          </div>
        </div>
      </section>

      <section className="a-section alt">
        <div className="reveal">
          <p className="a-ey">Comment ça se passe</p>
          <h2 className="a-h2">Simple. Carré. <em>Utilisable.</em></h2>
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <div key={step.num} className={`step reveal stagger-${index + 1}`}>
              <div className="step-num">{step.num}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="a-section">
        <div className="reveal">
          <p className="a-ey">Ce qui est inclus</p>
          <h2 className="a-h2">Le nécessaire pour t’entraîner <em>proprement.</em></h2>
          <div className="include-grid">
            {included.map((item) => (
              <div key={item} className="include-item">
                <span className="include-dot" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="a-section alt">
        <div className="reveal">
          <p className="a-ey">Autonome ou coaching ?</p>
          <h2 className="a-h2">Choisis selon ton besoin de <em>retour.</em></h2>
          <div className="compare">
            <div className="compare-card featured">
              <h3>Autonome — 89€/mois</h3>
              <p>Tu veux un plan clair, tu sais t’organiser, et tu n’as pas besoin d’échanges réguliers. Tu suis la structure, tu apprends la logique, tu avances seul.</p>
            </div>
            <div className="compare-card">
              <h3>Coaching — 199€/mois</h3>
              <p>Tu veux des ajustements selon tes retours, un contact direct, et un regard extérieur chaque semaine. Le plan évolue avec ce que tu vis réellement.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="a-section">
        <div className="reveal">
          <p className="a-ey">Ils ont choisi l’autonomie</p>
          <h2 className="a-h2">Ce qu’ils <em>retiennent.</em></h2>
        </div>
        <div className="testimonials">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.meta} className={`testi reveal stagger-${index + 1}`}>
              <p className="testi-quote">&quot;{testimonial.quote}&quot;</p>
              <p className="testi-meta">{testimonial.meta}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-autonome">
        <div className="reveal">
          <p className="a-ey">Prochaine étape</p>
          <h2 className="a-h2">Un mois clair vaut mieux que six semaines de <em style={{ WebkitTextStrokeColor: '#FEFEFE' }}>bricolage.</em></h2>
          <p className="cta-sub">TrainToPerform Autonome te donne une structure exploitable tout de suite, sans t’enfermer dans un accompagnement dont tu n’as pas forcément besoin.</p>
          <div className="a-ctas" style={{ justifyContent: 'center', position: 'relative' }}>
            <a href={checkoutUrl} className="btn-a-white">Démarrer — 89€/mois</a>
            <Link href="/coaching/perform-coaching" className="btn-a-ghost">Voir le coaching complet</Link>
          </div>
        </div>
      </section>
    </>
  )
}
