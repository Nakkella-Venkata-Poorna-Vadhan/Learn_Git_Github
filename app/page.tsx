import Link from "next/link";
import { ArrowRight, GitBranch, Code, BookOpen, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full border bg-muted px-4 py-2 text-sm">
            <Zap className="mr-2 h-4 w-4 text-primary" />
            <span>From Zero to Industry-Ready</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Master Git & GitHub
            <span className="block text-primary">Like a Pro</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl">
            Learn version control from absolute beginner to advanced level with visual explanations,
            interactive demos, and real-world workflows.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/dashboard">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link href="/explorer">Explore Commands</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Learn With Us?</h2>
            <p className="text-muted-foreground">
              Interactive learning that makes Git & GitHub concepts stick
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GitBranch className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Visual Git Simulator</CardTitle>
                <CardDescription>
                  See commits, branches, and merges happen in real-time with drag-and-drop
                  interactions
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Interactive Terminal</CardTitle>
                <CardDescription>
                  Practice Git commands in a safe environment with instant visual feedback
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Structured Learning</CardTitle>
                <CardDescription>
                  Progress through 6 levels from basics to advanced Git workflows
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Earn XP, unlock badges, and see your journey from zero to hero
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Command Explorer</CardTitle>
                <CardDescription>
                  Deep dive into every Git command with examples and common mistakes
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-World Scenarios</CardTitle>
                <CardDescription>
                  Learn industry best practices and workflows used by professional teams
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl rounded-lg border bg-card p-8 text-center shadow-lg">
          <h2 className="mb-4 text-3xl font-bold">Ready to Start Your Journey?</h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of developers mastering Git and GitHub. Start learning today!
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
