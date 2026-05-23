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
  {
    name: "git diff",
    description: "Show changes between commits, commit and working tree, etc.",
    syntax: "git diff [options] [<commit>] [--] [<path>...]",
    category: "Basics",
    whenToUse: "To see what changes you've made before staging or committing",
    examples: [
      {
        description: "Show unstaged changes",
        command: "git diff",
      },
      {
        description: "Show staged changes",
        command: "git diff --staged",
      },
      {
        description: "Compare two branches",
        command: "git diff main..feature-login",
      },
    ],
    commonMistakes: [
      "Forgetting --staged to see already-staged changes",
      "Not understanding that plain git diff only shows unstaged changes",
    ],
    whatHappens: "Displays line-by-line differences between file versions in your repository",
  },
  {
    name: "git rm",
    description: "Remove files from the working tree and from the index",
    syntax: "git rm [options] <file>...",
    category: "Basics",
    whenToUse: "To delete a tracked file and stage the deletion in one step",
    examples: [
      {
        description: "Remove a file from repo and disk",
        command: "git rm old-file.txt",
      },
      {
        description: "Remove from tracking but keep on disk",
        command: "git rm --cached secret.env",
      },
    ],
    commonMistakes: [
      "Using plain rm instead of git rm (deletion won't be staged)",
      "Forgetting --cached when you only want to untrack a file",
    ],
    whatHappens: "Deletes the file from your working directory and stages the removal for the next commit",
  },
  {
    name: "git mv",
    description: "Move or rename a file, directory, or symlink",
    syntax: "git mv <source> <destination>",
    category: "Basics",
    whenToUse: "To rename or move a tracked file while preserving Git history",
    examples: [
      {
        description: "Rename a file",
        command: "git mv old-name.js new-name.js",
      },
      {
        description: "Move a file to a subdirectory",
        command: "git mv utils.js src/utils.js",
      },
    ],
    commonMistakes: [
      "Moving files with the OS file manager instead of git mv (Git may lose rename tracking)",
      "Forgetting to commit after the move",
    ],
    whatHappens: "Renames or moves the file and stages the change automatically",
  },
  {
    name: "git fetch",
    description: "Download objects and refs from a remote repository",
    syntax: "git fetch [<remote>] [<branch>]",
    category: "Remote",
    whenToUse: "To download remote changes without merging them into your branch",
    examples: [
      {
        description: "Fetch all branches from origin",
        command: "git fetch origin",
      },
      {
        description: "Fetch a specific branch",
        command: "git fetch origin main",
      },
      {
        description: "Fetch and prune deleted remote branches",
        command: "git fetch --prune",
      },
    ],
    commonMistakes: [
      "Expecting fetch to update your working directory (it only updates remote-tracking branches)",
      "Confusing git fetch with git pull",
    ],
    whatHappens: "Downloads commits, files, and refs from the remote into your local repo without changing your working directory",
  },
  {
    name: "git tag",
    description: "Create, list, or delete tags",
    syntax: "git tag [-a] <tagname> [-m <message>] [<commit>]",
    category: "History",
    whenToUse: "To mark specific commits as important, such as release versions",
    examples: [
      {
        description: "Create a lightweight tag",
        command: "git tag v1.0.0",
      },
      {
        description: "Create an annotated tag with a message",
        command: "git tag -a v1.0.0 -m \"Release version 1.0.0\"",
      },
      {
        description: "List all tags",
        command: "git tag -l",
      },
      {
        description: "Push tags to remote",
        command: "git push origin --tags",
      },
    ],
    commonMistakes: [
      "Forgetting to push tags (they are not pushed by default)",
      "Using lightweight tags instead of annotated tags for releases",
    ],
    whatHappens: "Creates a named reference pointing to a specific commit, commonly used for version releases",
  },
  {
    name: "git bisect",
    description: "Use binary search to find the commit that introduced a bug",
    syntax: "git bisect start | git bisect bad | git bisect good <commit>",
    category: "Git Tools",
    whenToUse: "When you know something is broken but not which commit caused it",
    examples: [
      {
        description: "Start a bisect session",
        command: "git bisect start",
      },
      {
        description: "Mark the current commit as bad",
        command: "git bisect bad",
      },
      {
        description: "Mark a known good commit",
        command: "git bisect good v1.0.0",
      },
      {
        description: "End the bisect session",
        command: "git bisect reset",
      },
    ],
    commonMistakes: [
      "Forgetting to run git bisect reset after finding the bad commit",
      "Not testing each step properly, leading to wrong results",
    ],
    whatHappens: "Git checks out commits between good and bad, halving the range each time until the bug-introducing commit is found",
  },
  {
    name: "git blame",
    description: "Show what revision and author last modified each line of a file",
    syntax: "git blame [options] <file>",
    category: "Git Tools",
    whenToUse: "To find out who changed a specific line and when",
    examples: [
      {
        description: "Blame a file",
        command: "git blame app.js",
      },
      {
        description: "Blame a specific line range",
        command: "git blame -L 10,20 app.js",
      },
    ],
    commonMistakes: [
      "Using blame to assign fault instead of understanding context",
      "Not using -L to narrow down the output on large files",
    ],
    whatHappens: "Annotates each line of a file with the commit hash, author, and date of the last change",
  },
  {
    name: "git cherry-pick",
    description: "Apply the changes introduced by specific existing commits",
    syntax: "git cherry-pick <commit>...",
    category: "Advanced",
    whenToUse: "To apply a specific commit from another branch without merging the entire branch",
    examples: [
      {
        description: "Cherry-pick a single commit",
        command: "git cherry-pick abc1234",
      },
      {
        description: "Cherry-pick without committing",
        command: "git cherry-pick --no-commit abc1234",
      },
    ],
    commonMistakes: [
      "Cherry-picking the same commit into multiple branches causes duplicate commits",
      "Forgetting to resolve conflicts during a cherry-pick",
    ],
    whatHappens: "Creates a new commit on the current branch that replicates the changes from the specified commit",
  },
  {
    name: "git reflog",
    description: "Manage and show the reference log of HEAD updates",
    syntax: "git reflog [show] [<ref>]",
    category: "Git Tools",
    whenToUse: "To recover lost commits or undo a bad reset/rebase",
    examples: [
      {
        description: "View the reflog",
        command: "git reflog",
      },
      {
        description: "View reflog for a specific branch",
        command: "git reflog show feature-login",
      },
      {
        description: "Recover a lost commit",
        command: "git checkout HEAD@{3}",
      },
    ],
    commonMistakes: [
      "Not knowing reflog exists and thinking lost commits are gone forever",
      "Reflog entries expire after 90 days by default",
    ],
    whatHappens: "Displays a log of every time HEAD changed, allowing you to find and recover previous states",
  },
  {
    name: "git config",
    description: "Get and set repository or global options",
    syntax: "git config [--global|--local|--system] <key> <value>",
    category: "Basics",
    whenToUse: "To set your username, email, default editor, or other Git settings",
    examples: [
      {
        description: "Set your name globally",
        command: "git config --global user.name \"Your Name\"",
      },
      {
        description: "Set your email globally",
        command: "git config --global user.email \"you@example.com\"",
      },
      {
        description: "List all config settings",
        command: "git config --list",
      },
    ],
    commonMistakes: [
      "Setting config locally when you meant global, or vice versa",
      "Forgetting to set user.name and user.email before your first commit",
    ],
    whatHappens: "Reads or writes configuration variables stored in system, global, or local config files",
  },
  {
    name: "git show",
    description: "Show various types of objects (commits, tags, trees, blobs)",
    syntax: "git show [<object>]",
    category: "History",
    whenToUse: "To inspect a specific commit, tag, or other Git object in detail",
    examples: [
      {
        description: "Show the latest commit",
        command: "git show",
      },
      {
        description: "Show a specific commit",
        command: "git show abc1234",
      },
      {
        description: "Show a tagged release",
        command: "git show v1.0.0",
      },
    ],
    commonMistakes: [
      "Confusing git show with git log (show displays a single object, log lists history)",
      "Not specifying an object and being surprised by the default HEAD output",
    ],
    whatHappens: "Displays the metadata and content diff of the specified Git object",
  },
  {
    name: "git shortlog",
    description: "Summarize git log output by author",
    syntax: "git shortlog [options] [<revision-range>]",
    category: "History",
    whenToUse: "To see a summary of commits grouped by author, often for changelogs",
    examples: [
      {
        description: "Group commits by author",
        command: "git shortlog",
      },
      {
        description: "Show commit counts per author",
        command: "git shortlog -s -n",
      },
    ],
    commonMistakes: [
      "Forgetting -s for a summary count view",
      "Running on a shallow clone which may miss older commits",
    ],
    whatHappens: "Groups commits by author and lists their commit messages, useful for generating release notes",
  },
  {
    name: "git describe",
    description: "Give an object a human-readable name based on an available tag",
    syntax: "git describe [--tags] [<commit>]",
    category: "Git Tools",
    whenToUse: "To generate a version string based on the nearest tag (useful in CI/CD)",
    examples: [
      {
        description: "Describe the current commit",
        command: "git describe",
      },
      {
        description: "Describe using any tag (not just annotated)",
        command: "git describe --tags",
      },
    ],
    commonMistakes: [
      "Running git describe in a repo with no tags (it will fail)",
      "Not understanding the output format: tag-numCommits-gHash",
    ],
    whatHappens: "Returns a string like v1.0.0-3-gabc1234 indicating the nearest tag, number of commits since, and the short hash",
  },
  {
    name: "git worktree",
    description: "Manage multiple working trees attached to the same repository",
    syntax: "git worktree add <path> [<branch>]",
    category: "Advanced",
    whenToUse: "To work on multiple branches simultaneously without stashing or cloning",
    examples: [
      {
        description: "Add a new worktree for a branch",
        command: "git worktree add ../hotfix hotfix-branch",
      },
      {
        description: "List all worktrees",
        command: "git worktree list",
      },
      {
        description: "Remove a worktree",
        command: "git worktree remove ../hotfix",
      },
    ],
    commonMistakes: [
      "Trying to check out the same branch in two worktrees (not allowed)",
      "Forgetting to remove worktrees when done, leaving stale directories",
    ],
    whatHappens: "Creates an additional working directory linked to the same repository, letting you work on another branch without switching",
  },
  {
    name: "git submodule",
    description: "Initialize, update, or inspect submodules within a repository",
    syntax: "git submodule [add|init|update|status] [<repository>] [<path>]",
    category: "Advanced",
    whenToUse: "To include and manage external repositories inside your project",
    examples: [
      {
        description: "Add a submodule",
        command: "git submodule add https://github.com/user/lib.git libs/lib",
      },
      {
        description: "Initialize and fetch submodules after cloning",
        command: "git submodule update --init --recursive",
      },
      {
        description: "Check submodule status",
        command: "git submodule status",
      },
    ],
    commonMistakes: [
      "Forgetting to run git submodule update --init after cloning a repo with submodules",
      "Committing changes inside a submodule without pushing the submodule first",
    ],
    whatHappens: "Manages nested repositories, allowing you to pin external dependencies at specific commits",
  },
];
