import { BrandWave, BrandWordmark } from "@/components/BrandMark";

export function Footer() {
  return (
    <footer className="site-footer" data-header-theme="dark">
      <span className="footer-mark"><BrandWordmark registered /><BrandWave className="footer-brand-wave" /></span>
      <span>Montréal / QC</span>
      <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a>
      <span>© 2026</span>
    </footer>
  );
}
