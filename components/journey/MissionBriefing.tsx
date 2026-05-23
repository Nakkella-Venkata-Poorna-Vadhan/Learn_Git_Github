"use client";

import { motion } from "framer-motion";
import { Target, Zap, Award, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Chapter } from "@/data/journey";
import { journeyActs } from "@/data/journey";

interface MissionBriefingProps {
  chapter: Chapter;
  chapterNumber: number;
  onAccept: () => void;
}

const DIFFICULTY_CONFIG = {
  beginner: { label: "BEGINNER", color: "text-green-400", bg: "bg-green-500/20", border: "border-green-500/30" },
  intermediate: { label: "INTERMEDIATE", color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30" },
  advanced: { label: "ADVANCED", color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/30" },
  expert: { label: "EXPERT", color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30" },
};

export function MissionBriefing({ chapter, chapterNumber, onAccept }: MissionBriefingProps) {
  const act = journeyActs.find((a) => a.id === chapter.act);
  const diff = DIFFICULTY_CONFIG[chapter.difficulty];

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        {/* Glowing border card */}
        <div
          className="relative rounded-2xl border-2 overflow-hidden"
          style={{ borderColor: act?.color || "#3b82f6" }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(ellipse at center, ${act?.color || "#3b82f6"} 0%, transparent 70%)`,
            }}
          />

          {/* Header strip */}
          <div
            className="relative px-6 py-3 flex items-center justify-between"
            style={{ backgroundColor: `${act?.color}15` }}
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" style={{ color: act?.color }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: act?.color }}>
                Act {chapter.act}: {act?.title}
              </span>
            </div>
            <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${diff.bg} ${diff.color} ${diff.border} border`}>
              {diff.label}
            </div>
          </div>

          {/* Main content */}
          <div className="relative p-8">
            {/* Mission label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2"
            >
              Mission {chapterNumber} of 30
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mb-2"
            >
              {chapter.title}
            </motion.h1>

            {/* Concept tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-mono mb-6"
            >
              <code>{chapter.concept}</code>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              {chapter.narrative}
            </motion.p>

            {/* Objectives */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold uppercase tracking-wider">Objectives</span>
              </div>
              <div className="space-y-2">
                {chapter.objectives.map((obj, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-start gap-3 pl-2"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{obj}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Rewards */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-6 mb-8"
            >
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                  +{chapter.xpReward} XP
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  Unlock: {chapter.skill.replace(/-/g, " ")}
                </span>
              </div>
            </motion.div>

            {/* Accept button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Button
                onClick={onAccept}
                size="lg"
                className="w-full text-lg py-6 font-bold tracking-wide"
                style={{
                  background: `linear-gradient(135deg, ${act?.color}dd, ${act?.color}88)`,
                }}
              >
                Accept Mission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
