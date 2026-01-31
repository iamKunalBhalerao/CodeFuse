"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

export interface TerminalHandle {
  write: (text: string) => void;
  clear: () => void;
  writeln: (text: string) => void;
}

const Terminal = forwardRef<TerminalHandle>((_, ref) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      theme: {
        background: "#18181b", // zinc-900
        foreground: "#e4e4e7", // zinc-200
        cursor: "#a1a1aa", // zinc-400
        selectionBackground: "rgba(161, 161, 170, 0.3)",
        black: "#18181b",
        red: "#ef4444",
        green: "#22c55e",
        yellow: "#eab308",
        blue: "#3b82f6",
        magenta: "#a855f7",
        cyan: "#06b6d4",
        white: "#f4f4f5",
      },
      fontSize: 13,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      cursorBlink: true,
      allowProposedApi: true,
      rows: 10,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener("resize", handleResize);

    term.writeln("\x1b[1;32mWelcome to CodeFuse Terminal\x1b[0m");
    term.writeln("Ready to execute your code...\r\n");

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    write: (text: string) => {
      xtermRef.current?.write(text);
    },
    writeln: (text: string) => {
      xtermRef.current?.writeln(text);
    },
    clear: () => {
      xtermRef.current?.clear();
      xtermRef.current?.writeln(
        "\x1b[1;32mWelcome to CodeFuse Terminal\x1b[0m",
      );
      xtermRef.current?.writeln("Ready to execute your code...\r\n");
    },
  }));

  return (
    <div className="h-full w-full bg-zinc-900 p-2">
      <div ref={terminalRef} className="h-full w-full" />
    </div>
  );
});

Terminal.displayName = "Terminal";

export default Terminal;
