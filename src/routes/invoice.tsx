import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Printer, Plus, Trash2 } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { BOOKINGS, PRACTITIONER, TODAY_ISO, roomById } from "@/lib/cmg-data";

export const Route = createFileRoute("/invoice")({
  head: () => ({
    meta: [
      { title: "Invoice generator — CMG" },
      { name: "description", content: "Generate clinical room rental invoices with line items, totals, and tax." },
    ],
  }),
  component: InvoicePage,
});

type Line = { description: string; hours: number; rate: number };

function seedLines(): Line[] {
  const month = TODAY_ISO.slice(0, 7);
  const lines = BOOKINGS.filter((b) => b.date.startsWith(month) && b.status !== "Cancelled").map((b) => {
    const room = roomById(b.roomId);
    return {
      description: `${room?.name ?? b.roomId} — ${b.date}`,
      hours: b.hours,
      rate: room?.price ?? 0,
    };
  });
  return lines.length > 0 ? lines : [{ description: "Clinical room rental", hours: 4, rate: 120 }];
}

function InvoicePage() {
  const [lines, setLines] = useState<Line[]>(seedLines);
  const [taxRate, setTaxRate] = useState(7.25);

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.hours * l.rate, 0), [lines]);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const update = (i: number, patch: Partial<Line>) =>
    setLines((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  const remove = (i: number) => setLines((prev) => prev.filter((_, idx) => idx !== i));

  const fmt = (n: number) =>
    `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const invoiceNo = `INV-${TODAY_ISO.replace(/-/g, "").slice(0, 6)}-${PRACTITIONER.initials}`;

  return (
    <div className="bg-surface text-text-main font-sans min-h-screen">
      <SiteNav />
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold">Billing</p>
              <h1 className="text-3xl font-semibold tracking-tight">Monthly statement</h1>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md border border-neutral-200 bg-white text-text-muted hover:text-text-main">
                <Download className="size-3.5" /> Save PDF
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-brand text-white px-3 py-2 rounded-md hover:bg-brand/90"
              >
                <Printer className="size-3.5" /> Print
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl ring-1 ring-black/5 overflow-hidden">
            <div className="p-8 lg:p-10">
              <div className="flex justify-between items-start mb-10 flex-wrap gap-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="size-9 bg-brand rounded-md grid place-items-center text-white text-xs font-bold">C</div>
                    <div className="leading-none">
                      <p className="font-semibold tracking-tight">CMG</p>
                      <p className="text-[10px] uppercase tracking-widest text-text-muted">Consultants Medical Group</p>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted">100 Clinical Way, Chicago IL 60601</p>
                  <p className="text-xs text-text-muted">EIN 88-1029384 · billing@cmg-health.com</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold">Invoice</p>
                  <h4 className="text-xl font-semibold tracking-tight">#{invoiceNo}</h4>
                  <p className="text-xs text-text-muted mt-2">Issued · {TODAY_ISO}</p>
                  <p className="text-xs text-text-muted">Due · {addDays(TODAY_ISO, 15)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-neutral-100">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold mb-1.5">Billed to</p>
                  <p className="text-sm font-medium">{PRACTITIONER.name}</p>
                  <p className="text-xs text-text-muted">{PRACTITIONER.specialty}</p>
                  <p className="text-xs text-text-muted">{PRACTITIONER.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-text-muted font-semibold mb-1.5">Amount due</p>
                  <p className="text-3xl font-semibold tracking-tight text-brand tabular-nums">{fmt(total)}</p>
                </div>
              </div>

              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 text-[10px] uppercase tracking-widest text-text-muted">
                    <th className="py-3 font-semibold">Description</th>
                    <th className="py-3 font-semibold text-right w-20">Hours</th>
                    <th className="py-3 font-semibold text-right w-24">Rate</th>
                    <th className="py-3 font-semibold text-right w-28">Amount</th>
                    <th className="w-8" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {lines.map((l, i) => (
                    <tr key={i} className="group">
                      <td className="py-2.5">
                        <input
                          value={l.description}
                          onChange={(e) => update(i, { description: e.target.value })}
                          className="w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-brand rounded px-1 py-1"
                        />
                      </td>
                      <td className="py-2.5 text-right">
                        <input
                          type="number"
                          value={l.hours}
                          onChange={(e) => update(i, { hours: Number(e.target.value) || 0 })}
                          className="w-16 text-right bg-transparent focus:outline-none focus:ring-1 focus:ring-brand rounded px-1 py-1"
                        />
                      </td>
                      <td className="py-2.5 text-right">
                        <input
                          type="number"
                          value={l.rate}
                          onChange={(e) => update(i, { rate: Number(e.target.value) || 0 })}
                          className="w-20 text-right bg-transparent focus:outline-none focus:ring-1 focus:ring-brand rounded px-1 py-1"
                        />
                      </td>
                      <td className="py-2.5 text-right tabular-nums font-medium">{fmt(l.hours * l.rate)}</td>
                      <td className="py-2.5 text-right">
                        <button onClick={() => remove(i)} className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-red-500">
                          <Trash2 className="size-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={() => setLines([...lines, { description: "New line item", hours: 1, rate: 100 }])}
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand"
              >
                <Plus className="size-3.5" /> Add line
              </button>

              <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-end">
                <div className="w-full max-w-xs space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Subtotal</span>
                    <span className="tabular-nums">{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-text-muted">
                    <span className="flex items-center gap-1">
                      Tax{" "}
                      <input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
                        className="w-12 text-right bg-transparent border-b border-neutral-200 focus:outline-none focus:border-brand"
                      />
                      %
                    </span>
                    <span className="tabular-nums">{fmt(tax)}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-neutral-200">
                    <span className="font-semibold">Total due</span>
                    <span className="text-xl font-semibold text-brand tabular-nums">{fmt(total)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-50 px-8 py-4 flex justify-between items-center flex-wrap gap-3">
              <p className="text-[10px] text-text-muted">Payment due within 15 days of issue · ACH and card accepted</p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded bg-white">Save draft</button>
                <button className="px-3 py-1.5 text-xs font-medium bg-brand text-white rounded">Send to client</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}