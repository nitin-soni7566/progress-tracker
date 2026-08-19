import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChecklistItem } from "./ChecklistItem";
import type { CurriculumPhase, ProgressState } from "../types";

interface PhaseCardProps {
  phase: CurriculumPhase;
  index: number;
  done: number;
  isCurrent: boolean;
  state: ProgressState;
  onToggleItem: (id: string) => void;
}

export function PhaseCard({ phase, index, done, isCurrent, state, onToggleItem }: PhaseCardProps) {
  const [open, setOpen] = useState(isCurrent);
  const total = phase.items.length;
  const complete = done === total;
  const pct = Math.round((done / total) * 100);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "mt-[18px] overflow-hidden rounded-2xl border bg-card",
        isCurrent ? "border-amber-line" : "border-border"
      )}
    >
      <CollapsibleTrigger className="flex w-full items-center gap-4 bg-transparent px-[18px] py-5 text-left select-none sm:px-[22px]">
        <div className="shrink-0 rounded-lg border border-amber-line bg-amber-soft px-[9px] py-1.5 font-mono text-xs font-bold text-amber">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5 font-display text-[16px] font-semibold tracking-tight sm:text-[17px]">
            {phase.name}
            {complete ? (
              <Badge className="rounded-[5px] border-amber bg-amber px-[7px] py-[3px] font-mono text-[10px] font-medium tracking-[0.08em] text-background uppercase">
                complete
              </Badge>
            ) : isCurrent ? (
              <Badge
                variant="outline"
                className="rounded-[5px] border-amber-line bg-amber-soft px-[7px] py-[3px] font-mono text-[10px] font-medium tracking-[0.08em] text-amber uppercase"
              >
                in progress
              </Badge>
            ) : null}
          </div>
          <div className="mt-[3px] font-mono text-[12.5px] text-muted-foreground">{phase.meta}</div>
        </div>
        <div className="shrink-0 font-mono text-[13px] font-bold text-foreground">
          {done}
          <span className="font-normal text-text-muted-dim">/{total}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-[18px] w-[18px] shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </CollapsibleTrigger>

      <Progress value={pct} max={100}>
        <ProgressTrack className="h-[3px] rounded-none bg-panel-hi">
          <ProgressIndicator className="rounded-none bg-amber" />
        </ProgressTrack>
      </Progress>

      <CollapsibleContent className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up">
        <div className="px-3 pt-1.5 pb-3.5">
          {phase.items.map((item) => (
            <ChecklistItem key={item.id} item={item} checked={!!state[item.id]} onToggle={onToggleItem} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
