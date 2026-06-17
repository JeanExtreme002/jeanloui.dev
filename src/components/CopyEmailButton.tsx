"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";

interface CopyEmailButtonProps {
  email: string;
  variant?: "primary" | "inline";
}

export function CopyEmailButton({ email, variant = "primary" }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className="group flex w-full items-center gap-3 rounded-xl border border-line px-4 py-3.5 text-left transition-colors hover:border-line-strong"
        aria-label={`Copy email address ${email}`}
      >
        <Mail size={18} className="text-accent" />
        <span className="text-ink">{email}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-sm text-muted group-hover:text-accent">
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied" : "Copy"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
      aria-label={`Copy email address ${email}`}
    >
      {copied ? <Check size={18} /> : <Mail size={18} />}
      {copied ? "Email copied" : "Copy email"}
    </button>
  );
}
