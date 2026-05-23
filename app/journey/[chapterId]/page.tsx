"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { journeyChapters } from "@/data/journey";
import { useJourneyStore } from "@/lib/store";
import { ChapterSidebar } from "@/components/journey/ChapterSidebar";
import { StoryPanel } from "@/components/journey/StoryPanel";
import { BranchGraph } from "@/components/journey/BranchGraph";
import { FileTree } from "@/components/journey/FileTree";
import { JourneyTerminal } from "@/components/journey/JourneyTerminal";

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const chapterId = params.chapterId as string;
  const { journeyProgress, completeChapter, setCurrentChapter } = useJourneyStore();
  const [tasksDone, setTasksDone] = useState(false);

  const chapter = useMemo(
    () => journeyChapters.find((c) => c.id === chapterId),
    [chapterId]
  );

  const chapterIndex = useMemo(
    () => journeyChapters.findIndex((c) => c.id === chapterId),
    [chapterId]
  );

  const prevChapter = chapterIndex > 0 ? journeyChapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < journeyChapters.length - 1 ? journeyChapters[chapterIndex + 1] : null;
  const isCompleted = journeyProgress.completedChapters.includes(chapterId);

  const handleComplete = useCallback(() => {
    if (chapter && !isCompleted) {
      completeChapter(chapter.id, chapter.xpReward, chapter.skill);
      if (nextChapter) {
        setCurrentChapter(nextChapter.id);
      }
    }
  }, [chapter, isCompleted, completeChapter, nextChapter, setCurrentChapter]);

  const handleAllCommandsComplete = useCallback(() => {
    setTasksDone(true);
  }, []);

  if (!chapter) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Chapter not found</h2>
          <Button asChild variant="outline">
            <Link href="/journey">Back to Journey</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar */}
      <ChapterSidebar journeyProgress={journeyProgress} currentChapterId={chapterId} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={chapterId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto p-6 space-y-6"
          >
            {/* Top nav */}
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/journey">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Journey Map
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {chapter.difficulty}
                </Badge>
                <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
                  +{chapter.xpReward} XP
                </Badge>
                {isCompleted && (
                  <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                  </Badge>
                )}
              </div>
            </div>

            {/* Story + Lesson */}
            <StoryPanel
              narrative={chapter.narrative}
              concept={chapter.concept}
              lesson={chapter.lesson}
              chapterTitle={chapter.title}
              chapterNumber={chapterIndex + 1}
            />

            {/* Two-column: Terminal + Graph/Files */}
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="space-y-4">
                <JourneyTerminal
                  expectedCommands={chapter.expectedCommands}
                  hint={chapter.hint}
                  onAllCommandsComplete={handleAllCommandsComplete}
                />
              </div>
              <div className="space-y-4">
                <BranchGraph
                  branches={chapter.graphState.branches}
                  currentBranch={chapter.graphState.currentBranch}
                  commits={chapter.graphState.commits}
                />
                <FileTree files={chapter.fileChanges} />
              </div>
            </div>

            {/* Complete + Navigation */}
            <div className="flex items-center justify-between pt-4 border-t">
              {prevChapter ? (
                <Button variant="outline" asChild>
                  <Link href={`/journey/${prevChapter.id}`}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {prevChapter.title}
                  </Link>
                </Button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                {!isCompleted && (
                  <Button
                    onClick={handleComplete}
                    disabled={!tasksDone}
                    className={
                      tasksDone
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : ""
                    }
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Complete Chapter
                  </Button>
                )}

                {nextChapter && (isCompleted || tasksDone) && (
                  <Button asChild>
                    <Link href={`/journey/${nextChapter.id}`}>
                      Next: {nextChapter.title}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
