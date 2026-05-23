"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileCode, FileText, File, Settings } from "lucide-react";

interface ProjectExplorerProps {
  cumulativeFiles: string[];
  newFiles: { name: string; status: "added" | "modified" | "deleted" | "staged" | "committed" }[];
}

interface TreeNode {
  name: string;
  path: string;
  isDir: boolean;
  children: TreeNode[];
  isNew: boolean;
  status?: string;
}

function buildTree(allFiles: string[], newFiles: { name: string; status: string }[]): TreeNode {
  const root: TreeNode = { name: "snapnote", path: "", isDir: true, children: [], isNew: false };
  const newFileNames = new Set(newFiles.map((f) => f.name));
  const statusMap = new Map(newFiles.map((f) => [f.name, f.status]));

  for (const filePath of allFiles) {
    const parts = filePath.replace(/\/$/, "").split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const fullPath = parts.slice(0, i + 1).join("/");
      const isLast = i === parts.length - 1;
      const isDir = filePath.endsWith("/") ? true : !isLast;

      let child = current.children.find((c) => c.name === part);
      if (!child) {
        child = {
          name: part,
          path: fullPath,
          isDir: isDir || !isLast,
          children: [],
          isNew: newFileNames.has(filePath),
          status: isLast ? statusMap.get(filePath) : undefined,
        };
        current.children.push(child);
      }
      current = child;
    }
  }

  // Sort: dirs first, then alphabetically
  function sortTree(node: TreeNode) {
    node.children.sort((a, b) => {
      if (a.isDir && !b.isDir) return -1;
      if (!a.isDir && b.isDir) return 1;
      return a.name.localeCompare(b.name);
    });
    node.children.forEach(sortTree);
  }
  sortTree(root);

  return root;
}

function getFileIcon(name: string, isDir: boolean, isOpen: boolean) {
  if (isDir) {
    if (name === ".git") return isOpen ? <FolderOpen className="h-4 w-4 text-orange-400" /> : <Folder className="h-4 w-4 text-orange-400" />;
    if (name === ".github") return isOpen ? <FolderOpen className="h-4 w-4 text-purple-400" /> : <Folder className="h-4 w-4 text-purple-400" />;
    return isOpen ? <FolderOpen className="h-4 w-4 text-yellow-500" /> : <Folder className="h-4 w-4 text-yellow-500" />;
  }
  if (name.endsWith(".html")) return <FileCode className="h-4 w-4 text-orange-400" />;
  if (name.endsWith(".css")) return <FileCode className="h-4 w-4 text-blue-400" />;
  if (name.endsWith(".js") || name.endsWith(".ts")) return <FileCode className="h-4 w-4 text-yellow-400" />;
  if (name.endsWith(".yml") || name.endsWith(".yaml")) return <Settings className="h-4 w-4 text-pink-400" />;
  if (name.endsWith(".md")) return <FileText className="h-4 w-4 text-blue-300" />;
  if (name.startsWith("pre-commit")) return <Settings className="h-4 w-4 text-green-400" />;
  return <File className="h-4 w-4 text-muted-foreground" />;
}

const STATUS_COLORS: Record<string, string> = {
  added: "text-green-400",
  modified: "text-yellow-400",
  deleted: "text-red-400",
  staged: "text-blue-400",
  committed: "text-purple-400",
};

function TreeItem({ node, depth, defaultOpen }: { node: TreeNode; depth: number; defaultOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <motion.div
        initial={node.isNew ? { opacity: 0, x: -8, backgroundColor: "rgba(34, 197, 94, 0.15)" } : { opacity: 1 }}
        animate={{ opacity: 1, x: 0, backgroundColor: "transparent" }}
        transition={{ duration: 0.5, delay: node.isNew ? 0.3 : 0 }}
        className={`flex items-center gap-1.5 py-0.5 px-2 rounded cursor-default hover:bg-accent/30 transition-colors ${
          node.isNew ? "ring-1 ring-green-500/30" : ""
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => node.isDir && setIsOpen(!isOpen)}
      >
        {node.isDir ? (
          <span className="text-muted-foreground">
            {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </span>
        ) : (
          <span className="w-3" />
        )}
        {getFileIcon(node.name, node.isDir, isOpen)}
        <span className={`text-xs font-mono ${node.status ? STATUS_COLORS[node.status] || "" : "text-foreground/80"}`}>
          {node.name}{node.isDir && !node.name.endsWith("/") ? "/" : ""}
        </span>
        {node.isNew && node.status && (
          <span className={`text-[9px] font-bold uppercase ml-auto ${STATUS_COLORS[node.status] || "text-green-400"}`}>
            {node.status === "added" ? "NEW" : node.status === "modified" ? "MOD" : node.status.toUpperCase()}
          </span>
        )}
      </motion.div>
      {node.isDir && isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {node.children.map((child) => (
            <TreeItem
              key={child.path}
              node={child}
              depth={depth + 1}
              defaultOpen={child.name !== ".git" && child.name !== "hooks" && child.name !== "workflows"}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export function ProjectExplorer({ cumulativeFiles, newFiles }: ProjectExplorerProps) {
  const tree = buildTree(cumulativeFiles, newFiles);

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {/* VS Code-like title bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b">
        <Folder className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Explorer
        </span>
        <span className="text-[10px] text-muted-foreground ml-auto">
          {cumulativeFiles.length} items
        </span>
      </div>

      {/* Tree */}
      <div className="p-1 max-h-80 overflow-y-auto font-mono text-sm">
        <TreeItem node={tree} depth={0} defaultOpen={true} />
      </div>
    </div>
  );
}
