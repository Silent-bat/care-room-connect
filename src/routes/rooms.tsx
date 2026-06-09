import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { ROOMS } from "@/lib/cmg-data";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Clinical rooms — CMG" },
      { name: "description", content: "Browse HIPAA-compliant clinical rooms available for hourly or daily rental in your city." },
    ],
  }),
  component: RoomsPage,
});

const ALL_ROOMS = ROOMS;
const SPECIALTIES = ["All", ...Array.from(new Set(ROOMS.map((r) => r.specialty)))];

function RoomsPage() {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const rooms = ALL_ROOMS.filter((r) =>
    (filter === "All" || r.specialty === filter) &&
    (q === "" || r.name.toLowerCase().includes(q.toLowerCase()) || r.city.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="bg-surface text-text-main font-sans min-h-screen">
      <SiteNav />
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold mb-2">Inventory</p>
            <h1 className="text-4xl font-semibold tracking-tight">Available clinical rooms</h1>
            <p className="text-text-muted mt-2">Showing {rooms.length} of {ALL_ROOMS.length} verified suites.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or city…"
              className="flex-1 bg-white border border-neutral-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand"
            />
            <div className="flex gap-2 flex-wrap">
              {SPECIALTIES.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${
                    filter === s ? "bg-brand text-white" : "bg-white border border-neutral-200 text-text-muted hover:text-text-main"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((r) => (
              <Link key={r.id} to="/rooms/$id" params={{ id: r.id }} className="group block bg-white rounded-xl ring-1 ring-black/5 overflow-hidden hover:ring-brand/30 transition-all">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={r.img} alt={r.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-white/95 text-text-main px-2 py-1 rounded font-semibold">{r.specialty}</span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between gap-3 mb-1">
                    <h3 className="font-medium leading-tight">{r.name}</h3>
                    <span className="text-sm font-semibold text-brand whitespace-nowrap">${r.price}/hr</span>
                  </div>
                  <p className="text-sm text-text-muted">{r.city} • {r.sqft} sq ft</p>
                  <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between items-center">
                    <span className="text-xs text-text-muted">Available {r.available}</span>
                    <span className="text-xs font-medium text-brand">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {rooms.length === 0 && (
            <div className="text-center py-20 text-text-muted">No rooms match your filters.</div>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}