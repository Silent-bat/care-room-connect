import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import room1 from "@/assets/room-1.jpg";
import room2 from "@/assets/room-2.jpg";
import room3 from "@/assets/room-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CMG — Clinical rooms for the modern practitioner" },
      { name: "description", content: "CMG (Consultants Medical Group) connects independent clinicians with HIPAA-compliant medical suites across 42 cities." },
      { property: "og:title", content: "CMG — Consultants Medical Group" },
      { property: "og:description", content: "HIPAA-compliant clinical rooms, by the hour or day." },
    ],
  }),
  component: Index,
});

const rooms = [
  { img: room1, name: "Northshore Medical Center, Suite 402", meta: "Evanston • Full Diagnostic Suite", price: "$140/hr" },
  { img: room2, name: "West Loop Wellness Plaza", meta: "Chicago • Consultation Room", price: "$95/hr" },
  { img: room3, name: "St. Luke Specialist Hub", meta: "Wicker Park • Imaging-Ready", price: "$210/hr" },
];

function Index() {
  return (
    <div className="bg-surface text-text-main font-sans min-h-screen">
      <SiteNav />
      <section className="px-6 pt-16 lg:pt-28 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand font-semibold bg-brand-muted px-3 py-1.5 rounded-full mb-6">
              <span className="size-1.5 rounded-full bg-brand" /> Now serving 42 cities
            </span>
            <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance mb-6">
              Clinical environments for <span className="italic text-brand">specialized practice.</span>
            </h1>
            <p className="text-lg text-text-muted max-w-[56ch] text-pretty">
              CMG gives independent practitioners on-demand access to certified medical suites — verified for HIPAA compliance, equipped with standard diagnostic tools, and managed by local healthcare networks.
            </p>
          </div>

          <div className="p-1 bg-neutral-200/50 rounded-xl mb-24">
            <div className="bg-white rounded-[10px] ring-1 ring-black/5 p-2 grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="px-4 py-3 flex flex-col gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Location</span>
                <span className="text-sm">Chicago, IL</span>
              </div>
              <div className="px-4 py-3 flex flex-col gap-1 border-l border-neutral-100">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Specialty</span>
                <span className="text-sm">Cardiology</span>
              </div>
              <div className="px-4 py-3 flex flex-col gap-1 border-l border-neutral-100">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Availability</span>
                <span className="text-sm">Next 7 Days</span>
              </div>
              <button className="bg-brand text-white rounded-md font-medium text-sm flex items-center justify-center h-full py-3">
                Search Available Rooms
              </button>
            </div>
          </div>

          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold">Featured this week</p>
              <h2 className="text-2xl font-semibold tracking-tight mt-1">Available clinical suites</h2>
            </div>
            <Link to="/rooms" className="text-sm font-medium text-brand hover:underline">Browse all rooms →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((r) => (
              <Link
                key={r.name}
                to="/rooms/$id"
                params={{ id: r.name.toLowerCase().split(",")[0].replace(/\s+/g, "-") }}
                className="group block"
              >
                <div className="overflow-hidden rounded-[12px] mb-4 outline-1 -outline-offset-1 outline-black/5">
                  <img src={r.img} alt={r.name} width={800} height={608} loading="lazy" className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium group-hover:text-brand transition-colors">{r.name}</h3>
                    <p className="text-sm text-text-muted">{r.meta}</p>
                  </div>
                  <span className="text-sm font-medium text-brand whitespace-nowrap">{r.price}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { k: "01", t: "Verified credentials", d: "Every practitioner is license-checked before their first booking." },
              { k: "02", t: "Compliant by default", d: "HIPAA-trained staff, signed BAAs, and audited disposal at every location." },
              { k: "03", t: "Transparent billing", d: "Hourly rates, instant invoicing, and reconciliation built into the platform." },
            ].map((f) => (
              <div key={f.k} className="bg-white p-6 rounded-xl ring-1 ring-black/5">
                <p className="text-[10px] uppercase tracking-widest text-brand font-semibold mb-3">{f.k}</p>
                <h3 className="font-medium mb-2">{f.t}</h3>
                <p className="text-sm text-text-muted">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-text-main text-white rounded-2xl p-10 lg:p-14 flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center">
            <div className="max-w-xl">
              <h3 className="text-3xl font-semibold tracking-tight mb-3">Ready to see your dashboard?</h3>
              <p className="text-white/70">Create your CMG practitioner account and start booking compliant clinical space in minutes.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup" className="bg-white text-text-main text-sm font-medium px-6 py-3 rounded-md hover:bg-neutral-100 transition-colors">Create account</Link>
              <Link to="/dashboard" className="text-sm font-medium px-6 py-3 rounded-md border border-white/20 hover:bg-white/10 transition-colors">View dashboard</Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
