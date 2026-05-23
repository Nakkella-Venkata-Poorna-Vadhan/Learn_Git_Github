"use client";

import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";

interface StoryPanelProps {
  narrative: string;
  concept: string;
  lesson: string;
  chapterTitle: string;
  chapterNumber: number;
}

export function StoryPanel({ narrative, concept, lesson, chapterTitle, chapterNumber }: StoryPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Narrative Card */}
      <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/5 via-card to-accent/5 p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Chapter {chapterNumber} — {concept}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-3">{chapterTitle}</h2>
          <p className="text-muted-foreground leading-relaxed">{narrative}</p>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Lesson</span>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {lesson.split("\\n").map((line, i) => {
            if (line.startsWith("# ")) {
              return <h1 key={i} className="text-xl font-bold mt-4 mb-2">{line.slice(2)}</h1>;
            }
            if (line.startsWith("## ")) {
              return <h2 key={i} className="text-lg font-semibold mt-4 mb-2 text-primary">{line.slice(3)}</h2>;
            }
            if (line.startsWith("### ")) {
              return <h3 key={i} className="text-base font-semibold mt-3 mb-1">{line.slice(4)}</h3>;
            }
            if (line.startsWith("```")) {
              return null; // Skip code fence markers
            }
            if (line.startsWith("- ")) {
              return (
                <div key={i} className="flex items-start gap-2 ml-2 my-0.5">
                  <span className="text-primary mt-1.5 text-[6px]">●</span>
                  <span className="text-sm text-muted-foreground">{renderInlineCode(line.slice(2))}</span>
                </div>
              );
            }
            if (line.trim() === "") return <div key={i} className="h-2" />;
            return <p key={i} className="text-sm text-muted-foreground my-1">{renderInlineCode(line)}</p>;
          })}
        </div>
      </div>
    </motion.div>
  );
}

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-xs font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    // Handle bold
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bp, j) => {
      if (bp.startsWith("**") && bp.endsWith("**")) {
        return <strong key={`${i}-${j}`} className="font-semibold text-foreground">{bp.slice(2, -2)}</strong>;
      }
      return <span key={`${i}-${j}`}>{bp}</span>;
    });
  });
}
