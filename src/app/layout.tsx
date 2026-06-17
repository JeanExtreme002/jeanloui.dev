import type { Metadata } from "next";
import { Caveat, Inter, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { profile, socialLinks } from "@/lib/content";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const signature = localFont({
  src: "../fonts/BestermindRegular.ttf",
  variable: "--font-bestermind",
  display: "swap",
});

const siteUrl = "https://jeanloui.dev";
const description =
  "Jean Loui Bernard is a full-stack Software Engineer and open-source author who builds reliable software end to end — from APIs and microservices to the interfaces people use.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "Jean Loui Bernard",
    "Software Engineer",
    "Backend Engineer",
    "Full-stack Developer",
    "Python",
    "TypeScript",
    "Open Source",
    "Portfolio",
  ],
  authors: [{ name: profile.fullName, url: siteUrl }],
  creator: profile.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: siteUrl,
    title: `${profile.name} — ${profile.title}`,
    description,
    siteName: `${profile.name} — Portfolio`,
    images: [{ url: profile.photo, width: 800, height: 800, alt: profile.name }],
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — ${profile.title}`,
    description,
    images: [profile.photo],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  image: `${siteUrl}${profile.photo}`,
  sameAs: socialLinks.map((link) => link.url),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${hand.variable} ${signature.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
