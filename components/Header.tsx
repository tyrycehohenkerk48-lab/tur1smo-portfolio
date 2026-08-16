"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { beatGenres } from "@/data/beats";
import { BrandFlag, BrandWordmark } from "@/components/BrandMark";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="TUR1SMO home">
          <BrandWordmark registered />
          <BrandFlag className="header-brand-flag" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="nav-group">
            <Link href="/beats">Beats</Link>
            <div className="nav-submenu" aria-label="Beat categories">
              {beatGenres.map((genre) => (
                <Link key={genre} href={genre === "all" ? "/beats" : `/beats?genre=${genre}`}>
                  {genre}
                </Link>
              ))}
            </div>
          </div>
          <div className="nav-group">
            <Link href="/visual">Visual</Link>
            <div className="nav-submenu"><Link href="/visual/modeling">Modeling</Link></div>
          </div>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <button className="menu-trigger" type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="mobile-menu">
          Menu
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-top">
          <BrandWordmark className="mobile-wordmark" registered />
          <button type="button" onClick={() => setMenuOpen(false)}>Close</button>
        </div>
        <nav aria-label="Mobile navigation">
          <Link href="/">Home <small>00</small></Link>
          <Link href="/beats">Beats <small>01</small></Link>
          <div className="mobile-subnav">
            {beatGenres.slice(1).map((genre) => <Link key={genre} href={`/beats?genre=${genre}`}>{genre}</Link>)}
          </div>
          <Link href="/visual">Visual <small>02</small></Link>
          <div className="mobile-subnav"><Link href="/visual/modeling">Modeling</Link></div>
          <Link href="/about">About <small>03</small></Link>
          <Link href="/contact">Contact <small>04</small></Link>
        </nav>
        <div className="mobile-menu-footer"><span>Montréal / QC</span><span>Est. 2026</span></div>
      </div>
    </>
  );
}
