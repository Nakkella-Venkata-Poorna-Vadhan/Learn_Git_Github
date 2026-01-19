"use client";

import { useState, useEffect, useCallback } from "react";

export interface Progress {
  level: number;
  completedLessons: string[];
  xp: number;
  badges: string[];
  lastActivity: Date | null;
}

const defaultProgress: Progress = {
  level: 1,
  completedLessons: [],
  xp: 0,
  badges: [],
  lastActivity: null,
};

const STORAGE_KEY = "git-master-progress";

function loadProgress(): Progress {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...defaultProgress,
        ...parsed,
        lastActivity: parsed.lastActivity ? new Date(parsed.lastActivity) : null,
      };
    }
  } catch (e) {
    console.error("Failed to load progress:", e);
  }
  return defaultProgress;
}

function saveProgress(progress: Progress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress:", e);
  }
}

export function useProgressStore() {
  const [progress, setProgressState] = useState<Progress>(loadProgress);

  useEffect(() => {
    setProgressState(loadProgress());
  }, []);

  const updateProgress = useCallback((updates: Partial<Progress>) => {
    setProgressState((prev: Progress) => {
      const updated = {
        ...prev,
        ...updates,
        lastActivity: new Date(),
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setProgressState((prev: Progress) => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }
      const updated = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        xp: prev.xp + 50,
        lastActivity: new Date(),
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const addXP = useCallback((amount: number) => {
    setProgressState((prev: Progress) => {
      const updated = {
        ...prev,
        xp: prev.xp + amount,
        lastActivity: new Date(),
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const unlockBadge = useCallback((badgeId: string) => {
    setProgressState((prev: Progress) => {
      if (prev.badges.includes(badgeId)) {
        return prev;
      }
      const updated = {
        ...prev,
        badges: [...prev.badges, badgeId],
        xp: prev.xp + 100,
        lastActivity: new Date(),
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  return {
    progress,
    updateProgress,
    completeLesson,
    addXP,
    unlockBadge,
  };
}
