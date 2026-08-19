import { useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { CurriculumItem } from "../types";

interface ChecklistItemProps {
  item: CurriculumItem;
  checked: boolean;
  onToggle: (id: string) => void;
}

export function ChecklistItem({ item, checked, onToggle }: ChecklistItemProps) {
  const [open, setOpen] = useState(false);
  const hasLearn = item.learn.length > 0;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(item.id);
    }
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex items-start gap-0.5">
        <div
          role="checkbox"
          aria-checked={checked}
          tabIndex={0}
          onClick={() => onToggle(item.id)}
          onKeyDown={handleKeyDown}
          className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 rounded-[9px] px-3 py-2.5 outline-none transition-colors hover:bg-panel-hi focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-1"
        >
          <span
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[6px] border-[1.5px] transition-all ${
              checked ? "border-amber bg-amber" : "border-border bg-background"
            }`}
          >
            <Check
              strokeWidth={3.5}
              className={`h-3 w-3 text-background transition-all ${
                checked ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            />
          </span>
          <span className="min-w-0 text-[14.5px]">
            <span className={checked ? "text-text-muted-dim line-through decoration-text-muted-dim" : ""}>
              {item.t}
            </span>
            {item.s && (
              <small
                className={`mt-0.5 block font-mono text-[12.5px] ${
                  checked ? "text-text-muted-dim" : "text-muted-foreground"
                }`}
              >
                {item.s}
              </small>
            )}
          </span>
        </div>

        {hasLearn && (
          <CollapsibleTrigger
            aria-label={open ? "Hide what to learn" : "Show what to learn"}
            className="mt-1 grid h-[34px] w-[34px] shrink-0 place-items-center rounded-lg text-text-muted-dim transition-colors hover:bg-panel-hi hover:text-amber data-open:text-amber"
          >
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
        )}
      </div>

      {hasLearn && (
        <CollapsibleContent className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up">
          <div className="mx-3 mb-2.5 ml-[45px] rounded-[9px] border border-line-soft bg-panel-hi px-3.5 py-3">
            <div className="mb-2 font-mono text-[10px] font-bold tracking-[0.08em] text-amber uppercase">
              What to actually learn
            </div>
            <ul className="flex flex-col gap-1.5">
              {item.learn.map((line, i) => (
                <li key={i} className="relative pl-[15px] text-[13px] leading-relaxed text-muted-foreground">
                  <span className="absolute top-0 left-0 font-mono text-amber">›</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
