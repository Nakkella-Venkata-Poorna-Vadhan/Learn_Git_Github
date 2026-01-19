"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  FileText,
  Briefcase,
  Code,
  Book,
  Link as LinkIcon,
  Trophy,
  Puzzle,
} from "lucide-react";
import Link from "next/link";

const cheatsheetCommands = [
  { command: "git init", description: "Initialize repository" },
  { command: "git status", description: "Check status" },
  { command: "git add .", description: "Stage all changes" },
  { command: "git commit -m 'msg'", description: "Commit changes" },
  { command: "git branch", description: "List branches" },
  { command: "git switch <branch>", description: "Switch branch" },
  { command: "git merge <branch>", description: "Merge branch" },
  { command: "git push", description: "Push to remote" },
  { command: "git pull", description: "Pull from remote" },
  { command: "git clone <url>", description: "Clone repository" },
  { command: "git log", description: "View history" },
  { command: "git stash", description: "Save changes temporarily" },
];

const interviewQuestions = [
  {
    question: "What is the difference between git merge and git rebase?",
    answer:
      "git merge creates a merge commit combining two branches, while git rebase replays commits on top of another branch, creating a linear history. Merge preserves history, rebase rewrites it.",
  },
  {
    question: "Explain the three states of Git files.",
    answer:
      "1) Working Directory - where you edit files, 2) Staging Area - files prepared for commit (git add), 3) Repository - committed snapshots (git commit).",
  },
  {
    question: "What is a merge conflict and how do you resolve it?",
    answer:
      "A merge conflict occurs when Git can't automatically combine changes. Resolve by: 1) Identify conflicted files (git status), 2) Edit files to remove conflict markers, 3) Stage resolved files (git add), 4) Complete merge (git commit).",
  },
  {
    question: "When should you use git reset vs git revert?",
    answer:
      "Use git reset for local commits that haven't been pushed (rewrites history). Use git revert for commits already pushed (creates new commit, safe for public branches).",
  },
  {
    question: "What is the difference between git fetch and git pull?",
    answer:
      "git fetch downloads changes without merging. git pull does both fetch and merge. Fetch is safer as it lets you review before merging.",
  },
];

const resumeTips = [
  {
    title: "Showcase Your GitHub Profile",
    description:
      "Include your GitHub username on your resume. Employers often check GitHub profiles to see your code quality and activity.",
  },
  {
    title: "Highlight Git Experience",
    description:
      "Mention Git/GitHub in your technical skills. Specify if you've worked with Git workflows, CI/CD, or open source contributions.",
  },
  {
    title: "Link to Projects",
    description:
      "Include links to your best GitHub repositories. Make sure they're well-documented with README files.",
  },
  {
    title: "Contribution Activity",
    description:
      "Maintain consistent contribution activity. A green GitHub contribution graph shows dedication and consistency.",
  },
  {
    title: "Open Source Contributions",
    description:
      "List any open source projects you've contributed to. This demonstrates collaboration skills.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Resources & Tools</h1>
        <p className="text-muted-foreground">
          Cheatsheets, interview prep, and helpful resources
        </p>
      </div>

      {/* Git Cheatsheet */}
      <section id="cheatsheet" className="mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Git Command Cheatsheet</CardTitle>
                <CardDescription>Quick reference for common Git commands</CardDescription>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cheatsheetCommands.map((item) => (
                <div
                  key={item.command}
                  className="rounded-lg border bg-muted/50 p-4 font-mono text-sm"
                >
                  <div className="mb-1 font-semibold text-primary">{item.command}</div>
                  <div className="text-muted-foreground">{item.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Interview Preparation */}
      <section id="interview" className="mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <CardTitle className="text-2xl">Interview Preparation</CardTitle>
            </div>
            <CardDescription>Common Git & GitHub interview questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {interviewQuestions.map((item, idx) => (
                <div key={idx} className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold text-primary">Q: {item.question}</h3>
                  <p className="text-muted-foreground">A: {item.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Resume Tips */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <CardTitle className="text-2xl">Resume Tips for GitHub</CardTitle>
            </div>
            <CardDescription>Make your GitHub profile stand out to employers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {resumeTips.map((tip, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Challenges */}
      <section id="challenges" className="mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Puzzle className="h-5 w-5" />
              <CardTitle className="text-2xl">Practice Challenges</CardTitle>
            </div>
            <CardDescription>Test your skills with real-world scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Challenge 1: Fix the Broken Repo</CardTitle>
                  <CardDescription>
                    A repository has merge conflicts. Resolve them and push the fix.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/simulator">Start Challenge</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Challenge 2: Feature Branch Workflow</CardTitle>
                  <CardDescription>
                    Create a feature branch, make changes, and merge it back to main.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/simulator">Start Challenge</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Challenge 3: Undo Mistakes</CardTitle>
                  <CardDescription>
                    Accidentally committed wrong files? Use Git to fix it.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/simulator">Start Challenge</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* External Resources */}
      <section>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              <CardTitle className="text-2xl">External Resources</CardTitle>
            </div>
            <CardDescription>Helpful links to learn more</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Official Git Documentation</h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  Comprehensive Git reference guide
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://git-scm.com/doc" target="_blank" rel="noopener noreferrer">
                    Visit Site
                  </a>
                </Button>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">GitHub Learning Lab</h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  Interactive GitHub tutorials
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://lab.github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Site
                  </a>
                </Button>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Atlassian Git Tutorials</h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  In-depth Git tutorials and workflows
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://www.atlassian.com/git/tutorials"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Site
                  </a>
                </Button>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">GitHub Skills</h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  Learn GitHub through interactive courses
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://skills.github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Site
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
