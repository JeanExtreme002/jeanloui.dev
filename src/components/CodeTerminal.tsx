"use client";

import { useEffect, useRef, useState } from "react";
import { CornerDownLeft, TerminalSquare, Trash2, X } from "lucide-react";
import {
  achievements,
  certifications,
  education,
  experiences,
  profile,
  projects,
  socialLinks,
} from "@/lib/content";

const HOST = "visitor@jeanloui.dev";

/** Shell prompt for a given working directory ("" = home). */
function promptFor(cwd: string): string {
  return `${HOST}:~${cwd ? "/" + cwd : ""}$`;
}

/** Resolve `input` against `cwd`, handling `.`, `..`, `~` and leading `/`. */
function resolvePath(cwd: string, input: string): string {
  const raw = input.startsWith("/") ? input : `${cwd}/${input}`;
  const stack: string[] = [];
  for (const part of raw.split("/")) {
    if (!part || part === ".") continue;
    if (part === "~") stack.length = 0;
    else if (part === "..") stack.pop();
    else stack.push(part);
  }
  return stack.join("/");
}

type LineKind = "input" | "text" | "accent" | "muted" | "error" | "link";

interface TerminalLine {
  id: number;
  kind: LineKind;
  text: string;
  href?: string;
  /** Prompt captured at run time, for echoed input lines. */
  prompt?: string;
}

type LineSpec = Omit<TerminalLine, "id">;

const text = (t: string): LineSpec => ({ kind: "text", text: t });
const accent = (t: string): LineSpec => ({ kind: "accent", text: t });
const muted = (t: string): LineSpec => ({ kind: "muted", text: t });
const error = (t: string): LineSpec => ({ kind: "error", text: t });
const link = (t: string, href: string): LineSpec => ({ kind: "link", text: t, href });
const blank = (): LineSpec => ({ kind: "text", text: "" });

function openSocial(platform: string): LineSpec[] {
  const social = socialLinks.find((s) => s.platform === platform);
  if (!social) return [error(`${platform.toLowerCase()}: profile not found`)];
  window.open(social.url, "_blank", "noopener,noreferrer");
  return [text(`opening ${platform}…`), link(`  ${social.url}`, social.url)];
}

interface CommandResult {
  lines?: LineSpec[];
  clear?: boolean;
  close?: boolean;
  /** New working directory to switch to ("" = home). */
  cd?: string;
}

interface CommandContext {
  cwd: string;
}

