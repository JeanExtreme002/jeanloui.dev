"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Certification } from "@/lib/content";
import { CertImage } from "@/components/CertImage";

interface CertificationsListProps {
  items: Certification[];
  perPage: number;
}

export function CertificationsList({ items, perPage }: CertificationsListProps) {
  const pageSize = perPage > 0 ? perPage : items.length;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const [page, setPage] = useState(1);

  const start = (page - 1) * pageSize;
  const visible = items.slice(start, start + pageSize);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((cert) => (
          <article
            key={cert.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line transition-colors hover:border-line-strong"
          >
            <CertImage src={cert.image} title={cert.title} issuer={cert.issuer} />
            <div className="flex flex-1 flex-col p-5">
              <p className="text-sm text-faint">
                {cert.issuer} · {cert.date}
              </p>
              <h3 className="mt-1.5 flex-1 font-display text-base font-semibold leading-snug tracking-tight text-ink">
                {cert.title}
              </h3>
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent"
              >
                View credential
                <ArrowUpRight size={15} className="text-faint group-hover:text-accent" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 ? (
        <nav
          aria-label="Certifications pages"
          className="mt-10 flex items-center justify-center gap-2"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-subtle disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => {
            const isActive = number === page;
            return (
              <button
                key={number}
                type="button"
                onClick={() => setPage(number)}
                aria-label={`Page ${number}`}
                aria-current={isActive ? "page" : undefined}
                className={`h-9 w-9 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-white"
                    : "text-muted hover:bg-subtle"
                }`}
              >
                {number}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-subtle disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </nav>
      ) : null}
    </div>
  );
}
