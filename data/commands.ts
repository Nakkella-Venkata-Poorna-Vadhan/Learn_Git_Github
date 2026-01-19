export interface CommandExample {
  description: string;
  command: string;
}

export interface Command {
  name: string;
  description: string;
  syntax: string;
  category: string;
  whenToUse: string;
  examples?: CommandExample[];
  commonMistakes?: string[];
  whatHappens?: string;
}

export const Commands: Command[] = [
  {
    name: "git init",
    description: "Initialize a new Git repository",
    syntax: "git init [directory-name]",
    category: "Basics",
    whenToUse: "When starting a new project or converting an existing project to use Git",
    examples: [
      {
        description: "Initialize repository in current directory",
        command: "git init",
      },
      {
        description: "Initialize in a specific directory",
        command: "git init my-project",
      },
    ],
    commonMistakes: [
      "Running git init multiple times (harmless but unnecessary)",
      "Initializing inside an already tracked directory",
    ],
    whatHappens: "Creates a hidden .git folder that contains all Git metadata and history",
  },
  {
    name: "git status",
    description: "Show the working tree status",
    syntax: "git status",
    category: "Basics",
    whenToUse: "Before committing to see what files have changed",
    examples: [
      {
        description: "Check repository status",
        command: "git status",
      },
      {
        description: "Short format",
        command: "git status -s",
      },
    ],
    commonMistakes: ["Not checking status before committing"],
    whatHappens: "Shows which files are modified, staged, or untracked",
  },
  {
    name: "git add",
    description: "Add file contents to the staging area",
    syntax: "git add <file> | git add . | git add -A",
    category: "Basics",
    whenToUse: "Before committing to stage your changes",
    examples: [
      {
        description: "Add a specific file",
        command: "git add app.js",
      },
      {
        description: "Add all changes",
        command: "git add .",
      },
      {
        description: "Add all changes including deletions",
        command: "git add -A",
      },
    ],
    commonMistakes: [
      "Forgetting to add files before committing",
      "Adding files you don't want to commit (use .gitignore)",
    ],
    whatHappens: "Moves files from working directory to staging area",
  },
  {
    name: "git commit",
    description: "Record changes to the repository",
    syntax: 'git commit -m "message"',
    category: "Basics",
    whenToUse: "After staging changes to save a snapshot",
    examples: [
      {
        description: "Commit with message",
        command: 'git commit -m "Add login feature"',
      },
      {
        description: "Commit all modified files",
        command: 'git commit -a -m "Update files"',
      },
    ],
    commonMistakes: [
      "Empty commit messages",
      "Committing without staging files first",
      "Committing too many unrelated changes",
    ],
    whatHappens: "Creates a new commit with staged changes and moves HEAD forward",
  },
  {
    name: "git branch",
    description: "List, create, or delete branches",
    syntax: "git branch [branch-name]",
    category: "Branching",
    whenToUse: "To create a new branch or see all branches",
    examples: [
      {
        description: "List all branches",
        command: "git branch",
      },
      {
        description: "Create a new branch",
        command: "git branch feature-login",
      },
      {
        description: "Delete a branch",
        command: "git branch -d feature-login",
      },
    ],
    commonMistakes: [
      "Creating branches but not switching to them",
      "Deleting branches with unmerged changes",
    ],
    whatHappens: "Creates a new pointer to the current commit without changing your working directory",
  },
  {
    name: "git checkout",
    description: "Switch branches or restore working tree files",
    syntax: "git checkout <branch> | git checkout -b <branch>",
    category: "Branching",
    whenToUse: "To switch to a different branch",
    examples: [
      {
        description: "Switch to a branch",
        command: "git checkout main",
      },
      {
        description: "Create and switch to new branch",
        command: "git checkout -b feature-signup",
      },
    ],
    commonMistakes: ["Switching branches with uncommitted changes"],
    whatHappens: "Updates your working directory to match the selected branch",
  },
  {
    name: "git switch",
    description: "Switch branches (newer, simpler command)",
    syntax: "git switch <branch> | git switch -c <branch>",
    category: "Branching",
    whenToUse: "Modern way to switch branches (preferred over checkout)",
    examples: [
      {
        description: "Switch to a branch",
        command: "git switch main",
      },
      {
        description: "Create and switch to new branch",
        command: "git switch -c feature-signup",
      },
    ],
    commonMistakes: ["Switching branches with uncommitted changes"],
    whatHappens: "Updates your working directory to match the selected branch",
  },
  {
    name: "git merge",
    description: "Join two or more development histories together",
    syntax: "git merge <branch>",
    category: "Branching",
    whenToUse: "To combine changes from one branch into another",
    examples: [
      {
        description: "Merge feature branch into main",
        command: "git switch main\ngit merge feature-login",
      },
    ],
    commonMistakes: [
      "Merging into wrong branch",
      "Not pulling latest changes before merging",
    ],
    whatHappens: "Combines changes from the specified branch into the current branch",
  },
  {
    name: "git remote",
    description: "Manage set of tracked repositories",
    syntax: "git remote add <name> <url>",
    category: "Remote",
    whenToUse: "To connect your local repository to a remote repository",
    examples: [
      {
        description: "Add a remote",
        command: "git remote add origin https://github.com/user/repo.git",
      },
      {
        description: "List remotes",
        command: "git remote -v",
      },
    ],
    commonMistakes: ["Adding wrong remote URL"],
    whatHappens: "Stores a reference to a remote repository",
  },
  {
    name: "git push",
    description: "Update remote refs along with associated objects",
    syntax: "git push <remote> <branch>",
    category: "Remote",
    whenToUse: "To upload your local commits to a remote repository",
    examples: [
      {
        description: "Push to remote",
        command: "git push origin main",
      },
      {
        description: "Set upstream and push",
        command: "git push -u origin main",
      },
    ],
    commonMistakes: [
      "Pushing without pulling first",
      "Pushing to wrong branch",
    ],
    whatHappens: "Uploads your commits to the remote repository",
  },
  {
    name: "git pull",
    description: "Fetch from and integrate with another repository",
    syntax: "git pull <remote> <branch>",
    category: "Remote",
    whenToUse: "To download and merge changes from remote",
    examples: [
      {
        description: "Pull latest changes",
        command: "git pull origin main",
      },
    ],
    commonMistakes: [
      "Pulling without committing local changes",
      "Not pulling before pushing",
    ],
    whatHappens: "Fetches changes from remote and merges them into your current branch",
  },
  {
    name: "git clone",
    description: "Clone a repository into a new directory",
    syntax: "git clone <url> [directory]",
    category: "Remote",
    whenToUse: "To get a copy of a remote repository",
    examples: [
      {
        description: "Clone a repository",
        command: "git clone https://github.com/user/repo.git",
      },
      {
        description: "Clone to specific directory",
        command: "git clone https://github.com/user/repo.git my-project",
      },
    ],
    commonMistakes: ["Cloning into wrong directory"],
    whatHappens: "Downloads the repository and creates a local copy with remote tracking set up",
  },
  {
    name: "git log",
    description: "Show commit logs",
    syntax: "git log [options]",
    category: "History",
    whenToUse: "To view the commit history",
    examples: [
      {
        description: "View commit history",
        command: "git log",
      },
      {
        description: "One line per commit",
        command: "git log --oneline",
      },
      {
        description: "Visual graph",
        command: "git log --graph --oneline --all",
      },
    ],
    commonMistakes: ["Not using helpful flags like --oneline or --graph"],
    whatHappens: "Displays commit history in reverse chronological order",
  },
  {
    name: "git stash",
    description: "Stash the changes in a dirty working directory",
    syntax: "git stash [save message]",
    category: "Advanced",
    whenToUse: "To temporarily save uncommitted changes",
    examples: [
      {
        description: "Stash changes",
        command: "git stash",
      },
      {
        description: "Stash with message",
        command: "git stash save 'WIP: login feature'",
      },
      {
        description: "Apply stash",
        command: "git stash pop",
      },
    ],
    commonMistakes: ["Forgetting to apply stash later"],
    whatHappens: "Saves your uncommitted changes temporarily so you can switch branches",
  },
  {
    name: "git rebase",
    description: "Reapply commits on top of another base tip",
    syntax: "git rebase <branch>",
    category: "Advanced",
    whenToUse: "To maintain a linear history (use carefully!)",
    examples: [
      {
        description: "Rebase current branch onto main",
        command: "git rebase main",
      },
    ],
    commonMistakes: [
      "Rebasing public branches",
      "Rebasing without understanding the consequences",
    ],
    whatHappens: "Reapplies your commits on top of another branch, rewriting history",
  },
  {
    name: "git reset",
    description: "Reset current HEAD to the specified state",
    syntax: "git reset [--soft|--mixed|--hard] <commit>",
    category: "Advanced",
    whenToUse: "To undo local changes (never use on public branches!)",
    examples: [
      {
        description: "Soft reset (keeps changes staged)",
        command: "git reset --soft HEAD~1",
      },
      {
        description: "Hard reset (discards changes)",
        command: "git reset --hard HEAD~1",
      },
    ],
    commonMistakes: [
      "Using reset on public branches",
      "Using --hard without being sure",
    ],
    whatHappens: "Moves HEAD to specified commit, optionally updating working directory",
  },
  {
    name: "git revert",
    description: "Revert some existing commits",
    syntax: "git revert <commit>",
    category: "Advanced",
    whenToUse: "To undo commits safely (creates new commit)",
    examples: [
      {
        description: "Revert a commit",
        command: "git revert HEAD",
      },
    ],
    commonMistakes: ["Confusing with git reset"],
    whatHappens: "Creates a new commit that undoes the changes from specified commit",
  },
];
