"use client";

import { motion } from "framer-motion";
import { Lock, Unlock, Zap } from "lucide-react";
import { journeyChapters } from "@/data/journey";

interface SkillsPanelProps {
  unlockedSkills: string[];
  journeyXP: number;
}

const ALL_SKILLS = Array.from(new Set(journeyChapters.map((c) => c.skill)));

const SKILL_ICONS: Record<string, string> = {
  "repository-creation": "📦",
  "file-tracking": "👁️",
  "staging": "📋",
  "committing": "💾",
  "history-navigation": "📜",
  "branching": "🌿",
  "branch-navigation": "🔀",
  "branch-workflow": "⚙️",
  "merging": "🔗",
  "conflict-resolution": "⚔️",
  "stashing": "📌",
  "remote-setup": "🌐",
  "pushing": "🚀",
  "cloning": "📋",
  "syncing": "🔄",
  "pull-requests": "📬",
  "rebasing": "🔄",
  "cherry-picking": "🍒",
  "resetting": "⏪",
  "reverting": "↩️",
  "recovery": "🔮",
  "tagging": "🏷️",
  "hooks": "🪝",
  "gitignore": "🛡️",
  "bisecting": "🔍",
  "ci-cd": "⚡",
  "interactive-rebase": "✨",
  "code-forensics": "🕵️",
  "upstream-sync": "🔃",
  "open-source-mastery": "👑",
};

export function SkillsPanel({ unlockedSkills, journeyXP }: SkillsPanelProps) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Skills Unlocked</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {unlockedSkills.length}/{ALL_SKILLS.length}
        </span>
      </div>

      {/* XP Counter */}
      <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
        <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Journey XP</div>
        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{journeyXP.toLocaleString()}</div>
      </div>

      {/* Skill Grid */}
      <div className="grid grid-cols-5 gap-2">
        {ALL_SKILLS.map((skill, i) => {
          const isUnlocked = unlockedSkills.includes(skill);
          const icon = SKILL_ICONS[skill] || "⭐";

          return (
            <motion.div
              key={skill}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              title={skill.replace(/-/g, " ")}
              className={`relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 cursor-default ${
                isUnlocked
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-muted/30 border border-transparent opacity-40"
              }`}
            >
              <span className="text-lg">{isUnlocked ? icon : "🔒"}</span>
              <span className="text-[8px] text-center mt-1 leading-tight text-muted-foreground truncate w-full">
                {skill.replace(/-/g, " ")}
              </span>
              {isUnlocked && (
                <motion.div
                  className="absolute -top-1 -right-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                >
                  <Unlock className="h-2.5 w-2.5 text-green-500" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
