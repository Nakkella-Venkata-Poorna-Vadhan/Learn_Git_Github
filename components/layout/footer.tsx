import Link from "next/link";
import { Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold">Git Master</h3>
            <p className="text-sm text-muted-foreground">
              The best visual Git & GitHub learning platform. Master version control from zero to
              industry-ready confidence.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Learn</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="hover:text-primary">
                  Command Explorer
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="hover:text-primary">
                  Simulator
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-primary">
                  Quiz
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/resources" className="hover:text-primary">
                  Cheatsheets
                </Link>
              </li>
              <li>
                <Link href="/resources#interview" className="hover:text-primary">
                  Interview Prep
                </Link>
              </li>
              <li>
                <Link href="/resources#challenges" className="hover:text-primary">
                  Challenges
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
