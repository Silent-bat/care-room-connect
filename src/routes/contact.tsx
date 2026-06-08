import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CMG" },
      { name: "description", content: "Reach out to CMG for partnerships, facility onboarding, or practitioner support." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-surface text-text-main font-sans min-h-screen">
      <SiteNav />
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold mb-2">Contact</p>
            <h1 className="text-4xl font-semibold tracking-tight mb-4">Let's talk.</h1>
            <p className="text-text-muted mb-10 leading-relaxed">
              Whether you're a practitioner looking to join the network, a facility wanting to list rooms, or media — we typically reply within one business day.
            </p>

            <div className="space-y-6">
              <ContactRow label="General" value="hello@cmg-health.com" />
              <ContactRow label="Practitioner support" value="support@cmg-health.com" />
              <ContactRow label="Facility partnerships" value="partners@cmg-health.com" />
              <ContactRow label="Press" value="press@cmg-health.com" />
              <ContactRow label="Headquarters" value="100 Clinical Way, Chicago IL 60601" />
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="bg-white rounded-xl ring-1 ring-black/5 p-8 space-y-5 h-fit"
          >
            {sent ? (
              <div className="text-center py-12">
                <div className="size-12 mx-auto bg-brand-muted text-brand rounded-full grid place-items-center mb-4 text-xl">✓</div>
                <h3 className="font-semibold text-lg">Message received</h3>
                <p className="text-sm text-text-muted mt-1">We'll respond within one business day.</p>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold tracking-tight">Send a message</h2>
                <Input label="Full name" placeholder="Dr. Elias Thorne" />
                <Input label="Email" type="email" placeholder="you@clinic.com" />
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted block mb-2">Topic</label>
                  <select className="w-full bg-neutral-50 border border-neutral-100 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand">
                    <option>Practitioner onboarding</option>
                    <option>Facility partnership</option>
                    <option>Billing question</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted block mb-2">Message</label>
                  <textarea rows={5} className="w-full bg-neutral-50 border border-neutral-100 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand resize-none" placeholder="Tell us a little about what you need…" />
                </div>
                <button className="w-full bg-brand text-white text-sm font-medium py-3 rounded-md hover:bg-brand/90 transition-colors">Send message</button>
              </>
            )}
          </form>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Input({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted block mb-2">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full bg-neutral-50 border border-neutral-100 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand" />
    </div>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold mb-1">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}