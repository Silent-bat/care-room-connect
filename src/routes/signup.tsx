import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — CMG" },
      { name: "description", content: "Create your practitioner account to book HIPAA-compliant clinical rooms." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", license: "", specialty: "Dermatology" });

  return (
    <div className="bg-surface text-text-main font-sans min-h-screen flex flex-col">
      <SiteNav />
      <section className="flex-1 px-6 py-16">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-semibold tracking-tight mb-3">Join the CMG network.</h1>
          <p className="text-text-muted mb-10">Verified credentials are required. Approval typically takes 24 hours.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
            className="bg-white rounded-xl ring-1 ring-black/5 p-8 space-y-5"
          >
            <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Dr. Elias Thorne" />
            <Field label="Work email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="elias@clinic.com" />
            <Field label="Medical license ID" value={form.license} onChange={(v) => setForm({ ...form, license: v })} placeholder="MC-99201-B" />
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted block mb-2">Specialty</label>
              <select
                value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                className="w-full bg-neutral-50 border border-neutral-100 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand"
              >
                <option>Dermatology</option>
                <option>Cardiology</option>
                <option>Psychiatry</option>
                <option>General Practice</option>
                <option>Physical Therapy</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-brand text-white text-sm font-medium py-3 rounded-md mt-2">
              Create account
            </button>
            <p className="text-xs text-text-muted text-center pt-2">
              Already registered? <Link to="/dashboard" className="text-brand font-medium">Sign in</Link>
            </p>
          </form>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-neutral-50 border border-neutral-100 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand"
      />
    </div>
  );
}