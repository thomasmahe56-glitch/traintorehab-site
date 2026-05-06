'use client'

import Link from 'next/link'
import { useEffect } from 'react'

const checkoutUrl = '/checkout/perform-coaching'
const calendlyUrl = 'https://calendly.com/traintorehab/traintorehab-thomas-mahe'

const profiles = [
  {
    tag: 'Marathon dans 5 mois',
    title: 'Tu veux un objectif propre',
    text: 'Tu as déjà couru un marathon, mais ton chrono stagne depuis deux ans. Tu veux une préparation qui tient compte de tes contraintes pro et familiales.',
  },
  {
    tag: 'Trail découverte',
    title: 'Tu veux changer de terrain',
    text: 'Tu cours sur route, tu veux basculer sur le trail. Mais tu ne sais pas comment adapter ton entraînement ni gérer les dénivelés sans te blesser.',
  },
  {
    tag: 'Coureur cadre',
    title: 'Ton planning ne ressemble à rien',
    text: "Tes semaines sont imprévisibles. Tu ne peux pas suivre un plan rigide. Tu as besoin d'une structure qui plie sans casser quand la vie s'emballe.",
  },
  {
    tag: 'Plateau long',
    title: 'Tu fais tout bien, et ça avance pas',
    text: "Tu t'entraînes depuis 3 ans, tu es régulier, tu as même lu des trucs sur la VMA et les allures. Et pourtant. Il manque quelque chose dans la logique.",
  },
]

const weeks = [
  {
    num: 'S1',
    title: 'On fait connaissance pour de vrai',
    text: "Bilan complet : tes objectifs, ton historique, tes contraintes horaires, ton niveau actuel. On pose les bases. Pas de programme générique copié-collé.",
  },
  {
    num: 'S2',
    title: 'Ta première semaine sur mesure',
    text: "Tu reçois ton plan hebdo avec l'explication de chaque séance. Pourquoi cette allure. Pourquoi ce volume. Pas juste \"fais 45 minutes en zone 2\".",
  },
  {
    num: 'S3',
    title: 'On ajuste selon tes retours',
    text: "Tu me donnes ton ressenti en fin de semaine. Je lis entre les lignes. La semaine suivante évolue en conséquence. C'est là que le coaching commence vraiment.",
  },
  {
    num: 'S4+',
    title: 'La progression devient visible',
    text: "Au bout d'un mois, tu comprends ta logique d'entraînement. Tu cours différemment. Pas plus vite forcément, mais mieux. Et ça, ça dure.",
  },
]

const testimonials = [
  {
    quote: "J'avais suivi trois plans marathon en deux ans. Même résultat à chaque fois. Avec Thomas, j'ai compris en S2 pourquoi je stagnais : je récupérais jamais vraiment. Mon chrono a baissé de 18 minutes sur mon prochain marathon.",
    name: 'Marc, 37 ans, consultant à Lyon',
    result: 'Marathon : 3h41 → 3h23',
  },
  {
    quote: "Je courais 5 jours par semaine, souvent épuisé. Je pensais que c'était normal. Thomas m'a mis sur 4 séances, mieux construites, et j'ai retrouvé l'envie. Et je cours plus vite qu'avant.",
    name: 'Sophie, 34 ans, cadre RH à Bordeaux',
    result: "Tempo 10km : 5'10/km → 4'44/km",
  },
  {
    quote: "Je voulais finir mon premier trail 50km sans me planter physiquement. Thomas a tout construit autour de mes contraintes : 3 gamins, boulot prenant, peu de temps le week-end. Terminé en 7h04, sans bobos.",
    name: 'Romain, 41 ans, chef de projet à Nantes',
    result: 'Trail 50km : premier finish, 7h04',
  },
]

