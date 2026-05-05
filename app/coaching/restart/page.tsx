'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function RestartPage() {
  useEffect(() => {
    const nav = document.querySelector('nav')
    const handleScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    const revEls = document.querySelectorAll('.reveal, .reveal-left')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    revEls.forEach(el => obs.observe(el))

    const cards = document.querySelectorAll('.fortoi-card')
    const cardsObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        cards.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 120))
        cardsObs.disconnect()
      }
    }, { threshold: 0.1 })
    if (cards[0]) cardsObs.observe(cards[0])

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    'Appel diagnostic 45 min en visio',
    'Cadre de reprise personnalisé & évolutif',
    'Suivi hebdomadaire par message',
    'Appel mensuel de bilan (45 min)',
    'Accès direct à Thomas — pas une équipe',
    'Réponses sous 24h en semaine',
  ]

  const steps = [
    { l: 'S1', t: 'On pose le diagnostic ensemble', d: "Appel de 45 minutes. On passe en revue ta blessure, ton historique d'entraînement, ton objectif. Je te dis ce que j'observe et ce qu'on va travailler. Pas de vague. Pas de jargon. Des faits." },
    { l: 'S2', t: 'On construit ton cadre de reprise', d: "Je te transmets une logique de reprise : les zones d'entraînement adaptées à ta phase de guérison, les signaux à surveiller, les règles de décision pour chaque sortie. Tu sais pourquoi on fait quoi." },
    { l: 'S3', t: 'Tu cours. On ajuste.', d: "Chaque semaine, tu me fais un retour rapide sur ce que tu as ressenti. Je lis. J'ajuste. Je réponds. Pas un chatbot — moi, directement." },
    { l: 'S4', t: 'Appel de bilan mensuel', d: "On fait le point à la fin de chaque mois. On mesure la progression. Et progressivement, tu as besoin de moins de moi — c'est le signe que ça fonctionne." },
  ]

  const fortoi = [
    { n: '01', t: "Tu as une blessure depuis plus de 6 semaines et tu ne sais plus à quel protocole te fier. Tu as essayé plusieurs choses — rien ne tient dans le temps.", d: 'stagger-1' },
    { n: '02', t: "Tu as un objectif dans 3 à 6 mois — marathon, trail, compétition. La blessure est là, mais tu n'es pas prêt à abandonner. Tu cherches comment reprendre intelligemment.", d: 'stagger-2' },
    { n: '03', t: "Tu cours régulièrement depuis plusieurs années. Tu n'es pas débutant. Tu veux comprendre — pas juste suivre une feuille d'exercices sans explications.", d: 'stagger-3' },
    { n: '04', t: "Tu en as assez de consulter des gens qui ne courent pas et qui ne comprennent pas ce que tu ressens quand tu dois annuler une sortie. Tu veux parler à quelqu'un qui sait ce que ça fait.", d: 'stagger-4' },
  ]

  const testimonials = [
    { t: "Ça fait deux ans que j'ai une tendinopathie au tendon d'Achille. J'ai vu trois kinés, suivi deux protocoles différents — ça s'améliorait puis ça revenait. Avec Thomas, en 6 semaines j'ai compris pourquoi ça revenait systématiquement. J'ai couru mon premier 10km en 8 mois sans douleur le mois dernier.", m: "Julien, 34 ans · Tendinopathie achilléenne · 6 semaines", d: 'stagger-1' },
    { t: "Ce que j'appréciais avec Thomas, c'est qu'il m'expliquait toujours le pourquoi. Pas juste 'fais ça'. Pourquoi ce volume cette semaine, pourquoi on lève le pied là. J'avais un syndrome rotulien depuis 4 mois, j'ai repris l'entraînement complet en 10 semaines et je prépare un trail 50km en juin.", m: "Mathieu, 39 ans · Syndrome rotulien · 10 semaines", d: 'stagger-2' },
    { t: "J'avais peur de reprendre. Pas à cause de la douleur — à cause de la peur de me reblesser. Thomas m'a donné un cadre clair pour décider quand pousser et quand m'arrêter. Cette clarté a tout changé. En 2 mois j'ai retrouvé mon niveau d'avant blessure. Sans douleur.", m: "Sarah, 31 ans · Périostite tibiale · 8 semaines", d: 'stagger-3' },
  ]

  return (
    <>
      <style>{`
        :root { --ink: #12102e; }

        /* HERO */
        .r-hero { min-height: 85vh; background: #070265; display: grid; grid-template-columns: 1fr 1fr; padding-top: 64px; position: relative; overflow: hidden; }
        .r-hero::before { content: 'RESTART'; position: absolute; font-family: var(--font-heading); font-size: 260px; color: rgba(255,255,255,0.025); bottom: -20px; right: -20px; pointer-events: none; letter-spacing: 0.05em; white-space: nowrap; }
        .r-hero-left { display: flex; flex-direction: column; justify-content: center; padding: 80px 48px 80px 80px; position: relative; z-index: 1; }
        .r-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: rgba(255,255,255,0.35); margin-bottom: 28px; opacity: 0; animation: fadeUp 0.5s ease forwards 0.1s; }
        .r-breadcrumb a { color: rgba(255,255,255,0.35); text-decoration: none; transition: color 0.2s; }
        .r-breadcrumb a:hover { color: rgba(255,255,255,0.7); }
        .r-breadcrumb span { color: rgba(255,255,255,0.2); }
        .r-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 20px; opacity: 0; animation: fadeUp 0.5s ease forwards 0.2s; }
        .r-title { font-family: var(--font-heading); font-size: clamp(52px, 6vw, 88px); line-height: 0.92; color: #FEFEFE; letter-spacing: 0.01em; margin-bottom: 28px; opacity: 0; animation: fadeUp 0.7s ease forwards 0.35s; }
        .r-title em { font-style: normal; color: transparent; -webkit-text-stroke: 1.5px #FEFEFE; opacity: 0.55; }
        .r-sub { font-size: 17px; font-weight: 300; color: rgba(255,255,255,0.75); max-width: 440px; line-height: 1.65; margin-bottom: 40px; opacity: 0; animation: fadeUp 0.6s ease forwards 0.55s; }
        .r-sub strong { color: #FEFEFE; font-weight: 500; }
        .r-ctas { display: flex; gap: 16px; flex-wrap: wrap; opacity: 0; animation: fadeUp 0.6s ease forwards 0.7s; }
        .r-note { margin-top: 16px; font-size: 12px; color: rgba(255,255,255,0.35); opacity: 0; animation: fadeUp 0.5s ease forwards 0.85s; }
        .btn-wh { background: #FEFEFE; color: #070265; padding: 14px 28px; border-radius: 4px; font-weight: 600; font-size: 14px; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-wh:hover { background: #F4F3F0; transform: translateY(-1px); }
        .btn-gh { border: 1px solid rgba(255,255,255,0.3); color: rgba(255,255,255,0.85); padding: 14px 28px; border-radius: 4px; font-size: 14px; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-gh:hover { border-color: rgba(255,255,255,0.7); color: #FEFEFE; }
        .r-hero-right { display: flex; align-items: center; justify-content: center; padding: 80px 48px; }
        .r-price-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 40px 36px; width: 100%; max-width: 340px; opacity: 0; animation: fadeUp 0.7s ease forwards 0.6s; }
        .r-plabel { font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 16px; }
        .r-pamount { font-family: var(--font-heading); font-size: 80px; color: #FEFEFE; line-height: 1; }
        .r-pperiod { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.55); margin-bottom: 28px; }
        .r-pfeatures { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.12); }
        .r-pfeatures li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.8); line-height: 1.4; }
        .pf-chk { width: 16px; height: 16px; border-radius: 50%; background: rgba(255,255,255,0.2); flex-shrink: 0; margin-top: 2px; display: flex; align-items: center; justify-content: center; }
        .pf-chk::after { content: ''; width: 6px; height: 3px; border-left: 1.5px solid rgba(255,255,255,0.9); border-bottom: 1.5px solid rgba(255,255,255,0.9); transform: rotate(-45deg) translateY(-1px); display: block; }
        .r-pcta { display: block; background: #FEFEFE; color: #070265; padding: 14px; border-radius: 6px; text-align: center; font-weight: 600; font-size: 14px; text-decoration: none; transition: all 0.2s; }
        .r-pcta:hover { background: #F4F3F0; transform: translateY(-1px); }
        .r-pnote { font-size: 12px; color: rgba(255,255,255,0.3); text-align: center; margin-top: 12px; }

        /* SECTIONS */
        .s-ey { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #9B9A96; margin-bottom: 16px; }
        .s-ti { font-family: var(--font-heading); font-size: clamp(36px, 4vw, 58px); line-height: 0.95; color: #070265; letter-spacing: 0.01em; margin-bottom: 28px; }
        .s-ti em { font-style: normal; color: transparent; -webkit-text-stroke: 1.5px #070265; opacity: 0.35; }
        .prose-wh { padding: 96px 80px; background: #FEFEFE; }
        .prose-ow { padding: 96px 80px; background: #F4F3F0; }
        .prose-in { max-width: 680px; }
        .prose p { font-size: 17px; font-weight: 300; color: var(--ink); line-height: 1.8; margin-bottom: 22px; }
        .prose strong { color: #070265; font-weight: 500; }
        .bridge { font-size: 12px; font-weight: 600; color: rgba(0,0,0,0.25); text-transform: uppercase; letter-spacing: 0.14em; margin-top: 36px; padding-top: 32px; border-top: 1px solid #E8E7E3; display: block; }

        /* POUR TOI SI : navy */
        .fortoi-sec { padding: 96px 80px; background: #070265; }
        .fortoi-sec .s-ey { color: rgba(255,255,255,0.4); }
        .fortoi-sec .s-ti { color: #FEFEFE; }
        .fortoi-sec .s-ti em { -webkit-text-stroke-color: #FEFEFE; opacity: 0.3; }
        .fortoi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; max-width: 860px; margin-top: 48px; background: rgba(255,255,255,0.06); border-radius: 8px; overflow: hidden; }
        .fortoi-card { background: rgba(255,255,255,0.04); padding: 36px 32px; display: flex; flex-direction: column; gap: 16px; opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease, background 0.2s; }
        .fortoi-card:hover { background: rgba(255,255,255,0.08); }
        .fortoi-card.visible { opacity: 1; transform: translateY(0); }
        .fortoi-num { font-family: var(--font-heading); font-size: 36px; color: rgba(255,255,255,0.45); line-height: 1; }
        .fortoi-desc { font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.8); line-height: 1.65; }

        /* MÉTHODE : off-white */
        .methode-sec { padding: 96px 80px; background: #F4F3F0; }
        .methode-steps { margin-top: 48px; max-width: 680px; }
        .methode-step { display: flex; gap: 28px; padding: 28px 0; border-bottom: 1px solid #E8E7E3; transition: padding-left 0.3s; }
        .methode-step:last-child { border-bottom: none; }
        .methode-step:hover { padding-left: 8px; }
        .step-lbl { font-family: var(--font-heading); font-size: 42px; color: rgba(7,2,101,0.2); line-height: 1; flex-shrink: 0; width: 56px; transition: color 0.3s; }
        .methode-step:hover .step-lbl { color: #070265; }
        .step-ti { font-size: 16px; font-weight: 600; color: #070265; margin-bottom: 8px; }
        .step-de { font-size: 14px; font-weight: 300; color: var(--ink); line-height: 1.7; }

        /* INCLUS + THOMAS : off-white */
        .inclus-thomas { padding: 64px 80px 96px; background: #F4F3F0; }
        .inclus-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; max-width: 680px; margin-top: 32px; margin-bottom: 64px; }
        .inclus-item { display: flex; align-items: flex-start; gap: 12px; padding: 16px 18px; background: #FEFEFE; border-radius: 6px; border: 1px solid #E8E7E3; }
        .inclus-dot { width: 6px; height: 6px; border-radius: 50%; background: #070265; margin-top: 7px; flex-shrink: 0; }
        .inclus-item p { font-size: 14px; color: var(--ink); line-height: 1.5; }
        .thomas-blk { background: #070265; border-radius: 12px; padding: 48px; max-width: 680px; }
        .thomas-blk .s-ey { color: rgba(255,255,255,0.4); }
        .thomas-blk .s-ti { color: #FEFEFE; }
        .thomas-blk .s-ti em { -webkit-text-stroke-color: #FEFEFE; }
        .thomas-blk p { font-size: 16px; font-weight: 300; color: rgba(255,255,255,0.8); line-height: 1.8; margin-bottom: 16px; }
        .anti-promise { font-style: italic; font-size: 17px; color: rgba(255,255,255,0.65); margin-top: 28px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.12); margin-bottom: 0 !important; }

        /* TÉMOIGNAGES : blanc */
        .testi-sec { padding: 80px; background: #FEFEFE; }
        .testi-list { display: flex; flex-direction: column; gap: 20px; max-width: 680px; margin-top: 40px; }
        .testi-card { background: #F4F3F0; border-radius: 8px; padding: 32px; border-left: 3px solid #070265; }
        .testi-txt { font-size: 16px; font-weight: 300; color: var(--ink); line-height: 1.8; font-style: italic; margin-bottom: 20px; }
        .testi-meta { font-size: 12px; font-weight: 600; color: #9B9A96; text-transform: uppercase; letter-spacing: 0.08em; }

        /* CTA : navy */
        .cta-sec { background: #070265; padding: 96px 80px; text-align: center; position: relative; overflow: hidden; }
        .cta-sec::before { content: 'TTR'; position: absolute; font-family: var(--font-heading); font-size: 400px; color: rgba(255,255,255,0.04); top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; white-space: nowrap; }
        .cta-sec .s-ey { color: rgba(255,255,255,0.4); }
        .cta-ti { font-family: var(--font-heading); font-size: clamp(44px, 6vw, 80px); color: #FEFEFE; line-height: 0.95; margin-bottom: 20px; }
        .cta-ti em { font-style: normal; color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.6); }
        .cta-sub { font-size: 17px; font-weight: 300; color: rgba(255,255,255,0.7); max-width: 480px; margin: 0 auto 48px; line-height: 1.6; }
        .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; position: relative; }
        .btn-inv { background: #FEFEFE; color: #070265; padding: 16px 36px; border-radius: 4px; font-family: var(--font-heading); font-size: 20px; letter-spacing: 0.06em; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-inv:hover { background: #F4F3F0; transform: translateY(-1px); }
        .btn-gw { border: 1.5px solid rgba(255,255,255,0.5); color: rgba(255,255,255,0.9); padding: 16px 36px; border-radius: 4px; font-size: 14px; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-gw:hover { border-color: #FEFEFE; color: #FEFEFE; }
        .cta-note { margin-top: 20px; font-size: 13px; color: rgba(255,255,255,0.4); position: relative; }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .reveal-left { opacity: 0; transform: translateX(-36px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .reveal.visible, .reveal-left.visible { opacity: 1; transform: translate(0); }
        .stagger-1 { transition-delay: 0.1s; } .stagger-2 { transition-delay: 0.22s; }
        .stagger-3 { transition-delay: 0.34s; } .stagger-4 { transition-delay: 0.46s; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* HERO */}
      <section className="r-hero">
        <div className="r-hero-left">
          <div className="r-breadcrumb">
            <Link href="/">Accueil</Link><span>/</span>
            <Link href="/coaching">Coaching</Link><span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.65)' }}>TrainToRestart</span>
          </div>
          <p className="r-eyebrow">TrainToRehab · Thomas Mahé, kinésithérapeute DE</p>
          <h1 className="r-title">Tu cours.<br />Tu te blesses.<br /><em>Tu recommences.</em></h1>
          <p className="r-sub">Il est temps de sortir de ce cycle. Pas avec des exercices de plus. Avec <strong>un cadre qui tient dans le temps</strong>.</p>
          <div className="r-ctas">
            <a href="/checkout/restart" className="btn-wh">Commencer — 199€/mois</a>
            <a href="#appel" className="btn-gh">Parler à Thomas d&apos;abord</a>
          </div>
          <p className="r-note">Sans engagement · Résiliable à tout moment</p>
        </div>
        <div className="r-hero-right">
          <div className="r-price-card">
            <p className="r-plabel">TrainToRestart</p>
            <div className="r-pamount">199</div>
            <p className="r-pperiod">€ / mois · sans engagement</p>
            <ul className="r-pfeatures">
              {features.map(f => <li key={f}><span className="pf-chk" />{f}</li>)}
            </ul>
            <a href="/checkout/restart" className="r-pcta">Commencer maintenant</a>
            <p className="r-pnote">Sans engagement · Résiliable à tout moment</p>
          </div>
        </div>
      </section>

      {/* PROBLÈME : blanc */}
      <section className="prose-wh">
        <div className="reveal-left prose-in">
          <p className="s-ey">Ce que tu vis</p>
          <h2 className="s-ti">Ce n&apos;est pas dans <em>ta tête.</em></h2>
          <div className="prose">
            <p>Tu t&apos;entraînes depuis trois ans. Tu connais ton corps. Tu sais quand pousser et quand lever le pied — ou tu croyais le savoir. Et puis cette douleur est apparue. Tendon, genou, périoste. Tu as attendu. Tu as vu un kiné, un médecin, un ostéo. Ça allait mieux. Et puis ça est revenu.</p>
            <p>Aujourd&apos;hui tu cours avec la peur au ventre. Chaque sortie ressemble à une négociation. Tu surveilles la douleur comme un indice boursier. Le marathon dans quatre mois est toujours là, mais il commence à ressembler à un défi impossible.</p>
            <p>Ce qui te ronge, c&apos;est l&apos;incertitude. Pas la douleur elle-même — tu l&apos;as appris à gérer. C&apos;est de ne pas savoir. Et en dessous, une peur que tu n&apos;oses pas toujours formuler : et si tu perdais ta condition pendant la reprise ?</p>
          </div>
          <span className="bridge">Ce cycle a une cause précise. Et elle n&apos;est pas ce que tu crois. →</span>
        </div>
      </section>

      {/* AGITATION : off-white */}
      <section className="prose-ow">
        <div className="reveal prose-in">
          <p className="s-ey">Pourquoi ça revient</p>
          <h2 className="s-ti">Le problème n&apos;est pas <em>ta blessure.</em></h2>
          <div className="prose">
            <p>Tu as soigné la douleur. C&apos;est différent. Le kiné t&apos;a donné des exercices. Le médecin t&apos;a dit de te reposer. L&apos;ostéo t&apos;a remis en place. Tout ça est utile. Mais personne ne t&apos;a appris à reprendre la course de façon cohérente avec ton corps qui se répare.</p>
            <p>Le cycle de la blessure chronique, c&apos;est toujours la même séquence : douleur → repos → amélioration → reprise trop rapide → rechute. À chaque tour de ce cycle, tu perds un peu de confiance. Et tu ajoutes une couche d&apos;anxiété sur ta façon de courir.</p>
            <p>Ce qui manque, c&apos;est un fil conducteur. Quelqu&apos;un qui comprend les deux côtés : ce qui se passe dans ton corps pendant la réparation, et ce que ça implique pour ton entraînement. Ce n&apos;est pas de la magie. C&apos;est de la coordination entre deux domaines que personne ne pense à connecter.</p>
          </div>
          <span className="bridge">C&apos;est exactement ce qu&apos;on construit ensemble. →</span>
        </div>
      </section>

      {/* SOLUTION : blanc */}
      <section className="prose-wh">
        <div className="reveal prose-in">
          <p className="s-ey">Ce qui manque</p>
          <h2 className="s-ti">Un cadre. <em>Pas</em> un plan.</h2>
          <div className="prose">
            <p>Un plan figé ne peut pas s&apos;adapter à ce que ton corps fait semaine après semaine. Un cadre, si. La différence : le cadre t&apos;explique les règles du jeu pour que tu puisses prendre des décisions par toi-même. L&apos;objectif, c&apos;est ton autonomie — pas ta dépendance.</p>
            <p>TrainToRestart, c&apos;est un accompagnement mensuel où on construit ensemble une logique de reprise adaptée à ta blessure, à ta morphologie et à ton objectif. On regarde chaque semaine ce qui s&apos;est passé. On ajuste. On avance.</p>
            <p>Je ne promets pas que tu seras guéri en 30 jours. Je promets que dans 30 jours, tu comprends ce qui se passe dans ton corps, tu sais comment réagir à la douleur, et tu cours sans avoir peur de chaque foulée.</p>
          </div>
          <span className="bridge">Mais avant ça — voyons si c&apos;est fait pour toi. →</span>
        </div>
      </section>

      {/* POUR TOI SI : navy */}
      <section className="fortoi-sec">
        <div className="reveal">
          <p className="s-ey">C&apos;est pour toi si</p>
          <h2 className="s-ti">Tu te <em>reconnais</em> ici</h2>
        </div>
        <div className="fortoi-grid">
          {fortoi.map(item => (
            <div key={item.n} className={`fortoi-card ${item.d}`}>
              <div className="fortoi-num">{item.n}</div>
              <p className="fortoi-desc">{item.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MÉTHODE : off-white */}
      <section className="methode-sec">
        <div className="reveal">
          <p className="s-ey">Comment ça se passe</p>
          <h2 className="s-ti">Concret. <em>Semaine</em> par semaine.</h2>
        </div>
        <div className="methode-steps">
          {steps.map((step, i) => (
            <div key={step.l} className={`methode-step reveal stagger-${i + 1}`}>
              <div className="step-lbl">{step.l}</div>
              <div><h3 className="step-ti">{step.t}</h3><p className="step-de">{step.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* INCLUS + THOMAS : off-white */}
      <section className="inclus-thomas">
        <div className="reveal">
          <p className="s-ey">Ce qui est inclus</p>
          <h2 className="s-ti">Tout ce qu&apos;il faut. <em>Rien</em> de superflu.</h2>
          <div className="inclus-grid">
            {['Appel diagnostic 45 min en visio','Appel mensuel de bilan (45 min)','Cadre de reprise personnalisé et évolutif','Suivi hebdomadaire par message','Réponses sous 24h en semaine','Accès direct à Thomas — pas une équipe'].map(item => (
              <div key={item} className="inclus-item"><div className="inclus-dot" /><p>{item}</p></div>
            ))}
          </div>
        </div>
        <div className="reveal" style={{ marginTop: '0' }}>
          <div className="thomas-blk">
            <p className="s-ey">Qui je suis</p>
            <h2 className="s-ti">Thomas Mahé</h2>
            <p>Je suis kinésithérapeute diplômé d&apos;État et je travaille exclusivement avec des coureurs depuis cinq ans. J&apos;ai un cabinet à Saint-Raphaël et un programme de coaching en ligne, TrainToRehab. Les deux sont volontairement connectés : ce que je vois en cabinet alimente ce que je fais en coaching, et inversement.</p>
            <p>Ce qui m&apos;intéresse, c&apos;est la zone grise entre la rééducation et l&apos;entraînement — l&apos;endroit où personne n&apos;est vraiment compétent à la fois. La plupart des kinés ne courent pas. La plupart des coachs ne savent pas lire une blessure. J&apos;essaie d&apos;occuper cet espace.</p>
            <p className="anti-promise">&quot;Je ne promets pas de magie. Je pose un cadre clair. Et je t&apos;explique chaque décision pour que tu puisses te passer de moi.&quot;</p>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES : blanc */}
      <section className="testi-sec">
        <div className="reveal">
          <p className="s-ey">Ils ont repris</p>
          <h2 className="s-ti">Ce qu&apos;ils <em>disent.</em></h2>
        </div>
        <div className="testi-list">
          {testimonials.map(t => (
            <div key={t.m} className={`testi-card reveal ${t.d}`}>
              <p className="testi-txt">&quot;{t.t}&quot;</p>
              <p className="testi-meta">{t.m}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL : navy */}
      <section className="cta-sec" id="appel">
        <div className="reveal">
          <p className="s-ey">Prêt à sortir du cycle</p>
          <h2 className="cta-ti">Reprends.<br /><em>Sans peur.</em><br />Cette fois.</h2>
          <p className="cta-sub">Un premier mois pour voir si le cadre te convient. Sans engagement. Sans promesse magique.</p>
          <div className="cta-btns">
            <a href="/checkout/restart" className="btn-inv">Commencer — 199€/mois</a>
            <a href="https://calendly.com/traintorehab/traintorehab-thomas-mahe" className="btn-gw">Parler à Thomas d&apos;abord</a>
          </div>
          <p className="cta-note">Résiliable à tout moment · Réponse sous 24h · Places limitées</p>
        </div>
      </section>
    </>
  )
}
