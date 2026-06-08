import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "My bookings — CMG" },
      { name: "description", content: "View, manage, and reschedule your CMG clinical room bookings." },
    ],
  }),
  component: BookingsPage,
});

const BOOKINGS = [
  { id: "B-1042", room: "Northshore Suite 402", date: "Oct 24, 2026", time: "09:00 – 17:00", status: "Confirmed", total: 1120 },
  { id: "B-1041", room: "West Loop Wellness Plaza", date: "Oct 22, 2026", time: "14:00 – 18:00", status: "Confirmed", total: 380 },
  { id: "B-1039", room: "St. Luke Specialist Hub", date: "Oct 18, 2026", time: "10:00 – 12:00", status: "Completed", total: 420 },
  { id: "B-1037", room: "Midtown Imaging Annex", date: "Oct 14, 2026", time: "09:00 – 11:00", status: "Cancelled", total: 0 },
];

const statusColor: Record<string, string> = {
  Confirmed: "bg-brand-muted text-brand",
  Completed: "bg-neutral-100 text-text-muted",
  Cancelled: "bg-red-50 text-red-600",
};

function BookingsPage() {
  return (
    <div className="bg-surface text-text-main font-sans min-h-screen">
      <SiteNav />
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold">Schedule</p>
              <h1 className="text-4xl font-semibold tracking-tight">My bookings</h1>
            </div>
            <Link to="/rooms" className="bg-brand text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-brand/90 transition-colors">+ New booking</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              ["4", "Total bookings"], ["2", "Upcoming"], ["$4,820", "This month"], ["92%", "Attendance"]
            ].map(([v, l]) => (
              <div key={l} className="bg-white rounded-xl ring-1 ring-black/5 p-5">
                <p className="text-2xl font-semibold tracking-tight">{v}</p>
                <p className="text-xs text-text-muted mt-1">{l}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl ring-1 ring-black/5 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-100">
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
                {BOOKINGS.map((b) => (
                  <tr key={b.id} className="hover:bg-neutral-50/50">
                    <td className="px-6 py-4 font-mono text-xs">{b.id}</td>
                    <td className="px-6 py-4 font-medium">{b.room}</td>
                    <td className="px-6 py-4 text-text-muted">{b.date}<br /><span className="text-xs">{b.time}</span></td>
                    <td className="px-6 py-4"><span className={`text-[10px] uppercase tracking-widest font-semibold px-2 py-1 rounded ${statusColor[b.status]}`}>{b.status}</span></td>
                    <td className="px-6 py-4 text-right tabular-nums font-medium">${b.total.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <Link to="/invoice" className="text-xs font-medium text-brand hover:underline">Receipt</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}