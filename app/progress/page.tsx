"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Target, TrendingUp } from "lucide-react";
import { useProgressStore } from "@/lib/store";
import { levels } from "@/data/levels";
import { motion } from "framer-motion";

const badges = [
  { id: "first-commit", name: "First Commit", description: "Complete your first lesson", icon: "🎯" },
  { id: "branch-master", name: "Branch Master", description: "Complete all branching lessons", icon: "🌿" },
  { id: "github-pro", name: "GitHub Pro", description: "Complete GitHub essentials", icon: "⭐" },
  { id: "collaborator", name: "Collaborator", description: "Complete collaboration level", icon: "🤝" },
  { id: "git-ninja", name: "Git Ninja", description: "Master advanced Git", icon: "🥷" },
  { id: "industry-ready", name: "Industry Ready", description: "Complete all levels", icon: "🏆" },
];

export default function ProgressPage() {
  const { progress } = useProgressStore();

  const totalLessons = levels.reduce((acc, level) => acc + level.lessons.length, 0);
  const completionPercentage = Math.round(
    (progress.completedLessons.length / totalLessons) * 100
  );

  const getLevelProgress = (levelId: number) => {
    const level = levels.find((l) => l.id === levelId);
    if (!level) return 0;
    const completed = level.lessons.filter((lesson) =>
      progress.completedLessons.includes(lesson.id)
    ).length;
    return Math.round((completed / level.lessons.length) * 100);
  };

  const earnedBadges = badges.filter((badge) => progress.badges.includes(badge.id));
  const lockedBadges = badges.filter((badge) => !progress.badges.includes(badge.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Your Progress</h1>
        <p className="text-muted-foreground">Track your journey from zero to hero</p>
      </div>

      {/* Overview Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total XP</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progress.xp}</div>
            <p className="text-xs text-muted-foreground mt-1">Keep learning to earn more!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Completion</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completionPercentage}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {progress.completedLessons.length} / {totalLessons} lessons
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Badges</CardTitle>
              <Award className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {earnedBadges.length} / {badges.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Achievements unlocked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Current Level</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Level {progress.level}</div>
            <p className="text-xs text-muted-foreground mt-1">Keep progressing!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Level Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Level Progress</CardTitle>
            <CardDescription>Track your progress through each level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {levels.map((level) => {
              const levelProgress = getLevelProgress(level.id);
              const completedLessons = level.lessons.filter((l) =>
                progress.completedLessons.includes(l.id)
              ).length;

              return (
                <div key={level.id}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{level.icon}</span>
                      <span className="font-medium">{level.title}</span>
                    </div>
                    <span>
                      {completedLessons} / {level.lessons.length}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${levelProgress}%` }}
                      transition={{ duration: 0.5, delay: level.id * 0.1 }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements & Badges</CardTitle>
            <CardDescription>Unlock badges as you progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="mb-3 text-sm font-semibold">Earned Badges</h3>
                <div className="grid grid-cols-2 gap-3">
                  {earnedBadges.map((badge) => (
                    <motion.div
                      key={badge.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="rounded-lg border-2 border-green-500 bg-green-50 p-3 dark:bg-green-950"
                    >
                      <div className="mb-1 text-2xl">{badge.icon}</div>
                      <div className="text-sm font-semibold">{badge.name}</div>
                      <div className="text-xs text-muted-foreground">{badge.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {lockedBadges.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold">Locked Badges</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {lockedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="rounded-lg border bg-muted/50 p-3 opacity-60"
                      >
                        <div className="mb-1 text-2xl grayscale">{badge.icon}</div>
                        <div className="text-sm font-semibold">{badge.name}</div>
                        <div className="text-xs text-muted-foreground">{badge.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
