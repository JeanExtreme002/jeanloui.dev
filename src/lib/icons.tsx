import {
  Award,
  Building2,
  Download,
  Gamepad2,
  GraduationCap,
  LayoutDashboard,
  Link2,
  Medal,
  MemoryStick,
  MessagesSquare,
  Mic,
  Package,
  Plane,
  Search,
  Server,
  SquareTerminal,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  plane: Plane,
  memory: MemoryStick,
  search: Search,
  link: Link2,
  terminal: SquareTerminal,
  mic: Mic,
  chat: MessagesSquare,
  game: Gamepad2,
  dashboard: LayoutDashboard,
  server: Server,
  star: Star,
  download: Download,
  medal: Medal,
  trophy: Trophy,
  award: Award,
  package: Package,
  company: Building2,
  education: GraduationCap,
};

const fallbackIcon: LucideIcon = Package;

export function resolveIcon(name: string): LucideIcon {
  return registry[name] ?? fallbackIcon;
}
