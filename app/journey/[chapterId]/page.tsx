"use client";

import { useParams } from "next/navigation";
import { useMemo, useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { journeyChapters, journeyActs } from "@/data/journey";
import { useJourneyStore } from "@/lib/store";
import { ChapterSidebar } from "@/components/journey/ChapterSidebar";
import { MissionBriefing } from "@/components/journey/MissionBriefing";
import { StoryPanel } from "@/components/journey/StoryPanel";
import { BranchGraph } from "@/components/journey/BranchGraph";
import { ProjectExplorer } from "@/components/journey/ProjectExplorer";
import { JourneyTerminal } from "@/components/journey/JourneyTerminal";
import { MissionDebrief } from "@/components/journey/MissionDebrief";

type Phase = "briefing" | "learn" | "execute" | "debrief";

export default function ChapterPage() {
  const params = useParams();
  const chapterId = params.chapterId as string;
  const { journeyProgress, completeChapter, setCurrentChapter } = useJourneyStore();

  const chapter = useMemo(
    () => journeyChapters.find((c) => c.id === chapterId),
    [chapterId]
  );

  const chapterIndex = useMemo(
    () => journeyChapters.findIndex((c) => c.id === chapterId),
    [chapterId]
  );

  const nextChapter =
    chapterIndex < journeyChapters.length - 1 ? journeyChapters[chapterIndex + 1] : null;
  const isCompleted = journeyProgress.completedChapters.includes(chapterId);

  // Phase state — if already completed, skip straight to execute
  const [phase, setPhase] = useState<Phase>(isCompleted ? "execute" : "briefing");
  const [tasksDone, setTasksDone] = useState(isCompleted);

  // Reset phase when chapter changes
  useEffect(() => {
    const alreadyDone = journeyProgress.completedChapters.includes(chapterId);
    setPhase(alreadyDone ? "execute" : "briefing");
    setTasksDone(alreadyDone);
  }, [chapterId, journeyProgress.completedChapters]);

  const handleAcceptMission = useCallback(() => {
    setPhase("learn");
  }, []);

  const handleReady = useCallback(() => {
    setPhase("execute");
  }, []);

  const handleAllCommandsComplete = useCallback(() => {
    setTasksDone(true);
  }, []);

  const handleCompleteMission = useCallback(() => {
    if (chapter && !isCompleted) {
      completeChapter(chapter.id, chapter.xpReward, chapter.skill);
      if (nextChapter) {
        setCurrentChapter(nextChapter.id);
      }
    }
    setPhase("debrief");
  }, [chapter, isCompleted, completeChapter, nextChapter, setCurrentChapter]);

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

  const act = journeyActs.find((a) => a.id === chapter.act);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar */}
      <ChapterSidebar journeyProgress={journeyProgress} currentChapterId={chapterId} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative">
        {/* Phase progress indicator */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b">
          <div className="max-w-5xl mx-auto px-6 py-2 flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/journey">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Journey Map
              </Link>
            </Button>

            {/* Phase dots */}
            <div className="flex items-center gap-1">
              {(["briefing", "learn", "execute", "debrief"] as Phase[]).map((p, i) => {
                const labels = ["Briefing", "Learn", "Execute", "Debrief"];
                const phaseOrder = ["briefing", "learn", "execute", "debrief"];
                const currentIdx = phaseOrder.indexOf(phase);
                const thisIdx = i;
                const isActive = p === phase;
                const isPast = thisIdx < currentIdx;

                return (
                  <div key={p} className="flex items-center">
                    {i > 0 && (
                      <div
                        className={`w-8 h-0.5 mx-0.5 rounded ${
                          isPast ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          isActive
                            ? "bg-primary scale-125 ring-2 ring-primary/30"
                            : isPast
                            ? "bg-primary"
                            : "bg-muted"
                        }`}
                      />
                      <span
                        className={`text-[9px] mt-0.5 ${
                          isActive ? "text-primary font-bold" : "text-muted-foreground"
                        }`}
                      >
                        {labels[i]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize text-xs">
                {chapter.difficulty}
              </Badge>
              {isCompleted && (
                <Badge className="bg-green-500/20 text-green-600 border-green-500/30 text-xs">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Done
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Phase content */}
        <AnimatePresence mode="wait">
          {/* ═══ PHASE 1: MISSION BRIEFING ═══ */}
          {phase === "briefing" && (
            <motion.div
              key="briefing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <MissionBriefing
                chapter={chapter}
                chapterNumber={chapterIndex + 1}
                onAccept={handleAcceptMission}
              />
            </motion.div>
          )}

          {/* ═══ PHASE 2: LEARN ═══ */}
          {phase === "learn" && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto p-6"
            >
              <StoryPanel
                narrative={chapter.narrative}
                concept={chapter.concept}
                lesson={chapter.lesson}
                chapterTitle={chapter.title}
                chapterNumber={chapterIndex + 1}
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <Button
                  onClick={handleReady}
                  size="lg"
                  className="text-lg px-12 py-6 font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${act?.color}dd, ${act?.color}88)`,
                  }}
                >
                  I&apos;m Ready — Start Executing
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* ═══ PHASE 3: EXECUTE ═══ */}
          {phase === "execute" && (
            <motion.div
              key="execute"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto p-6"
            >
              {/* Two-column layout */}
              <div className="grid lg:grid-cols-5 gap-4">
                {/* Left: Terminal (takes more space) */}
                <div className="lg:col-span-3 space-y-4">
                  <JourneyTerminal
                    expectedCommands={chapter.expectedCommands}
                    terminalOutputs={chapter.terminalOutputs}
                    hint={chapter.hint}
                    onAllCommandsComplete={handleAllCommandsComplete}
                  />

                  {/* Complete Mission button */}
                  <AnimatePresence>
                    {tasksDone && phase === "execute" && !isCompleted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <Button
                          onClick={handleCompleteMission}
                          size="lg"
                          className="w-full text-lg py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold"
                        >
                          <CheckCircle2 className="h-5 w-5 mr-2" />
                          Complete Mission — Claim {chapter.xpReward} XP
                        </Button>
                      </motion.div>
                    )}
                    {isCompleted && phase === "execute" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Button
                          onClick={() => setPhase("debrief")}
                          variant="outline"
                          size="lg"
                          className="w-full"
                        >
                          View Mission Summary
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right: Visuals */}
                <div className="lg:col-span-2 space-y-4">
                  <ProjectExplorer
                    cumulativeFiles={chapter.cumulativeFiles}
                    newFiles={chapter.fileChanges}
                  />
                  <BranchGraph
                    branches={chapter.graphState.branches}
                    currentBranch={chapter.graphState.currentBranch}
                    commits={chapter.graphState.commits}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ PHASE 4: DEBRIEF ═══ */}
          {phase === "debrief" && (
            <motion.div
              key="debrief"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <MissionDebrief
                chapter={chapter}
                chapterNumber={chapterIndex + 1}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
