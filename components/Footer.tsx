import { BrandWordmark } from "@/components/BrandMark";
import { RouteLink } from "@/components/RouteLink";
import { instagramUrl } from "@/data/contact";

export function Footer() {
  return (
    <footer className="site-footer" data-header-theme="dark">
      <span className="footer-mark"><BrandWordmark registered /></span>
      <RouteLink href="/contact">Contact ↗</RouteLink>
      <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram ↗</a>
      <span>© 2026</span>
    </footer>
  );
}
