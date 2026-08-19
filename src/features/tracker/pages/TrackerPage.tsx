import { CURRICULUM } from "../data/curriculum";
import { useProgress } from "../hooks/useProgress";
import { Hero } from "../components/Hero";
import { PhaseCard } from "../components/PhaseCard";
import { Footer } from "../components/Footer";
import { SaveNote } from "../components/SaveNote";
import type { CurriculumPhase, ProgressState } from "../types";

function phaseDone(phase: CurriculumPhase, state: ProgressState) {
  return phase.items.filter((i) => state[i.id]).length;
}

function firstIncompletePhaseId(state: ProgressState) {
  for (const p of CURRICULUM) if (phaseDone(p, state) < p.items.length) return p.id;
  return null;
}

export function TrackerPage() {
  const { state, streak, saved, toggleItem, resetProgress } = useProgress();
  const doneCount = Object.values(state).filter(Boolean).length;
  const currentId = firstIncompletePhaseId(state);

  return (
    <div className="mx-auto max-w-[760px] px-4 py-8 pb-20 sm:px-5">
      <Hero doneCount={doneCount} streak={streak} />

      <div>
        {CURRICULUM.map((phase, idx) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            index={idx}
            done={phaseDone(phase, state)}
            isCurrent={phase.id === currentId}
            state={state}
            onToggleItem={toggleItem}
          />
        ))}
      </div>

      <Footer onReset={resetProgress} />
      <SaveNote show={saved} />
    </div>
  );
}
