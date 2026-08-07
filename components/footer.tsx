import { Logo } from "./navbar";

export function Footer() {
  return (
    <footer className="makcu-footer">
      <div className="makcu-footer-inner">
        <Logo />
        <p>Copyright &copy; 2024 - 2026 MAKCU.</p>
        <span className="makcu-footer-status"><i /> SYSTEMS ONLINE</span>
      </div>
    </footer>
  );
}
