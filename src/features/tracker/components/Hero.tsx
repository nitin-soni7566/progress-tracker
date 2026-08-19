import { Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { RANKS, RANK_SHORT, TOTAL_ITEMS } from "../data/curriculum";

function currentRank(pct: number) {
  let r = RANKS[0];
  for (const rk of RANKS) if (pct >= rk.at) r = rk;
  return r;
}

interface HeroProps {
  doneCount: number;
  streak: number;
}

export function Hero({ doneCount, streak }: HeroProps) {
  const pct = Math.round((doneCount / TOTAL_ITEMS) * 100);
  const rank = currentRank(pct);

  return (
    <Card className="relative overflow-hidden rounded-2xl border border-border bg-card bg-gradient-to-b from-amber/5 to-transparent px-5 pt-7 pb-6 ring-0 sm:px-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.015)_0_1px,transparent_1px_3px)]"
      />

      <div className="relative flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber shadow-[0_0_8px_var(--amber)]" />
        Path to Senior Full-Stack
      </div>

      <div className="relative mt-3.5 mb-1 text-[clamp(26px,7vw,40px)] leading-[1.1] font-bold tracking-tight text-balance font-display">
        {rank.name}
      </div>
      <div className="relative font-mono text-sm text-muted-foreground">// {rank.note}</div>

      <div className="relative mt-6">
        <Progress value={pct} max={100}>
          <ProgressTrack className="h-2.5 border border-border bg-panel-hi">
            <ProgressIndicator className="rounded-full bg-gradient-to-r from-[#B8791A] via-amber to-amber-hi shadow-[0_0_16px_rgba(255,176,32,0.35)]" />
          </ProgressTrack>
        </Progress>
        <div className="mt-3.5 flex justify-between font-mono text-[10px] tracking-wide text-text-muted-dim">
          {RANK_SHORT.map((name, i) => (
            <span
              key={name}
              className={`flex-1 text-center transition-colors first:text-left last:text-right ${
                pct >= RANKS[i].at ? "text-amber" : ""
              }`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap gap-2.5">
        <div className="min-w-[120px] flex-1 rounded-[10px] border border-border bg-panel-hi px-4 py-3.5">
          <div className="flex items-baseline gap-1 font-mono text-2xl leading-none font-bold text-foreground">
            {pct}
            <span className="text-sm text-muted-foreground">%</span>
          </div>
          <div className="mt-1.5 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">Overall</div>
        </div>
        <div className="min-w-[120px] flex-1 rounded-[10px] border border-border bg-panel-hi px-4 py-3.5">
          <div className="flex items-baseline gap-1 font-mono text-2xl leading-none font-bold text-foreground">
            {doneCount}
            <span className="text-sm text-muted-foreground">/{TOTAL_ITEMS}</span>
          </div>
          <div className="mt-1.5 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
            Skills done
          </div>
        </div>
        <div className="min-w-[120px] flex-1 rounded-[10px] border border-border bg-panel-hi px-4 py-3.5">
          <div className="flex items-center gap-1.5 font-mono text-2xl leading-none font-bold text-foreground">
            <Flame className="h-[18px] w-[18px] fill-amber/20 text-amber" />
            {streak}
          </div>
          <div className="mt-1.5 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
            Day streak
          </div>
        </div>
      </div>
    </Card>
  );
}
