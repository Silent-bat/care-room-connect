import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  CalendarDays,
  DollarSign,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Activity,
  Building2,
  FileText,
  Settings,
  LayoutDashboard,
  CalendarCheck,
  Bell,
  Search,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { BarChart } from "@/components/Sparkline";
import {
  BOOKINGS,
  PRACTITIONER,
  STATUS_STYLES,
  TODAY_ISO,
  bookingTotal,
  computeMetrics,
  formatShortDate,
  revenueSeries,
  roomById,
  topRooms,
} from "@/lib/cmg-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CMG" },
      { name: "description", content: "Monitor your bookings, earnings, and clinical activity at a glance." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const metrics = useMemo(() => computeMetrics(), []);
  const series = useMemo(() => revenueSeries(8), []);
  const top = useMemo(() => topRooms(4), []);
  const recent = useMemo(
    () => [...BOOKINGS].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 6),
    [],
  );
  const todayItems = useMemo(
    () => metrics.upcoming.filter((b) => b.date === TODAY_ISO),
    [metrics.upcoming],
  );
  const utilization = Math.min(
    Math.round((metrics.totalHours / (BOOKINGS.length * 8)) * 100),
    100,
  );

  return (
    <div className="bg-surface text-text-main font-sans min-h-screen">
      <SiteNav />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          <Sidebar />
          <main className="space-y-6 min-w-0">
            <Header />

            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard
                icon={DollarSign}
                label="Revenue this month"
                value={`$${metrics.monthRevenue.toLocaleString()}`}
                delta={metrics.revenueDelta}
                hint={`vs. $${metrics.lastMonthRevenue.toLocaleString()} last month`}
              />
              <KpiCard
                icon={CalendarCheck}
                label="Upcoming bookings"
                value={metrics.upcoming.length}
                hint={`${todayItems.length} scheduled today`}
              />
              <KpiCard
                icon={Clock}
                label="Clinical hours"
                value={metrics.totalHours}
                hint={`${utilization}% utilization`}
              />
              <KpiCard
                icon={Users}
                label="Patients served"
                value={metrics.totalPatients}
                hint={`${metrics.attendance}% attendance rate`}
              />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl ring-1 ring-black/5 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold">Last 8 weeks</p>
                    <h2 className="text-lg font-semibold tracking-tight mt-1">Revenue trend</h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="size-2 rounded-full bg-brand" />
                    <span className="text-text-muted">Weekly billed</span>
                  </div>
                </div>
                <BarChart data={series} className="h-48 w-full" />
              </div>

              <div className="bg-white rounded-xl ring-1 ring-black/5 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-semibold tracking-tight">Today's schedule</h2>
                  <span className="text-[10px] uppercase tracking-widest text-text-muted">{formatShortDate(TODAY_ISO)}</span>
                </div>
                {todayItems.length === 0 ? (
                  <div className="text-center py-8 text-text-muted text-sm">
                    <CalendarDays className="mx-auto mb-2 opacity-40" />
                    Nothing on the books today.
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {todayItems.map((b) => {
                      const room = roomById(b.roomId);
                      return (
                        <li key={b.id} className="flex items-start gap-3 pb-3 border-b border-neutral-100 last:border-0 last:pb-0">
                          <div className="size-9 rounded-md bg-brand-muted text-brand grid place-items-center text-[10px] font-semibold flex-shrink-0">
                            {b.start.slice(0, 2)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{room?.name}</p>
                            <p className="text-xs text-text-muted">
                              {b.start}–{b.end} · {b.patients} patients
                            </p>
                          </div>
                          <span className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded ${STATUS_STYLES[b.status]}`}>
                            {b.status}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
                <Link
                  to="/bookings"
                  className="mt-5 flex items-center justify-center gap-1 text-xs font-medium text-brand hover:underline"
                >
                  Full calendar <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl ring-1 ring-black/5 overflow-hidden">
                <div className="px-6 py-5 flex items-center justify-between border-b border-neutral-100">
                  <div>
                    <h2 className="text-sm font-semibold tracking-tight">Recent bookings</h2>
                    <p className="text-xs text-text-muted">Latest activity across all suites</p>
                  </div>
                  <Link to="/bookings" className="text-xs font-medium text-brand hover:underline">View all</Link>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-text-muted bg-neutral-50/50">
                      <th className="text-left px-6 py-2.5 font-semibold">Room</th>
                      <th className="text-left px-6 py-2.5 font-semibold">Date</th>
                      <th className="text-left px-6 py-2.5 font-semibold">Status</th>
                      <th className="text-right px-6 py-2.5 font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {recent.map((b) => {
                      const room = roomById(b.roomId);
                      return (
                        <tr key={b.id} className="hover:bg-neutral-50/50">
                          <td className="px-6 py-3">
                            <p className="font-medium text-[13px] truncate max-w-[260px]">{room?.name}</p>
                            <p className="text-[11px] text-text-muted">{room?.city} · {b.hours}h</p>
                          </td>
                          <td className="px-6 py-3 text-text-muted text-xs">{formatShortDate(b.date)}</td>
                          <td className="px-6 py-3">
                            <span className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded ${STATUS_STYLES[b.status]}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-right tabular-nums font-medium">${bookingTotal(b).toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl ring-1 ring-black/5 p-6">
                  <h2 className="text-sm font-semibold tracking-tight mb-1">Top performing suites</h2>
                  <p className="text-xs text-text-muted mb-5">By revenue, all time</p>
                  <ul className="space-y-4">
                    {top.map((r, i) => {
                      const max = top[0].revenue || 1;
                      const pct = (r.revenue / max) * 100;
                      return (
                        <li key={r.room.id}>
                          <div className="flex justify-between items-baseline mb-1.5">
                            <span className="text-xs font-medium truncate pr-2">
                              <span className="text-text-muted mr-1.5 tabular-nums">{i + 1}.</span>
                              {r.room.name.split(",")[0]}
                            </span>
                            <span className="text-xs font-semibold tabular-nums">${r.revenue.toLocaleString()}</span>
                          </div>
                          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="rounded-xl p-6 bg-gradient-to-br from-brand to-sky-700 text-white">
                  <Activity className="mb-3 opacity-90" />
                  <h3 className="font-medium leading-snug mb-2">Generate this month's statement</h3>
                  <p className="text-xs text-white/80 mb-4">
                    Roll up {metrics.completed.length} completed sessions into a single invoice.
                  </p>
                  <Link to="/invoice" className="block text-center bg-white text-brand text-xs font-semibold py-2.5 rounded-md hover:bg-white/95">
                    Open invoice
                  </Link>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MiniStat icon={CheckCircle2} label="Completed" value={metrics.completed.length} tone="text-emerald-600" />
              <MiniStat icon={CalendarDays} label="Upcoming" value={metrics.upcoming.length} tone="text-brand" />
              <MiniStat icon={AlertCircle} label="Cancelled" value={metrics.cancelled.length} tone="text-red-500" />
              <MiniStat icon={Building2} label="Suites used" value={top.length} tone="text-text-main" />
            </section>
          </main>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold">Practitioner workspace</p>
        <h1 className="text-2xl font-semibold tracking-tight mt-1">
          Welcome back, {PRACTITIONER.name.split(" ")[1]}.
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-text-muted" />
          <input
            placeholder="Search bookings, rooms…"
            className="pl-9 pr-3 py-2 text-sm bg-white border border-neutral-200 rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <button className="size-9 grid place-items-center bg-white border border-neutral-200 rounded-md text-text-muted hover:text-text-main relative">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-brand" />
        </button>
        <Link
          to="/rooms"
          className="inline-flex items-center gap-1.5 bg-brand text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-brand/90"
        >
          <PlusCircle className="size-4" /> New booking
        </Link>
      </div>
    </div>
  );
}

const NAV = [
  { label: "Overview", icon: LayoutDashboard, to: "/dashboard" as const, active: true },
  { label: "Bookings", icon: CalendarCheck, to: "/bookings" as const },
  { label: "Browse rooms", icon: Building2, to: "/rooms" as const },
  { label: "Invoices", icon: FileText, to: "/invoice" as const },
];

function Sidebar() {
  return (
    <aside className="space-y-6">
      <div className="bg-white rounded-xl ring-1 ring-black/5 p-5">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full bg-brand-muted text-brand grid place-items-center font-semibold">
            {PRACTITIONER.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{PRACTITIONER.name}</p>
            <p className="text-[10px] uppercase tracking-widest text-text-muted">{PRACTITIONER.specialty}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-text-muted">Member</p>
            <p className="text-xs font-medium">{PRACTITIONER.memberSince}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-widest text-text-muted">Tier</p>
            <p className="text-xs font-medium text-brand">Verified Pro</p>
          </div>
        </div>
      </div>

      <nav className="bg-white rounded-xl ring-1 ring-black/5 p-2">
        {NAV.map((n) => (
          <Link
            key={n.label}
            to={n.to}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              n.active ? "bg-brand-muted text-brand font-medium" : "text-text-muted hover:bg-neutral-50 hover:text-text-main"
            }`}
          >
            <n.icon className="size-4" />
            {n.label}
          </Link>
        ))}
        <div className="my-2 border-t border-neutral-100" />
        <a className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-muted hover:bg-neutral-50 hover:text-text-main cursor-pointer">
          <Settings className="size-4" />
          Settings
        </a>
      </nav>
    </aside>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  delta,
  hint,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string | number;
  delta?: number;
  hint?: string;
}) {
  const trend = delta !== undefined ? (delta >= 0 ? "up" : "down") : null;
  return (
    <div className="bg-white rounded-xl ring-1 ring-black/5 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="size-8 rounded-md bg-brand-muted text-brand grid place-items-center">
          <Icon className="size-4" />
        </div>
        {trend && (
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded ${
              trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            }`}
          >
            {trend === "up" ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            {Math.abs(delta!).toFixed(1)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      <p className="text-xs text-text-main font-medium mt-1">{label}</p>
      {hint && <p className="text-[11px] text-text-muted mt-0.5">{hint}</p>}
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof CheckCircle2;
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="bg-white rounded-xl ring-1 ring-black/5 px-5 py-4 flex items-center gap-3">
      <Icon className={`size-5 ${tone}`} />
      <div>
        <p className="text-lg font-semibold tabular-nums leading-none">{value}</p>
        <p className="text-[11px] text-text-muted mt-1">{label}</p>
      </div>
    </div>
  );
}