export default function PerformCoachingPage() {
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
        .p-hero { min-height: 86vh; background: #070265; color: #FEFEFE; display: grid; grid-template-columns: 1.1fr 0.9fr; padding: 80px 80px; align-items: center; position: relative; overflow: hidden; }
        .p-hero::before { content: 'PERFORM'; position: absolute; right: -18px; bottom: -24px; font-family: var(--font-heading); font-size: 260px; color: rgba(255,255,255,0.025); letter-spacing: 0.05em; pointer-events: none; }
        .p-breadcrumb { display: flex; gap: 8px; align-items: center; font-size: 12px; color: rgba(255,255,255,0.35); margin-bottom: 28px; opacity: 0; animation: fadeUp 0.5s ease forwards 0.1s; }
        .p-breadcrumb a { color: rgba(255,255,255,0.35); text-decoration: none; transition: color 0.2s; }
        .p-breadcrumb a:hover { color: rgba(255,255,255,0.75); }
        .p-badge { display: inline-flex; width: fit-content; border: 1px solid rgba(255,255,255,0.24); border-radius: 999px; padding: 7px 16px; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.65); margin-bottom: 24px; opacity: 0; animation: fadeUp 0.5s ease forwards 0.2s; }
        .p-title { font-family: var(--font-heading); font-size: clamp(52px, 6vw, 92px); line-height: 0.92; letter-spacing: 0.01em; margin-bottom: 28px; opacity: 0; animation: fadeUp 0.65s ease forwards 0.35s; }
        .p-title em { font-style: normal; color: transparent; -webkit-text-stroke: 1.5px #FEFEFE; opacity: 0.55; }
        .p-sub { max-width: 520px; font-size: 18px; font-weight: 300; line-height: 1.65; color: rgba(255,255,255,0.76); margin-bottom: 42px; opacity: 0; animation: fadeUp 0.6s ease forwards 0.55s; }
        .p-ctas { display: flex; gap: 16px; flex-wrap: wrap; opacity: 0; animation: fadeUp 0.6s ease forwards 0.72s; }
        .btn-p-white { background: #FEFEFE; color: #070265; padding: 14px 28px; border-radius: 4px; font-weight: 600; font-size: 14px; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-p-white:hover { background: #F4F3F0; transform: translateY(-1px); }
        .btn-p-ghost { border: 1px solid rgba(255,255,255,0.32); color: rgba(255,255,255,0.86); padding: 14px 28px; border-radius: 4px; font-size: 14px; text-decoration: none; transition: all 0.2s; display: inline-block; }
        .btn-p-ghost:hover { border-color: rgba(255,255,255,0.72); color: #FEFEFE; }
        .p-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 38px 34px; position: relative; z-index: 1; opacity: 0; animation: fadeUp 0.7s ease forwards 0.62s; }
        .p-card-label { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 16px; }
        .p-price { font-family: var(--font-heading); font-size: 80px; line-height: 1; }
        .p-period { color: rgba(255,255,255,0.55); font-size: 14px; margin-bottom: 26px; }
        .p-card-list { list-style: none; display: flex; flex-direction: column; gap: 12px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.12); margin-bottom: 28px; }
        .p-card-list li { display: flex; gap: 10px; color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.45; }
        .p-dot { width: 7px; height: 7px; border-radius: 50%; background: #FEFEFE; opacity: 0.55; margin-top: 7px; flex-shrink: 0; }

        .p-section { padding: 96px 80px; background: #FEFEFE; }
        .p-section.alt { background: #F4F3F0; }
        .p-inner { max-width: 720px; }
        .p-ey { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #9B9A96; margin-bottom: 16px; }
        .p-h2 { font-family: var(--font-heading); font-size: clamp(36px, 4vw, 58px); color: #070265; line-height: 0.95; letter-spacing: 0.01em; margin-bottom: 28px; }
        .p-h2 em { font-style: normal; color: transparent; -webkit-text-stroke: 1.5px #070265; opacity: 0.35; }
        .p-prose p { font-size: 17px; font-weight: 300; color: #12102e; line-height: 1.8; margin-bottom: 22px; }
        .p-prose strong { color: #070265; font-weight: 500; }
        .p-bridge { font-size: 16px; color: #070265; font-weight: 500; font-style: italic; padding-top: 12px; }

        .profile-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; max-width: 860px; margin-top: 40px; }
        .profile-card { background: #FEFEFE; border: 1px solid #E8E7E3; border-radius: 8px; padding: 28px; opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.2s; }
        .profile-card.visible { opacity: 1; transform: translateY(0); }
        .profile-card:hover { box-shadow: 0 18px 50px rgba(7,2,101,0.08); }
        .profile-tag { display: inline-flex; background: #F4F3F0; color: #070265; border: 1px solid #E8E7E3; border-radius: 999px; padding: 5px 11px; font-size: 11px; margin-bottom: 14px; }
        .profile-card h3, .week-content h3 { font-size: 16px; color: #070265; font-weight: 600; margin-bottom: 8px; }
        .profile-card p, .week-content p { font-size: 14px; color: #3D3C38; line-height: 1.65; font-weight: 300; }

        .weeks { max-width: 720px; margin-top: 42px; }
        .week { display: grid; grid-template-columns: 64px 1fr; gap: 26px; padding: 28px 0; border-bottom: 1px solid #E8E7E3; opacity: 0; transform: translateX(-24px); transition: opacity 0.6s ease, transform 0.6s ease, padding-left 0.25s; }
        .week.visible { opacity: 1; transform: translateX(0); }
        .week:hover { padding-left: 8px; }
        .week:last-child { border-bottom: none; }
        .week-num { font-family: var(--font-heading); font-size: 44px; color: rgba(7,2,101,0.2); line-height: 1; }

        .thomas-block { max-width: 760px; background: #070265; border-radius: 12px; padding: 44px; display: grid; grid-template-columns: 72px 1fr; gap: 28px; color: #FEFEFE; }
        .avatar { width: 72px; height: 72px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.22); display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 28px; color: rgba(255,255,255,0.8); }
        .thomas-block p { font-size: 16px; color: rgba(255,255,255,0.8); line-height: 1.78; font-weight: 300; margin-bottom: 16px; }
        .thomas-block p:last-child { margin-bottom: 0; font-style: italic; color: rgba(255,255,255,0.66); padding-top: 8px; }

        .testimonials { max-width: 780px; display: flex; flex-direction: column; gap: 20px; margin-top: 42px; }
        .testi { background: #F4F3F0; border-radius: 8px; border-left: 3px solid #070265; padding: 30px; opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .testi.visible { opacity: 1; transform: translateY(0); }
        .testi-quote { font-size: 16px; line-height: 1.75; color: #12102e; font-weight: 300; font-style: italic; margin-bottom: 18px; }
        .testi-meta { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #9B9A96; }
        .testi-result { color: #070265; font-weight: 600; }

        .cta-perform { background: #070265; color: #FEFEFE; text-align: center; padding: 96px 80px; position: relative; overflow: hidden; }
        .cta-perform::before { content: 'TTR'; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-family: var(--font-heading); font-size: 400px; color: rgba(255,255,255,0.04); pointer-events: none; }
        .cta-perform .p-ey { color: rgba(255,255,255,0.45); }
        .cta-perform .p-h2 { color: #FEFEFE; }
        .cta-sub { max-width: 460px; margin: 0 auto 44px; color: rgba(255,255,255,0.72); font-weight: 300; line-height: 1.65; }
        .cta-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; max-width: 720px; margin: 0 auto; position: relative; }
        .cta-box { border: 1px solid rgba(255,255,255,0.16); border-radius: 8px; padding: 30px 26px; text-align: left; background: rgba(255,255,255,0.04); }
        .cta-label { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.42); margin-bottom: 14px; }
        .cta-box h3 { font-size: 17px; color: #FEFEFE; margin-bottom: 8px; }
        .cta-box p { font-size: 14px; color: rgba(255,255,255,0.66); line-height: 1.6; margin-bottom: 24px; }
        .cta-price { font-family: var(--font-heading); font-size: 40px; line-height: 1; margin-bottom: 22px; }
        .cta-price span { font-family: var(--font-body); font-size: 14px; color: rgba(255,255,255,0.52); font-weight: 300; }
        .cta-box a { width: 100%; text-align: center; }

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
          .p-hero { grid-template-columns: 1fr; padding: 72px 28px; gap: 46px; }
          .p-section, .cta-perform { padding: 72px 28px; }
          .profile-grid, .cta-grid { grid-template-columns: 1fr; }
          .thomas-block { grid-template-columns: 1fr; padding: 32px; }
        }
      `}</style>

      <section className="p-hero">
        <div>
          <div className="p-breadcrumb">
            <Link href="/">Accueil</Link><span>/</span>
            <Link href="/coaching">Coaching</Link><span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.65)' }}>TrainToPerform Coaching</span>
          </div>
          <div className="p-badge">TrainToPerform Coaching</div>
          <h1 className="p-title">Tu t&apos;entraînes.<br />Tu ne <em>progresses</em> plus.</h1>
          <p className="p-sub">Un coaching course à pied fait pour les coureurs réguliers qui stagnent depuis trop longtemps, et qui veulent enfin comprendre pourquoi.</p>
          <div className="p-ctas">
            <a href={checkoutUrl} className="btn-p-white">Commencer maintenant, 199€/mois</a>
            <a href="#appel" className="btn-p-ghost">Appel gratuit d&apos;abord</a>
          </div>
        </div>
        <div className="p-card">
          <p className="p-card-label">Coaching mensuel</p>
          <div className="p-price">199</div>
          <p className="p-period">€ / mois · sans engagement</p>
          <ul className="p-card-list">
            {['Bilan complet et objectifs clarifiés', 'Plan hebdomadaire sur mesure', 'Ajustements selon tes retours', 'Accès direct à Thomas sur WhatsApp', 'Logique expliquée derrière chaque séance'].map((item) => (
              <li key={item}><span className="p-dot" />{item}</li>
            ))}
          </ul>
          <a href={checkoutUrl} className="btn-p-white">Rejoindre TrainToPerform</a>
        </div>
      </section>

      <section className="p-section">
        <div className="p-inner reveal-left">
          <p className="p-ey">Ce que tu vis</p>
          <h2 className="p-h2">Ça fait des mois que tu fais <em>bien.</em></h2>
          <div className="p-prose">
            <p>Tu sors courir régulièrement. Tu respectes tes séances. Tu regardes ta montre, tu analyses tes données. Et pourtant, au prochain chrono, c&apos;est la même chose. Ou presque.</p>
            <p>Tu as essayé les plans Garmin. Les programmes YouTube. Les applis qui promettent de te transformer en 12 semaines. Certains étaient corrects. Aucun ne tenait vraiment compte de toi : tes horaires, tes nuits courtes, le mercredi ou tu bosses tard, le week-end ou tu as enfin du temps.</p>
            <p>Ce qui t&apos;énerve, c&apos;est pas l&apos;effort. Tu n&apos;as pas peur de te donner. Ce qui t&apos;énerve, c&apos;est de ne pas savoir pourquoi ça ne bouge pas. Tu fais le boulot, mais tu n&apos;as pas les réponses.</p>
            <p className="p-bridge">Et quelque part, tu commences à douter que quelque chose puisse vraiment changer.</p>
          </div>
        </div>
      </section>

      <section className="p-section alt">
        <div className="p-inner reveal">
          <p className="p-ey">Pourquoi ça bloque</p>
          <h2 className="p-h2">Le problème, c&apos;est pas le volume. C&apos;est la <em>logique.</em></h2>
          <div className="p-prose">
            <p>La plupart des coureurs qui stagnent ne manquent pas de motivation. Ils manquent de cohérence dans leur charge. Un jour trop fort, trois jours trop légers, une semaine ratée à cause du boulot, et on recommence depuis zéro sans le savoir.</p>
            <p>Les plans génériques ignorent deux choses : comment ton corps récupère, et comment ta vie fonctionne. Un bon plan ne te demande pas de t&apos;adapter à lui. C&apos;est lui qui s&apos;adapte à toi, semaine après semaine.</p>
            <p>Le progrès en course à pied, c&apos;est pas mystérieux. C&apos;est de la biologie appliquée à de la régularité. Quand les deux s&apos;alignent, ça avance. Quand ils s&apos;ignorent, tu tournes en rond.</p>
            <p className="p-bridge">La question, c&apos;est pas &quot;est-ce que tu peux progresser&quot;. C&apos;est &quot;est-ce que tu travailles avec la bonne logique&quot;.</p>
          </div>
        </div>
      </section>

      <section className="p-section">
        <div className="p-inner reveal">
          <p className="p-ey">Ce qui change</p>
          <h2 className="p-h2">Pas un plan. Un cadre <em>vivant.</em></h2>
          <div className="p-prose">
            <p>TrainToPerform Coaching, c&apos;est pas un programme PDF que tu suis seul dans ton coin. C&apos;est une collaboration. Chaque semaine, on ajuste. Si tu as mal dormi, si tu as eu une semaine de feu au boulot, si tu ressens quelque chose d&apos;inhabituel dans une jambe, ça change la semaine d&apos;après.</p>
            <p>Je suis kinésithérapeute spécialisé course à pied. Je vois comment les corps répondent à la charge, pas juste comment les chronos évoluent. Je comprends la différence entre une fatigue utile et une fatigue qui annonce un pépin. Et je t&apos;explique pourquoi chaque séance est là.</p>
            <p>Pas d&apos;appli froide. Pas de chatbot. Tu as accès à moi sur WhatsApp, directement. Une vraie relation de coaching, pas un abonnement à une plateforme.</p>
            <p className="p-bridge">L&apos;objectif, c&apos;est que tu deviennes autonome. Pas que tu deviennes dépendant de moi.</p>
          </div>
        </div>
      </section>

      <section className="p-section alt">
        <div className="reveal">
          <p className="p-ey">C&apos;est pour toi si</p>
          <h2 className="p-h2">Quatre profils qui <em>progressent</em> ici.</h2>
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

      <section className="p-section">
        <div className="reveal">
          <p className="p-ey">Comment ça se passe</p>
          <h2 className="p-h2">Semaine par semaine, voilà ce qui se <em>passe.</em></h2>
        </div>
        <div className="weeks">
          {weeks.map((week, index) => (
            <div key={week.num} className={`week reveal stagger-${index + 1}`}>
              <div className="week-num">{week.num}</div>
              <div className="week-content">
                <h3>{week.title}</h3>
                <p>{week.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-section alt">
        <div className="reveal">
          <p className="p-ey">Thomas Mahé</p>
          <h2 className="p-h2">Pourquoi ça n&apos;est pas que du <em>coaching.</em></h2>
          <div className="thomas-block">
            <div className="avatar">TM</div>
            <div>
              <p>Je suis kinésithérapeute diplômé d&apos;État. Je travaille en cabinet à Saint-Raphaël, spécialisé en sport et traumatologie. En parallèle, j&apos;ai fondé TrainToRehab pour aider les coureurs à l&apos;éloignement, d&apos;abord ceux qui se blessent, maintenant ceux qui stagnent.</p>
              <p>Je coache 13 000 personnes sur Instagram. Mais mes clients en coaching sont peu nombreux, et c&apos;est voulu. Je préfère travailler sérieusement avec quelques personnes plutôt que de vendre un plan à des centaines.</p>
              <p>Je ne garantis pas de PR. Je garantis une logique qui tient.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="p-section">
        <div className="reveal">
          <p className="p-ey">Ils ont progressé</p>
          <h2 className="p-h2">Trois coureurs, trois <em>histoires.</em></h2>
        </div>
        <div className="testimonials">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.name} className={`testi reveal stagger-${index + 1}`}>
              <p className="testi-quote">&quot;{testimonial.quote}&quot;</p>
              <div className="testi-meta">
                <span>{testimonial.name}</span>
                <span className="testi-result">{testimonial.result}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-perform" id="appel">
        <div className="reveal">
          <p className="p-ey">On y va</p>
          <h2 className="p-h2">Tu progresses ou tu restes <em style={{ WebkitTextStrokeColor: '#FEFEFE' }}>là.</em></h2>
          <p className="cta-sub">Deux façons de commencer. Les deux mènent au même endroit.</p>
          <div className="cta-grid">
            <div className="cta-box">
              <div className="cta-label">Direct</div>
              <h3>Je commence maintenant</h3>
              <p>Tu rejoins directement. On commence le bilan dès cette semaine.</p>
              <div className="cta-price">199€ <span>/ mois, sans engagement</span></div>
              <a href={checkoutUrl} className="btn-p-white">Rejoindre TrainToPerform</a>
            </div>
            <div className="cta-box">
              <div className="cta-label">Appel d&apos;abord</div>
              <h3>On se parle 30 min</h3>
              <p>On vérifie ensemble que ça a du sens pour toi. Pas de pression, pas de script de vente.</p>
              <div className="cta-price" style={{ fontSize: 26, paddingTop: 14 }}>Appel gratuit</div>
              <a href={calendlyUrl} className="btn-p-ghost">Réserver un appel</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
