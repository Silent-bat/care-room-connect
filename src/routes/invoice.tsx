import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/invoice")({
  head: () => ({
    meta: [
      { title: "Invoice generator — MedSpace" },
      { name: "description", content: "Generate clinical room rental invoices with line items, totals, and tax." },
    ],
  }),
  component: InvoicePage,
});

type Line = { description: string; hours: number; rate: number };

function InvoicePage() {
  const [lines, setLines] = useState<Line[]>([
    { description: "Northshore Suite 402 — Full Clinical Use", hours: 40, rate: 140 },
    { description: "Sterile Waste Management Surcharge", hours: 1, rate: 120 },
  ]);
  const [taxRate, setTaxRate] = useState(0);

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.hours * l.rate, 0), [lines]);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const update = (i: number, patch: Partial<Line>) =>
    setLines((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));

  const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="bg-surface text-text-main font-sans min-h-screen">
      <SiteNav />
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-muted font-semibold">Billing</p>
              <h1 className="text-3xl font-semibold tracking-tight italic">Monthly statement</h1>
            </div>
            <button
              onClick={() => window.print()}
              className="text-xs font-medium bg-brand text-white px-4 py-2 rounded"
            >
              Download / Print
            </button>
          </div>

          <div className="bg-white rounded-lg ring-1 ring-black/5 overflow-hidden shadow-sm">
            <div className="p-8">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="size-6 bg-brand rounded-sm mb-4" />
                  <p className="text-xs font-semibold">MEDSPACE SYSTEMS LLC</p>
                  <p className="text-xs text-text-muted">100 Clinical Way, Chicago IL 60601</p>
                </div>
                <div className="text-right">
                  <h4 className="text-xl font-medium">Invoice #INV-2024-102</h4>
                  <p className="text-xs text-text-muted">Date: Oct 24, 2024</p>
                  <p className="text-xs text-text-muted mt-1">Bill to: Dr. Elias Thorne</p>
                </div>
              </div>

              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 text-[10px] uppercase tracking-widest text-text-muted">
                    <th className="py-3 font-semibold">Description</th>
                    <th className="py-3 font-semibold text-right w-20">Hours</th>
                    <th className="py-3 font-semibold text-right w-24">Rate</th>
                    <th className="py-3 font-semibold text-right w-28">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {lines.map((l, i) => (
                    <tr key={i}>
                      <td className="py-3">
                        <input
                          value={l.description}
                          onChange={(e) => update(i, { description: e.target.value })}
                          className="w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-brand rounded px-1 py-1"
                        />
                      </td>
                      <td className="py-3 text-right">
                        <input
                          type="number"
                          value={l.hours}
                          onChange={(e) => update(i, { hours: Number(e.target.value) || 0 })}
                          className="w-16 text-right bg-transparent focus:outline-none focus:ring-1 focus:ring-brand rounded px-1 py-1"
                        />
                      </td>
                      <td className="py-3 text-right">
                        <input
                          type="number"
                          value={l.rate}
                          onChange={(e) => update(i, { rate: Number(e.target.value) || 0 })}
                          className="w-20 text-right bg-transparent focus:outline-none focus:ring-1 focus:ring-brand rounded px-1 py-1"
                        />
                      </td>
                      <td className="py-3 text-right tabular-nums">{fmt(l.hours * l.rate)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="pt-3">
                      <button
                        onClick={() => setLines([...lines, { description: "New line item", hours: 1, rate: 100 }])}
                        className="text-xs font-medium text-brand"
                      >
                        + Add line
                      </button>
                    </td>
                  </tr>
                  <tr className="border-t border-neutral-200 font-medium">
                    <td colSpan={3} className="py-4 text-right">Subtotal</td>
                    <td className="py-4 text-right tabular-nums">{fmt(subtotal)}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}></td>
                    <td className="py-1 text-right text-xs text-text-muted">
                      Tax{" "}
                      <input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                        className="w-12 text-right bg-transparent border-b border-neutral-200 focus:outline-none focus:border-brand"
                      />
                      %
                    </td>
                    <td className="py-1 text-right text-xs text-text-muted tabular-nums">{fmt(tax)}</td>
                  </tr>
                  <tr className="text-lg font-semibold">
                    <td colSpan={3} className="pt-4 text-right">Total due</td>
                    <td className="pt-4 text-right text-brand tabular-nums">{fmt(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="bg-neutral-50 px-8 py-4 flex justify-between items-center">
              <p className="text-[10px] text-text-muted">Payment Due within 15 days of issue.</p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded">Save Draft</button>
                <button className="px-3 py-1.5 text-xs font-medium bg-brand text-white rounded">Process Payment</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}