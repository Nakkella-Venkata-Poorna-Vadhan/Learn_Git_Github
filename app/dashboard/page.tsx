"use client";

import Link from "next/link";
import { levels } from "@/data/levels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/lib/store";
import { CheckCircle2, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { progress } = useProgressStore();

  const getLevelProgress = (levelId: number) => {
    const level = levels.find((l) => l.id === levelId);
    if (!level) return 0;
    const completed = level.lessons.filter((lesson) =>
      progress.completedLessons.includes(lesson.id)
    ).length;
    return Math.round((completed / level.lessons.length) * 100);
  };

  const isLevelUnlocked = (levelId: number) => {
    if (levelId === 1) return true;
    const previousLevel = levels.find((l) => l.id === levelId - 1);
    if (!previousLevel) return false;
    return previousLevel.lessons.every((lesson) =>
      progress.completedLessons.includes(lesson.id)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Learning Dashboard</h1>
        <p className="text-muted-foreground">Master Git & GitHub step by step</p>
      </div>

      {/* Progress Overview */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progress.xp}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {progress.completedLessons.length} / {levels.reduce((acc, l) => acc + l.lessons.length, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{progress.badges.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Levels */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Learning Levels</h2>
        {levels.map((level, index) => {
          const progressPercent = getLevelProgress(level.id);
          const unlocked = isLevelUnlocked(level.id);
          const completedLessons = level.lessons.filter((l) =>
            progress.completedLessons.includes(l.id)
          ).length;

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={!unlocked ? "opacity-60" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-2xl">{level.icon}</span>
                        <CardTitle className="text-2xl">{level.title}</CardTitle>
                        {!unlocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                      </div>
                      <CardDescription className="text-base">{level.description}</CardDescription>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {completedLessons} / {level.lessons.length} lessons
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {level.lessons.map((lesson) => {
                      const isCompleted = progress.completedLessons.includes(lesson.id);
                      return (
                        <Link
                          key={lesson.id}
                          href={`/level/${level.id}/lesson/${lesson.id}`}
                          className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
                            !unlocked
                              ? "cursor-not-allowed opacity-50"
                              : "hover:bg-accent cursor-pointer"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isCompleted ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                            )}
                            <div>
                              <div className="font-medium">{lesson.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {lesson.duration} min
                              </div>
                            </div>
                          </div>
                          {unlocked && (
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                  {!unlocked && (
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                      Complete previous level to unlock
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
