import { profile } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-2 px-6 py-10 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} {profile.fullName}
        </p>
        <p className="text-sm text-faint">Built with Next.js &amp; TypeScript</p>
      </div>
    </footer>
  );
}
