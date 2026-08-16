import { BrandFlag, BrandWordmark } from "@/components/BrandMark";

export function Footer() {
  return (
    <footer className="site-footer">
      <span className="footer-mark"><BrandWordmark registered /><BrandFlag className="footer-brand-flag" /></span>
      <span>Montréal / QC</span>
      <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a>
      <span>© 2026</span>
    </footer>
  );
}
