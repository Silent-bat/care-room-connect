import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import room1 from "@/assets/room-1.jpg";
import room2 from "@/assets/room-2.jpg";
import room3 from "@/assets/room-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedSpace — Clinical rooms for specialized practice" },
      { name: "description", content: "Rent certified, HIPAA-compliant medical suites by the hour or day across 42 cities." },
      { property: "og:title", content: "MedSpace — Clinical rooms for specialized practice" },
      { property: "og:description", content: "Rent certified, HIPAA-compliant medical suites by the hour or day across 42 cities." },
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
      <section className="px-6 pt-12 lg:pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight leading-none text-balance mb-6 italic">
              Clinical environments for specialized practice.
            </h1>
            <p className="text-lg text-text-muted max-w-[56ch] text-pretty">
              Access certified medical suites across 42 cities. Verified for HIPAA compliance, equipped with standard diagnostic tools, and managed by local healthcare networks.
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((r) => (
              <div key={r.name} className="group">
                <img src={r.img} alt={r.name} width={800} height={608} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-[12px] mb-4 outline-1 -outline-offset-1 outline-black/5" />
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{r.name}</h3>
                    <p className="text-sm text-text-muted">{r.meta}</p>
                  </div>
                  <span className="text-sm font-medium text-brand">{r.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 flex flex-wrap gap-4">
            <Link to="/signup" className="bg-brand text-white text-sm font-medium px-6 py-3 rounded-md">Create practitioner account</Link>
            <Link to="/dashboard" className="text-sm font-medium px-6 py-3 rounded-md border border-neutral-200">View dashboard</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
