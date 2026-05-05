import Link from "next/link";

const coachingLinks = [
  { label: "TrainToRestart", href: "/coaching/restart" },
  { label: "TrainToPerform", href: "/coaching/perform" },
];

const siteLinks = [
  { label: "À propos", href: "/#a-propos" },
  { label: "Formation", href: "/formation" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-gray-light">
      <div className="container-ttr py-16 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <span className="font-heading text-white text-3xl tracking-widest">
              TRAINTOREHAB
            </span>
            <p className="font-body text-sm text-gray-mid leading-relaxed max-w-xs">
              Coaching running & rééducation. Reprends confiance dans ton corps,
              progresse durablement.
            </p>
          </div>

          {/* Coaching */}
          <div className="space-y-4">
            <h3 className="font-heading text-white text-lg tracking-wider">
              Coaching
            </h3>
            <ul className="space-y-2">
              {coachingLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-gray-mid hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site */}
          <div className="space-y-4">
            <h3 className="font-heading text-white text-lg tracking-wider">
              Site
            </h3>
            <ul className="space-y-2">
              {siteLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-gray-mid hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-gray-mid">
            © {new Date().getFullYear()} TrainToRehab — Thomas Mahé. Tous
            droits réservés.
          </p>
          <p className="font-body text-xs text-gray-mid">
            Fait avec soin pour les runners blessés
          </p>
        </div>
      </div>
    </footer>
  );
}
