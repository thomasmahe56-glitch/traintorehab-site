'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function HomePage() {
  const [statNums, setStatNums] = useState(['+200', '5 ans', '13k'])
  const counted = useRef(false)

  useEffect(() => {
    // Nav scroll
    const nav = document.querySelector('nav')
    const handleScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target) } })
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    revealEls.forEach(el => revealObs.observe(el))

    // Offer cards
    const offerCards = document.querySelectorAll('.offer-card')
    const offerObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); offerObs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    offerCards.forEach(el => offerObs.observe(el))

    // Cycle cards cascade
    const cycleEls = document.querySelectorAll('.cycle-card, .cycle-arrow')
    const cycleObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        cycleEls.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 160))
        cycleObs.disconnect()
      }
    }, { threshold: 0.2 })
    if (cycleEls[0]) cycleObs.observe(cycleEls[0])

    // Counter animation
    function animateCounter(
      setter: (v: string) => void,
      target: string,
      duration: number
    ) {
      const isPlus = target.startsWith('+')
      const isK = target.includes('k')
      const isAns = target.includes('ans')
      const num = parseInt(target.replace('+', '').replace('k', '').replace(' ans', ''))
      let start: number | null = null
      const step = (ts: number) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        const val = Math.round(ease * num)
        setter((isPlus ? '+' : '') + val + (isK ? 'k' : '') + (isAns ? ' ans' : ''))
        if (progress < 1) requestAnimationFrame(step)
        else setter(target)
      }
      requestAnimationFrame(step)
    }

    const statsEl = document.querySelector('.hero-stats')
    const statObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted.current) {
        counted.current = true
        const targets = ['+200', '5 ans', '13k']
        targets.forEach((t, i) => {
          animateCounter((v) => setStatNums(prev => { const next = [...prev]; next[i] = v; return next }), t, 1400)
        })
      }
    }, { threshold: 0.5 })
    if (statsEl) statObs.observe(statsEl)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          background: #070265;
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding-top: 64px;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: -200px; right: -200px;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: rgba(255,255,255,0.03);
          pointer-events: none;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 48px 80px 80px;
          position: relative;
          z-index: 1;
        }
        .hero-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 24px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards 0.2s;
        }
        .hero-title {
          font-family: var(--font-heading);
          font-size: clamp(48px, 5.2vw, 76px);
          line-height: 0.92;
          color: #FEFEFE;
          letter-spacing: 0.01em;
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.4s;
        }
        .hero-title em {
          font-style: normal;
          font-size: 0.84em;
          color: transparent;
          -webkit-text-stroke: 1.5px #FEFEFE;
          opacity: 0.6;
        }
        .hero-sub {
          font-size: 17px;
          font-weight: 300;
          color: rgba(255,255,255,0.7);
          max-width: 420px;
          line-height: 1.65;
          margin-bottom: 48px;
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 0.65s;
        }
        .hero-sub strong { color: #FEFEFE; font-weight: 500; }
        .hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards 0.85s;
        }
        .btn-white {
          background: #FEFEFE;
          color: #070265;
          padding: 14px 28px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: background 0.2s, transform 0.2s;
          display: inline-block;
          position: relative;
          overflow: hidden;
        }
        .btn-white:hover { background: #F4F3F0; transform: translateY(-1px); }
        .btn-ghost {
          border: 1px solid rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.85);
          padding: 14px 28px;
          border-radius: 4px;
          font-size: 14px;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
          display: inline-block;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.6); color: #FEFEFE; }

        .hero-right { display: flex; align-items: stretch; position: relative; }
        .hero-photo {
          width: 100%;
          background: rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-left: 1px solid rgba(255,255,255,0.08);
          opacity: 0;
          animation: fadeIn 1s ease forwards 0.5s;
        }
        .hero-photo-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .hero-initials {
          width: 120px; height: 120px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-heading);
          font-size: 40px;
          color: rgba(255,255,255,0.4);
        }
        .hero-photo-label {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .hero-stats {
          position: absolute;
          bottom: 40px;
          left: -40px;
          background: #FEFEFE;
          border-radius: 8px;
          padding: 20px 24px;
          display: flex;
          gap: 32px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          opacity: 0;
          animation: fadeUp 0.7s ease forwards 1s;
        }
        .stat { text-align: center; }
        .stat-num {
          font-family: var(--font-heading);
          font-size: 32px;
          color: #070265;
          line-height: 1;
        }
        .stat-label { font-size: 11px; color: #9B9A96; margin-top: 4px; line-height: 1.3; }
        .stat-divider { border-left: 1px solid #E8E7E3; padding-left: 32px; }

        /* ── PROBLÈME ── */
        .problem {
          background: #F4F3F0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          padding: 96px 80px;
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
          opacity: 0.5;
        }
        .problem-body {
          font-size: 17px;
          font-weight: 300;
          color: #3D3C38;
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .problem-body strong { color: #070265; font-weight: 500; }
        .problem-list { list-style: none; display: flex; flex-direction: column; gap: 16px; }
        .problem-list li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          font-size: 15px;
          color: #3D3C38;
          line-height: 1.5;
        }
        .problem-dot {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #070265;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .problem-visual { display: flex; flex-direction: column; gap: 12px; }
        .cycle-card {
          background: #FEFEFE;
          border-radius: 8px;
          padding: 20px 24px;
          border-left: 3px solid #070265;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .cycle-card.muted { opacity: 0; border-left-color: #9B9A96; }
        .cycle-card.visible { opacity: 1; transform: translateX(0); }
        .cycle-card.muted.visible { opacity: 0.7; }
        .cycle-card h4 {
          font-size: 13px;
          font-weight: 600;
          color: #070265;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .cycle-card p { font-size: 13px; color: #3D3C38; }
        .cycle-card.rechute { border-left-color: #E63946; }
        .cycle-card.rechute h4 { color: #E63946; }
        .cycle-arrow {
          text-align: center;
          font-size: 18px;
          color: #9B9A96;
          margin: -4px 0;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .cycle-arrow.visible { opacity: 1; transform: translateX(0); }

        /* ── OFFRES ── */
        .offers { background: #FEFEFE; padding: 96px 80px; }
        .offers-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 56px;
        }
        .offers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: #070265;
          border-radius: 12px;
          overflow: hidden;
        }
        .offer-card {
          background: #FEFEFE;
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1), background 0.2s, box-shadow 0.25s;
        }
        .offer-card.visible { opacity: 1; transform: translateY(0); }
        .offer-card.visible:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(7,2,101,0.12); z-index: 2; }
        .offer-card.featured { background: #070265; color: #FEFEFE; }
        .offer-card.featured.visible:hover { background: #0a0399; box-shadow: 0 16px 48px rgba(7,2,101,0.3); }
        .offer-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #9B9A96;
          margin-bottom: -8px;
        }
        .offer-card.featured .offer-tag { color: rgba(255,255,255,0.5); }
        .offer-name {
          font-family: var(--font-heading);
          font-size: 32px;
          letter-spacing: 0.02em;
          color: #070265;
          line-height: 1;
        }
        .offer-card.featured .offer-name { color: #FEFEFE; }
        .offer-desc { font-size: 14px; font-weight: 300; color: #3D3C38; line-height: 1.6; flex: 1; }
        .offer-card.featured .offer-desc { color: rgba(255,255,255,0.7); }
        .offer-price { display: flex; align-items: baseline; gap: 4px; }
        .offer-price .amount {
          font-family: var(--font-heading);
          font-size: 48px;
          color: #070265;
          line-height: 1;
        }
        .offer-card.featured .offer-price .amount { color: #FEFEFE; }
        .offer-price .period { font-size: 13px; color: #9B9A96; font-weight: 300; }
        .offer-card.featured .offer-price .period { color: rgba(255,255,255,0.5); }
        .offer-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #070265;
          text-decoration: none;
          padding-top: 12px;
          border-top: 1px solid #E8E7E3;
          transition: gap 0.2s;
        }
        .offer-card.featured .offer-link { color: #FEFEFE; border-top-color: rgba(255,255,255,0.2); }
        .offer-link:hover { gap: 14px; }

        /* ── TÉMOIGNAGES ── */
        .social-proof { background: #F4F3F0; padding: 64px 80px; }
        .sp-header { text-align: center; margin-bottom: 48px; }
        .testimonials { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .testimonial {
          background: #FEFEFE;
          border-radius: 8px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s;
        }
        .testimonial:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(7,2,101,0.08); }
        .testimonial-text {
          font-size: 15px;
          font-weight: 300;
          color: #3D3C38;
          line-height: 1.65;
          font-style: italic;
          flex: 1;
        }
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid #E8E7E3;
        }
        .author-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #070265;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-heading);
          font-size: 14px;
          color: #FEFEFE;
          flex-shrink: 0;
        }
        .author-name { font-size: 13px; font-weight: 500; color: #070265; }
        .author-meta { font-size: 12px; color: #9B9A96; }

        /* ── À PROPOS ── */
        .about {
          background: #070265;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          padding: 96px 80px;
        }
        .about-photo {
          background: rgba(255,255,255,0.06);
          border-radius: 8px;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .about-photo-inner { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .about-initials {
          width: 80px; height: 80px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-heading);
          font-size: 28px;
          color: rgba(255,255,255,0.35);
        }
        .about-photo-label { font-size: 11px; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 0.1em; }
        .about-body { font-size: 16px; font-weight: 300; color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 32px; }
        .about-body strong { color: #FEFEFE; font-weight: 500; }
        .credentials { display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px; }
        .credential {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 14px;
          color: rgba(255,255,255,0.6);
        }
        .credential::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          flex-shrink: 0;
        }
        .btn-white-solid {
          background: #FEFEFE;
          color: #070265;
          padding: 14px 28px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          display: inline-block;
          transition: background 0.2s;
        }
        .btn-white-solid:hover { background: #F4F3F0; }

        /* ── CTA ── */
        .cta-section {
          background: #070265;
          text-align: center;
          padding: 96px 80px;
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: 'TTR';
          position: absolute;
          font-family: var(--font-heading);
          font-size: 400px;
          color: rgba(255,255,255,0.03);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        .cta-title {
          font-family: var(--font-heading);
          font-size: clamp(36px, 4vw, 56px);
          line-height: 0.95;
          color: #FEFEFE;
          letter-spacing: 0.01em;
          margin-bottom: 20px;
        }
        .cta-title em { font-style: normal; color: transparent; -webkit-text-stroke: 1.5px #FEFEFE; opacity: 0.5; }
        .cta-sub {
          font-size: 17px;
          font-weight: 300;
          color: rgba(255,255,255,0.6);
          max-width: 480px;
          margin: 0 auto 48px;
          line-height: 1.6;
        }
        .btn-ghost-white {
          border: 1px solid rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.85);
          padding: 14px 28px;
          border-radius: 4px;
          font-size: 14px;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
          display: inline-block;
        }
        .btn-ghost-white:hover { border-color: rgba(255,255,255,0.6); color: #FEFEFE; }

        /* ── REVEAL ── */
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .reveal-right { opacity: 0; transform: translateX(40px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .reveal.visible, .reveal-left.visible, .reveal-right.visible { opacity: 1; transform: translate(0); }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">Coaching course à pied · En ligne</p>
          <h1 className="hero-title">
            Reprends<br />
            la course.<br />
            <em>Cette fois, sans te reblesser.</em>
          </h1>
          <p className="hero-sub">
            Tu es blessé et tu veux reprendre en sécurité, ou tu cours sans douleur et tu veux progresser vraiment.<br /><br />
            Dans les deux cas, il te faut <strong>un accompagnement qui s&apos;adapte à toi</strong>.
          </p>
          <div className="hero-ctas">
            <a href="https://calendly.com/traintorehab/traintorehab-thomas-mahe" className="btn-white">Réserver l&apos;appel gratuit, 15 min</a>
            <Link href="#offres" className="btn-ghost">Voir les offres</Link>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-photo">
            <div className="hero-photo-inner">
              <div className="hero-initials">TM</div>
              <p className="hero-photo-label">Photo à intégrer</p>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">{statNums[0]}</div>
              <div className="stat-label">Coureurs<br />accompagnés</div>
            </div>
            <div className="stat stat-divider">
              <div className="stat-num">{statNums[1]}</div>
              <div className="stat-label">Kiné spé.<br />course à pied</div>
            </div>
            <div className="stat stat-divider">
              <div className="stat-num">{statNums[2]}</div>
              <div className="stat-label">Abonnés<br />Instagram</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLÈME */}
      <section className="problem">
        <div className="reveal-left">
          <p className="section-eyebrow">Le vrai problème</p>
          <h2 className="section-title">Tu n&apos;as pas <em>&quot;juste&quot;</em> mal</h2>
          <p className="problem-body">
            Tu t&apos;entraînes, tu adaptes, tu te reposes quand ça fait trop mal. Tu fais des exercices. Et la douleur revient.<br /><br />
            Le vrai problème, c&apos;est de <strong>ne plus savoir quoi faire</strong>, quand, ni pourquoi.
          </p>
          <ul className="problem-list">
            <li><span className="problem-dot" />Tu as déjà consulté : kiné, médecin, exercices, repos. Et quelque chose ne tient pas dans le temps</li>
            <li><span className="problem-dot" />Tu cours régulièrement mais tu butes contre un plafond invisible</li>
            <li><span className="problem-dot" />Tu es fatigué de tester au hasard et de recommencer le même cycle</li>
          </ul>
        </div>
        <div className="problem-visual">
          <div className="cycle-card">
            <h4>Douleur</h4>
            <p>Quelque chose qui gêne, qui revient, qui limite</p>
          </div>
          <div className="cycle-arrow">↓</div>
          <div className="cycle-card muted">
            <h4>Repos / Kiné classique</h4>
            <p>Tu arrêtes, tu récupères, tu repars</p>
          </div>
          <div className="cycle-arrow">↓</div>
          <div className="cycle-card muted">
            <h4>Reprise</h4>
            <p>Ça tient quelques semaines…</p>
          </div>
          <div className="cycle-arrow">↓</div>
          <div className="cycle-card rechute">
            <h4>Rechute</h4>
            <p>La douleur revient. Toujours.</p>
          </div>
        </div>
      </section>

      {/* OFFRES */}
      <section className="offers" id="offres">
        <div className="offers-header reveal">
          <div>
            <p className="section-eyebrow">Les offres</p>
            <h2 className="section-title">Un cadre.<br /><em>Pas</em> un plan.</h2>
          </div>
          <p style={{ maxWidth: '320px', fontSize: '15px', fontWeight: 300, color: '#9B9A96', lineHeight: 1.6, textAlign: 'right' }}>
            Pas sûr ? L&apos;appel de 15 min sert à ça : je t&apos;oriente honnêtement.
          </p>
        </div>
        <div className="offers-grid">
          {[
            { tag: 'Tu as une douleur ou tu veux reprendre en sécurité ?', name: 'TrainToRestart', desc: "Blessure, reprise, douleurs chroniques. On pose un cadre clair pour reprendre avec méthode, sans repartir au hasard.", price: '199', href: '/coaching/restart', featured: false },
            { tag: 'Tu cours sans douleur et tu veux aller plus loin ?', name: 'TrainToPerform Coaching', desc: "Performance accompagnée. Un plan vivant, ajusté chaque semaine selon tes retours, avec un contact direct coach.", price: '199', href: '/coaching/perform#coaching', featured: true },
            { tag: 'Tu veux progresser avec un cadre plus autonome ?', name: 'TrainToPerform Autonome', desc: "Performance autonome. Un plan structuré, conçu pour ton profil, avec une logique claire derrière chaque séance.", price: '89', href: '/coaching/perform#autonome', featured: false },
          ].map((offer, i) => (
            <div key={offer.name} className={`offer-card${offer.featured ? ' featured' : ''} stagger-${i + 1}`}>
              <p className="offer-tag">{offer.tag}</p>
              <h3 className="offer-name">{offer.name}</h3>
              <p className="offer-desc">{offer.desc}</p>
              <div className="offer-price">
                <span className="amount">{offer.price}</span>
                <span className="period">€ / mois</span>
              </div>
              <Link href={offer.href} className="offer-link">Découvrir l&apos;offre →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="social-proof">
        <div className="sp-header reveal">
          <p className="section-eyebrow">Témoignages</p>
          <h2 className="section-title">Ils ont <em>changé</em> leur façon de courir</h2>
        </div>
        <div className="testimonials">
          {[
            { initials: 'AM', name: 'Antoine M.', meta: 'Marathon Paris · TrainToRestart', text: "Après 2 ans de tendinopathie d'Achille, j'avais perdu confiance. En 8 semaines avec Thomas, j'ai compris pourquoi ça revenait, et comment ne plus en avoir peur.", delay: 'stagger-1' },
            { initials: 'SL', name: 'Sophie L.', meta: 'Trail 50km · TrainToPerform Coaching', text: "J'avais un plateau depuis 18 mois. Le coaching a remis de la cohérence dans mes semaines : pas plus de volume, juste mieux organisé. Sub-3h30 au bout de 4 mois.", delay: 'stagger-2' },
            { initials: 'JB', name: 'Julien B.', meta: '10km / Semi · TrainToPerform Autonome', text: "Ce que j'apprécie : Thomas explique le pourquoi de chaque choix. Je ne suis pas un plan aveuglément. Je comprends ce que je fais et je peux l'adapter moi-même.", delay: 'stagger-3' },
          ].map((t) => (
            <div key={t.name} className={`testimonial reveal ${t.delay}`}>
              <p className="testimonial-text">&quot;{t.text}&quot;</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initials}</div>
                <div>
                  <p className="author-name">{t.name}</p>
                  <p className="author-meta">{t.meta}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* À PROPOS */}
      <section className="about" id="a-propos">
        <div className="about-photo reveal-left">
          <div className="about-photo-inner">
            <div className="about-initials">TM</div>
            <p className="about-photo-label">Photo à intégrer</p>
          </div>
        </div>
        <div className="reveal-right">
          <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.4)' }}>Thomas Mahé</p>
          <h2 className="section-title" style={{ color: '#FEFEFE' }}>
            Kiné. <em style={{ WebkitTextStrokeColor: '#FEFEFE' }}>Coach.</em> Coureur.
          </h2>
          <p className="about-body">
            Kinésithérapeute spécialisé en traumatologie et orthopédie à Saint-Raphaël, je travaille exclusivement avec des coureurs depuis 5 ans.<br /><br />
            TrainToRehab est né d&apos;un constat simple : <strong>la rééducation et l&apos;entraînement ne devraient pas être deux mondes séparés.</strong>
          </p>
          <div className="credentials">
            <div className="credential">Kinésithérapeute DE, cabinet à Saint-Raphaël</div>
            <div className="credential">Spécialisé traumatologie, orthopédie, course à pied</div>
            <div className="credential">+200 coureurs accompagnés en ligne</div>
            <div className="credential">Fondateur TrainToRehab, 13 000 abonnés Instagram</div>
          </div>
          <a href="https://calendly.com/traintorehab/traintorehab-thomas-mahe" className="btn-white-solid">
            Réserver un appel gratuit
          </a>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-section">
        <div className="reveal">
          <p className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.4)' }}>Prochaine étape</p>
          <h2 className="cta-title">
            Un appel.<br /><em>15 minutes.</em><br />Sans engagement.
          </h2>
          <p className="cta-sub">
            On fait le point sur ta situation. Je t&apos;oriente vers l&apos;option la plus adaptée, ou je te dis honnêtement que ce n&apos;est pas le bon moment.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <a href="https://calendly.com/traintorehab/traintorehab-thomas-mahe" className="btn-white">Réserver l&apos;appel gratuit</a>
            <Link href="#offres" className="btn-ghost-white">Voir les offres d&apos;abord</Link>
          </div>
        </div>
      </section>
    </>
  )
}
