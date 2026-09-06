"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { beatCategories } from "@/data/beats";
import { BrandWave, BrandWordmark } from "@/components/BrandMark";
import { RouteLink } from "@/components/RouteLink";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerFrosted, setHeaderFrosted] = useState(false);
  const [headerTheme, setHeaderTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();
  const homeWordmarkHidden = pathname === "/" && !headerFrosted;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- route changes must close the modal navigation
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  useEffect(() => {
    const updateHeader = () => {
      setHeaderFrosted(window.scrollY > 12);
      const sampleY = Math.min(window.innerHeight - 1, window.innerWidth <= 720 ? 66 : 76);
      const themedElement = document
        .elementsFromPoint(window.innerWidth / 2, sampleY)
        .map((element) => element.closest<HTMLElement>("[data-header-theme]"))
        .find((element): element is HTMLElement => Boolean(element));
      setHeaderTheme(themedElement?.dataset.headerTheme === "light" ? "light" : "dark");
    };
    const frame = window.requestAnimationFrame(updateHeader);
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, [pathname]);

  return (
    <>
      <header className={`site-header is-${headerTheme} ${headerFrosted ? "is-scrolled" : ""} ${pathname === "/" ? "is-home" : ""} ${homeWordmarkHidden ? "is-home-top" : ""}`}>
        <RouteLink
          className={`wordmark ${homeWordmarkHidden ? "is-hero-hidden" : ""}`}
          href="/"
          aria-label="TUR1SMO home"
          aria-hidden={homeWordmarkHidden || undefined}
          tabIndex={homeWordmarkHidden ? -1 : undefined}
        >
          <BrandWordmark registered />
          <BrandWave className="header-brand-wave" />
        </RouteLink>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="nav-group">
            <RouteLink href="/beats">Beats</RouteLink>
            <div className="nav-submenu" aria-label="Beat categories">
              {beatCategories.map((category) => (
                <RouteLink key={category} href={category === "all" ? "/beats" : `/beats?category=${category}`}>
                  {category}
                </RouteLink>
              ))}
            </div>
          </div>
          <div className="nav-group">
            <RouteLink href="/visual">Visual</RouteLink>
            <div className="nav-submenu"><RouteLink href="/visual/modeling">Modeling</RouteLink></div>
          </div>
          <RouteLink href="/about">About</RouteLink>
          <RouteLink href="/contact">Contact</RouteLink>
        </nav>
        <button className="menu-trigger" type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="mobile-menu">
          Menu
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-top">
          <RouteLink href="/" aria-label="TUR1SMO home">
            <BrandWordmark className="mobile-wordmark" registered />
          </RouteLink>
          <button type="button" onClick={() => setMenuOpen(false)}>Close</button>
        </div>
        <nav aria-label="Mobile navigation">
          <RouteLink href="/">Home <small>00</small></RouteLink>
          <RouteLink href="/beats">Beats <small>01</small></RouteLink>
          <div className="mobile-subnav">
            {beatCategories.slice(1).map((category) => <RouteLink key={category} href={`/beats?category=${category}`}>{category}</RouteLink>)}
          </div>
          <RouteLink href="/visual">Visual <small>02</small></RouteLink>
          <div className="mobile-subnav"><RouteLink href="/visual/modeling">Modeling</RouteLink></div>
          <RouteLink href="/about">About <small>03</small></RouteLink>
          <RouteLink href="/contact">Contact <small>04</small></RouteLink>
        </nav>
        <div className="mobile-menu-footer"><span>Montréal / QC</span><span>Est. 2026</span></div>
      </div>
    </>
  );
}
