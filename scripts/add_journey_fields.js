// Script to add objectives, terminalOutputs, and cumulativeFiles to each chapter
const fs = require('fs');
const path = require('path');

const filePath = path.join('d:', 'Projects', 'Git_Github', 'data', 'journey.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Data for each chapter
const chapterData = {
  "ch-1": {
    objectives: '["Initialize a new Git repository", "Understand what .git/ contains", "Learn the git init command"]',
    terminalOutputs: '{ "git init": "Initialized empty Git repository in ~/snapnote/.git/\\nhint: Using \'main\' as the name for the initial branch." }',
    cumulativeFiles: '[".git/"]'
  },
  "ch-2": {
    objectives: '["Create the first project file", "Check repository status", "Understand untracked files"]',
    terminalOutputs: '{ "git status": "On branch main\\n\\nNo commits yet\\n\\nUntracked files:\\n  (use \\"git add <file>...\\" to include in what will be committed)\\n\\t\\x1b[31mindex.html\\x1b[0m\\n\\nnothing added to commit but untracked files present" }',
    cumulativeFiles: '[".git/", "index.html"]'
  },
  "ch-3": {
    objectives: '["Stage index.html for commit", "Verify staging with git status", "Understand the staging area"]',
    terminalOutputs: '{ "git add index.html": "", "git status": "On branch main\\n\\nNo commits yet\\n\\nChanges to be committed:\\n  (use \\"git rm --cached <file>...\\" to unstage)\\n\\t\\x1b[32mnew file:   index.html\\x1b[0m" }',
    cumulativeFiles: '[".git/", "index.html"]'
  },
  "ch-4": {
    objectives: '["Create your first commit", "Write a meaningful commit message", "Understand SHA hashes"]',
    terminalOutputs: '{ "git commit -m": "[main (root-commit) a1b2c3d] Initial commit: Add index.html\\n 1 file changed, 12 insertions(+)\\n create mode 100644 index.html" }',
    cumulativeFiles: '[".git/", "index.html"]'
  },
  "ch-5": {
    objectives: '["View commit history with git log", "Understand SHA hashes and HEAD", "Use --oneline for compact view"]',
    terminalOutputs: '{ "git log --oneline": "\\x1b[33ma1b2c3d\\x1b[0m (\\x1b[36mHEAD -> main\\x1b[0m) Initial commit: Add index.html" }',
    cumulativeFiles: '[".git/", "index.html"]'
  },
  "ch-6": {
    objectives: '["Create a feature branch", "Understand branch naming conventions", "List all branches"]',
    terminalOutputs: '{ "git branch feature/add-styling": "", "git branch": "  feature/add-styling\\n* \\x1b[32mmain\\x1b[0m" }',
    cumulativeFiles: '[".git/", "index.html"]'
  },
  "ch-7": {
    objectives: '["Switch to feature branch", "Understand HEAD pointer movement", "Verify current branch"]',
    terminalOutputs: '{ "git switch feature/add-styling": "Switched to branch \'feature/add-styling\'" }',
    cumulativeFiles: '[".git/", "index.html"]'
  },
  "ch-8": {
    objectives: '["Create styles.css on the feature branch", "Stage and commit on a branch", "See branches diverge"]',
    terminalOutputs: '{ "git add styles.css": "", "git commit -m": "[feature/add-styling b2c3d4e] Add styling for SnapNote\\n 1 file changed, 48 insertions(+)\\n create mode 100644 styles.css" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css"]'
  },
  "ch-9": {
    objectives: '["Switch back to main", "Merge feature branch into main", "Understand fast-forward merge"]',
    terminalOutputs: '{ "git switch main": "Switched to branch \'main\'", "git merge feature/add-styling": "Updating a1b2c3d..b2c3d4e\\nFast-forward\\n styles.css | 48 +++++++++++++++++++++\\n 1 file changed, 48 insertions(+)\\n create mode 100644 styles.css" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css"]'
  },
  "ch-10": {
    objectives: '["Encounter a merge conflict", "Read conflict markers", "Resolve and commit the resolution"]',
    terminalOutputs: '{ "git add index.html": "", "git commit -m": "[main c3d4e5f] Resolve merge conflict\\n 1 file changed, 2 insertions(+), 4 deletions(-)" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css"]'
  },
  "ch-11": {
    objectives: '["Stash work-in-progress changes", "Switch branches with clean state", "Restore stashed changes"]',
    terminalOutputs: '{ "git stash": "Saved working directory and index state WIP on main: c3d4e5f Resolve merge conflict", "git stash pop": "On branch main\\nChanges not staged for commit:\\n  modified:   search.js\\n\\nDropped refs/stash@{0}" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js"]'
  },
  "ch-12": {
    objectives: '["Add a remote repository", "Verify remote connection", "Understand origin vs upstream"]',
    terminalOutputs: '{ "git remote add origin": "", "git remote -v": "origin\\thttps://github.com/you/snapnote.git (fetch)\\norigin\\thttps://github.com/you/snapnote.git (push)" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js"]'
  },
  "ch-13": {
    objectives: '["Push local commits to GitHub", "Set upstream tracking branch", "Verify code is on GitHub"]',
    terminalOutputs: '{ "git push -u origin main": "Enumerating objects: 12, done.\\nCounting objects: 100% (12/12), done.\\nDelta compression using up to 8 threads\\nCompressing objects: 100% (8/8), done.\\nWriting objects: 100% (12/12), 1.24 KiB | 1.24 MiB/s, done.\\nTotal 12 (delta 2), reused 0 (delta 0)\\nTo https://github.com/you/snapnote.git\\n * [new branch]      main -> main\\nBranch \'main\' set up to track remote branch \'main\' from \'origin\'." }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js"]'
  },
  "ch-14": {
    objectives: '["Clone a repository from GitHub", "Understand what clone downloads", "Compare clone vs fork"]',
    terminalOutputs: '{ "git clone": "Cloning into \'snapnote\'...\\nremote: Enumerating objects: 12, done.\\nremote: Counting objects: 100% (12/12), done.\\nremote: Compressing objects: 100% (8/8), done.\\nReceiving objects: 100% (12/12), 1.24 KiB | 1.24 MiB/s, done.\\nResolving deltas: 100% (2/2), done." }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js"]'
  },
  "ch-15": {
    objectives: '["Pull changes from remote", "Understand fetch vs pull", "Preview changes before merging"]',
    terminalOutputs: '{ "git pull origin main": "remote: Enumerating objects: 5, done.\\nremote: Counting objects: 100% (5/5), done.\\nUpdating c3d4e5f..d4e5f6g\\nFast-forward\\n notes.js | 24 ++++++++++++++++++++++++\\n 1 file changed, 24 insertions(+)\\n create mode 100644 notes.js" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js"]'
  },
  "ch-16": {
    objectives: '["Push a feature branch to GitHub", "Open a Pull Request", "Understand the PR review process"]',
    terminalOutputs: '{ "git push origin feature/search": "Enumerating objects: 4, done.\\nCounting objects: 100% (4/4), done.\\nTo https://github.com/you/snapnote.git\\n * [new branch]      feature/search -> feature/search" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js"]'
  },
  "ch-17": {
    objectives: '["Rebase feature branch onto main", "Understand linear history", "Know the golden rule of rebasing"]',
    terminalOutputs: '{ "git rebase main": "Successfully rebased and updated refs/heads/feature/search.\\nFirst, rewinding head to replay your work on top of it...\\nApplying: Add search feature" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js"]'
  },
  "ch-18": {
    objectives: '["Cherry-pick a specific commit", "Understand commit hash copying", "Port a hotfix across branches"]',
    terminalOutputs: '{ "git cherry-pick": "[main e5f6g7h] Fix critical login bug\\n Date: Thu May 22 10:30:00 2025 +0530\\n 1 file changed, 3 insertions(+), 1 deletion(-)" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js", "app.js"]'
  },
  "ch-19": {
    objectives: '["Undo a commit with --soft reset", "Understand soft vs mixed vs hard", "Know when NOT to use reset"]',
    terminalOutputs: '{ "git reset --soft HEAD~1": "Unstaged changes after reset:\\nM\\tapp.js" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js", "app.js"]'
  },
  "ch-20": {
    objectives: '["Revert a pushed commit safely", "Create an undo commit", "Understand reset vs revert"]',
    terminalOutputs: '{ "git revert HEAD": "[main f6g7h8i] Revert \\"Break login\\"\\n 1 file changed, 1 insertion(+), 3 deletions(-)\\nThis reverts commit e5f6g7h." }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js", "app.js"]'
  },
  "ch-21": {
    objectives: '["View the reflog", "Find a lost commit hash", "Recover from accidental reset"]',
    terminalOutputs: '{ "git reflog": "f6g7h8i (HEAD -> main) HEAD@{0}: revert: Revert \\"Break login\\"\\ne5f6g7h HEAD@{1}: cherry-pick: Fix critical login bug\\nd4e5f6g HEAD@{2}: pull origin main: Fast-forward\\nc3d4e5f HEAD@{3}: commit (merge): Resolve merge conflict\\nb2c3d4e HEAD@{4}: merge feature/add-styling: Fast-forward" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js", "app.js"]'
  },
  "ch-22": {
    objectives: '["Create an annotated tag", "Understand semantic versioning", "Push tags to remote"]',
    terminalOutputs: '{ "git tag -a v1.0.0 -m": "tag v1.0.0\\nTagger: You <you@example.com>\\nDate:   Thu May 22 12:00:00 2025 +0530\\n\\nRelease v1.0 of SnapNote" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js", "app.js"]'
  },
  "ch-23": {
    objectives: '["Create a pre-commit hook", "Understand Git hook types", "Test hook execution"]',
    terminalOutputs: '{ "git commit -m": "Running pre-commit hook...\\n✓ Lint check passed\\n[main g7h8i9j] Add lint configuration\\n 1 file changed, 5 insertions(+)" }',
    cumulativeFiles: '[".git/", ".git/hooks/pre-commit", "index.html", "styles.css", "search.js", "notes.js", "app.js"]'
  },
  "ch-24": {
    objectives: '["Create a .gitignore file", "Ignore node_modules and .env", "Untrack already-tracked files"]',
    terminalOutputs: '{ "git add .gitignore": "", "git commit -m": "[main h8i9j0k] Add .gitignore\\n 1 file changed, 6 insertions(+)\\n create mode 100644 .gitignore" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js", "app.js", ".gitignore"]'
  },
  "ch-25": {
    objectives: '["Start a bisect session", "Mark good and bad commits", "Find the bug-introducing commit"]',
    terminalOutputs: '{ "git bisect start": "Status: waiting for both good and bad commits", "git bisect bad": "Status: waiting for good commit, 1 bad commit known", "git bisect good": "Bisecting: 3 revisions left to test after this (roughly 2 steps)\\n[d4e5f6g] Add notes feature" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js", "app.js", ".gitignore"]'
  },
  "ch-26": {
    objectives: '["Create a GitHub Actions workflow", "Understand CI/CD pipeline", "Push to trigger automation"]',
    terminalOutputs: '{ "git add .github/": "", "git commit -m": "[main i9j0k1l] Add CI pipeline\\n 1 file changed, 14 insertions(+)\\n create mode 100644 .github/workflows/ci.yml", "git push": "To https://github.com/you/snapnote.git\\n   h8i9j0k..i9j0k1l  main -> main" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js", "app.js", ".gitignore", ".github/workflows/ci.yml"]'
  },
  "ch-27": {
    objectives: '["Interactive rebase last 3 commits", "Squash messy commits together", "Reword commit messages"]',
    terminalOutputs: '{ "git rebase -i HEAD~3": "Successfully rebased and updated refs/heads/main.\\n3 commits squashed into 1:\\n[main j0k1l2m] Add search feature (cleaned up)" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js", "app.js", ".gitignore", ".github/workflows/ci.yml"]'
  },
  "ch-28": {
    objectives: '["Use git blame to find line authors", "Use git diff to compare changes", "Investigate code history"]',
    terminalOutputs: '{ "git blame index.html": "a1b2c3d (You  2025-05-22 10:00:00 +0530  1) <!DOCTYPE html>\\na1b2c3d (You  2025-05-22 10:00:00 +0530  2) <html>\\nc3d4e5f (Friend 2025-05-22 11:30:00 +0530  3) <head>\\nc3d4e5f (Friend 2025-05-22 11:30:00 +0530  4)   <title>SnapNote</title>" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js", "app.js", ".gitignore", ".github/workflows/ci.yml"]'
  },
  "ch-29": {
    objectives: '["Add upstream remote", "Fetch upstream changes", "Sync fork with original repo"]',
    terminalOutputs: '{ "git fetch upstream": "From https://github.com/original/repo\\n * [new branch]      main -> upstream/main", "git merge upstream/main": "Updating j0k1l2m..k1l2m3n\\nFast-forward\\n README.md | 10 ++++++++++\\n 1 file changed, 10 insertions(+)" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js", "app.js", ".gitignore", ".github/workflows/ci.yml", "README.md"]'
  },
  "ch-30": {
    objectives: '["Complete the full open-source workflow", "Fork → Clone → Branch → Code → Push → PR", "You are now a Git Master!"]',
    terminalOutputs: '{ "git push origin feature/amazing-feature": "Enumerating objects: 6, done.\\nCounting objects: 100% (6/6), done.\\nTo https://github.com/you/project.git\\n * [new branch]      feature/amazing-feature -> feature/amazing-feature\\n\\n🎉 Your Pull Request is ready to submit!" }',
    cumulativeFiles: '[".git/", "index.html", "styles.css", "search.js", "notes.js", "app.js", ".gitignore", ".github/workflows/ci.yml", "README.md", "CONTRIBUTING.md"]'
  }
};

// For each chapter, add the three new fields before the closing `},` 
for (const [chId, data] of Object.entries(chapterData)) {
  // Find the graphState closing for this chapter and add after it
  const pattern = new RegExp(
    `(id: "${chId}",[\\s\\S]*?graphState:\\s*\\{[\\s\\S]*?\\},)\\s*\\n(\\s*\\},)`,
  );
  const match = content.match(pattern);
  if (match) {
    const indent = '    ';
    const newFields = `\n${indent}objectives: ${data.objectives},\n${indent}terminalOutputs: ${data.terminalOutputs},\n${indent}cumulativeFiles: ${data.cumulativeFiles},`;
    content = content.replace(match[0], match[1] + newFields + '\n' + match[2]);
  } else {
    console.log(`WARNING: Could not find pattern for ${chId}`);
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Done! Added objectives, terminalOutputs, cumulativeFiles to all 30 chapters.');
