"use client";

import Image from "next/image";
import { useState } from "react";
import { Building2, GraduationCap } from "lucide-react";

interface LogoProps {
  src: string | null;
  name: string;
  variant?: "company" | "education";
}

export function Logo({ src, name, variant = "company" }: LogoProps) {
  const [failed, setFailed] = useState(false);
  const Fallback = variant === "education" ? GraduationCap : Building2;

  if (src && !failed) {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center">
        <Image
          src={src}
          alt={`${name} logo`}
          width={48}
          height={48}
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      </span>
    );
  }

  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center text-muted"
      role="img"
      aria-label={`${name} logo`}
      title={name}
    >
      <Fallback size={24} strokeWidth={1.75} />
    </span>
  );
}
