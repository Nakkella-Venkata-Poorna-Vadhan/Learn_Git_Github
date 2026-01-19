export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  commands?: string[];
  duration: number; // in minutes
}

export interface Level {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  lessons: Lesson[];
  unlocked: boolean;
}

export const levels: Level[] = [
  {
    id: 1,
    title: "Git Basics",
    description: "Absolute beginner - Learn the fundamentals of version control",
    color: "green",
    icon: "🟢",
    unlocked: true,
    lessons: [
      {
        id: "1-1",
        title: "What is Git? Why Version Control Exists",
        description: "Understand the problem Git solves and why it's essential",
        content: `# What is Git?

Git is a **distributed version control system** that helps you track changes in your code over time.

## Why Version Control?

Imagine you're writing a book. Without version control:
- You'd save files like \`book_v1.txt\`, \`book_v2.txt\`, \`book_final.txt\`
- You'd lose track of what changed between versions
- Collaborating would be a nightmare

With Git:
- Every change is tracked
- You can see who changed what and when
- You can go back to any previous version
- Multiple people can work together seamlessly

## Key Concepts

### Repository (Repo)
A repository is like a folder that Git watches. It contains all your project files and the history of changes.

### Commit
A commit is a snapshot of your project at a specific point in time. Think of it as a save point in a video game.

### Working Directory
This is where you make changes to your files. It's your "workspace."

### Staging Area
Before committing, you stage changes. It's like preparing items before putting them in a box.

### Repository (Git Database)
This is where Git stores all your commits and history.`,
        duration: 10,
      },
      {
        id: "1-2",
        title: "Local vs Remote Repositories",
        description: "Understand the difference between local and remote Git repositories",
        content: `# Local vs Remote Repositories

## Local Repository
- Lives on **your computer**
- You can work offline
- Fast access
- Private by default

## Remote Repository
- Lives on a **server** (like GitHub)
- Accessible from anywhere
- Enables collaboration
- Backup of your work

## Common Remote Hosts
- **GitHub** - Most popular, great for open source
- **GitLab** - Self-hosted option
- **Bitbucket** - Good for teams

## The Flow
1. Create a local repository
2. Make commits locally
3. Push to remote when ready
4. Pull changes from remote when needed`,
        duration: 8,
      },
      {
        id: "1-3",
        title: "Working Directory, Staging Area, Repository",
        description: "Master the three states of Git files",
        content: `# The Three States of Git

Git has three main areas where your files can exist:

## 1. Working Directory
- Your **current files** on disk
- Where you edit and create files
- Files can be **untracked** (new) or **modified** (changed)

## 2. Staging Area (Index)
- A **preview** of your next commit
- Files you've marked to be included
- Use \`git add\` to stage files

## 3. Repository (Git Database)
- The **history** of all commits
- Permanent record of changes
- Use \`git commit\` to save

## Visual Flow

\`\`\`
Working Directory → git add → Staging Area → git commit → Repository
     (modified)                    (staged)              (committed)
\`\`\`

## Example Workflow

1. Edit \`app.js\` (Working Directory - modified)
2. \`git add app.js\` (Staging Area - staged)
3. \`git commit -m "Update app"\` (Repository - committed)`,
        duration: 12,
        commands: ["git add", "git commit"],
      },
      {
        id: "1-4",
        title: "git init - Initialize a Repository",
        description: "Learn how to start tracking a project with Git",
        content: `# git init

Creates a new Git repository in the current directory.

## Syntax
\`\`\`bash
git init
\`\`\`

## What It Does
- Creates a hidden \`.git\` folder
- Initializes the Git database
- Sets up the repository structure

## When to Use
- Starting a new project
- Converting an existing project to use Git

## Example
\`\`\`bash
cd my-project
git init
\`\`\`

## Common Mistakes
- Running \`git init\` multiple times (harmless but unnecessary)
- Initializing inside an already tracked directory`,
        duration: 5,
        commands: ["git init"],
      },
      {
        id: "1-5",
        title: "git status - Check Repository State",
        description: "See what's changed in your repository",
        content: `# git status

Shows the state of your working directory and staging area.

## Syntax
\`\`\`bash
git status
\`\`\`

## What It Shows
- **Untracked files** - New files not yet added
- **Modified files** - Changed but not staged
- **Staged files** - Ready to be committed
- **Branch information**

## Example Output
\`\`\`bash
On branch main
Changes not staged for commit:
  modified:   app.js

Untracked files:
  newfile.txt

Changes to be committed:
  modified:   README.md
\`\`\`

## When to Use
- Before committing (check what changed)
- After pulling changes
- To see repository state`,
        duration: 6,
        commands: ["git status"],
      },
      {
        id: "1-6",
        title: "git add - Stage Changes",
        description: "Add files to the staging area",
        content: `# git add

Stages files for the next commit.

## Syntax
\`\`\`bash
git add <file>
git add .              # Add all changes
git add *.js           # Add all .js files
git add -A             # Add all changes including deletions
\`\`\`

## What It Does
- Moves files from Working Directory to Staging Area
- Prepares changes for commit

## Examples
\`\`\`bash
# Add a specific file
git add app.js

# Add all changes
git add .

# Add multiple files
git add file1.js file2.js
\`\`\`

## Common Mistakes
- Forgetting to add files before committing
- Adding files you don't want to commit (use .gitignore)`,
        duration: 8,
        commands: ["git add"],
      },
      {
        id: "1-7",
        title: "git commit - Save Changes",
        description: "Create a snapshot of your project",
        content: `# git commit

Saves a snapshot of your staged changes.

## Syntax
\`\`\`bash
git commit -m "Your message"
git commit              # Opens editor for message
git commit -a -m "msg"  # Stage and commit all modified files
\`\`\`

## What It Does
- Takes staged changes
- Creates a commit with a unique hash
- Moves HEAD pointer forward

## Commit Messages
**Good messages:**
- "Add user authentication"
- "Fix login bug"
- "Update README with setup instructions"

**Bad messages:**
- "asdf"
- "fix"
- "changes"

## Examples
\`\`\`bash
git commit -m "Add login feature"
git commit -m "Fix: Resolve memory leak in data processing"
\`\`\`

## Common Mistakes
- Empty commit messages
- Committing without staging files first
- Committing too many unrelated changes`,
        duration: 10,
        commands: ["git commit"],
      },
      {
        id: "1-8",
        title: "Visual Timeline of Commits",
        description: "Understand how commits form a timeline",
        content: `# Commit Timeline

Commits form a **linear timeline** of your project's history.

## Visual Representation

\`\`\`
Commit 1 → Commit 2 → Commit 3 → Commit 4
  (A)        (B)        (C)        (D)
\`\`\`

## Each Commit Contains
- **Hash** - Unique identifier (e.g., \`a1b2c3d\`)
- **Author** - Who made the change
- **Date** - When it was made
- **Message** - What changed
- **Snapshot** - Complete state of files

## Viewing History
\`\`\`bash
git log              # Show all commits
git log --oneline    # Compact view
git log --graph      # Visual graph
\`\`\`

## HEAD Pointer
- Points to the **current commit**
- Moves forward with each commit
- You can move it to view history

## Example Timeline
\`\`\`
[Initial commit] → [Add README] → [Add login] → [Fix bug]
     HEAD^3            HEAD^2          HEAD^1         HEAD
\`\`\``,
        duration: 8,
        commands: ["git log"],
      },
    ],
  },
  {
    id: 2,
    title: "Branching & Merging",
    description: "Learn to work with branches and merge changes",
    color: "blue",
    icon: "🔵",
    unlocked: false,
    lessons: [
      {
        id: "2-1",
        title: "What is a Branch?",
        description: "Understand branches visually",
        content: `# What is a Branch?

A branch is a **parallel line of development** that diverges from the main codebase.

## Visual Representation

\`\`\`
main:    A → B → C → F
              \\
feature:       D → E
\`\`\`

## Why Use Branches?
- Work on features without affecting main code
- Experiment safely
- Collaborate without conflicts
- Organize work

## Default Branch
- Usually called \`main\` or \`master\`
- Contains stable, production-ready code

## Feature Branches
- Temporary branches for new features
- Created from main
- Merged back when complete`,
        duration: 10,
        commands: ["git branch"],
      },
      {
        id: "2-2",
        title: "git branch - List and Create Branches",
        description: "Work with branches",
        content: `# git branch

Lists, creates, or deletes branches.

## Syntax
\`\`\`bash
git branch                    # List branches
git branch <name>             # Create branch
git branch -d <name>          # Delete branch
git branch -D <name>          # Force delete
\`\`\`

## Examples
\`\`\`bash
# List all branches
git branch

# Create a new branch
git branch feature-login

# Delete a branch (safe)
git branch -d feature-login

# Force delete (unsafe)
git branch -D feature-login
\`\`\`

## Common Mistakes
- Creating branches but not switching to them
- Deleting branches with unmerged changes`,
        duration: 8,
        commands: ["git branch"],
      },
      {
        id: "2-3",
        title: "git checkout & git switch",
        description: "Switch between branches",
        content: `# git checkout & git switch

Changes which branch you're working on.

## git switch (Recommended)
\`\`\`bash
git switch <branch>           # Switch to branch
git switch -c <branch>        # Create and switch
\`\`\`

## git checkout (Older)
\`\`\`bash
git checkout <branch>         # Switch to branch
git checkout -b <branch>      # Create and switch
\`\`\`

## Examples
\`\`\`bash
# Switch to existing branch
git switch main
git switch feature-login

# Create and switch in one command
git switch -c feature-signup
\`\`\`

## What Happens
- Working directory updates to match branch
- HEAD pointer moves to branch
- Files change to match that branch's state`,
        duration: 8,
        commands: ["git checkout", "git switch"],
      },
      {
        id: "2-4",
        title: "git merge - Combine Branches",
        description: "Merge branches together",
        content: `# git merge

Combines changes from one branch into another.

## Syntax
\`\`\`bash
git merge <branch>
\`\`\`

## Process
1. Switch to target branch (usually main)
2. Run \`git merge feature-branch\`
3. Git combines changes
4. Create merge commit (if needed)

## Example
\`\`\`bash
git switch main
git merge feature-login
\`\`\`

## Merge Types
- **Fast-forward** - No conflicts, linear history
- **Three-way merge** - Creates merge commit
- **Merge conflict** - Requires manual resolution`,
        duration: 12,
        commands: ["git merge"],
      },
      {
        id: "2-5",
        title: "Merge Conflicts - Step by Step Resolution",
        description: "Resolve conflicts when merging",
        content: `# Merge Conflicts

Occur when Git can't automatically combine changes.

## When Conflicts Happen
- Same file changed in both branches
- Different changes to same lines

## Conflict Markers
\`\`\`
<<<<<<< HEAD
Your changes
=======
Incoming changes
>>>>>>> feature-branch
\`\`\`

## Resolution Steps

1. **Identify conflicts**
   \`\`\`bash
   git status
   \`\`\`

2. **Open conflicted files**
   - Look for conflict markers
   - Understand both changes

3. **Edit files**
   - Remove markers
   - Keep desired code
   - Or combine both

4. **Stage resolved files**
   \`\`\`bash
   git add <file>
   \`\`\`

5. **Complete merge**
   \`\`\`bash
   git commit
   \`\`\`

## Example Resolution
\`\`\`javascript
// Before (conflicted)
<<<<<<< HEAD
const apiUrl = "https://api.example.com";
=======
const apiUrl = "https://api.production.com";
>>>>>>> feature-branch

// After (resolved)
const apiUrl = "https://api.production.com";
\`\`\``,
        duration: 15,
      },
    ],
  },
  {
    id: 3,
    title: "GitHub Essentials",
    description: "Learn to work with remote repositories",
    color: "purple",
    icon: "🟣",
    unlocked: false,
    lessons: [
      {
        id: "3-1",
        title: "What is GitHub?",
        description: "Introduction to GitHub",
        content: `# What is GitHub?

GitHub is a **cloud-based hosting service** for Git repositories.

## Key Features
- Remote repository hosting
- Collaboration tools
- Issue tracking
- Pull requests
- Code reviews
- GitHub Actions (CI/CD)

## Why GitHub?
- Industry standard
- Free for public repos
- Great collaboration features
- Large community
- Portfolio showcase

## GitHub vs Git
- **Git** - Version control tool (local)
- **GitHub** - Git hosting service (remote)`,
        duration: 8,
      },
      {
        id: "3-2",
        title: "git remote - Manage Remote Repositories",
        description: "Connect local and remote repos",
        content: `# git remote

Manages connections to remote repositories.

## Syntax
\`\`\`bash
git remote -v                 # List remotes
git remote add <name> <url>   # Add remote
git remote remove <name>      # Remove remote
\`\`\`

## Common Remote Names
- \`origin\` - Default name for main remote
- \`upstream\` - Original repository (for forks)

## Examples
\`\`\`bash
# Add remote
git remote add origin https://github.com/user/repo.git

# List remotes
git remote -v

# Remove remote
git remote remove origin
\`\`\``,
        duration: 6,
        commands: ["git remote"],
      },
      {
        id: "3-3",
        title: "git push - Upload to Remote",
        description: "Send commits to GitHub",
        content: `# git push

Uploads local commits to remote repository.

## Syntax
\`\`\`bash
git push <remote> <branch>
git push                      # Push to default (origin/main)
git push -u origin main       # Set upstream
\`\`\`

## Examples
\`\`\`bash
# First push (set upstream)
git push -u origin main

# Subsequent pushes
git push

# Push specific branch
git push origin feature-login
\`\`\`

## What Happens
- Commits uploaded to remote
- Remote branch updated
- Others can see your changes`,
        duration: 8,
        commands: ["git push"],
      },
      {
        id: "3-4",
        title: "git pull - Download from Remote",
        description: "Get latest changes from GitHub",
        content: `# git pull

Downloads and merges changes from remote.

## Syntax
\`\`\`bash
git pull <remote> <branch>
git pull                      # Pull from default
\`\`\`

## What It Does
- Fetches changes from remote
- Merges into current branch
- Equivalent to: \`git fetch\` + \`git merge\`

## Examples
\`\`\`bash
# Pull latest changes
git pull

# Pull specific branch
git pull origin main
\`\`\`

## Common Mistakes
- Pulling without committing local changes
- Not pulling before pushing`,
        duration: 8,
        commands: ["git pull"],
      },
      {
        id: "3-5",
        title: "git clone - Copy a Repository",
        description: "Get a copy of a remote repository",
        content: `# git clone

Creates a copy of a remote repository.

## Syntax
\`\`\`bash
git clone <url> [directory]
\`\`\`

## Examples
\`\`\`bash
# Clone a repository
git clone https://github.com/user/repo.git

# Clone to specific directory
git clone https://github.com/user/repo.git my-project

# Clone with SSH
git clone git@github.com:user/repo.git
\`\`\`

## What It Does
- Downloads repository
- Creates local copy
- Sets up remote tracking
- Checks out files

## When to Use
- Starting work on existing project
- Contributing to open source
- Getting a copy of any repository`,
        duration: 6,
        commands: ["git clone"],
      },
    ],
  },
  {
    id: 4,
    title: "Collaboration",
    description: "Work with others on GitHub",
    color: "orange",
    icon: "🟠",
    unlocked: false,
    lessons: [
      {
        id: "4-1",
        title: "Fork vs Clone",
        description: "Understand the difference",
        content: `# Fork vs Clone

## Fork
- Creates a **copy on GitHub** (your account)
- You own the fork
- Used for contributing to others' projects
- Maintains connection to original

## Clone
- Creates a **local copy** on your computer
- Used to work on any repository
- Can clone your own repos or forks

## Workflow Example
1. **Fork** repository on GitHub
2. **Clone** your fork locally
3. Make changes
4. Push to your fork
5. Create Pull Request to original`,
        duration: 8,
      },
      {
        id: "4-2",
        title: "Pull Requests",
        description: "Propose changes to a repository",
        content: `# Pull Requests

A way to propose changes to a repository.

## Process
1. Fork or branch
2. Make changes
3. Push to GitHub
4. Open Pull Request
5. Code review
6. Merge (if approved)

## Why Use PRs?
- Code review before merging
- Discussion about changes
- CI/CD checks
- Documentation of changes`,
        duration: 10,
      },
      {
        id: "4-3",
        title: "Code Reviews",
        description: "Review and improve code quality",
        content: `# Code Reviews

Process of examining code changes before merging.

## What to Review
- Code quality
- Functionality
- Style consistency
- Tests
- Documentation

## Best Practices
- Be constructive
- Ask questions
- Suggest improvements
- Approve when ready`,
        duration: 8,
      },
      {
        id: "4-4",
        title: "Issues & Projects",
        description: "Track work and organize tasks",
        content: `# Issues & Projects

## Issues
- Bug reports
- Feature requests
- Questions
- Task tracking

## Projects
- Kanban boards
- Organize issues
- Track progress
- Plan sprints`,
        duration: 8,
      },
      {
        id: "4-5",
        title: "GitHub Flow",
        description: "Simple collaboration workflow",
        content: `# GitHub Flow

Simple workflow for collaboration.

## Steps
1. Create branch from main
2. Make changes
3. Push branch
4. Open Pull Request
5. Review and discuss
6. Merge to main
7. Deploy

## Benefits
- Simple
- Fast
- Works for most teams`,
        duration: 10,
      },
    ],
  },
  {
    id: 5,
    title: "Advanced Git",
    description: "Master advanced Git techniques",
    color: "red",
    icon: "🔴",
    unlocked: false,
    lessons: [
      {
        id: "5-1",
        title: "git rebase",
        description: "Rewrite commit history",
        content: `# git rebase

Reapplies commits on top of another base.

## Syntax
\`\`\`bash
git rebase <branch>
git rebase -i HEAD~n    # Interactive rebase
\`\`\`

## Use Cases
- Clean up commit history
- Update feature branch
- Combine commits

## Warning
- Don't rebase public branches
- Rewrites history`,
        duration: 15,
        commands: ["git rebase"],
      },
      {
        id: "5-2",
        title: "git cherry-pick",
        description: "Apply specific commits",
        content: `# git cherry-pick

Applies a specific commit to current branch.

## Syntax
\`\`\`bash
git cherry-pick <commit-hash>
\`\`\`

## Use Cases
- Apply bug fix to multiple branches
- Select specific commits
- Port features`,
        duration: 10,
        commands: ["git cherry-pick"],
      },
      {
        id: "5-3",
        title: "git stash",
        description: "Temporarily save changes",
        content: `# git stash

Temporarily saves uncommitted changes.

## Syntax
\`\`\`bash
git stash                    # Save changes
git stash pop                # Apply and remove
git stash list               # List stashes
git stash apply              # Apply without removing
\`\`\`

## Use Cases
- Switch branches with uncommitted changes
- Save work in progress
- Clean working directory`,
        duration: 8,
        commands: ["git stash"],
      },
      {
        id: "5-4",
        title: "git reset vs git revert",
        description: "Undo changes correctly",
        content: `# git reset vs git revert

## git reset
- Moves HEAD pointer
- Rewrites history
- Use for local changes only

## git revert
- Creates new commit
- Safe for public branches
- Undoes specific commit

## When to Use
- **reset** - Local mistakes, before pushing
- **revert** - Public commits, shared branches`,
        duration: 12,
        commands: ["git reset", "git revert"],
      },
      {
        id: "5-5",
        title: "git reflog",
        description: "Recover lost commits",
        content: `# git reflog

Shows history of HEAD movements.

## Syntax
\`\`\`bash
git reflog
git reflog show <branch>
\`\`\`

## Use Cases
- Recover lost commits
- Find previous states
- Undo mistakes

## Example
\`\`\`bash
git reflog
# Find commit hash
git reset --hard <hash>
\`\`\``,
        duration: 10,
        commands: ["git reflog"],
      },
    ],
  },
  {
    id: 6,
    title: "Real-World & Industry Practices",
    description: "Professional workflows and best practices",
    color: "black",
    icon: "⚫",
    unlocked: false,
    lessons: [
      {
        id: "6-1",
        title: "Git Workflows",
        description: "Git Flow, Trunk-based, and more",
        content: `# Git Workflows

## Git Flow
- Main branches: main, develop
- Feature branches
- Release branches
- Hotfix branches

## Trunk-Based Development
- Single main branch
- Short-lived feature branches
- Frequent integration

## GitHub Flow
- Simple
- Feature branches
- Direct to main

Choose based on team size and needs.`,
        duration: 15,
      },
      {
        id: "6-2",
        title: "Commit Message Standards",
        description: "Write professional commit messages",
        content: `# Commit Message Standards

## Conventional Commits
\`\`\`
type(scope): subject

body

footer
\`\`\`

## Types
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Tests
- chore: Maintenance

## Examples
\`\`\`
feat(auth): add user login
fix(api): resolve memory leak
docs: update README
\`\`\``,
        duration: 10,
      },
      {
        id: "6-3",
        title: "Handling Large Teams",
        description: "Git strategies for big projects",
        content: `# Large Team Strategies

## Branch Protection
- Require reviews
- Require CI checks
- Prevent force push

## Code Owners
- Assign reviewers
- Require approvals
- Define ownership

## Communication
- Clear PR descriptions
- Link issues
- Respond to reviews`,
        duration: 12,
      },
      {
        id: "6-4",
        title: "Open Source Contribution Guide",
        description: "How to contribute to open source",
        content: `# Contributing to Open Source

## Steps
1. Find project
2. Read contributing guide
3. Fork repository
4. Create branch
5. Make changes
6. Write tests
7. Submit PR
8. Respond to feedback

## Best Practices
- Follow project style
- Write good commit messages
- Keep PRs focused
- Be patient`,
        duration: 12,
      },
      {
        id: "6-5",
        title: "GitHub Actions (CI/CD Intro)",
        description: "Automate workflows",
        content: `# GitHub Actions

Automate workflows in your repository.

## Concepts
- **Workflows** - Automated processes
- **Actions** - Reusable steps
- **Events** - Triggers (push, PR, etc.)

## Common Uses
- Run tests
- Deploy applications
- Lint code
- Build packages

## Example
\`\`\`yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm test
\`\`\``,
        duration: 15,
      },
    ],
  },
];
