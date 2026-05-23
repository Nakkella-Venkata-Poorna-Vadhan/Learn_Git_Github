export interface Question {
  id: string;
  question: string;
  type: "multiple-choice" | "scenario";
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  level: number;
}

export const QuizQuestions: Question[] = [
  {
    id: "q1",
    question: "What does 'git init' do?",
    type: "multiple-choice",
    options: [
      "Creates a new commit",
      "Initializes a new Git repository",
      "Adds files to staging area",
      "Clones a remote repository",
    ],
    correctAnswer: 1,
    explanation:
      "git init creates a new Git repository by initializing a .git directory in the current folder.",
    level: 1,
  },
  {
    id: "q2",
    question: "What is the correct order of Git workflow?",
    type: "multiple-choice",
    options: [
      "commit → add → status",
      "add → commit → push",
      "status → commit → add",
      "push → add → commit",
    ],
    correctAnswer: 1,
    explanation:
      "The typical workflow is: 1) Make changes, 2) git add to stage, 3) git commit to save, 4) git push to upload.",
    level: 1,
  },
  {
    id: "q3",
    question:
      "You've modified a file called 'app.js'. What command shows you that it has been changed?",
    type: "scenario",
    options: [
      "git add app.js",
      "git status",
      "git commit app.js",
      "git push app.js",
    ],
    correctAnswer: 1,
    explanation:
      "git status shows the state of your working directory, including modified files.",
    level: 1,
  },
  {
    id: "q4",
    question: "What happens when you run 'git add .'?",
    type: "multiple-choice",
    options: [
      "All files are committed",
      "All changes are staged for commit",
      "All files are pushed to remote",
      "All branches are merged",
    ],
    correctAnswer: 1,
    explanation:
      "git add . stages all changes in the current directory, preparing them for commit.",
    level: 1,
  },
  {
    id: "q5",
    question: "What is a branch in Git?",
    type: "multiple-choice",
    options: [
      "A backup of your code",
      "A parallel line of development",
      "A remote repository",
      "A commit message",
    ],
    correctAnswer: 1,
    explanation:
      "A branch is a parallel line of development that allows you to work on features without affecting the main codebase.",
    level: 2,
  },
  {
    id: "q6",
    question:
      "You're on the 'main' branch and want to create a new branch called 'feature-login'. Which command is correct?",
    type: "scenario",
    options: [
      "git branch feature-login",
      "git checkout feature-login",
      "git merge feature-login",
      "git push feature-login",
    ],
    correctAnswer: 0,
    explanation:
      "git branch feature-login creates a new branch. Use git switch -c feature-login to create and switch in one command.",
    level: 2,
  },
  {
    id: "q7",
    question: "What is the difference between 'git pull' and 'git fetch'?",
    type: "multiple-choice",
    options: [
      "They do the same thing",
      "git pull fetches and merges, git fetch only downloads",
      "git fetch is faster",
      "git pull is for local repos only",
    ],
    correctAnswer: 1,
    explanation:
      "git fetch downloads changes without merging, while git pull does both fetch and merge in one command.",
    level: 3,
  },
  {
    id: "q8",
    question:
      "You've made changes but need to switch branches. What command temporarily saves your changes?",
    type: "scenario",
    options: [
      "git commit",
      "git stash",
      "git save",
      "git backup",
    ],
    correctAnswer: 1,
    explanation:
      "git stash temporarily saves uncommitted changes so you can switch branches and apply them later.",
    level: 5,
  },
  {
    id: "q9",
    question: "What is a merge conflict?",
    type: "multiple-choice",
    options: [
      "When Git can't automatically combine changes",
      "When two branches have the same name",
      "When you forget to commit",
      "When the remote is down",
    ],
    correctAnswer: 0,
    explanation:
      "A merge conflict occurs when Git cannot automatically merge changes because the same parts of a file were modified differently in both branches.",
    level: 2,
  },
  {
    id: "q10",
    question:
      "You accidentally committed to the wrong branch. What's the safest way to undo a commit that hasn't been pushed?",
    type: "scenario",
    options: [
      "git reset --hard HEAD~1",
      "git revert HEAD",
      "git delete HEAD",
      "git undo",
    ],
    correctAnswer: 0,
    explanation:
      "git reset --hard HEAD~1 moves HEAD back one commit and discards the changes. Only use this for local commits!",
    level: 5,
  },
  {
    id: "q11",
    question: "What command is used to view unstaged changes in your files?",
    type: "multiple-choice",
    options: [
      "git status",
      "git diff",
      "git log",
      "git show",
    ],
    correctAnswer: 1,
    explanation:
      "git diff shows the line-by-line differences between your working directory and the staging area (unstaged changes).",
    level: 1,
  },
  {
    id: "q12",
    question: "What does a .gitignore file do?",
    type: "multiple-choice",
    options: [
      "Deletes files from the repository",
      "Prevents specified files from being tracked by Git",
      "Hides files on your computer",
      "Encrypts sensitive files",
    ],
    correctAnswer: 1,
    explanation:
      ".gitignore tells Git which files or patterns to ignore so they are never staged or committed.",
    level: 1,
  },
  {
    id: "q13",
    question: "Which command sets your Git username globally?",
    type: "multiple-choice",
    options: [
      "git config user.name \"Your Name\"",
      "git set --global username \"Your Name\"",
      "git config --global user.name \"Your Name\"",
      "git username --global \"Your Name\"",
    ],
    correctAnswer: 2,
    explanation:
      "git config --global user.name sets your name for all repositories on your system. Without --global it only applies to the current repo.",
    level: 1,
  },
  {
    id: "q14",
    question:
      "You want to remove a file from Git tracking but keep it on disk. Which command should you use?",
    type: "scenario",
    options: [
      "git rm secret.env",
      "git rm --cached secret.env",
      "git delete secret.env",
      "rm secret.env",
    ],
    correctAnswer: 1,
    explanation:
      "git rm --cached removes the file from the index (staging area) without deleting it from your working directory.",
    level: 1,
  },
  {
    id: "q15",
    question: "What is the purpose of 'git diff --staged'?",
    type: "multiple-choice",
    options: [
      "Shows differences between two branches",
      "Shows changes that are staged for the next commit",
      "Shows the commit history",
      "Shows untracked files",
    ],
    correctAnswer: 1,
    explanation:
      "git diff --staged (or --cached) shows the differences between the staging area and the last commit, i.e., what will be included in the next commit.",
    level: 2,
  },
  {
    id: "q16",
    question: "What does 'git tag -a v2.0.0 -m \"Release 2.0\"' do?",
    type: "multiple-choice",
    options: [
      "Creates a new branch called v2.0.0",
      "Creates an annotated tag with a message at the current commit",
      "Pushes version 2.0.0 to the remote",
      "Renames the current branch to v2.0.0",
    ],
    correctAnswer: 1,
    explanation:
      "The -a flag creates an annotated tag (stored as a full object with tagger info and message) pointing to the current commit.",
    level: 2,
  },
  {
    id: "q17",
    question:
      "You're on feature-branch and run 'git rebase main'. What happens?",
    type: "scenario",
    options: [
      "main is merged into feature-branch",
      "feature-branch commits are replayed on top of main",
      "feature-branch is deleted",
      "A new branch is created from main",
    ],
    correctAnswer: 1,
    explanation:
      "git rebase main takes all commits unique to feature-branch and reapplies them one by one on top of the latest main commit, creating a linear history.",
    level: 2,
  },
  {
    id: "q18",
    question: "What is the difference between 'git mv' and simply renaming a file in your OS?",
    type: "multiple-choice",
    options: [
      "There is no difference",
      "git mv stages the rename automatically; OS rename requires manual git add and git rm",
      "OS rename is faster and preferred",
      "git mv only works on Linux",
    ],
    correctAnswer: 1,
    explanation:
      "git mv moves/renames the file and stages the change in one step. A manual OS rename appears as a delete + add, requiring you to stage both changes.",
    level: 2,
  },
  {
    id: "q19",
    question:
      "What does 'git fetch' do differently from 'git pull'?",
    type: "multiple-choice",
    options: [
      "git fetch uploads local changes",
      "git fetch downloads changes and merges them",
      "git fetch downloads changes without merging",
      "git fetch only works with GitHub",
    ],
    correctAnswer: 2,
    explanation:
      "git fetch downloads new data from the remote repository but does not merge it. git pull is essentially git fetch followed by git merge.",
    level: 3,
  },
  {
    id: "q20",
    question:
      "You want to apply a specific commit (abc1234) from the develop branch to main without merging. Which command do you use?",
    type: "scenario",
    options: [
      "git merge abc1234",
      "git cherry-pick abc1234",
      "git rebase abc1234",
      "git apply abc1234",
    ],
    correctAnswer: 1,
    explanation:
      "git cherry-pick takes a specific commit and applies its changes as a new commit on the current branch, without merging the entire source branch.",
    level: 3,
  },
  {
    id: "q21",
    question: "What does 'git blame app.js' show you?",
    type: "multiple-choice",
    options: [
      "A list of all commits that modified app.js",
      "The author and commit for each line in app.js",
      "The diff for the last change to app.js",
      "All branches that contain app.js",
    ],
    correctAnswer: 1,
    explanation:
      "git blame annotates each line of a file with the commit hash, author, and timestamp of the most recent change to that line.",
    level: 3,
  },
  {
    id: "q22",
    question: "Why should you use annotated tags instead of lightweight tags for releases?",
    type: "multiple-choice",
    options: [
      "Annotated tags are smaller in size",
      "Annotated tags store metadata like tagger, date, and message",
      "Lightweight tags cannot be pushed to remotes",
      "Annotated tags automatically trigger deployments",
    ],
    correctAnswer: 1,
    explanation:
      "Annotated tags are stored as full objects in Git, containing the tagger name, email, date, and a message — important metadata for releases.",
    level: 3,
  },
  {
    id: "q23",
    question:
      "You ran 'git stash' before switching branches. After switching back, how do you restore your stashed changes?",
    type: "scenario",
    options: [
      "git stash apply",
      "git stash restore",
      "git unstash",
      "git checkout stash",
    ],
    correctAnswer: 0,
    explanation:
      "git stash apply re-applies the most recent stash. You can also use git stash pop which applies and removes the stash from the list.",
    level: 3,
  },
  {
    id: "q24",
    question:
      "Your application broke sometime in the last 50 commits. Which Git tool helps you efficiently find the exact commit that introduced the bug?",
    type: "scenario",
    options: [
      "git log --all",
      "git blame",
      "git bisect",
      "git diff HEAD~50",
    ],
    correctAnswer: 2,
    explanation:
      "git bisect performs a binary search through your commit history, letting you mark commits as good or bad until the exact bug-introducing commit is found.",
    level: 4,
  },
  {
    id: "q25",
    question: "What is a Git hook?",
    type: "multiple-choice",
    options: [
      "A way to connect two repositories",
      "A script that runs automatically at certain Git events",
      "A type of branch protection rule",
      "A remote repository alias",
    ],
    correctAnswer: 1,
    explanation:
      "Git hooks are scripts stored in .git/hooks/ that Git executes before or after events like commit, push, and merge.",
    level: 4,
  },
  {
    id: "q26",
    question:
      "You accidentally ran 'git reset --hard HEAD~3' and lost three commits. How can you recover them?",
    type: "scenario",
    options: [
      "The commits are permanently lost",
      "Use git reflog to find the lost commits and git checkout or git reset to recover",
      "Run git undo 3",
      "Clone the repository again from remote",
    ],
    correctAnswer: 1,
    explanation:
      "git reflog records every change to HEAD. You can find the commit hash from before the reset and use git reset --hard HEAD@{n} to restore your state.",
    level: 4,
  },
  {
    id: "q27",
    question: "What does 'git shortlog -s -n' display?",
    type: "multiple-choice",
    options: [
      "The last n commits in short format",
      "A numbered list of commit messages",
      "A summary of commit counts per author, sorted by number",
      "The shortest commit messages in the log",
    ],
    correctAnswer: 2,
    explanation:
      "The -s flag shows only the count, and -n sorts by number of commits descending, giving a ranked summary of contributions by author.",
    level: 4,
  },
  {
    id: "q28",
    question: "What is the purpose of 'git worktree'?",
    type: "multiple-choice",
    options: [
      "To create a backup of your working directory",
      "To manage multiple working directories for different branches simultaneously",
      "To list all files in the repository",
      "To visualize the commit tree",
    ],
    correctAnswer: 1,
    explanation:
      "git worktree lets you check out multiple branches at the same time in separate directories, all linked to a single repository.",
    level: 4,
  },
  {
    id: "q29",
    question:
      "In a GitHub Actions workflow, what does the 'on: push' trigger do?",
    type: "multiple-choice",
    options: [
      "Runs the workflow when a pull request is opened",
      "Runs the workflow when code is pushed to the repository",
      "Runs the workflow on a schedule",
      "Runs the workflow when an issue is created",
    ],
    correctAnswer: 1,
    explanation:
      "The 'on: push' trigger in a GitHub Actions workflow file causes the workflow to run automatically whenever commits are pushed to the repository.",
    level: 5,
  },
  {
    id: "q30",
    question:
      "What is the danger of rebasing a branch that has already been pushed to a shared remote?",
    type: "multiple-choice",
    options: [
      "It deletes the remote branch",
      "It rewrites commit history, causing conflicts for other collaborators",
      "It converts the branch to a tag",
      "It has no negative effects",
    ],
    correctAnswer: 1,
    explanation:
      "Rebasing rewrites commit hashes. If others have based work on the original commits, they will face conflicts when they try to pull the rewritten history.",
    level: 5,
  },
  {
    id: "q31",
    question:
      "You need to work on a hotfix while keeping your feature branch checked out. Which approach avoids stashing?",
    type: "scenario",
    options: [
      "git clone the repo again",
      "git worktree add ../hotfix hotfix-branch",
      "git branch --copy hotfix-branch",
      "git stash && git checkout hotfix-branch",
    ],
    correctAnswer: 1,
    explanation:
      "git worktree add creates a new working directory for the hotfix branch, so you can work on both branches simultaneously without stashing.",
    level: 5,
  },
  {
    id: "q32",
    question: "What does 'git describe --tags' output?",
    type: "multiple-choice",
    options: [
      "A list of all tags in the repository",
      "A human-readable name like v1.0.0-3-gabc1234 based on the nearest tag",
      "The description message of the latest tag",
      "The diff between the latest two tags",
    ],
    correctAnswer: 1,
    explanation:
      "git describe --tags outputs a string with the nearest tag, the number of additional commits, and the abbreviated commit hash (e.g., v1.0.0-3-gabc1234).",
    level: 5,
  },
  {
    id: "q33",
    question:
      "A project uses git submodules. After cloning the repo, the submodule directories are empty. What command populates them?",
    type: "scenario",
    options: [
      "git pull --submodules",
      "git submodule update --init --recursive",
      "git clone --recursive",
      "git fetch --all",
    ],
    correctAnswer: 1,
    explanation:
      "git submodule update --init initializes and fetches the submodule content. The --recursive flag handles nested submodules.",
    level: 6,
  },
  {
    id: "q34",
    question:
      "What is the difference between 'git reset --soft HEAD~1' and 'git reset --hard HEAD~1'?",
    type: "multiple-choice",
    options: [
      "Soft resets the remote, hard resets local",
      "Soft keeps changes staged, hard discards all changes",
      "They are identical",
      "Soft deletes the branch, hard keeps it",
    ],
    correctAnswer: 1,
    explanation:
      "--soft moves HEAD back but keeps all changes staged. --hard moves HEAD back and discards changes from both staging area and working directory.",
    level: 6,
  },
  {
    id: "q35",
    question: "Which pre-commit hook use case is most common?",
    type: "multiple-choice",
    options: [
      "Automatically pushing to remote",
      "Running linters or formatters before each commit",
      "Deleting old branches",
      "Sending email notifications",
    ],
    correctAnswer: 1,
    explanation:
      "The pre-commit hook is commonly used to run code linters, formatters, or tests to ensure code quality before a commit is recorded.",
    level: 6,
  },
  {
    id: "q36",
    question:
      "You cherry-picked a commit and got a conflict. What should you do after resolving it?",
    type: "scenario",
    options: [
      "Run git cherry-pick --abort",
      "Run git add on the resolved files, then git cherry-pick --continue",
      "Run git commit -m \"resolved\"",
      "Run git merge --continue",
    ],
    correctAnswer: 1,
    explanation:
      "After resolving cherry-pick conflicts, you stage the resolved files with git add, then run git cherry-pick --continue to complete the operation.",
    level: 6,
  },
  {
    id: "q37",
    question:
      "What does 'git reflog expire --expire=now --all' do?",
    type: "multiple-choice",
    options: [
      "Deletes all branches",
      "Expires all reflog entries immediately, making unreferenced objects eligible for garbage collection",
      "Resets all commits to their original state",
      "Clears the staging area",
    ],
    correctAnswer: 1,
    explanation:
      "This command forces all reflog entries to expire immediately. Combined with git gc, it permanently removes unreferenced objects from the repository.",
    level: 6,
  },
  {
    id: "q38",
    question:
      "In a GitHub Actions workflow, how do you run a job only when a pull request targets the 'main' branch?",
    type: "scenario",
    options: [
      "on: push: branches: [main]",
      "on: pull_request: branches: [main]",
      "on: merge: target: main",
      "on: pr: base: main",
    ],
    correctAnswer: 1,
    explanation:
      "The 'on: pull_request: branches: [main]' trigger fires the workflow only when a pull request targets the main branch.",
    level: 6,
  },
  {
    id: "q39",
    question:
      "What happens when you run 'git stash pop' versus 'git stash apply'?",
    type: "multiple-choice",
    options: [
      "pop applies and removes the stash; apply only re-applies without removing",
      "apply removes the stash; pop keeps it",
      "They are identical",
      "pop works only on the latest stash; apply works on any",
    ],
    correctAnswer: 0,
    explanation:
      "git stash pop applies the stash and then drops it from the stash list. git stash apply re-applies the stash but keeps it in the list for potential reuse.",
    level: 3,
  },
  {
    id: "q40",
    question:
      "You want to see who last modified line 42 of 'server.js'. Which command gives you that information?",
    type: "scenario",
    options: [
      "git log -L 42 server.js",
      "git blame -L 42,42 server.js",
      "git diff --line=42 server.js",
      "git show server.js:42",
    ],
    correctAnswer: 1,
    explanation:
      "git blame -L 42,42 server.js annotates only line 42, showing the commit hash, author, date, and content of that specific line.",
    level: 4,
  },
];
