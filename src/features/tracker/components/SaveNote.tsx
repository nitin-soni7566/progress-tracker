interface SaveNoteProps {
  show: boolean;
}

export function SaveNote({ show }: SaveNoteProps) {
  return (
    <div
      className={`pointer-events-none fixed bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full border border-amber-line bg-panel-hi px-4 py-2.5 font-mono text-xs text-amber transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      saved ✓
    </div>
  );
}
