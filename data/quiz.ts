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
];
