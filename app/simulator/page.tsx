"use client";

import { useState, useEffect, Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Terminal, Play, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

interface Commit {
  id: string;
  message: string;
  hash: string;
  branch: string;
}

interface FileState {
  name: string;
  status: "untracked" | "modified" | "staged" | "committed";
}

function SimulatorContent() {
  const searchParams = useSearchParams();
  const prefillCommand = searchParams.get("command") || "";

  const [command, setCommand] = useState(prefillCommand);
  const [history, setHistory] = useState<string[]>([]);
  const [currentBranch, setCurrentBranch] = useState("main");
  const [branches, setBranches] = useState<string[]>(["main"]);
  const [commits, setCommits] = useState<Commit[]>([
    { id: "1", message: "Initial commit", hash: "a1b2c3d", branch: "main" },
  ]);
  const [files, setFiles] = useState<FileState[]>([
    { name: "README.md", status: "committed" },
  ]);
  const [output, setOutput] = useState<string>("");
  const [headCommit, setHeadCommit] = useState("a1b2c3d");

  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().split(" ");
    const gitCmd = parts[0];
    const args = parts.slice(1);

    setHistory([...history, cmd]);
    setOutput("");

    // Simulate git commands
    if (gitCmd === "git") {
      const subCmd = args[0];

      switch (subCmd) {
        case "init":
          setOutput("Initialized empty Git repository in .git/");
          if (commits.length === 0) {
            setCommits([
              { id: "1", message: "Initial commit", hash: "a1b2c3d", branch: "main" },
            ]);
            setHeadCommit("a1b2c3d");
          }
          break;

        case "status":
          const modified = files.filter((f) => f.status === "modified").map((f) => f.name);
          const staged = files.filter((f) => f.status === "staged").map((f) => f.name);
          const untracked = files.filter((f) => f.status === "untracked").map((f) => f.name);

          let statusOutput = `On branch ${currentBranch}\n`;
          if (staged.length > 0) {
            statusOutput += "\nChanges to be committed:\n";
            staged.forEach((f) => {
              statusOutput += `  modified:   ${f}\n`;
            });
          }
          if (modified.length > 0) {
            statusOutput += "\nChanges not staged for commit:\n";
            modified.forEach((f) => {
              statusOutput += `  modified:   ${f}\n`;
            });
          }
          if (untracked.length > 0) {
            statusOutput += "\nUntracked files:\n";
            untracked.forEach((f) => {
              statusOutput += `  ${f}\n`;
            });
          }
          if (modified.length === 0 && staged.length === 0 && untracked.length === 0) {
            statusOutput += "\nnothing to commit, working tree clean";
          }
          setOutput(statusOutput);
          break;

        case "add":
          if (args[1] === "." || args[1] === "-A") {
            setFiles(
              files.map((f) =>
                f.status === "modified" || f.status === "untracked"
                  ? { ...f, status: "staged" }
                  : f
              )
            );
            setOutput("Files staged for commit");
          } else if (args[1]) {
            setFiles(
              files.map((f) =>
                f.name === args[1] && (f.status === "modified" || f.status === "untracked")
                  ? { ...f, status: "staged" }
                  : f
              )
            );
            setOutput(`Added ${args[1]} to staging area`);
          }
          break;

        case "commit":
          const messageMatch = cmd.match(/-m\s+["'](.+?)["']/);
          const message = messageMatch ? messageMatch[1] : "Update files";
          const stagedFiles = files.filter((f) => f.status === "staged");

          if (stagedFiles.length === 0) {
            setOutput("nothing to commit, working tree clean");
            break;
          }

          const newHash = Math.random().toString(36).substring(2, 9);
          const newCommit: Commit = {
            id: (commits.length + 1).toString(),
            message,
            hash: newHash,
            branch: currentBranch,
          };

          setCommits([...commits, newCommit]);
          setHeadCommit(newHash);
          setFiles(
            files.map((f) =>
              f.status === "staged" ? { ...f, status: "committed" } : f
            )
          );
          setOutput(`[${currentBranch} ${newHash}] ${message}\n${stagedFiles.length} file(s) changed`);
          break;

        case "branch":
          if (args[1] && !args[1].startsWith("-")) {
            // Create branch
            if (!branches.includes(args[1])) {
              setBranches([...branches, args[1]]);
              setOutput(`Created branch ${args[1]}`);
            } else {
              setOutput(`fatal: A branch named '${args[1]}' already exists.`);
            }
          } else {
            // List branches
            const branchList = branches
              .map((b) => (b === currentBranch ? `* ${b}` : `  ${b}`))
              .join("\n");
            setOutput(branchList);
          }
          break;

        case "switch":
        case "checkout":
          if (args[1] && args[1] !== "-b" && args[1] !== "-c") {
            if (branches.includes(args[1])) {
              setCurrentBranch(args[1]);
              setOutput(`Switched to branch '${args[1]}'`);
            } else {
              setOutput(`error: pathspec '${args[1]}' did not match any file(s) known to git.`);
            }
          } else if (args[1] === "-b" || args[1] === "-c") {
            const newBranch = args[2];
            if (newBranch && !branches.includes(newBranch)) {
              setBranches([...branches, newBranch]);
              setCurrentBranch(newBranch);
              setOutput(`Switched to a new branch '${newBranch}'`);
            }
          }
          break;

        case "log":
          const logOutput = commits
            .filter((c) => c.branch === currentBranch)
            .reverse()
            .map((c) => `commit ${c.hash}\nAuthor: You <you@example.com>\n    ${c.message}`)
            .join("\n\n");
          setOutput(logOutput || "No commits yet");
          break;

        default:
          setOutput(`git: '${subCmd}' is not a git command. See 'git --help'.`);
      }
    } else if (cmd.trim() === "") {
      // Empty command, do nothing
    } else {
      setOutput(`Command not found: ${cmd}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      executeCommand(command);
      setCommand("");
    }
  };

  const reset = () => {
    setCommand("");
    setHistory([]);
    setCurrentBranch("main");
    setBranches(["main"]);
    setCommits([{ id: "1", message: "Initial commit", hash: "a1b2c3d", branch: "main" }]);
    setFiles([{ name: "README.md", status: "committed" }]);
    setOutput("");
    setHeadCommit("a1b2c3d");
  };

  const addTestFile = () => {
    const newFile: FileState = {
      name: `file${files.length + 1}.txt`,
      status: "untracked",
    };
    setFiles([...files, newFile]);
  };

  const modifyFile = (fileName: string) => {
    setFiles(
      files.map((f) =>
        f.name === fileName && f.status === "committed"
          ? { ...f, status: "modified" }
          : f
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Visual Git Simulator</h1>
        <p className="text-muted-foreground">
          Practice Git commands in a safe environment with visual feedback
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Terminal */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Terminal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Command History */}
              <div className="min-h-[200px] rounded-lg bg-black p-4 font-mono text-sm text-green-400">
                {history.map((cmd, idx) => (
                  <div key={idx} className="mb-2">
                    <span className="text-blue-400">$</span> {cmd}
                  </div>
                ))}
                {output && (
                  <div className="mt-2 whitespace-pre-wrap text-white">{output}</div>
                )}
              </div>

              {/* Command Input */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="Enter git command..."
                  className="font-mono"
                />
                <Button type="submit">
                  <Play className="h-4 w-4" />
                </Button>
              </form>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="outline" onClick={reset} size="sm">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button variant="outline" onClick={addTestFile} size="sm">
                  Add Test File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Commit Graph */}
          <Card>
            <CardHeader>
              <CardTitle>Commit History</CardTitle>
              <CardDescription>Current branch: {currentBranch}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <AnimatePresence>
                  {commits
                    .filter((c) => c.branch === currentBranch)
                    .reverse()
                    .map((commit, idx) => (
                      <motion.div
                        key={commit.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 rounded-lg border p-3"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-mono">
                          {commit.hash.substring(0, 4)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{commit.message}</div>
                          <div className="text-sm text-muted-foreground font-mono">
                            {commit.hash}
                          </div>
                        </div>
                        {commit.hash === headCommit && (
                          <div className="rounded bg-green-500 px-2 py-1 text-xs text-white">
                            HEAD
                          </div>
                        )}
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File System & Branches */}
        <div className="space-y-4">
          {/* Files */}
          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between rounded-lg border p-2"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        file.status === "committed"
                          ? "bg-green-500"
                          : file.status === "staged"
                            ? "bg-yellow-500"
                            : file.status === "modified"
                              ? "bg-orange-500"
                              : "bg-gray-500"
                      }`}
                    />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  {file.status === "committed" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => modifyFile(file.name)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Branches */}
          <Card>
            <CardHeader>
              <CardTitle>Branches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {branches.map((branch) => (
                  <div
                    key={branch}
                    className={`rounded p-2 text-sm ${
                      branch === currentBranch ? "bg-primary/10 font-semibold" : ""
                    }`}
                  >
                    {branch === currentBranch && "✓ "}
                    {branch}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Simulator() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Loading simulator...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <SimulatorContent />
    </Suspense>
  );
}
