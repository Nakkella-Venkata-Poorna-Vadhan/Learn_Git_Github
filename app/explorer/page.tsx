"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Command, Commands } from "@/data/commands";
import { Search, Terminal, BookOpen, AlertCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommandExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);

  const filteredCommands = Commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Command Explorer</h1>
        <p className="text-muted-foreground">
          Explore every Git command with detailed explanations and examples
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Command List */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search commands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredCommands.map((cmd) => (
              <Card
                key={cmd.name}
                className={`cursor-pointer transition-colors ${
                  selectedCommand?.name === cmd.name ? "border-primary" : ""
                }`}
                onClick={() => setSelectedCommand(cmd)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-mono">{cmd.name}</CardTitle>
                    <Badge variant="secondary">{cmd.category}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{cmd.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Command Details */}
        <div className="lg:col-span-2">
          {selectedCommand ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-mono">{selectedCommand.name}</CardTitle>
                    <CardDescription className="mt-2">{selectedCommand.description}</CardDescription>
                  </div>
                  <Badge>{selectedCommand.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Syntax */}
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold">
                    <Terminal className="h-4 w-4" />
                    Syntax
                  </h3>
                  <div className="rounded-lg bg-muted p-4">
                    <code className="text-sm">{selectedCommand.syntax}</code>
                  </div>
                </div>

                {/* When to Use */}
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold">
                    <BookOpen className="h-4 w-4" />
                    When to Use
                  </h3>
                  <p className="text-muted-foreground">{selectedCommand.whenToUse}</p>
                </div>

                {/* Examples */}
                {selectedCommand.examples && selectedCommand.examples.length > 0 && (
                  <div>
                    <h3 className="mb-2 flex items-center gap-2 font-semibold">
                      <Play className="h-4 w-4" />
                      Examples
                    </h3>
                    <div className="space-y-2">
                      {selectedCommand.examples.map((example, idx) => (
                        <div key={idx} className="rounded-lg bg-muted p-4">
                          <div className="mb-1 text-sm font-medium">{example.description}</div>
                          <code className="text-sm">{example.command}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common Mistakes */}
                {selectedCommand.commonMistakes && selectedCommand.commonMistakes.length > 0 && (
                  <div>
                    <h3 className="mb-2 flex items-center gap-2 font-semibold">
                      <AlertCircle className="h-4 w-4" />
                      Common Mistakes
                    </h3>
                    <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                      {selectedCommand.commonMistakes.map((mistake, idx) => (
                        <li key={idx}>{mistake}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Try It Button */}
                <Button
                  onClick={() => {
                    // Navigate to simulator with command pre-filled
                    window.location.href = `/simulator?command=${encodeURIComponent(selectedCommand.name)}`;
                  }}
                  className="w-full"
                >
                  Try This Command in Simulator
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex h-[400px] items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Search className="mx-auto mb-4 h-12 w-12" />
                  <p>Select a command to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
