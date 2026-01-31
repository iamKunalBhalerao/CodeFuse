"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Code2,
  Monitor,
  Globe,
  Play,
  Loader2,
} from "lucide-react";

interface EditorHeaderProps {
  roomId: string;
  language: string;
  setLanguage: (lang: string) => void;
  status: "connecting" | "connected" | "disconnected";
  onRun: () => void;
  isRunning: boolean;
}

const languages = [
  { label: "TypeScript", value: "typescript", version: "5.0.3" },
  { label: "JavaScript", value: "javascript", version: "18.15.0" },
  { label: "Python", value: "python", version: "3.10.0" },
  { label: "C++", value: "cpp", version: "10.2.0" },
  { label: "Go", value: "go", version: "1.16.2" },
];

export function EditorHeader({
  roomId,
  language,
  setLanguage,
  status,
  onRun,
  isRunning,
}: EditorHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 h-12 bg-zinc-900 border-b border-zinc-800 backdrop-blur-md bg-opacity-80 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2 py-1 rounded bg-zinc-800/50 border border-zinc-700/50">
          <Monitor className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-medium text-zinc-200 truncate max-w-[150px]">
            {roomId}
          </span>
        </div>

        <div className="h-4 w-[1px] bg-zinc-700 mx-1" />

        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              status === "connected"
                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                : status === "connecting"
                  ? "bg-amber-500 animate-pulse"
                  : "bg-red-500"
            }`}
          />
          <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">
            {status}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={onRun}
          disabled={isRunning || status !== "connected"}
          size="sm"
          className="h-8 bg-emerald-600 hover:bg-emerald-500 text-white gap-2 px-4 shadow-[0_0_15px_rgba(16,185,129,0.2)] disabled:opacity-50 transition-all duration-200"
        >
          {isRunning ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4 fill-current" />
          )}
          <span className="text-xs font-bold uppercase tracking-wider">
            Run
          </span>
        </Button>

        <div className="h-4 w-[1px] bg-zinc-800 mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300 gap-2 px-3 transition-colors duration-200"
            >
              <Code2 className="h-4 w-4" />
              <span className="text-xs font-medium">
                {languages.find((l) => l.value === language)?.label || language}
              </span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-zinc-900 border-zinc-800 text-zinc-300 min-w-[140px]"
          >
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
                className="focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer text-xs py-2"
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-zinc-400 hover:text-zinc-200"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
