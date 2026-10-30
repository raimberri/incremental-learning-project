import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, Enter, Hi, Photo, Pill, PopPill, Stamp, Top } from "../components/Ui";
import { C, FONT } from "../theme";
import { cues, reveal, sceneById, span } from "../timing";

const scene = sceneById("sgd");
const A = C.green;

const COLS = 12;
const ROWS = 8;
const BATCH = 24;

export const SgdScene: React.FC = () => {
  const frame = useCurrentFrame();
  const L = cues(scene);
  const full = span(frame, 0, L[4] - 4, 14);
  const noise = span(frame, L[4] - 4, L[7] - 4, 12);
  const chemo = reveal(frame, L[7] - 4, 16);

  return (
    <AbsoluteFill>
      {/* ── why not the whole set ── */}
      <AbsoluteFill style={{ opacity: full }}>
        <Top at={L[0]} kicker="STOCHASTIC" color={A}>
          梯度要对<Hi color={A} marker at={L[0] + 24}>整个训练集</Hi>求平均
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[0]}>
            <Card style={{ width: 840, height: 480, padding: "28px 34px" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 26, fontWeight: 800, color: C.ink }}>训练集（示意）</div>
                <div style={{ fontFamily: FONT.mono, fontSize: 20, color: C.soft }}>12 × 8 = 96 条</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: 9, marginTop: 18 }}>
                {new Array(COLS * ROWS).fill(0).map((_, k) => {
                  const inBatch = k < BATCH;
                  const on = inBatch ? reveal(frame, L[2] + Math.floor(k / 6) * 2, 8) : 0;
                  return (
                    <div
                      key={k}
                      style={{
                        height: 30,
                        borderRadius: 8,
                        background: inBatch ? `rgba(47,158,110,${0.16 + on * 0.74})` : "rgba(31,36,48,0.07)",
                        border: inBatch ? `2px solid ${C.green}` : "2px solid transparent",
                        boxSizing: "border-box",
                      }}
                    />
                  );
                })}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, background: C.green }} />
                <div style={{ fontFamily: FONT.sans, fontSize: 22, color: C.soft }}>这一批 24 条，只算一次梯度</div>
                <div style={{ marginLeft: "auto" }}>
                  <PopPill at={L[2] + 14} icon="▦" color={A} size={20}>
                    mini-batch
                  </PopPill>
                </div>
              </div>
            </Card>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 1000, top: 330, width: 800 }}>
          <Enter at={L[1] - 2}>
            <Card style={{ height: 480, padding: "34px 38px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: C.dim, letterSpacing: 2 }}>COST PER STEP</div>
              <div style={{ marginTop: 26 }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 25, color: C.ink, fontWeight: 700 }}>全量梯度</div>
                <div style={{ height: 30, borderRadius: 8, background: "#ecebe8", marginTop: 8, overflow: "hidden" }}>
                  <div style={{ width: `${reveal(frame, L[1] + 8, 26) * 100}%`, height: "100%", background: `${C.red}cc` }} />
                </div>
                <div style={{ fontFamily: FONT.mono, fontSize: 20, color: C.red, marginTop: 6 }}>≈ N 次前向 · 算不起</div>
              </div>
              <div style={{ marginTop: 30 }}>
                <div style={{ fontFamily: FONT.sans, fontSize: 25, color: C.ink, fontWeight: 700 }}>mini-batch</div>
                <div style={{ height: 30, borderRadius: 8, background: "#ecebe8", marginTop: 8, overflow: "hidden" }}>
                  <div style={{ width: `${reveal(frame, L[2] + 6, 26) * 8}%`, height: "100%", background: `${C.green}cc` }} />
                </div>
                <div style={{ fontFamily: FONT.mono, fontSize: 20, color: C.green, marginTop: 6 }}>32 次 · 便宜且够用</div>
              </div>
              <div style={{ marginTop: 30, paddingTop: 20, borderTop: `1.5px solid ${C.line}`, fontFamily: FONT.sans, fontSize: 24, color: C.soft, lineHeight: 1.6 }}>
                用一小部分样本，估计整体。
                <br />
                这正是统计学的核心方法。
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── noise is a feature ── */}
      <AbsoluteFill style={{ opacity: noise }}>
        <Top at={L[4]} kicker="WHY NOISE HELPS" color={A}>
          噪声看着是缺点，<Hi color={A} marker at={L[5] + 22}>其实是优点</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[4]}>
            <Photo src="img/bacteria.jpg" w={600} h={470} from={L[4]}>
              <div style={{ position: "absolute", left: 22, bottom: 22 }}>
                <PopPill at={L[7] + 6} icon="⌁" color={A}>
                  大肠杆菌
                </PopPill>
              </div>
            </Photo>
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 780, top: 330, width: 1020 }}>
          <Enter at={L[4] + 6}>
            <Card style={{ height: 470, padding: "34px 40px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: A, letterSpacing: 2 }}>STOCHASTIC GRADIENT DESCENT</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 24 }}>
                {[
                  ["①", "跳出浅坑", "噪声让你不会卡在第一个坑里", C.blue, L[5]],
                  ["②", "自带正则化", "不让你死记每一条样本", C.purple, L[6]],
                  ["③", "便宜", "一小批数据就能估一个方向", C.green, L[6]],
                ].map(([i, t, s, c, at]) => (
                  <div key={t as string} style={{ display: "flex", alignItems: "center", gap: 18, opacity: reveal(frame, (at as number) + 8, 14) }}>
                    <div style={{ width: 44, height: 44, borderRadius: 22, background: `${c as string}18`, color: c as string, fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i}</div>
                    <div style={{ fontFamily: FONT.sans, fontSize: 32, fontWeight: 800, color: C.ink, width: 190 }}>{t}</div>
                    <div style={{ fontFamily: FONT.sans, fontSize: 26, color: C.soft }}>{s}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 26, paddingTop: 20, borderTop: `1.5px solid ${C.line}` }}>
                <JaggedPath at={L[5] + 10} />
                <div style={{ fontFamily: FONT.sans, fontSize: 23, color: C.soft, lineHeight: 1.55 }}>
                  全程梯度是平滑下坡；
                  <br />
                  抽样梯度是带噪声的折线。
                </div>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>

      {/* ── chemotaxis ── */}
      <AbsoluteFill style={{ opacity: chemo }}>
        <Top at={L[7]} kicker="CHEMOTAXIS, 1972" color={A}>
          生物学里早有原型：<Hi color={A} marker at={L[7] + 26}>细菌的趋化性</Hi>
        </Top>
        <div style={{ position: "absolute", left: 120, top: 330 }}>
          <Enter at={L[7]}>
            <Photo src="img/bacteria.jpg" w={600} h={470} from={L[7]} />
          </Enter>
        </div>
        <div style={{ position: "absolute", left: 780, top: 330, width: 1020 }}>
          <Enter at={L[7] + 4}>
            <Card accent={A} style={{ height: 470, padding: "34px 40px" }}>
              <div style={{ fontFamily: FONT.sans, fontSize: 22, fontWeight: 800, color: A, letterSpacing: 2 }}>NO MAP, ONLY A LOCAL DERIVATIVE</div>
              <div style={{ fontFamily: FONT.sans, fontSize: 28, color: C.ink, marginTop: 14, lineHeight: 1.55 }}>
                它不知道食物在哪，只检测周围的浓度在
                <span style={{ color: C.green, fontWeight: 800 }}>升</span>还是在
                <span style={{ color: C.red, fontWeight: 800 }}>降</span>。
              </div>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                <ChemoRow at={L[8]} icon="↑" color={C.green} title="浓度上升" body="少翻滚，继续直游" />
                <ChemoRow at={L[9]} icon="↓" color={C.red} title="浓度下降" body="多翻滚，换个方向" />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 22 }}>
                <Stamp at={L[10]} color={A} rotate={-3}>
                  SGD 的噪声 = 细菌的翻滚
                </Stamp>
                <div style={{ marginLeft: "auto", fontFamily: FONT.sans, fontSize: 18, color: C.dim }}>
                  Berg &amp; Brown, <i>Nature</i> 239: 500–504, 1972
                </div>
              </div>
            </Card>
          </Enter>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ChemoRow: React.FC<{ at: number; icon: string; color: string; title: string; body: string }> = ({ at, icon, color, title, body }) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, at, 14);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: p, translate: `${(1 - p) * -10}px 0px` }}>
      <div style={{ width: 52, height: 52, borderRadius: 12, background: `${color}16`, color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.mono, fontSize: 30, fontWeight: 700 }}>{icon}</div>
      <div style={{ fontFamily: FONT.sans, fontSize: 28, fontWeight: 800, color: C.ink, width: 170 }}>{title}</div>
      <div style={{ fontFamily: FONT.sans, fontSize: 27, color: C.soft }}>{body}</div>
      <div style={{ marginLeft: "auto" }}>
        <Pill icon={icon} color={color} size={18}>
          {icon === "↑" ? "直游" : "翻滚"}
        </Pill>
      </div>
    </div>
  );
};

// Smooth descent vs. a noisy sampled descent.
const JaggedPath: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const pts = [
    [0, 54],
    [30, 40],
    [58, 46],
    [86, 26],
    [116, 34],
    [146, 14],
    [178, 20],
    [204, 8],
  ];
  const smooth = "M0 54 C 60 46, 120 30, 204 8";
  return (
    <svg width={210} height={66}>
      <path d={smooth} fill="none" stroke={C.dim} strokeWidth={3} strokeDasharray="6 5" />
      <path
        d={`M${pts.map((p) => p.join(" ")).join(" L")}`}
        fill="none"
        stroke={C.green}
        strokeWidth={3.5}
        strokeLinejoin="round"
        strokeDasharray="240"
        strokeDashoffset={240 * (1 - reveal(frame, at, 30))}
      />
    </svg>
  );
};
