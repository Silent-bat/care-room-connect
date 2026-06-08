import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — CMG" },
      { name: "description", content: "Log in to your CMG practitioner account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <div className="bg-surface text-text-main font-sans min-h-screen flex flex-col">
      <SiteNav />
      <section className="flex-1 px-6 py-16 grid place-items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-text-muted text-sm mt-2">Log in to your CMG practitioner account.</p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }}
            className="bg-white rounded-xl ring-1 ring-black/5 p-8 space-y-5"
          >
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted block mb-2">Email</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-neutral-50 border border-neutral-100 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand" placeholder="you@clinic.com" />
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Password</label>
                <a className="text-[10px] text-brand font-medium">Forgot?</a>
              </div>
              <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-neutral-50 border border-neutral-100 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand" placeholder="••••••••" />
            </div>
            <button className="w-full bg-brand text-white text-sm font-medium py-3 rounded-md hover:bg-brand/90 transition-colors">Log in</button>
            <p className="text-xs text-text-muted text-center pt-2">
              New to CMG? <Link to="/signup" className="text-brand font-medium">Create an account</Link>
            </p>
          </form>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}