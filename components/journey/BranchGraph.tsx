"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface GraphCommit {
  id: string;
  message: string;
  branch: string;
}

interface BranchGraphProps {
  branches: string[];
  currentBranch: string;
  commits: GraphCommit[];
}

const BRANCH_COLORS: Record<string, string> = {
  main: "#3b82f6",
  "origin/main": "#8b5cf6",
  "upstream/main": "#a855f7",
  "feature/add-styling": "#22c55e",
  "feature/dark-mode": "#f59e0b",
  "feature/search": "#06b6d4",
  "feature/amazing-feature": "#ec4899",
  develop: "#f97316",
};

function getBranchColor(branch: string): string {
  return BRANCH_COLORS[branch] || "#6366f1";
}

export function BranchGraph({ branches, currentBranch, commits }: BranchGraphProps) {
  const branchLanes = useMemo(() => {
    const lanes: Record<string, number> = {};
    branches.forEach((b, i) => {
      lanes[b] = i;
    });
    return lanes;
  }, [branches]);

  const nodeSpacingY = 70;
  const laneSpacingX = 100;
  const paddingX = 60;
  const paddingY = 40;
  const svgWidth = paddingX * 2 + (branches.length - 1) * laneSpacingX + 180;
  const svgHeight = paddingY * 2 + (commits.length - 1) * nodeSpacingY + 40;

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-primary">🌿 Branch Graph</span>
        <span className="text-xs text-muted-foreground">
          on <code className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-[10px]">{currentBranch}</code>
        </span>
      </div>

      {commits.length === 0 ? (
        <div className="flex items-center justify-center h-24 text-sm text-muted-foreground">
          No commits yet — initialize your repository!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <svg width={svgWidth} height={svgHeight} className="select-none">
            {/* Branch labels at top */}
            {branches.map((branch) => {
              const x = paddingX + (branchLanes[branch] || 0) * laneSpacingX;
              const color = getBranchColor(branch);
              return (
                <g key={`label-${branch}`}>
                  <motion.text
                    x={x}
                    y={18}
                    textAnchor="middle"
                    fill={color}
                    fontSize={10}
                    fontWeight={branch === currentBranch ? 700 : 500}
                    fontFamily="monospace"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {branch === currentBranch ? `● ${branch}` : branch}
                  </motion.text>
                </g>
              );
            })}

            {/* Connection lines */}
            {commits.map((commit, i) => {
              if (i === 0) return null;
              const prev = commits[i - 1];
              const fromX = paddingX + (branchLanes[prev.branch] || 0) * laneSpacingX;
              const fromY = paddingY + (i - 1) * nodeSpacingY;
              const toX = paddingX + (branchLanes[commit.branch] || 0) * laneSpacingX;
              const toY = paddingY + i * nodeSpacingY;
              const color = getBranchColor(commit.branch);

              const isCross = fromX !== toX;
              const d = isCross
                ? `M ${fromX} ${fromY} C ${fromX} ${fromY + 30}, ${toX} ${toY - 30}, ${toX} ${toY}`
                : `M ${fromX} ${fromY} L ${toX} ${toY}`;

              return (
                <motion.path
                  key={`line-${i}`}
                  d={d}
                  stroke={color}
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                />
              );
            })}

            {/* Commit nodes */}
            {commits.map((commit, i) => {
              const x = paddingX + (branchLanes[commit.branch] || 0) * laneSpacingX;
              const y = paddingY + i * nodeSpacingY;
              const color = getBranchColor(commit.branch);
              const isHead = i === commits.length - 1;

              return (
                <g key={commit.id}>
                  {/* Glow for HEAD */}
                  {isHead && (
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={14}
                      fill={color}
                      opacity={0.15}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  {/* Node circle */}
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={8}
                    fill={color}
                    stroke="hsl(var(--card))"
                    strokeWidth={3}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: i * 0.15 + 0.1 }}
                  />
                  {/* Commit message */}
                  <motion.text
                    x={x + 18}
                    y={y + 4}
                    fontSize={11}
                    fill="hsl(var(--muted-foreground))"
                    fontFamily="monospace"
                    initial={{ opacity: 0, x: x + 10 }}
                    animate={{ opacity: 1, x: x + 18 }}
                    transition={{ delay: i * 0.15 + 0.2 }}
                  >
                    {commit.message}
                  </motion.text>
                  {/* HEAD label */}
                  {isHead && (
                    <motion.text
                      x={x + 18}
                      y={y + 18}
                      fontSize={9}
                      fill={color}
                      fontWeight={700}
                      fontFamily="monospace"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.15 + 0.4 }}
                    >
                      ← HEAD
                    </motion.text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </div>
  );
}
