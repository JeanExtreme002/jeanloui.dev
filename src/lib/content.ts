import profileData from "@/../content/profile.json";
import socialData from "@/../content/social.json";
import experienceData from "@/../content/experience.json";
import volunteeringData from "@/../content/volunteering.json";
import projectsData from "@/../content/projects.json";
import certificationsData from "@/../content/certifications.json";
import educationData from "@/../content/education.json";
import achievementsData from "@/../content/achievements.json";
import quotesData from "@/../content/quotes.json";

export interface Stat {
  icon: string;
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  fullName: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  resumeUrl: string;
  photo: string;
  projectsLimit: number;
  certificationsPerPage: number;
  /** Master switch for the decorative Hero→About ink trail (and its toggle). */
  heroTrail: boolean;
  summary: string[];
}

export interface SocialLink {
  platform: string;
  icon: string;
  handle: string;
  url: string;
}

export interface Position {
  title: string;
  start: string;
  end: string;
  description: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  logo: string | null;
  url: string;
  location: string;
  positions: Position[];
}

export interface Volunteering {
  organization: string;
  logo: string | null;
  url: string;
  role: string;
  start: string;
  end: string;
  description: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  icon?: string;
}

export interface Project {
  name: string;
  icon: string;
  description: string;
  keywords: string[];
  repoUrl: string;
  metric: Stat | null;
  secondary: ProjectLink | null;
  tertiary?: ProjectLink | null;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string | null;
  url: string;
  skills: string[];
}

export interface Education {
  institution: string;
  logo: string | null;
  url: string;
  degree: string;
  start: string;
  end: string;
}

export interface Achievement {
  title: string;
  rank: string;
  date: string;
  category: string;
  description: string;
}

export interface Quote {
  text: string;
  author: string;
}

export const profile: Profile = profileData;
export const socialLinks: SocialLink[] = socialData;
export const experiences: Experience[] = experienceData;
export const volunteering: Volunteering[] = volunteeringData;
export const projects: Project[] = projectsData;
export const certifications: Certification[] = certificationsData;
export const education: Education[] = educationData;
export const achievements: Achievement[] = achievementsData;
export const quotes: Quote[] = quotesData;
