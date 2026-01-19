# Git & GitHub Learning Platform

A modern, interactive web application that teaches Git and GitHub from absolute beginner to advanced level using visual explanations, interactive demos, simulations, and real-world workflows.

## 🎯 Features

### Core Learning Features
- **6 Progressive Levels**: From Git basics to industry practices
- **Interactive Lessons**: Step-by-step tutorials with visual explanations
- **Command Explorer**: Deep dive into every Git command with examples
- **Visual Git Simulator**: Practice commands in a safe, visual environment
- **Fake Terminal**: Interactive terminal with real-time feedback
- **Progress Tracking**: XP points, badges, and completion tracking
- **Quiz Mode**: Test your knowledge with MCQs and scenario-based questions

### Bonus Features
- **Git Cheatsheet**: Quick reference for common commands
- **Interview Preparation**: Common Git & GitHub interview questions
- **Resume Tips**: How to showcase Git/GitHub skills
- **Practice Challenges**: Real-world scenarios to test skills
- **Dark/Light Mode**: Beautiful UI with theme switching
- **Fully Responsive**: Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Git_Github
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📚 Learning Structure

### Level 1: Git Basics 🟢
- What is Git? Why version control exists
- Local vs Remote repositories
- Working directory, staging area, repository
- Commands: `git init`, `git status`, `git add`, `git commit`
- Visual timeline of commits

### Level 2: Branching & Merging 🔵
- What is a branch (visual tree)
- Commands: `git branch`, `git checkout`, `git switch`, `git merge`
- Merge conflicts (step-by-step visual resolution)

### Level 3: GitHub Essentials 🟣
- What is GitHub
- Remote repositories
- Commands: `git remote`, `git push`, `git pull`, `git clone`
- Visual local ↔ remote sync animation

### Level 4: Collaboration 🟠
- Fork vs Clone
- Pull Requests
- Code reviews
- Issues & Projects
- GitHub Flow

### Level 5: Advanced Git 🔴
- `git rebase`
- `git cherry-pick`
- `git stash`
- `git reset` vs `git revert`
- `git reflog`
- Visual commit graph rewrites

### Level 6: Real-World & Industry Practices ⚫
- Git workflows (Git Flow, Trunk-based)
- Commit message standards
- Handling large teams
- Open-source contribution guide
- GitHub Actions (CI/CD intro)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components (shadcn/ui style)
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Markdown**: react-markdown
- **Icons**: Lucide React

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Learning dashboard
│   ├── explorer/          # Command explorer
│   ├── simulator/         # Visual Git simulator
│   ├── quiz/              # Quiz mode
│   ├── progress/          # Progress tracking
│   ├── resources/         # Resources & cheatsheets
│   └── level/             # Lesson pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── layout/           # Layout components
├── data/                 # Data files
│   ├── levels.ts        # Learning levels & lessons
│   ├── commands.ts      # Git commands data
│   └── quiz.ts          # Quiz questions
├── lib/                  # Utilities
│   ├── store.ts         # Zustand store
│   └── utils.ts         # Helper functions
└── public/              # Static assets
```

## 🎮 How to Use

### For Students

1. **Start Learning**
   - Visit the Dashboard to see all learning levels
   - Start with Level 1 (Git Basics) - it's unlocked by default
   - Complete lessons in order to unlock next levels

2. **Practice Commands**
   - Use the Command Explorer to learn about specific Git commands
   - Try commands in the Visual Simulator
   - See real-time visual feedback

3. **Test Your Knowledge**
   - Take quizzes to reinforce learning
   - Earn XP points for completed lessons
   - Unlock badges as you progress

4. **Track Progress**
   - View your progress dashboard
   - See completion percentages
   - Check earned badges

### For Educators

- Use as a teaching tool in computer science courses
- Students can learn at their own pace
- Visual explanations help with understanding
- Progress tracking helps identify struggling students

## 🎨 Features in Detail

### Visual Git Simulator
- Practice Git commands without affecting real repositories
- See commits, branches, and merges visually
- Understand how commands affect repository state
- Reset and try again as many times as needed

### Command Explorer
- Search through all Git commands
- See syntax, examples, and common mistakes
- Learn when to use each command
- Jump directly to simulator to try commands

### Progress System
- Earn XP for completing lessons
- Unlock badges for achievements
- Track completion across all levels
- Visual progress indicators

## 🔮 Future Enhancements

- [ ] GitHub profile analyzer
- [ ] Offline mode (PWA)
- [ ] More interactive challenges
- [ ] Video tutorials integration
- [ ] Community features
- [ ] Export progress as certificate
- [ ] Multi-language support
- [ ] Advanced commit graph visualizations
- [ ] Integration with real GitHub API
- [ ] Collaborative learning features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with Next.js and React
- Inspired by the need for better Git education tools
- Designed for developers of all skill levels

## 📧 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Learning! 🚀**

Master Git & GitHub and become industry-ready!
