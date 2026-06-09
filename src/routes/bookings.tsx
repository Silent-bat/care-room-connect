import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calendar, Download, Filter } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import {
  BOOKINGS,
  STATUS_STYLES,
  bookingTotal,
  computeMetrics,
  formatDate,
  roomById,
  type BookingStatus,
} from "@/lib/cmg-data";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "My bookings — CMG" },
      { name: "description", content: "View, manage, and reschedule your CMG clinical room bookings." },
    ],
  }),
  component: BookingsPage,
});

const TABS: ("All" | BookingStatus)[] = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];

function BookingsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const metrics = useMemo(() => computeMetrics(), []);
  const filtered = useMemo(
    () =>
      [...BOOKINGS]
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .filter((b) => tab === "All" || b.status === tab),
    [tab],
  );

  return (
    <div className="bg-surface text-text-main font-sans min-h-screen">
      <SiteNav />
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold">Schedule</p>
              <h1 className="text-4xl font-semibold tracking-tight">My bookings</h1>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-md border border-neutral-200 bg-white text-text-muted hover:text-text-main">
                <Download className="size-3.5" /> Export CSV
              </button>
              <Link to="/rooms" className="bg-brand text-white text-sm font-medium px-5 py-2 rounded-md hover:bg-brand/90">
                + New booking
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total bookings" value={BOOKINGS.length} />
            <StatCard label="Upcoming" value={metrics.upcoming.length} />
            <StatCard label="This month" value={`$${metrics.monthRevenue.toLocaleString()}`} />
            <StatCard label="Attendance" value={`${metrics.attendance}%`} />
          </div>

          <div className="bg-white rounded-xl ring-1 ring-black/5 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-100">
              <div className="flex gap-1 overflow-x-auto">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                      tab === t ? "bg-brand-muted text-brand" : "text-text-muted hover:text-text-main"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button className="hidden md:inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-main">
                <Filter className="size-3.5" /> Filters
              </button>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-neutral-50/50 border-b border-neutral-100">
                <tr className="text-[10px] uppercase tracking-widest text-text-muted">
                  <th className="text-left px-6 py-3 font-semibold">Booking</th>
                  <th className="text-left px-6 py-3 font-semibold">Room</th>
                  <th className="text-left px-6 py-3 font-semibold">Date / Time</th>
                  <th className="text-left px-6 py-3 font-semibold">Status</th>
                  <th className="text-right px-6 py-3 font-semibold">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((b) => {
                  const room = roomById(b.roomId);
                  return (
                    <tr key={b.id} className="hover:bg-neutral-50/50">
                      <td className="px-6 py-4 font-mono text-xs text-text-muted">{b.id}</td>
                      <td className="px-6 py-4">
                        <p className="font-medium">{room?.name}</p>
                        <p className="text-[11px] text-text-muted">{room?.city} · {room?.specialty}</p>
                      </td>
                      <td className="px-6 py-4 text-text-muted">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="size-3.5" /> {formatDate(b.date)}
                        </div>
                        <span className="text-[11px]">{b.start}–{b.end}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded ${STATUS_STYLES[b.status]}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right tabular-nums font-medium">${bookingTotal(b).toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                        <Link to="/invoice" className="text-xs font-medium text-brand hover:underline">Receipt</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-text-muted text-sm">No bookings in this view.</div>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl ring-1 ring-black/5 p-5">
      <p className="text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      <p className="text-xs text-text-muted mt-1">{label}</p>
    </div>
  );
}