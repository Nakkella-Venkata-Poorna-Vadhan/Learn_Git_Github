"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, CheckCircle2, AlertCircle, Circle } from "lucide-react";

interface JourneyTerminalProps {
  expectedCommands: string[];
  terminalOutputs: Record<string, string>;
  hint: string;
  onAllCommandsComplete: () => void;
}

interface HistoryEntry {
  input: string;
  output: string;
  success: boolean;
  isSystem?: boolean;
}

export function JourneyTerminal({
  expectedCommands,
  terminalOutputs,
  hint,
  onAllCommandsComplete,
}: JourneyTerminalProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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

  const getTerminalOutput = (input: string): string => {
    // Find matching output from terminalOutputs map
    for (const [cmd, output] of Object.entries(terminalOutputs)) {
      if (input.startsWith(cmd) || input === cmd) {
        return output;
      }
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim() || isTyping) return;

    const input = currentInput.trim();
    const matchedCommand = expectedCommands.find(
      (cmd) => input.startsWith(cmd) || input === cmd
    );

    if (matchedCommand) {
      const alreadyDone = completedCommands.includes(matchedCommand);
      const output = getTerminalOutput(input);

      setIsTyping(true);

      // Add command immediately
      setHistory((prev) => [
        ...prev,
        { input, output: "", success: true },
      ]);

      // Simulate output appearing with a delay
      setTimeout(() => {
        setHistory((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            input,
            output: alreadyDone
              ? "✓ Already completed this step."
              : output || `✓ Command executed successfully.`,
            success: true,
          };
          return updated;
        });

        if (!alreadyDone) {
          setCompletedCommands((prev) => [...prev, matchedCommand]);
        }
        setIsTyping(false);
      }, 400);
    } else {
      // Show error with helpful message
      const closestCmd = expectedCommands.find((cmd) =>
        cmd.split(" ")[0] === input.split(" ")[0]
      );

      setHistory((prev) => [
        ...prev,
        {
          input,
          output: closestCmd
            ? `bash: close! Try: ${closestCmd}`
            : `bash: command not expected for this mission. Check the objectives above.`,
          success: false,
        },
      ]);
    }

    setCurrentInput("");
    setShowHint(false);
  };

  const currentStep = completedCommands.length;
  const totalSteps = expectedCommands.length;

  return (
    <div className="rounded-xl border bg-[#0d1117] text-green-400 font-mono text-sm overflow-hidden shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-400">snapnote</span>
          <span className="text-[10px] text-gray-600">— bash</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
      </div>

      {/* Mission objectives in terminal */}
      <div className="px-4 py-2.5 bg-[#161b22]/60 border-b border-[#30363d]">
        <div className="text-[10px] uppercase tracking-widest text-[#484f58] mb-1.5">
          ▸ Mission Objectives ({currentStep}/{totalSteps})
        </div>
        {expectedCommands.map((cmd, i) => {
          const done = completedCommands.some((c) => c.includes(cmd) || cmd.includes(c));
          const isCurrent = !done && i === currentStep;
          return (
            <div key={i} className="flex items-center gap-2 text-xs py-0.5">
              {done ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-[#28c840]" />
              ) : isCurrent ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Circle className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500/30" />
                </motion.div>
              ) : (
                <Circle className="h-3.5 w-3.5 text-[#30363d]" />
              )}
              <code
                className={
                  done
                    ? "text-[#28c840]/60 line-through"
                    : isCurrent
                    ? "text-yellow-400"
                    : "text-[#484f58]"
                }
              >
                $ {cmd}
              </code>
            </div>
          );
        })}
      </div>

      {/* Output area */}
      <div
        ref={scrollRef}
        className="p-4 min-h-[120px] max-h-[280px] overflow-y-auto space-y-3"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Welcome message */}
        <div className="text-[#484f58] text-xs">
          user@snapnote:~$ <span className="text-[#484f58]">{"# Ready for commands..."}</span>
        </div>

        {history.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-0.5"
          >
            {/* Command input line */}
            <div className="flex items-center gap-0">
              <span className="text-[#3fb950]">user@snapnote</span>
              <span className="text-[#484f58]">:</span>
              <span className="text-[#58a6ff]">~</span>
              <span className="text-[#484f58]">$ </span>
              <span className="text-[#c9d1d9]">{entry.input}</span>
            </div>
            {/* Output */}
            {entry.output && (
              <pre
                className={`text-xs whitespace-pre-wrap leading-relaxed pl-0 ${
                  entry.success ? "text-[#8b949e]" : "text-[#f85149]"
                }`}
              >
                {entry.output}
              </pre>
            )}
          </motion.div>
        ))}

        {/* Completion banner */}
        {allDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 p-3 rounded-lg bg-[#28c840]/10 border border-[#28c840]/20 text-center"
          >
            <div className="text-[#28c840] text-sm font-bold mb-0.5">
              ✨ All objectives complete!
            </div>
            <div className="text-[#484f58] text-xs">
              Click &quot;Complete Mission&quot; to claim your rewards.
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center border-t border-[#30363d] px-4 py-2.5 bg-[#0d1117]"
      >
        <span className="text-[#3fb950] shrink-0">user@snapnote</span>
        <span className="text-[#484f58] shrink-0">:</span>
        <span className="text-[#58a6ff] shrink-0">~</span>
        <span className="text-[#484f58] shrink-0 mr-1">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          placeholder={allDone ? "All objectives completed ✓" : "Type your command..."}
          disabled={allDone || isTyping}
          className="flex-1 bg-transparent outline-none text-[#c9d1d9] placeholder-[#30363d] disabled:opacity-40 caret-[#28c840]"
          autoFocus
        />
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-[#28c840] text-xs"
          >
            ▌
          </motion.span>
        )}
      </form>

      {/* Hint */}
      {!allDone && (
        <div className="px-4 py-2 border-t border-[#30363d] bg-[#161b22]/40">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-[10px] text-[#d29922]/60 hover:text-[#d29922] transition-colors flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3" />
            {showHint ? "Hide hint" : "Stuck? Get a hint"}
          </button>
          {showHint && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-xs text-[#d29922]/80 mt-1.5 pl-4"
            >
              💡 {hint}
            </motion.p>
          )}
        </div>
      )}
    </div>
  );
}
