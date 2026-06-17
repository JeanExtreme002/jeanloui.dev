"use client";

import Image from "next/image";
import { useState } from "react";
import { Award } from "lucide-react";

interface CertImageProps {
  src: string | null;
  title: string;
  issuer: string;
}

export function CertImage({ src, title, issuer }: CertImageProps) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <div className="aspect-[4/3] border-b border-line bg-subtle">
        <Image
          src={src}
          alt={`${title} certificate issued by ${issuer}`}
          width={640}
          height={480}
          className="h-full w-full object-contain p-2"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 border-b border-line bg-subtle text-muted">
      <Award size={36} strokeWidth={1.5} />
      <span className="text-xs uppercase tracking-wider">{issuer}</span>
    </div>
  );
}
