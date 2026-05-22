"use client";

import { useState, useEffect, useCallback } from "react";

export interface Progress {
  level: number;
  completedLessons: string[];
  xp: number;
  badges: string[];
  lastActivity: Date | null;
}

export interface JourneyProgress {
  completedChapters: string[];
  currentChapter: string;
  unlockedSkills: string[];
  journeyXP: number;
  freePlayUsed: boolean;
}

const defaultProgress: Progress = {
  level: 1,
  completedLessons: [],
  xp: 0,
  badges: [],
  lastActivity: null,
};

const defaultJourneyProgress: JourneyProgress = {
  completedChapters: [],
  currentChapter: "ch-1",
  unlockedSkills: [],
  journeyXP: 0,
  freePlayUsed: false,
};

const STORAGE_KEY = "git-master-progress";
const JOURNEY_STORAGE_KEY = "git-master-journey";

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

function loadJourneyProgress(): JourneyProgress {
  if (typeof window === "undefined") return defaultJourneyProgress;
  try {
    const stored = localStorage.getItem(JOURNEY_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultJourneyProgress, ...parsed };
    }
  } catch (e) {
    console.error("Failed to load journey progress:", e);
  }
  return defaultJourneyProgress;
}

function saveProgress(progress: Progress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress:", e);
  }
}

function saveJourneyProgress(progress: JourneyProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save journey progress:", e);
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

export function useJourneyStore() {
  const [journeyProgress, setJourneyProgress] = useState<JourneyProgress>(loadJourneyProgress);

  useEffect(() => {
    setJourneyProgress(loadJourneyProgress());
  }, []);

  const completeChapter = useCallback((chapterId: string, xpReward: number, skillId: string) => {
    setJourneyProgress((prev) => {
      if (prev.completedChapters.includes(chapterId)) return prev;
      const updated: JourneyProgress = {
        ...prev,
        completedChapters: [...prev.completedChapters, chapterId],
        unlockedSkills: prev.unlockedSkills.includes(skillId)
          ? prev.unlockedSkills
          : [...prev.unlockedSkills, skillId],
        journeyXP: prev.journeyXP + xpReward,
      };
      saveJourneyProgress(updated);
      return updated;
    });
  }, []);

  const setCurrentChapter = useCallback((chapterId: string) => {
    setJourneyProgress((prev) => {
      const updated = { ...prev, currentChapter: chapterId };
      saveJourneyProgress(updated);
      return updated;
    });
  }, []);

  const markFreePlayUsed = useCallback(() => {
    setJourneyProgress((prev) => {
      const updated = { ...prev, freePlayUsed: true };
      saveJourneyProgress(updated);
      return updated;
    });
  }, []);

  const resetJourney = useCallback(() => {
    saveJourneyProgress(defaultJourneyProgress);
    setJourneyProgress(defaultJourneyProgress);
  }, []);

  return {
    journeyProgress,
    completeChapter,
    setCurrentChapter,
    markFreePlayUsed,
    resetJourney,
  };
}
