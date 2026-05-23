"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, CheckCircle2, AlertCircle } from "lucide-react";

interface JourneyTerminalProps {
  expectedCommands: string[];
  hint: string;
  onAllCommandsComplete: () => void;
}

export function JourneyTerminal({ expectedCommands, hint, onAllCommandsComplete }: JourneyTerminalProps) {
  const [history, setHistory] = useState<{ input: string; output: string; success: boolean }[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const allDone = expectedCommands.every((cmd) =>
    completedCommands.some((c) => c.includes(cmd) || cmd.includes(c))
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (allDone && completedCommands.length > 0) {
      onAllCommandsComplete();
    }
  }, [allDone, completedCommands.length, onAllCommandsComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const input = currentInput.trim();
    const matchedCommand = expectedCommands.find(
      (cmd) => input.startsWith(cmd) || input === cmd
    );

    if (matchedCommand) {
      const alreadyDone = completedCommands.includes(matchedCommand);
      setHistory((prev) => [
        ...prev,
        {
          input,
          output: alreadyDone
            ? "✓ Already completed this step."
            : `✓ Correct! Executed: ${input}`,
          success: true,
        },
      ]);
      if (!alreadyDone) {
        setCompletedCommands((prev) => [...prev, matchedCommand]);
      }
    } else {
      setHistory((prev) => [
        ...prev,
        {
          input,
          output: `Command not recognized for this step. Try one of the expected commands.`,
          success: false,
        },
      ]);
    }

    setCurrentInput("");
    setShowHint(false);
  };

  return (
    <div className="rounded-xl border bg-gray-950 text-green-400 font-mono text-sm overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span className="text-xs text-gray-400">SnapNote Terminal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
      </div>

      {/* Task checklist */}
      <div className="px-4 py-2 bg-gray-900/50 border-b border-gray-800">
        <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Tasks</div>
        {expectedCommands.map((cmd, i) => {
          const done = completedCommands.some((c) => c.includes(cmd) || cmd.includes(c));
          return (
            <div key={i} className="flex items-center gap-2 text-xs py-0.5">
              {done ? (
                <CheckCircle2 className="h-3 w-3 text-green-500" />
              ) : (
                <div className="h-3 w-3 rounded-full border border-gray-600" />
              )}
              <code className={done ? "text-green-500 line-through opacity-60" : "text-gray-400"}>
                {cmd}
              </code>
            </div>
          );
        })}
      </div>

      {/* Output area */}
      <div ref={scrollRef} className="p-4 max-h-48 overflow-y-auto space-y-2">
        <div className="text-gray-500 text-xs">~/snapnote $</div>
        {history.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-1">
              <span className="text-blue-400">$</span>
              <span className="text-white">{entry.input}</span>
            </div>
            <div className={entry.success ? "text-green-400 ml-2" : "text-red-400 ml-2"}>
              {entry.output}
            </div>
          </motion.div>
        ))}

        {allDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2 p-2 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs text-center"
          >
            🎉 All tasks complete! You can proceed to the next chapter.
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex items-center border-t border-gray-800 px-4 py-2">
        <span className="text-blue-400 mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          placeholder={allDone ? "All tasks completed ✓" : "Type a git command..."}
          disabled={allDone}
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-600 disabled:opacity-50"
          autoFocus
        />
      </form>

      {/* Hint */}
      {!allDone && (
        <div className="px-4 py-2 border-t border-gray-800">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-[10px] text-yellow-500/70 hover:text-yellow-500 transition-colors flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3" />
            {showHint ? "Hide hint" : "Need a hint?"}
          </button>
          {showHint && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-xs text-yellow-500/80 mt-1"
            >
              💡 {hint}
            </motion.p>
          )}
        </div>
      )}
    </div>
  );
}
