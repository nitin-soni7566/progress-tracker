export interface CurriculumItem {
  id: string;
  t: string;
  s: string;
  learn: string[];
}

export interface CurriculumPhase {
  id: string;
  name: string;
  meta: string;
  items: CurriculumItem[];
}

export interface Rank {
  at: number;
  name: string;
  note: string;
}

export type ProgressState = Record<string, boolean>;
