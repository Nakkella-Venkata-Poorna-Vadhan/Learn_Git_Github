"use client";

import { motion } from "framer-motion";
import { Trophy, Zap, Award, ArrowRight, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Chapter } from "@/data/journey";
import { journeyActs, journeyChapters } from "@/data/journey";
import Link from "next/link";

interface MissionDebriefProps {
  chapter: Chapter;
  chapterNumber: number;
  onContinue?: () => void;
}

const SKILL_ICONS: Record<string, string> = {
  "repository-creation": "📦", "file-tracking": "👁️", "staging": "📋",
  "committing": "💾", "history-navigation": "📜", "branching": "🌿",
  "branch-navigation": "🔀", "branch-workflow": "⚙️", "merging": "🔗",
  "conflict-resolution": "⚔️", "stashing": "📌", "remote-setup": "🌐",
  "pushing": "🚀", "cloning": "📋", "syncing": "🔄",
  "pull-requests": "📬", "rebasing": "🔄", "cherry-picking": "🍒",
  "resetting": "⏪", "reverting": "↩️", "recovery": "🔮",
  "tagging": "🏷️", "hooks": "🪝", "gitignore": "🛡️",
  "bisecting": "🔍", "ci-cd": "⚡", "interactive-rebase": "✨",
  "code-forensics": "🕵️", "upstream-sync": "🔃", "open-source-mastery": "👑",
};

export function MissionDebrief({ chapter, chapterNumber }: MissionDebriefProps) {
  const act = journeyActs.find((a) => a.id === chapter.act);
  const nextChapter = journeyChapters[chapterNumber]; // chapterNumber is 1-indexed, so this is next
  const isLastChapter = chapterNumber >= 30;
  const skillIcon = SKILL_ICONS[chapter.skill] || "⭐";

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-2xl text-center"
      >
        {/* Celebration particles */}
        <div className="relative mb-6">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((i * Math.PI * 2) / 8) * 120,
                y: Math.sin((i * Math.PI * 2) / 8) * 120,
                opacity: 0,
                scale: 0.3,
              }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            >
              <Star className="h-4 w-4" style={{ color: act?.color || "#3b82f6" }} />
            </motion.div>
          ))}

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mx-auto"
              style={{ backgroundColor: `${act?.color}20`, border: `3px solid ${act?.color}` }}
            >
              <Trophy className="h-10 w-10" style={{ color: act?.color }} />
            </div>
          </motion.div>
        </div>

        {/* Mission Complete */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground mb-2">
            Mission Complete
          </div>
          <h1 className="text-3xl font-bold mb-2">{chapter.title}</h1>
          <p className="text-muted-foreground mb-8">{chapter.description}</p>
        </motion.div>

        {/* Rewards cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {/* XP Earned */}
          <div className="rounded-xl border bg-yellow-500/5 border-yellow-500/20 p-4">
            <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <motion.div
              className="text-3xl font-bold text-yellow-600 dark:text-yellow-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              +{chapter.xpReward}
            </motion.div>
            <div className="text-xs text-muted-foreground mt-1">XP Earned</div>
          </div>

          {/* Skill Unlocked */}
          <div className="rounded-xl border bg-purple-500/5 border-purple-500/20 p-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="text-3xl mb-2"
            >
              {skillIcon}
            </motion.div>
            <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              {chapter.skill.replace(/-/g, " ")}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Skill Unlocked</div>
          </div>
        </motion.div>

        {/* What you learned */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="rounded-xl border bg-card p-4 mb-8 text-left"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold">What You Accomplished</span>
          </div>
          <div className="space-y-1.5">
            {chapter.objectives.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + i * 0.15 }}
                className="flex items-center gap-2 text-sm"
              >
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <span className="text-green-500 text-xs">✓</span>
                </div>
                <span className="text-muted-foreground">{obj}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next mission or completion */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          {isLastChapter ? (
            <div className="space-y-4">
              <div className="text-2xl mb-2">🏆</div>
              <h2 className="text-xl font-bold">You Are a Git Master!</h2>
              <p className="text-sm text-muted-foreground">
                You&apos;ve completed all 30 missions. From git init to open-source hero.
              </p>
              <Button asChild size="lg" className="w-full">
                <Link href="/journey">
                  <Trophy className="mr-2 h-4 w-4" />
                  View Your Journey
                </Link>
              </Button>
            </div>
          ) : nextChapter ? (
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                Next Mission
              </div>
              <div className="font-bold mb-3">
                Chapter {chapterNumber + 1}: {nextChapter.title}
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href={`/journey/${nextChapter.id}`}>
                  Start Next Mission
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
}
