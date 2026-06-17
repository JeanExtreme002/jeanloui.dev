"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

interface AccordionItemProps {
  header: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ header, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 py-5 text-left"
      >
        <span className="flex-1">{header}</span>
        <Plus
          size={20}
          className={`shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        />
      </button>
      <div id={panelId} hidden={!open} className="pb-5 leading-relaxed text-muted">
        {children}
      </div>
    </div>
  );
}