interface Command {
  summary: string;
  run: (args: string[], ctx: CommandContext) => LineSpec[] | CommandResult;
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface VFile {
  name: string;
  render: () => LineSpec[];
}

/** Directories, each holding one file per portfolio item. */
const DIRECTORIES: Record<string, VFile[]> = {
  projects: projects.map((p) => ({
    name: `${slug(p.name)}.md`,
    render: () => [
      accent(`◆ ${p.name}`),
      text(`  ${p.description}`),
      p.keywords.length ? muted(`  ${p.keywords.map((k) => `#${k}`).join(" ")}`) : blank(),
      link(`  ${p.repoUrl}`, p.repoUrl),
    ],
  })),
  awards: achievements.map((a) => ({
    name: `${slug(a.title)}.md`,
    render: () => [
      accent(`🏆 ${a.title}`),
      text(`  ${a.rank} · ${a.category} · ${a.date}`),
      text(`  ${a.description}`),
    ],
  })),
  certs: certifications.map((c) => ({
    name: `${slug(c.title)}.md`,
    render: () => [
      accent(`◆ ${c.title}`),
      text(`  ${c.issuer} · ${c.date}`),
      c.skills.length ? muted(`  ${c.skills.map((s) => `#${s}`).join(" ")}`) : blank(),
      link(`  ${c.url}`, c.url),
    ],
  })),
};

/** Top-level files, each mapping to a reader. */
const ROOT_CTX: CommandContext = { cwd: "" };
const ROOT_FILES: Record<string, () => LineSpec[]> = {
  "about.txt": () => commands.about.run([], ROOT_CTX) as LineSpec[],
  "experience.log": () => commands.experience.run([], ROOT_CTX) as LineSpec[],
  "education.md": () => commands.education.run([], ROOT_CTX) as LineSpec[],
  "contact.vcf": () => commands.contact.run([], ROOT_CTX) as LineSpec[],
  "resume.pdf": () => commands.resume.run([], ROOT_CTX) as LineSpec[],
};

/** Root listing: files plus directories (shown with a trailing slash). */
const ROOT_ENTRIES = [
  ...Object.keys(ROOT_FILES),
  ...Object.keys(DIRECTORIES).map((d) => `${d}/`),
].sort();

const commands: Record<string, Command> = {
  help: {
    summary: "list everything you can run",
    run: () => {
      const names = Object.keys(commands).sort();
      const width = Math.max(...names.map((n) => n.length));
      return [
        accent("Available commands:"),
        blank(),
        ...names.map((name) => text(`  ${name.padEnd(width + 2)}${commands[name].summary}`)),
        blank(),
        muted("tip: try `whoami`, `projects`, or `experience`. ↑/↓ for history."),
      ];
    },
  },

  whoami: {
    summary: "who is this guy?",
    run: () => [
      accent(profile.fullName),
      text(`${profile.title} · ${profile.location}`),
      muted(socialLinks.find((s) => s.platform === "GitHub")?.handle ?? ""),
    ],
  },

  about: {
    summary: "the short version",
    run: () => [accent("// about"), ...profile.summary.flatMap((p) => [text(p), blank()])],
  },

  ls: {
    summary: "list files & directories (try `ls projects`)",
    run: (args, ctx) => {
      const target = resolvePath(ctx.cwd, args[0] ?? "");
      if (!target) return [text(ROOT_ENTRIES.join("   "))];
      if (target in DIRECTORIES) return [text(DIRECTORIES[target].map((f) => f.name).join("   "))];
      if (target in ROOT_FILES) return [text(target)];
      const slashIdx = target.indexOf("/");
      if (slashIdx !== -1) {
        const dir = DIRECTORIES[target.slice(0, slashIdx)];
        if (dir?.some((f) => f.name === target.slice(slashIdx + 1))) {
          return [text(target.slice(slashIdx + 1))];
        }
      }
      return [error(`ls: ${target}: no such file or directory`)];
    },
  },

  cd: {
    summary: "change directory (try `cd projects`, `cd ..`)",
    run: (args, ctx) => {
      const target = args[0] ? resolvePath(ctx.cwd, args[0]) : "";
      if (target === "") return { cd: "" };
      if (target in DIRECTORIES) return { cd: target };
      if (target in ROOT_FILES || target.includes("/")) {
        return [error(`cd: ${target}: Not a directory`)];
      }
      return [error(`cd: ${target}: no such file or directory`)];
    },
  },

  cat: {
    summary: "read a file (try `cat about.txt`)",
    run: (args, ctx) => {
      if (!args[0]) return [error("usage: cat <file>  ·  see `ls`")];
      const clean = resolvePath(ctx.cwd, args[0]);

      if (clean === "" || clean in DIRECTORIES) {
        return [error(`cat: ${clean || "."}: Is a directory`)];
      }
      if (clean in ROOT_FILES) return ROOT_FILES[clean]();

      const slashIdx = clean.indexOf("/");
      if (slashIdx !== -1) {
        const dirName = clean.slice(0, slashIdx);
        const fileName = clean.slice(slashIdx + 1);
        const dir = DIRECTORIES[dirName];
        if (!dir) return [error(`cat: ${dirName}: no such file or directory`)];
        const file = dir.find((f) => f.name === fileName);
        if (!file) return [error(`cat: ${clean}: no such file or directory`)];
        return file.render();
      }

      if (clean === "secrets.env") return [muted("🔒 nice try — nothing to see here.")];
      return [error(`cat: ${clean}: no such file or directory`)];
    },
  },

  search: {
    summary: "search everything (search <term> [path])",
    run: (args, ctx) => {
      if (args.length === 0) return [error("usage: search <term> [path]")];

      const pattern = args[0];
      const needle = pattern.toLowerCase();
      const scope = args[1] ? resolvePath(ctx.cwd, args[1]) : ctx.cwd;

      const targets: { path: string; render: () => LineSpec[] }[] = [];
      const addRoot = (name: string) => targets.push({ path: name, render: ROOT_FILES[name] });
      const addDir = (dirName: string) =>
        DIRECTORIES[dirName].forEach((f) =>
          targets.push({ path: `${dirName}/${f.name}`, render: f.render }),
        );

      if (!scope) {
        Object.keys(ROOT_FILES).forEach(addRoot);
        Object.keys(DIRECTORIES).forEach(addDir);
      } else if (scope in ROOT_FILES) {
        addRoot(scope);
      } else if (scope in DIRECTORIES) {
        addDir(scope);
      } else if (scope.includes("/")) {
        const [dirName, fileName] = scope.split("/");
        const file = DIRECTORIES[dirName]?.find((f) => f.name === fileName);
        if (!file) return [error(`search: ${scope}: no such file or directory`)];
        targets.push({ path: scope, render: file.render });
      } else {
        return [error(`search: ${scope}: no such file or directory`)];
      }

      const out: LineSpec[] = [];
      for (const t of targets) {
        for (const line of t.render()) {
          const content = line.text.trim();
          if (content && content.toLowerCase().includes(needle)) {
            out.push(text(`${t.path}: ${content}`));
          }
        }
      }

      if (out.length === 0) return [muted(`search: no matches for "${pattern}"`)];
      return out;
    },
  },

  projects: {
    summary: "things I've built",
    run: () =>
      projects.flatMap((p) => [
        accent(`◆ ${p.name}`),
        text(`  ${p.description}`),
        link(`  ${p.repoUrl}`, p.repoUrl),
        blank(),
      ]),
  },

  experience: {
    summary: "where I've worked",
    run: () =>
      experiences.flatMap((exp) => [
        accent(`◆ ${exp.company}`),
        ...exp.positions.map((pos) =>
          text(`  ${pos.title}  (${pos.start} — ${pos.end})`),
        ),
        blank(),
      ]),
  },

  education: {
    summary: "the academic bit",
    run: () =>
      education.flatMap((e) => [
        accent(`◆ ${e.institution}`),
        text(`  ${e.degree}  (${e.start} — ${e.end})`),
        blank(),
      ]),
  },

  awards: {
    summary: "trophies & rankings",
    run: () =>
      achievements.length
        ? achievements.flatMap((a) => [
            accent(`🏆 ${a.title}`),
            text(`  ${a.rank} · ${a.date}`),
            blank(),
          ])
        : [muted("no awards loaded.")],
  },

  certs: {
    summary: "certifications",
    run: () =>
      certifications.flatMap((c) => [
        accent(`◆ ${c.title}`),
        text(`  ${c.issuer} · ${c.date}`),
      ]),
  },

  social: {
    summary: "find me online",
    run: () =>
      socialLinks.map((s) => link(`${s.platform.padEnd(16)}${s.handle}`, s.url)),
  },

  github: {
    summary: "open my GitHub in a new tab",
    run: () => openSocial("GitHub"),
  },

  linkedin: {
    summary: "open my LinkedIn in a new tab",
    run: () => openSocial("LinkedIn"),
  },

  contact: {
    summary: "get in touch",
    run: () => [
      accent("Let's talk 👋"),
      link(`  ${profile.email}`, `mailto:${profile.email}`),
    ],
  },

  resume: {
    summary: "grab my CV",
    run: () => [link("📄 resume.pdf → download", profile.resumeUrl)],
  },

  echo: {
    summary: "say something back",
    run: (args) => [text(args.join(" ") || "")],
  },

  date: {
    summary: "what time is it?",
    run: () => [text(new Date().toString())],
  },

  pwd: {
    summary: "where am I?",
    run: (_args, ctx) => [text(`~${ctx.cwd ? "/" + ctx.cwd : ""}`)],
  },

  sudo: {
    summary: "become root (spoiler: no)",
    run: () => [error("sudo: permission denied — you're a guest here 😏")],
  },

  coffee: {
    summary: "fuel",
    run: () => [
      text("      ( ("),
      text("       ) )"),
      text("    ........"),
      text("    |      |]"),
      text("    \\      /"),
      text("     `----'"),
      muted("brewing... ☕ the code runs on this."),
    ],
  },

  clear: {
    summary: "wipe the screen",
    run: () => ({ clear: true }),
  },

  exit: {
    summary: "close the terminal",
    run: () => ({ close: true }),
  },
};

const COMMAND_NAMES = new Set(Object.keys(commands));

function longestCommonPrefix(items: string[]): string {
  if (items.length === 0) return "";
  let prefix = items[0];
  for (const item of items.slice(1)) {
    while (!item.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}

/** Commands whose first argument completes against the virtual filesystem. */
const FILE_ARG_COMMANDS = new Set(["cat", "ls", "cd"]);

const WELCOME: LineSpec[] = [
  accent(`${profile.name} — interactive shell`),
  muted("type `help` to see what you can do · `exit` to close"),
  blank(),
];

function InputHighlight({ value }: { value: string }) {
  const spaceIdx = value.indexOf(" ");
  const cmd = spaceIdx === -1 ? value : value.slice(0, spaceIdx);
  const rest = spaceIdx === -1 ? "" : value.slice(spaceIdx);
  const known = COMMAND_NAMES.has(cmd);
  return (
    <>
      <span className={known ? "text-[#bd93f9]" : "text-white/90"}>{cmd}</span>
      <span className="text-white/90">{rest}</span>
    </>
  );
}

export function CodeTerminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function resetScreen() {
    nextId.current = 0;
    setLines(WELCOME.map((line) => ({ ...line, id: nextId.current++ })));
  }

  useEffect(() => {
    if (!open) return;
    if (lines.length === 0) resetScreen();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  function pushLines(specs: LineSpec[]) {
    setLines((prev) => [...prev, ...specs.map((s) => ({ ...s, id: nextId.current++ }))]);
  }

  function runCommand(raw: string) {
    const trimmed = raw.trim();
    setInput("");
    setHistoryIndex(null);
    if (trimmed) setHistory((prev) => [...prev, trimmed]);

    const echo: LineSpec = { kind: "input", text: trimmed, prompt: promptFor(cwd) };

    if (!trimmed) {
      pushLines([echo]);
      return;
    }

    const [name, ...args] = trimmed.split(/\s+/);
    const command = commands[name.toLowerCase()];

    if (!command) {
      pushLines([
        echo,
        error(`command not found: ${name}`),
        muted("type `help` for the list."),
      ]);
      return;
    }

    const result = command.run(args, { cwd });
    const norm: CommandResult = Array.isArray(result) ? { lines: result } : result;

    if (norm.clear) {
      resetScreen();
      return;
    }
    if (norm.close) {
      setOpen(false);
      return;
    }
    if (norm.cd !== undefined) setCwd(norm.cd);
    pushLines([echo, ...(norm.lines ?? [])]);
  }

  function completeToken(base: string, token: string, pool: string[], addSpace: boolean) {
    const matches = pool.filter((p) => p.startsWith(token));
    if (matches.length === 0) return;

    if (matches.length === 1) {
      const done = addSpace && !matches[0].endsWith("/");
      setInput(base + matches[0] + (done ? " " : ""));
      return;
    }

    const lcp = longestCommonPrefix(matches);
    if (lcp.length > token.length) {
      setInput(base + lcp);
    } else {
      pushLines([
        { kind: "input", text: input, prompt: promptFor(cwd) },
        muted(matches.join("   ")),
      ]);
    }
  }

  function handleTab() {
    const value = input;
    const spaceIdx = value.indexOf(" ");

    if (spaceIdx === -1) {
      completeToken("", value.toLowerCase(), [...COMMAND_NAMES].sort(), true);
      return;
    }

    const cmd = value.slice(0, spaceIdx).toLowerCase();
    if (FILE_ARG_COMMANDS.has(cmd)) {
      const lastSpace = value.lastIndexOf(" ");
      const cmdBase = value.slice(0, lastSpace + 1);
      const argToken = value.slice(lastSpace + 1);
      const argSlash = argToken.indexOf("/");

      if (argSlash === -1) {
        const pool = cwd ? DIRECTORIES[cwd].map((f) => f.name) : ROOT_ENTRIES;
        completeToken(cmdBase, argToken, pool, false);
      } else {
        const dirTyped = argToken.slice(0, argSlash);
        const dir = DIRECTORIES[resolvePath(cwd, dirTyped)];
        if (dir) {
          const fileToken = argToken.slice(argSlash + 1);
          completeToken(cmdBase + dirTyped + "/", fileToken, dir.map((f) => f.name), false);
        }
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      handleTab();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
      return;
    }
    if (e.key === "ArrowUp") {
      if (history.length === 0) return;
      e.preventDefault();
      const idx = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(idx);
      setInput(history[idx]);
      return;
    }
    if (e.key === "ArrowDown") {
      if (historyIndex === null) return;
      e.preventDefault();
      const idx = historyIndex + 1;
      if (idx >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(idx);
        setInput(history[idx]);
      }
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open interactive terminal"
        className="absolute -left-5 -top-5 z-10 flex h-11 w-11 -rotate-6 cursor-pointer items-center justify-center rounded-xl border border-line-strong bg-paper text-accent shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:rotate-0 focus-visible:-translate-y-0.5 focus-visible:rotate-0"
      >
        <TerminalSquare className="h-6 w-6" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Interactive terminal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close terminal"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          <div className="relative z-10 flex h-[32rem] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line-strong bg-[#101418] shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-xs text-white/50">{promptFor(cwd)}</span>
              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  onClick={resetScreen}
                  aria-label="Clear terminal"
                  className="rounded-md p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close terminal"
                  className="rounded-md p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="terminal-scroll flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
            >
              {lines.map((line) => (
                <div key={line.id} className="whitespace-pre-wrap break-words">
                  {line.kind === "input" && (
                    <span>
                      <span className="text-[#28c840]">{line.prompt ?? promptFor(cwd)} </span>
                      <span className="text-white/90">{line.text}</span>
                    </span>
                  )}
                  {line.kind === "text" && <span className="text-white/75">{line.text}</span>}
                  {line.kind === "accent" && (
                    <span className="text-[#8be9fd]">{line.text}</span>
                  )}
                  {line.kind === "muted" && <span className="text-white/40">{line.text}</span>}
                  {line.kind === "error" && <span className="text-[#ff6b6b]">{line.text}</span>}
                  {line.kind === "link" && (
                    <a
                      href={line.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#f1fa8c] underline decoration-white/20 underline-offset-2 hover:decoration-[#f1fa8c]"
                    >
                      {line.text}
                    </a>
                  )}
                </div>
              ))}

              <div className="flex items-center">
                <span className="text-[#28c840]">{promptFor(cwd)} </span>
                <div className="relative ml-1 flex-1">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre font-mono text-[13px] leading-normal"
                  >
                    <InputHighlight value={input} />
                  </div>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                    aria-label="Terminal input"
                    className="relative w-full bg-transparent font-mono text-[13px] leading-normal text-transparent caret-[#28c840] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 font-mono text-[11px] text-white/40">
              <span className="flex items-center gap-1.5">
                <CornerDownLeft className="h-3 w-3" /> run
                <span className="mx-1">·</span>tab complete
                <span className="mx-1">·</span>↑↓ history
                <span className="mx-1">·</span>esc close
              </span>
              <span>help</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
