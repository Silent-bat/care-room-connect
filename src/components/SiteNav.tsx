import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-6">
      <Link to="/" className="flex items-center gap-2">
        <div className="size-8 bg-brand rounded-sm" />
        <span className="font-semibold tracking-tight text-text-main">MedSpace Systems</span>
      </Link>
      <div className="flex items-center gap-8">
        <Link to="/dashboard" className="text-sm font-medium text-text-muted hover:text-text-main">Dashboard</Link>
        <Link to="/invoice" className="text-sm font-medium text-text-muted hover:text-text-main">Invoices</Link>
        <Link to="/signup" className="text-sm font-medium bg-brand text-white px-4 py-2 rounded-md ring-1 ring-brand">Sign Up</Link>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="py-12 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="size-6 bg-brand rounded-sm" />
          <span className="text-xs font-semibold tracking-tight uppercase">MedSpace</span>
        </div>
        <p className="text-[10px] text-text-muted uppercase tracking-widest">© 2024 MedSpace Clinical Infrastructure LLC • HIPAA Certified Platform</p>
      </div>
    </footer>
  );
}