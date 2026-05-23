# Git Master Platform — Mega Expansion Plan

## Overview

Two massive additions to the existing Next.js Git learning platform:

1. **Pro Git Book Coverage** — Expand the current 6 levels + lesson data to cover the full Pro Git book content (all chapters, topics, internals, advanced workflows, Git on servers, CI/CD, Git tools, customization, internals, etc.)
2. **"The Journey" — Guided Interactive Learning Path** — A brand-new section with a single running story-project that evolves from `git init` all the way to open-source contribution workflows, complete with a live visual branch graph, interactive terminal, and step-by-step guided tasks.

---

## ✅ Confirmed Decisions

- **Journey route**: New `/journey` route — simulator stays as-is
- **Level expansion**: Add new levels 7–10 for Pro Git book coverage
- **Branch graph**: SVG structure + Framer Motion animations on every node/line (hybrid!)
- **Game mechanics**: Skill unlock system, free-play mode between chapters, XP rewards, story narrative

---

## What "The Journey" Will Look Like

The Journey section is a **guided, narrative-driven, hands-on experience** that builds one continuous project from scratch. It's not free-form — every step is scripted, has a visual outcome, and teaches exactly one concept at a time.

### The Story: "Building SnapNote — Your First App on Git"
- You are building a note-taking app called **SnapNote**
- The same project evolves through all Git & GitHub concepts
- Each "chapter" of the journey is one Git/GitHub concept applied to SnapNote

### Journey Chapters (30+ steps)
| Chapter | Concept | What Happens to SnapNote |
|---|---|---|
| 1 | `git init` | Create the project folder |
| 2 | Working Directory | Create `index.html` |
| 3 | `git add` + `git status` | Stage the file |
| 4 | `git commit` | First commit — "Initial commit" |
| 5 | Commit history / `git log` | See the timeline |
| 6 | `git branch` | Create `feature/add-styling` |
| 7 | `git switch` | Switch to feature branch |
| 8 | Commit on branch | Add CSS file |
| 9 | Branch graph | **See branches diverge visually** |
| 10 | Fast-forward merge | Merge styling into main |
| 11 | Three-way merge | Merge conflicting branches |
| 12 | Merge conflict resolution | Edit conflict markers |
| 13 | `git stash` | Save WIP, switch tasks |
| 14 | `git remote add` | Connect to GitHub |
| 15 | `git push` | Upload to remote |
| 16 | `git clone` | Clone on another "machine" |
| 17 | `git pull` | Sync changes |
| 18 | Fork & PR workflow | Open PR on SnapNote |
| 19 | `git fetch` vs `git pull` | Understand the difference |
| 20 | `git rebase` | Linear history for SnapNote |
| 21 | `git cherry-pick` | Port a hotfix |
| 22 | `git reset` (soft/mixed/hard) | Undo mistakes |
| 23 | `git revert` | Safe undo on public branch |
| 24 | `git reflog` | Recover "lost" commits |
| 25 | `git tag` | Release v1.0.0 |
| 26 | Git hooks | Pre-commit linting |
| 27 | `.gitignore` | Ignore `node_modules` |
| 28 | `git bisect` | Find the commit that broke login |
| 29 | GitHub Actions / CI | Auto-test on push |
| 30 | Open Source contribution | Fork, PR, upstream sync |

### Journey UX Layout
```
┌──────────────────────────────────────────────────────────┐
│  JOURNEY SIDEBAR     │  MAIN AREA                        │
│  ─────────────────   │  ─────────────────────────────── │
│  ✅ Chapter 1        │  📖 Story Panel (what's happening)│
│  ✅ Chapter 2        │  🖥️ Interactive Terminal           │
│  ▶️ Chapter 3  ←     │  🌿 Live Branch Graph (SVG)       │
│  ○  Chapter 4        │  📁 File Tree (shows changes)     │
│  ○  Chapter 5 ...    │  ✅ Task Checklist (what to do)   │
└──────────────────────┴───────────────────────────────────┘
```

---

## Pro Git Book — Content Expansion

The Pro Git book has 10 chapters. Current coverage is ~30% (basic Git + GitHub + some advanced). We'll expand:

### New/Expanded Content Areas
| Area | Current Status | Expansion |
|---|---|---|
| Git Basics | ✅ Covered (8 lessons) | Add: `git diff`, `git rm`, `.gitignore`, aliases, config |
| Branching | ✅ Covered (5 lessons) | Add: remote tracking branches, `git fetch`, branch management |
| Git on the Server | ❌ Missing | NEW Level: SSH setup, bare repos, hosting protocols |
| Distributed Git | ❌ Missing | NEW Level: Centralized, integration-manager, dictator/lieutenant workflows |
| GitHub Deep Dive | ⚠️ Partial (4 lessons) | Add: GitHub Projects, Actions, GitHub CLI, Codespaces, Discussions |
| Git Tools | ⚠️ Partial | Add: `git bisect`, `git blame`, `git archive`, submodules, subtrees, `git worktree` |
| Customizing Git | ❌ Missing | NEW Level: Git hooks, config, attributes, Git aliases |
| Git Internals | ❌ Missing | NEW Level: Object model (blob, tree, commit, tag), packfiles, refs, FETCH_HEAD |
| Git & Other Systems | ❌ Missing | NEW: Git-SVN, migrating to Git |
| Troubleshooting | ❌ Missing | Add: `git reflog`, `git fsck`, recovering lost commits |

