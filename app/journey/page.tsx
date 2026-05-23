"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Trophy, Zap, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { journeyChapters, journeyActs } from "@/data/journey";
import { useJourneyStore } from "@/lib/store";
import { SkillsPanel } from "@/components/journey/SkillsPanel";

export default function JourneyPage() {
  const { journeyProgress } = useJourneyStore();

  const completedCount = journeyProgress.completedChapters.length;
  const totalXP = journeyProgress.journeyXP;
  const currentChapter = journeyChapters.find((c) => c.id === journeyProgress.currentChapter);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center rounded-full border bg-muted px-4 py-2 text-sm mb-6">
          <Map className="mr-2 h-4 w-4 text-primary" />
          <span>The Journey — Build SnapNote with Git</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          From <span className="text-primary">git init</span> to{" "}
          <span className="text-primary">Open Source Hero</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Build a real project — SnapNote — while mastering every Git &amp; GitHub concept.
          30 chapters. One continuous story. Zero to mastery.
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <div className="rounded-xl border bg-card p-4 text-center">
          <BookOpen className="h-5 w-5 text-primary mx-auto mb-1" />
          <div className="text-2xl font-bold">{completedCount}/30</div>
          <div className="text-xs text-muted-foreground">Chapters</div>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <Zap className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
          <div className="text-2xl font-bold">{totalXP.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Journey XP</div>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <Trophy className="h-5 w-5 text-purple-500 mx-auto mb-1" />
          <div className="text-2xl font-bold">{journeyProgress.unlockedSkills.length}</div>
          <div className="text-xs text-muted-foreground">Skills</div>
        </div>
      </motion.div>

      {/* Continue Button */}
      {currentChapter && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 p-6 rounded-xl border bg-gradient-to-r from-primary/5 via-card to-primary/5"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                Continue Your Journey
              </div>
              <h2 className="text-xl font-bold">
                Chapter {journeyChapters.indexOf(currentChapter) + 1}: {currentChapter.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{currentChapter.description}</p>
            </div>
            <Button asChild size="lg">
              <Link href={`/journey/${currentChapter.id}`}>
                {completedCount === 0 ? "Start Journey" : "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Acts & Chapters */}
        <div className="lg:col-span-2 space-y-6">
          {journeyActs.map((act, actIndex) => {
            const actChapters = journeyChapters.filter((c) => c.act === act.id);
            const completedInAct = actChapters.filter((c) =>
              journeyProgress.completedChapters.includes(c.id)
            ).length;

            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: actIndex * 0.1 + 0.3 }}
                className="rounded-xl border bg-card overflow-hidden"
              >
                {/* Act header */}
                <div
                  className="p-4 border-b flex items-center gap-3"
                  style={{ borderLeftWidth: 4, borderLeftColor: act.color }}
                >
                  <span className="text-2xl">{act.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold">
                      Act {act.id}: {act.title}
                    </div>
                    <div className="text-xs text-muted-foreground">{act.subtitle} — {act.description}</div>
                  </div>
                  <Badge variant={completedInAct === actChapters.length ? "default" : "secondary"}>
                    {completedInAct}/{actChapters.length}
                  </Badge>
                </div>

                {/* Chapters list */}
                <div className="divide-y">
                  {actChapters.map((chapter) => {
                    const isCompleted = journeyProgress.completedChapters.includes(chapter.id);
                    const isCurrent = chapter.id === journeyProgress.currentChapter;
                    const chapterNum = journeyChapters.indexOf(chapter) + 1;
                    const isLocked = !isCompleted && !isCurrent && journeyChapters.indexOf(chapter) > journeyChapters.findIndex((c) => c.id === journeyProgress.currentChapter);

                    return (
                      <Link
                        key={chapter.id}
                        href={isLocked ? "#" : `/journey/${chapter.id}`}
                        onClick={(e) => isLocked && e.preventDefault()}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                          isLocked
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-accent/30"
                        } ${isCurrent ? "bg-primary/5" : ""}`}
                      >
                        <div
                          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : isCurrent
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isCompleted ? "✓" : chapterNum}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{chapter.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {chapter.concept}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge
                            variant="outline"
                            className="text-[10px] capitalize"
                          >
                            {chapter.difficulty}
                          </Badge>
                          <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                            +{chapter.xpReward} XP
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sidebar — Skills */}
        <div className="space-y-6">
          <SkillsPanel
            unlockedSkills={journeyProgress.unlockedSkills}
            journeyXP={journeyProgress.journeyXP}
          />
        </div>
      </div>
    </div>
  );
}
