import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CMG" },
      { name: "description", content: "Manage your room bookings, schedule, and earnings." },
    ],
  }),
  component: DashboardPage,
});

const bookings = [
  { time: "09 AM", title: "Full Day: Northshore Suite 402", meta: "3 Patients Scheduled • 09:00 – 17:00", active: true },
  { time: "12 PM", title: "Booking Complete: Plaza Suite 10", meta: "Oct 23 • Finalized", active: false },
  { time: "02 PM", title: "Half Day: West Loop Wellness", meta: "5 Patients Scheduled • 14:00 – 18:00", active: true },
];

function DashboardPage() {
  return (
    <div className="bg-surface text-text-main font-sans min-h-screen">
      <SiteNav />
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl ring-1 ring-black/5 overflow-hidden flex flex-col md:flex-row min-h-[800px]">
            <aside className="w-full md:w-64 border-r border-neutral-100 p-6">
              <div className="flex items-center gap-3 mb-10">
                <div className="size-10 rounded-full bg-brand-muted text-brand grid place-items-center text-sm font-semibold">ET</div>
                <div>
                  <p className="text-sm font-medium">Dr. Elias Thorne</p>
                  <p className="text-[11px] text-text-muted uppercase tracking-tight">Dermatology</p>
                </div>
              </div>
              <nav className="space-y-1">
                <a className="block px-3 py-2 rounded-md bg-brand-muted text-brand text-sm font-medium">Dashboard</a>
                <a className="block px-3 py-2 rounded-md hover:bg-neutral-50 text-text-muted text-sm font-medium">Bookings</a>
                <Link to="/bookings" className="block px-3 py-2 rounded-md hover:bg-neutral-50 text-text-muted text-sm font-medium">Bookings</Link>
                <Link to="/invoice" className="block px-3 py-2 rounded-md hover:bg-neutral-50 text-text-muted text-sm font-medium">Financials</Link>
                <Link to="/rooms" className="block px-3 py-2 rounded-md hover:bg-neutral-50 text-text-muted text-sm font-medium">Browse rooms</Link>
                <a className="block px-3 py-2 rounded-md hover:bg-neutral-50 text-text-muted text-sm font-medium">Settings</a>
              </nav>
            </aside>

            <main className="flex-1 p-10 bg-neutral-50/50">
              <header className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Upcoming Schedule</h2>
                  <p className="text-sm text-text-muted">Wednesday, October 24</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Monthly Earnings</p>
                  <p className="text-xl font-medium tracking-tight text-brand">$4,820.00</p>
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {bookings.map((b) => (
                    <div key={b.title} className="bg-white p-4 rounded-lg ring-1 ring-black/5 flex items-center justify-between">
                      <div className={`flex gap-4 items-center ${b.active ? "" : "opacity-60"}`}>
                        <div className="w-12 h-12 rounded bg-neutral-50 flex flex-col items-center justify-center border border-neutral-100">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase">{b.time.split(" ")[0]}</span>
                          <span className="text-xs font-semibold">{b.time.split(" ")[1]}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{b.title}</p>
                          <p className="text-xs text-text-muted italic">{b.meta}</p>
                        </div>
                      </div>
                      <Link to="/invoice" className="text-xs font-medium text-brand border border-brand/20 rounded px-3 py-1.5">
                        {b.active ? "View Layout" : "Receipt"}
                      </Link>
                    </div>
                  ))}

                  <div className="mt-12 pt-12 border-t border-neutral-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-text-muted">Generate Monthly Statement</h3>
                      <Link to="/invoice" className="text-xs font-medium bg-brand text-white px-4 py-2 rounded">
                        Open Invoice
                      </Link>
                    </div>
                    <p className="text-sm text-text-muted">Compile this month's room usage into a downloadable invoice for billing.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg ring-1 ring-black/5">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">Quick Calendar</h4>
                    <div className="grid grid-cols-7 gap-1">
                      {[24, 25, 26, 27, 28, 29, 30].map((d, i) => (
                        <div
                          key={d}
                          className={`size-8 text-[10px] flex items-center justify-center rounded-sm font-medium ${
                            i === 0 ? "bg-brand-muted text-brand" : i === 4 || i === 5 ? "bg-neutral-100 opacity-50" : ""
                          }`}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-brand p-6 rounded-lg">
                    <p className="text-white/80 text-[10px] font-semibold uppercase tracking-wider mb-1">New Practitioner</p>
                    <h4 className="text-white font-medium mb-4">Refer a colleague and earn $200 in credits.</h4>
                    <button className="w-full bg-white text-brand text-xs font-medium py-2 rounded">Get Referral Link</button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}