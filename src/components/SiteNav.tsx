import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-neutral-100">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="size-8 bg-brand rounded-md grid place-items-center text-white text-xs font-bold tracking-tight">C</div>
          <div className="leading-none">
            <span className="block font-semibold tracking-tight text-text-main">CMG</span>
            <span className="block text-[10px] uppercase tracking-widest text-text-muted">Consultants Medical Group</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-7">
          <Link to="/rooms" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors" activeProps={{ className: "text-text-main" }}>Rooms</Link>
          <Link to="/dashboard" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors" activeProps={{ className: "text-text-main" }}>Dashboard</Link>
          <Link to="/bookings" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors" activeProps={{ className: "text-text-main" }}>Bookings</Link>
          <Link to="/invoice" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors" activeProps={{ className: "text-text-main" }}>Invoices</Link>
          <Link to="/contact" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors" activeProps={{ className: "text-text-main" }}>Contact</Link>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden sm:inline-flex text-sm font-medium text-text-muted hover:text-text-main px-3 py-2">Log in</Link>
          <Link to="/signup" className="text-sm font-medium bg-brand text-white px-4 py-2 rounded-md hover:bg-brand/90 transition-colors shadow-sm">Sign up</Link>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="size-8 bg-brand rounded-md grid place-items-center text-white text-xs font-bold">C</div>
            <div className="leading-none">
              <span className="block font-semibold tracking-tight">CMG</span>
              <span className="block text-[10px] uppercase tracking-widest text-text-muted">Consultants Medical Group</span>
            </div>
          </div>
          <p className="text-sm text-text-muted max-w-sm">A trusted network of HIPAA-compliant clinical spaces for independent practitioners across the country.</p>
        </div>
        <FooterCol title="Platform" links={[["Rooms", "/rooms"], ["Dashboard", "/dashboard"], ["Invoices", "/invoice"]]} />
        <FooterCol title="Account" links={[["Sign up", "/signup"], ["Log in", "/login"], ["Bookings", "/bookings"]]} />
        <FooterCol title="Support" links={[["Contact", "/contact"], ["Help center", "/contact"], ["Compliance", "/contact"]]} />
      </div>
      <div className="border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[10px] text-text-muted uppercase tracking-widest">© 2026 Consultants Medical Group LLC</p>
          <p className="text-[10px] text-text-muted uppercase tracking-widest">HIPAA Certified • SOC 2 Type II</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-text-main mb-4">{title}</p>
      <ul className="space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link to={href} className="text-sm text-text-muted hover:text-brand transition-colors">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}