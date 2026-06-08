import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import room1 from "@/assets/room-1.jpg";
import room2 from "@/assets/room-2.jpg";
import room3 from "@/assets/room-3.jpg";

export const Route = createFileRoute("/rooms/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Room ${params.id} — CMG` },
      { name: "description", content: "Detailed view of a CMG clinical room: amenities, location, availability and rates." },
    ],
  }),
  component: RoomDetail,
});

const IMAGES = [room1, room2, room3];

function RoomDetail() {
  const { id } = Route.useParams();
  const img = IMAGES[id.length % 3];

  return (
    <div className="bg-surface text-text-main font-sans min-h-screen">
      <SiteNav />
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <Link to="/rooms" className="text-xs text-text-muted hover:text-text-main mb-4 inline-block">← Back to rooms</Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            <div className="lg:col-span-2 space-y-4">
              <img src={img} alt={id} className="w-full aspect-[16/10] object-cover rounded-2xl ring-1 ring-black/5" />
              <div className="grid grid-cols-3 gap-3">
                {IMAGES.map((src, i) => (
                  <img key={i} src={src} className="w-full aspect-[4/3] object-cover rounded-lg ring-1 ring-black/5" />
                ))}
              </div>

              <div className="bg-white rounded-xl ring-1 ring-black/5 p-8 mt-6">
                <h2 className="text-xl font-semibold tracking-tight mb-2">About this clinical suite</h2>
                <p className="text-text-muted leading-relaxed">
                  A fully credentialed clinical room designed for independent practitioners. Includes exam table, sink, lockable cabinetry, HIPAA-compliant disposal, and managed sterilization between bookings. Wi-Fi, EHR-ready ethernet, and integrated reception support included.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {[
                    ["280 sq ft", "Floor area"],
                    ["1 exam bed", "Furniture"],
                    ["BAA signed", "Compliance"],
                    ["24/7 access", "Availability"],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <p className="text-lg font-semibold tracking-tight">{v}</p>
                      <p className="text-[10px] uppercase tracking-widest text-text-muted">{l}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-neutral-100">
                  <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold mb-3">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {["Exam table", "Diagnostic kit", "Sterile waste", "Locked storage", "EHR ethernet", "Reception", "Wheelchair access", "On-site parking"].map((a) => (
                      <span key={a} className="text-xs bg-neutral-100 px-3 py-1.5 rounded-full">{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 self-start bg-white rounded-xl ring-1 ring-black/5 p-6 space-y-5">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold">{id.replace(/-/g, " ")}</p>
                <h1 className="text-2xl font-semibold tracking-tight mt-1">Clinical Suite</h1>
                <p className="text-sm text-text-muted mt-1">Chicago, IL • Verified facility</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-brand tabular-nums">$140</span>
                <span className="text-sm text-text-muted">/ hour</span>
              </div>
              <div className="space-y-3 border-t border-neutral-100 pt-5">
                <Field label="Date" type="date" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start" type="time" defaultValue="09:00" />
                  <Field label="End" type="time" defaultValue="13:00" />
                </div>
              </div>
              <Link to="/dashboard" className="block text-center bg-brand text-white text-sm font-medium py-3 rounded-md hover:bg-brand/90 transition-colors">
                Reserve room
              </Link>
              <p className="text-[10px] text-text-muted text-center">You won't be charged until confirmed by the facility.</p>
            </aside>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({ label, type = "text", defaultValue }: { label: string; type?: string; defaultValue?: string }) {
  return (
    <div>
      <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted block mb-1.5">{label}</label>
      <input type={type} defaultValue={defaultValue} className="w-full bg-neutral-50 border border-neutral-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand" />
    </div>
  );
}