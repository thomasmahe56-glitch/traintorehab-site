"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "Coaching", href: "/coaching" },
  { label: "Formation", href: "/formation" },
  { label: "À propos", href: "/#a-propos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="ttr-navbar">
      <style>{`
        .ttr-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: rgba(7, 2, 101, 0.96);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .ttr-navbar-inner {
          max-width: 1152px;
          width: 100%;
          height: var(--nav-height);
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ttr-navbar-logo {
          font-family: var(--font-heading);
          color: #FEFEFE;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .ttr-navbar-logo:hover { color: #E8E7E3; }
        .ttr-navbar-links {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 32px;
          margin: 0;
          padding: 0;
        }
        .ttr-navbar-link {
          position: relative;
          color: #E8E7E3;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .ttr-navbar-link:hover,
        .ttr-navbar-link.active { color: #FEFEFE; }
        .ttr-navbar-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0;
          height: 1px;
          background: #FEFEFE;
          transition: width 0.25s ease;
        }
        .ttr-navbar-link:hover::after,
        .ttr-navbar-link.active::after { width: 100%; }
        .ttr-navbar-menu-button {
          display: none;
          width: 40px;
          height: 40px;
          border: 0;
          background: transparent;
          color: #FEFEFE;
          padding: 8px;
          cursor: pointer;
        }
        .ttr-navbar-menu-lines {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ttr-navbar-menu-lines span {
          display: block;
          width: 24px;
          height: 2px;
          background: currentColor;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .ttr-navbar-menu-lines.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .ttr-navbar-menu-lines.open span:nth-child(2) { opacity: 0; }
        .ttr-navbar-menu-lines.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
        .ttr-navbar-mobile {
          display: none;
          border-top: 1px solid rgba(255,255,255,0.1);
          background: #070265;
        }
        .ttr-navbar-mobile.open { display: block; }
        .ttr-navbar-mobile ul {
          list-style: none;
          margin: 0;
          padding: 16px 24px 20px;
          display: grid;
          gap: 14px;
        }
        @media (max-width: 767px) {
          .ttr-navbar-links { display: none; }
          .ttr-navbar-menu-button { display: block; }
          .ttr-navbar-logo { font-size: 24px; }
        }
      `}</style>
      <nav className="ttr-navbar-inner">
        {/* Logo */}
        <Link
          href="/"
          className="ttr-navbar-logo"
          onClick={() => setMenuOpen(false)}
        >
          TrainToRehab
        </Link>

        {/* Desktop links */}
        <ul className="ttr-navbar-links">
          {links.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`ttr-navbar-link${active ? " active" : ""}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Burger mobile */}
        <button
          className="ttr-navbar-menu-button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span className={`ttr-navbar-menu-lines${menuOpen ? " open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`ttr-navbar-mobile${menuOpen ? " open" : ""}`}>
        <ul>
          {links.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`ttr-navbar-link${active ? " active" : ""}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
