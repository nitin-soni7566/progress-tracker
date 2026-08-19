import { Button } from "@/components/ui/button";

interface FooterProps {
  onReset: () => void;
}

export function Footer({ onReset }: FooterProps) {
  const handleReset = () => {
    if (window.confirm("Reset all progress? This clears every checkmark.")) {
      onReset();
    }
  };

  return (
    <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
      <p className="font-mono text-xs text-text-muted-dim">progress saves automatically</p>
      <Button
        variant="outline"
        onClick={handleReset}
        className="border-border font-mono text-xs text-muted-foreground hover:border-amber-line hover:bg-transparent hover:text-amber"
      >
        Reset progress
      </Button>
    </div>
  );
}
