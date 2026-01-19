"use client";

import { useParams, useRouter } from "next/navigation";
import { levels } from "@/data/levels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import { useProgressStore } from "@/lib/store";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = parseInt(params.levelId as string);
  const lessonId = params.lessonId as string;
  const { completeLesson, progress } = useProgressStore();

  const level = levels.find((l) => l.id === levelId);
  const lesson = level?.lessons.find((l) => l.id === lessonId);

  if (!level || !lesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Lesson not found</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentLessonIndex = level.lessons.findIndex((l) => l.id === lessonId);
  const previousLesson =
    currentLessonIndex > 0 ? level.lessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < level.lessons.length - 1
      ? level.lessons[currentLessonIndex + 1]
      : null;

  const isCompleted = progress.completedLessons.includes(lessonId);

  const handleComplete = () => {
    completeLesson(lessonId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <Badge variant="secondary">
          {level.icon} Level {levelId}: {level.title}
        </Badge>
      </div>

      {/* Lesson Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="mb-2 text-3xl">{lesson.title}</CardTitle>
                  <CardDescription className="text-base">{lesson.description}</CardDescription>
                </div>
                {isCompleted && (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>

              {/* Commands Section */}
              {lesson.commands && lesson.commands.length > 0 && (
                <div className="mt-6 rounded-lg border bg-muted/50 p-4">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold">
                    <Terminal className="h-4 w-4" />
                    Commands Covered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {lesson.commands.map((cmd) => (
                      <Badge key={cmd} variant="outline" className="font-mono">
                        {cmd}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => router.push(`/simulator?command=${lesson.commands?.[0]}`)}
                  >
                    Try in Simulator
                  </Button>
                </div>
              )}

              {/* Complete Button */}
              <div className="mt-8 flex justify-center">
                {!isCompleted ? (
                  <Button size="lg" onClick={handleComplete}>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Mark as Complete
                  </Button>
                ) : (
                  <div className="rounded-lg border border-green-500 bg-green-50 p-4 dark:bg-green-950">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-semibold">Lesson Completed!</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() =>
                previousLesson &&
                router.push(`/level/${levelId}/lesson/${previousLesson.id}`)
              }
              disabled={!previousLesson}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={() =>
                nextLesson
                  ? router.push(`/level/${levelId}/lesson/${nextLesson.id}`)
                  : router.push("/dashboard")
              }
            >
              {nextLesson ? (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Back to Dashboard"
              )}
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lesson Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Duration</div>
                <div className="text-lg font-semibold">{lesson.duration} minutes</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Level</div>
                <div className="text-lg font-semibold">
                  {level.icon} {level.title}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="text-lg font-semibold">
                  {currentLessonIndex + 1} / {level.lessons.length}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Level Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {level.lessons.map((l, idx) => (
                  <Link
                    key={l.id}
                    href={`/level/${levelId}/lesson/${l.id}`}
                    className={`block rounded-lg border p-2 text-sm transition-colors ${
                      l.id === lessonId
                        ? "border-primary bg-primary/10"
                        : "hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>
                        {idx + 1}. {l.title}
                      </span>
                      {progress.completedLessons.includes(l.id) && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
