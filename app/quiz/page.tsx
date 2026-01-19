"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgressStore } from "@/lib/store";
import { QuizQuestions } from "@/data/quiz";

interface Question {
  id: string;
  question: string;
  type: "multiple-choice" | "scenario";
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  level: number;
}

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const { addXP } = useProgressStore();

  const currentQuestion = QuizQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswer = (answer: string | number) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      if (!answeredQuestions.has(currentQuestionIndex)) {
        addXP(10);
        setAnsweredQuestions(new Set([...answeredQuestions, currentQuestionIndex]));
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < QuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Set());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Git & GitHub Quiz</h1>
        <p className="text-muted-foreground">Test your knowledge with interactive questions</p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>
            Question {currentQuestionIndex + 1} of {QuizQuestions.length}
          </span>
          <span>Score: {score} / {QuizQuestions.length}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentQuestionIndex + 1) / QuizQuestions.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Question Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
                <Badge>Level {currentQuestion.level}</Badge>
              </div>
              {currentQuestion.type === "scenario" && (
                <CardDescription className="text-base">
                  Scenario-based question - think about what would happen
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuestion.options && (
                <div className="space-y-2">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrectOption = idx === currentQuestion.correctAnswer;
                    const showCorrect = showResult && isCorrectOption;

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => !showResult && handleAnswer(idx)}
                        disabled={showResult}
                        className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                          showResult
                            ? showCorrect
                              ? "border-green-500 bg-green-50 dark:bg-green-950"
                              : isSelected
                                ? "border-red-500 bg-red-50 dark:bg-red-950"
                                : "border-muted"
                            : isSelected
                              ? "border-primary bg-primary/10"
                              : "border-muted hover:border-primary/50"
                        }`}
                        whileHover={!showResult ? { scale: 1.02 } : {}}
                        whileTap={!showResult ? { scale: 0.98 } : {}}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showResult && (
                            <>
                              {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                              {isSelected && !showCorrect && (
                                <XCircle className="h-5 w-5 text-red-500" />
                              )}
                            </>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border p-4"
                  >
                    <div
                      className={`mb-2 flex items-center gap-2 font-semibold ${
                        isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="h-5 w-5" />
                          Correct!
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5" />
                          Incorrect
                        </>
                      )}
                    </div>
                    <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetQuiz}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  {showResult && currentQuestionIndex < QuizQuestions.length - 1 && (
                    <Button onClick={handleNext}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quiz Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-2xl font-bold">{score}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.round((score / (currentQuestionIndex + 1)) * 100) || 0}%
                </div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{answeredQuestions.size}</div>
                <div className="text-sm text-muted-foreground">Questions Answered</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
