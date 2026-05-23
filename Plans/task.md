# Git Master — Mega Expansion Task List

## Phase 1: Data Layer
- [x] Analyze existing codebase
- [ ] Update `lib/store.ts` — add journey progress + unlocked skills
- [ ] Expand `data/levels.ts` — Add levels 7–10 (Git Tools, Customizing Git, Git Internals, Distributed Workflows)
- [ ] Expand `data/commands.ts` — Add 20+ missing commands
- [ ] Expand `data/quiz.ts` — Add 30+ quiz questions
- [ ] Create `data/journey.ts` — 30 scripted chapters for SnapNote story

## Phase 2: Journey Components
- [ ] Create `components/journey/BranchGraph.tsx` — SVG + Framer Motion animated branch graph
- [ ] Create `components/journey/JourneyTerminal.tsx` — Guided/free-play terminal with Git engine
- [ ] Create `components/journey/StoryPanel.tsx` — Narrative story display
- [ ] Create `components/journey/FileTree.tsx` — Animated file tree with git status colors
- [ ] Create `components/journey/SkillsPanel.tsx` — Unlocked skills game panel
- [ ] Create `components/journey/ChapterSidebar.tsx` — Chapter navigation sidebar

## Phase 3: Journey Pages
- [ ] Create `app/journey/page.tsx` — Journey landing/hub page
- [ ] Create `app/journey/[chapterId]/page.tsx` — Interactive chapter experience

## Phase 4: Navigation & Integration
- [ ] Update `components/layout/header.tsx` — Add Journey nav item

## Phase 5: Build & Verify
- [ ] Run `npm run build` — ensure zero TypeScript errors
- [ ] Test journey navigation and chapter progression
- [ ] Verify branch graph renders and animates correctly
- [ ] Verify new levels appear in dashboard
