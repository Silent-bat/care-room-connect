type Props = { data: number[]; className?: string; stroke?: string; fill?: string };

export function Sparkline({ data, className = "h-12 w-full", stroke = "var(--color-brand)", fill = "var(--color-brand-muted)" }: Props) {
  if (data.length === 0) return null;
  const w = 200;
  const h = 60;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const step = w / Math.max(data.length - 1, 1);
  const pts = data.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={className}>
      <path d={area} fill={fill} opacity={0.35} />
      <path d={line} fill="none" stroke={stroke} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 2.5 : 0} fill={stroke} />
      ))}
    </svg>
  );
}

export function BarChart({ data, className = "h-40 w-full" }: { data: { label: string; value: number }[]; className?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={`flex items-end gap-2 ${className}`}>
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-2 group">
          <div className="w-full flex-1 flex items-end">
            <div
              className="w-full rounded-t-sm bg-brand/15 group-hover:bg-brand transition-colors relative"
              style={{ height: `${(d.value / max) * 100}%`, minHeight: 2 }}
            >
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-medium text-text-main opacity-0 group-hover:opacity-100 whitespace-nowrap tabular-nums">
                ${d.value.toLocaleString()}
              </span>
            </div>
          </div>
          <span className="text-[9px] text-text-muted tabular-nums">{d.label}</span>
        </div>
      ))}
    </div>
  );
}