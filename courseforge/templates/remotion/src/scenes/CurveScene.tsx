import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Pill, Top } from "../components/Ui";
import { accentColor, C, FONT } from "../theme";
import { cues, reveal } from "../timing";
import type { ChartSpec, SceneProps } from "../types";
import { HiText, cue } from "./common";

const colorOf = (name: string | undefined, fallback: string) => accentColor(name ?? fallback);

const Chart: React.FC<{ spec: ChartSpec; at: number; pointsAt: number }> = ({ spec, at, pointsAt }) => {
  const frame = useCurrentFrame();
  const X0 = 78;
  const Y0 = 352;
  const W = 880;
  const H = 275;
  const draw = reveal(frame, at, 48);
  const yMax = spec.yMax ?? 5;
  const sx = (x: number) => {
    const [a, b] = spec.xRange ?? [0, 1];
    return X0 + ((x - a) / (b - a)) * W;
  };
  const sy = (y: number) => Y0 - (Math.min(y, yMax) / yMax) * H;

  const yLines = [0, 0.25, 0.5, 0.75, 1].map((u) => u * yMax);
  return (
    <svg width={1000} height={440}>
      {yLines.map((v) => (
        <g key={v}>
          <line x1={X0} y1={sy(v)} x2={X0 + W} y2={sy(v)} stroke="#eeece8" strokeWidth={1.5} />
          {spec.kind !== "sigmoid" ? (
            <text x={X0 - 12} y={sy(v) + 5} fontSize={15} fill={C.dim} fontFamily={FONT.mono} textAnchor="end">{v.toFixed(v < 1 ? 2 : 1)}</text>
          ) : null}
        </g>
      ))}
      <line x1={X0} y1={Y0} x2={X0 + W + 14} y2={Y0} stroke="#cfd0d4" strokeWidth={2} />
      <line x1={X0} y1={Y0} x2={X0} y2={30} stroke="#cfd0d4" strokeWidth={2} />

      {spec.kind === "neglog" && (
        <>
          {(() => {
            const [a, b] = spec.xRange ?? [0.006, 1];
            const n = 120;
            const pts = new Array(n + 1).fill(0).map((_, k) => {
              const x = a + ((b - a) * k) / n;
              return [sx(x), sy(-Math.log(x))];
            });
            const shown = pts.slice(0, Math.max(2, Math.round(draw * n) + 1));
            return (
              <>
                <path d={`M${pts[0][0]} ${Y0} L${shown.map((p) => p.join(" ")).join(" L")} L${pts[0][0]} ${Y0} Z`} fill={`${accentColor("orange")}12`} />
                <path d={`M${shown.map((p) => p.join(" ")).join(" L")}`} fill="none" stroke={accentColor("orange")} strokeWidth={6} strokeLinecap="round" />
              </>
            );
          })()}
          {(spec.points ?? []).map((p) => (
            <g key={`${p.x}-${p.label}`} opacity={reveal(frame, pointsAt, 14)}>
              <line x1={sx(p.x)} y1={sy(-Math.log(p.x))} x2={sx(p.x)} y2={Y0} stroke={colorOf(p.color, "green")} strokeWidth={2} strokeDasharray="5 5" opacity={0.5} />
              <circle cx={sx(p.x)} cy={sy(-Math.log(p.x))} r={8} fill="#fff" stroke={colorOf(p.color, "green")} strokeWidth={4} />
              {p.label ? (
                <text x={sx(p.x) + (p.dx ?? 12)} y={sy(-Math.log(p.x)) + (p.dy ?? -12)} fontSize={19} fontWeight={700} fill={colorOf(p.color, "green")} fontFamily={FONT.sans} textAnchor={p.anchor ?? "start"}>
                  {p.label}
                </text>
              ) : null}
            </g>
          ))}
        </>
      )}

      {spec.kind === "sigmoid" && (
        <>
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <text key={v} x={X0 - 12} y={sy(v) + 5} fontSize={15} fill={C.dim} fontFamily={FONT.mono} textAnchor="end">{v.toFixed(2)}</text>
          ))}
          {(spec.series ?? [{ label: "τ=1", tau: 1 }]).map((s, i) => {
            const tau = s.tau ?? 1;
            const [a, b] = spec.xRange ?? [0, 6];
            const n = 120;
            const pts = new Array(n + 1).fill(0).map((_, k) => {
              const x = a + ((b - a) * k) / n;
              return [sx(x), Y0 - (1 / (1 + Math.exp(-x / tau))) * H];
            });
            const shown = pts.slice(0, Math.max(2, Math.round(reveal(frame, at + i * 10, 44) * n) + 1));
            const c = colorOf(s.color, ["purple", "orange", "teal"][i % 3]);
            return (
              <g key={s.label}>
                <path d={`M${shown.map((p) => p.join(" ")).join(" L")}`} fill="none" stroke={c} strokeWidth={5} strokeLinecap="round" />
                <text x={X0 + W - 4} y={30 + i * 24} fontSize={18} fontWeight={700} fill={c} fontFamily={FONT.sans} textAnchor="end">{s.label}</text>
              </g>
            );
          })}
        </>
      )}

      {spec.kind === "gap" && (() => {
        const base = spec.baseline ?? 0.62;
        const amp = spec.amplitude ?? 1.55;
        const decay = spec.decay ?? 3.2;
        const n = 80;
        const pts = new Array(n + 1).fill(0).map((_, k) => {
          const u = k / n;
          return [X0 + u * W, sy(base + amp * Math.exp(-u * decay))];
        });
        const shown = pts.slice(0, Math.max(2, Math.round(draw * n) + 1));
        const lastX = X0 + ((shown.length - 1) / n) * W;
        return (
          <>
            <path d={`M${X0} ${sy(base)} L${shown.map((p) => p.join(" ")).join(" L")} L${lastX} ${sy(base)} Z`} fill={`${accentColor("orange")}40`} />
            <line x1={X0} y1={sy(base)} x2={X0 + W} y2={sy(base)} stroke={C.soft} strokeWidth={2.5} strokeDasharray="8 7" />
            <path d={`M${shown.map((p) => p.join(" ")).join(" L")}`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
            <text x={X0 + 8} y={sy(base) - 10} fontSize={17} fill={C.soft} fontFamily={FONT.sans}>{spec.baseLabel ?? "基准"}</text>
            <text x={X0 + W - 6} y={sy(base + amp) - 10} fontSize={17} fill={C.ink} fontFamily={FONT.sans} textAnchor="end">{spec.topLabel ?? "总量"}</text>
          </>
        );
      })()}

      {spec.kind === "bars" && (() => {
        const bars = spec.bars ?? [];
        const max = Math.max(...bars.map((b) => b.value), 1);
        const bw = W / Math.max(bars.length, 1) * 0.55;
        return bars.map((b, i) => {
          const g = reveal(frame, at + i * 5, 24);
          const x = X0 + (i + 0.5) * (W / Math.max(bars.length, 1)) - bw / 2;
          const h = (b.value / max) * H * 0.9 * g;
          const c = colorOf(b.color, ["orange", "blue", "teal", "purple"][i % 4]);
          return (
            <g key={b.label}>
              <rect x={x} y={Y0 - h} width={bw} height={h} rx={8} fill={c} />
              <text x={x + bw / 2} y={Y0 + 26} fontSize={18} fill={C.ink} fontFamily={FONT.sans} textAnchor="middle">{b.label}</text>
              <text x={x + bw / 2} y={Y0 - h - 10} fontSize={17} fill={C.soft} fontFamily={FONT.mono} textAnchor="middle">{b.value.toFixed(2)}</text>
            </g>
          );
        });
      })()}

      <text x={X0 + W} y={Y0 + 50} fontSize={17} fill={C.soft} fontFamily={FONT.sans} textAnchor="end">{spec.xLabel ?? "x →"}</text>
      <text x={X0 - 46} y={30} fontSize={17} fill={C.soft} fontFamily={FONT.sans}>{spec.yLabel ?? "y ↑"}</text>
    </svg>
  );
};

