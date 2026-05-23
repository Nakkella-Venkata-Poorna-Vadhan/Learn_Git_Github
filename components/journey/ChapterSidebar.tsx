"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Lock, Play, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { journeyChapters, journeyActs } from "@/data/journey";
import type { JourneyProgress } from "@/lib/store";
import { useState } from "react";

interface ChapterSidebarProps {
  journeyProgress: JourneyProgress;
  currentChapterId?: string;
}

export function ChapterSidebar({ journeyProgress, currentChapterId }: ChapterSidebarProps) {
  const [expandedActs, setExpandedActs] = useState<number[]>(() => {
    const current = journeyChapters.find((c) => c.id === (currentChapterId || journeyProgress.currentChapter));
    return current ? [current.act] : [1];
  });

  const toggleAct = (actId: number) => {
    setExpandedActs((prev) =>
      prev.includes(actId) ? prev.filter((a) => a !== actId) : [...prev, actId]
    );
  };

  const getChapterStatus = (chapterId: string) => {
    if (journeyProgress.completedChapters.includes(chapterId)) return "completed";
    if (chapterId === journeyProgress.currentChapter || chapterId === currentChapterId) return "current";
    const chapterIndex = journeyChapters.findIndex((c) => c.id === chapterId);
    const currentIndex = journeyChapters.findIndex((c) => c.id === journeyProgress.currentChapter);
    if (chapterIndex <= currentIndex) return "available";
    return "locked";
  };

  return (
    <aside className="w-72 shrink-0 border-r bg-card/50 backdrop-blur-sm overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">📖 SnapNote Journey</h2>
        <p className="text-xs text-muted-foreground mt-1">
          {journeyProgress.completedChapters.length}/30 chapters
        </p>
        <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${(journeyProgress.completedChapters.length / 30) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      <nav className="p-2">
        {journeyActs.map((act) => {
          const actChapters = journeyChapters.filter((c) => c.act === act.id);
          const completedInAct = actChapters.filter((c) =>
            journeyProgress.completedChapters.includes(c.id)
          ).length;
          const isExpanded = expandedActs.includes(act.id);

          return (
            <div key={act.id} className="mb-1">
              <button
                onClick={() => toggleAct(act.id)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors text-left"
              >
                <span className="text-lg">{act.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{act.title}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {completedInAct}/{actChapters.length} complete
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 pl-3 border-l-2 border-border"
                >
                  {actChapters.map((chapter) => {
                    const status = getChapterStatus(chapter.id);
                    const isActive = chapter.id === currentChapterId;

                    return (
                      <Link
                        key={chapter.id}
                        href={status === "locked" ? "#" : `/journey/${chapter.id}`}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all duration-200 my-0.5",
                          status === "completed" && "text-green-500 hover:bg-green-500/10",
                          status === "current" && "text-primary font-medium bg-primary/10",
                          status === "available" && "text-foreground hover:bg-accent/50",
                          status === "locked" && "text-muted-foreground/50 cursor-not-allowed",
                          isActive && "ring-1 ring-primary bg-primary/15"
                        )}
                        onClick={(e) => status === "locked" && e.preventDefault()}
                      >
                        <span className="shrink-0">
                          {status === "completed" && <Check className="h-3.5 w-3.5 text-green-500" />}
                          {status === "current" && <Play className="h-3.5 w-3.5 text-primary fill-primary" />}
                          {status === "available" && <div className="h-3.5 w-3.5 rounded-full border-2 border-muted-foreground/40" />}
                          {status === "locked" && <Lock className="h-3.5 w-3.5" />}
                        </span>
                        <span className="truncate">{chapter.title}</span>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