---

## Proposed Changes

### New Data File

#### [NEW] `data/journey.ts`
- 30+ scripted journey chapters
- Each chapter: `id`, `title`, `story` (narrative text), `concept`, `task` (what user must type), `expectedCommands`, `hint`, `graphState` (what the branch graph looks like after this step), `fileChanges`

#### [MODIFY] `data/levels.ts`
- Expand Level 1–6 with more lessons from Pro Git book
- Add Level 7: Git Tools Deep Dive
- Add Level 8: Customizing Git & Hooks
- Add Level 9: Git Internals
- Add Level 10: Distributed Workflows & Open Source

#### [MODIFY] `data/commands.ts`
- Add 20+ missing commands: `git diff`, `git rm`, `git mv`, `git fetch`, `git tag`, `git bisect`, `git blame`, `git archive`, `git worktree`, `git submodule`, `git config`, `git reflog`, `git cherry-pick`, `git rebase -i`, `git shortlog`, `git describe`, `git show`, `git stash pop`, `git stash list`

#### [MODIFY] `data/quiz.ts`
- Expand from 10 to 40+ questions covering all levels

---

### New Routes / Pages

#### [NEW] `app/journey/page.tsx`
- Landing page for "The Journey" — shows chapter list, overall progress, and a "Continue Journey" CTA

#### [NEW] `app/journey/[chapterId]/page.tsx`
- The main interactive journey experience for each chapter
- 3-panel layout: Story + Terminal + Branch Graph

---

### New Components

#### [NEW] `components/journey/BranchGraph.tsx`
- SVG-based visual commit graph
- Renders nodes (commits) as circles connected by lines
- Multiple lanes for different branches with color coding
- HEAD pointer indicator
- Animates when new commits are added
- Shows branch labels

#### [NEW] `components/journey/JourneyTerminal.tsx`
- Guided terminal (validates user input against `expectedCommands`)
- Shows hints when user is stuck
- Shows celebratory animation on correct command
- Tracks which commands have been entered

#### [NEW] `components/journey/StoryPanel.tsx`
- Displays the narrative context for the current chapter
- Shows the "SnapNote" project story in an engaging way
- Explains WHY this concept is needed in context

#### [NEW] `components/journey/FileTree.tsx`
- Shows current state of the SnapNote project files
- Color-coded by git status (untracked, modified, staged, committed)
- Animates file additions/modifications

#### [NEW] `components/journey/TaskChecklist.tsx`
- List of steps to complete in the current chapter
- Checkmarks fill in as user completes each command
- "Next Chapter" button unlocks when all tasks are done

#### [NEW] `components/journey/ChapterSidebar.tsx`
- Left sidebar showing all 30 chapters
- Icons for completed ✅, current ▶️, locked 🔒
- Progress bar per chapter group (Basics / Branching / Remote / Advanced)

---

### Modified Files

#### [MODIFY] `components/layout/header.tsx`
- Add "Journey" nav item

#### [MODIFY] `lib/store.ts`
- Add `journeyProgress: { completedChapters: string[], currentChapter: string }` to Progress

#### [MODIFY] `app/globals.css`
- Add styles for terminal animation, graph SVG, journey layout

---

## Technical Details

### Branch Graph Rendering
The `BranchGraph` component will use pure SVG:
- Each branch gets a vertical lane (x position)
- Commits are circles at y positions
- Lines connect parent → child commits
- Branch labels float next to their tip commit
- HEAD label with arrow points to current commit
- Color palette: main=blue, feature=green, hotfix=red, release=purple

### Terminal Validation Logic
```ts
interface JourneyStep {
  expectedCommand: string | string[];  // exact or regex
  hint: string;
  onSuccess: (state: RepoState) => RepoState;
}
```

### State Machine for Repo Simulation
The Journey terminal will have a richer state machine than the free Simulator:
```ts
interface RepoState {
  commits: CommitNode[];
  branches: { name: string, headCommit: string }[];
  currentBranch: string;
  files: FileNode[];
  HEAD: string;
  stash: FileNode[] | null;
  remotes: { name: string, url: string }[];
  tags: { name: string, commit: string }[];
}
```

---

## Verification Plan

### Build Verification
```bash
npm run build
```
Must compile with zero TypeScript errors.

### Manual Testing
1. Start dev server: `npm run dev`
2. Navigate to `/journey` — verify landing page renders
3. Start Chapter 1 — verify terminal accepts `git init`
4. Progress through ~10 chapters — verify graph updates
5. Navigate to `/dashboard` — verify new levels show
6. Verify `/explorer` shows new commands
7. Verify header has "Journey" link

### Browser Recording
- Record a walkthrough of "The Journey" showing the branch graph animating