export const CurveScene: React.FC<SceneProps> = ({ data, timing }) => {
  const frame = useCurrentFrame();
  const L = cues(timing);
  const a = accentColor(data.accent);
  const spec: ChartSpec = data.chart ?? { kind: "bars", bars: [] };
  return (
    <AbsoluteFill>
      <Top at={L[0]} kicker={data.kicker ?? "THE CURVE"} color={a}>
        <HiText text={data.title ?? timing.zh} highlight={data.highlight} color={a} />
      </Top>
      <div style={{ position: "absolute", left: 120, top: 330, display: "flex", gap: 36 }}>
        <Enter at={cue(L, 0) - 4}>
          <Card style={{ width: 1080, height: 540, padding: "22px 26px" }}>
            <Chart spec={spec} at={cue(L, 0)} pointsAt={cue(L, 1)} />
          </Card>
        </Enter>
        <Enter at={cue(L, 1) - 4}>
          <Card accent={a} style={{ width: 560, height: 540, padding: "34px 38px" }}>
            <div style={{ fontFamily: FONT.sans, fontSize: 20, fontWeight: 800, color: a, letterSpacing: 2 }}>READ THE PLOT</div>
            {data.formula ? <div style={{ fontFamily: FONT.mono, fontSize: 27, color: C.ink, marginTop: 16, whiteSpace: "pre-wrap" }}>{data.formula}</div> : null}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 24 }}>
              {(data.bullets ?? []).map((b, i) => (
                <div key={b} style={{ fontFamily: FONT.sans, fontSize: 23, color: C.ink, lineHeight: 1.5, opacity: reveal(frame, cue(L, 1) + i * 14, 14) }}>
                  <span style={{ color: a, fontWeight: 800, marginRight: 8 }}>→</span>
                  {b}
                </div>
              ))}
            </div>
            {data.stamp ? <Pill icon="✓" color={C.green} size={20} style={{ marginTop: 24 }}>{data.stamp}</Pill> : null}
          </Card>
        </Enter>
      </div>
    </AbsoluteFill>
  );
};
