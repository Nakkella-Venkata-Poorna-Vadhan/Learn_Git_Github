"use client";

import { motion } from "framer-motion";
import { File, Folder, FileCode, FileText } from "lucide-react";

interface FileChange {
  name: string;
  status: "added" | "modified" | "deleted" | "staged" | "committed";
}

interface FileTreeProps {
  files: FileChange[];
}

const STATUS_CONFIG = {
  added: { color: "text-green-400", bg: "bg-green-500/10", label: "U", tooltip: "Untracked" },
  modified: { color: "text-yellow-400", bg: "bg-yellow-500/10", label: "M", tooltip: "Modified" },
  deleted: { color: "text-red-400", bg: "bg-red-500/10", label: "D", tooltip: "Deleted" },
  staged: { color: "text-blue-400", bg: "bg-blue-500/10", label: "S", tooltip: "Staged" },
  committed: { color: "text-purple-400", bg: "bg-purple-500/10", label: "C", tooltip: "Committed" },
};

function getFileIcon(name: string) {
  if (name.endsWith("/")) return <Folder className="h-4 w-4 text-yellow-500" />;
  if (name.endsWith(".html")) return <FileCode className="h-4 w-4 text-orange-400" />;
  if (name.endsWith(".css")) return <FileCode className="h-4 w-4 text-blue-400" />;
  if (name.endsWith(".js") || name.endsWith(".ts")) return <FileCode className="h-4 w-4 text-yellow-400" />;
  if (name.endsWith(".yml") || name.endsWith(".yaml")) return <FileText className="h-4 w-4 text-pink-400" />;
  if (name.endsWith(".md")) return <FileText className="h-4 w-4 text-muted-foreground" />;
  return <File className="h-4 w-4 text-muted-foreground" />;
}

export function FileTree({ files }: FileTreeProps) {
  if (files.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-4">
        <div className="text-sm font-semibold text-primary mb-2">📁 Project Files</div>
        <div className="text-xs text-muted-foreground text-center py-4">No file changes in this step</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-sm font-semibold text-primary mb-3">📁 Project Files</div>
      <div className="space-y-1 font-mono text-sm">
        {/* Project root */}
        <div className="flex items-center gap-2 text-muted-foreground px-2">
          <Folder className="h-4 w-4 text-yellow-500" />
          <span className="font-semibold">snapnote/</span>
        </div>
        {/* File entries */}
        {files.map((file, i) => {
          const config = STATUS_CONFIG[file.status];
          return (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-2 px-4 py-1 rounded-md ${config.bg}`}
            >
              {getFileIcon(file.name)}
              <span className={`flex-1 ${config.color}`}>{file.name}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${config.color} bg-background/50`}
                title={config.tooltip}
              >
                {config.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
