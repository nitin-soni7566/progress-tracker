import { useCallback, useEffect, useRef, useState } from "react";
import type { ProgressState } from "../types";

const KEY = "fs-progress:v2";
const STREAK_KEY = "fs-streak:v1";

interface StreakRecord {
  count: number;
  last: string;
}

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ProgressState) : {};
  } catch {
    return {};
  }
}

function computeStreak(): number {
  const today = new Date().toISOString().slice(0, 10);
  let s: StreakRecord = { count: 1, last: today };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) {
      const prev = JSON.parse(raw) as StreakRecord;
      if (prev.last === today) {
        s = prev;
      } else {
        const diff = (new Date(today).getTime() - new Date(prev.last).getTime()) / 86400000;
        s = { count: diff === 1 ? prev.count + 1 : 1, last: today };
      }
    }
  } catch {
    /* ignore */
  }
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable — session still works */
  }
  return s.count;
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(loadState);
  const [streak] = useState<number>(computeStreak);
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(saveTimer.current), []);

  const persist = useCallback((next: ProgressState) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      setSaved(true);
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => setSaved(false), 1100);
    } catch {
      /* storage unavailable — session still works */
    }
  }, []);

  const toggleItem = useCallback(
    (id: string) => {
      setState((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const resetProgress = useCallback(() => {
    setState({});
    persist({});
  }, [persist]);

  return { state, streak, saved, toggleItem, resetProgress };
}
