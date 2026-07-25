import {
  Heart,
  User,
  Camera,
  Building2,
  Sparkles,
  Mountain,
  Wand2,
  Zap,
  Package,
  Plane,
  Users,
  Baby,
  Cake,
  Aperture,
  Award,
  Sun,
  type LucideIcon,
} from "lucide-react";

/**
 * Explicit icon registry — keeps Lucide tree-shakeable while allowing
 * data files to reference icons by string name.
 */
export const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  User,
  Camera,
  Building2,
  Sparkles,
  Mountain,
  Wand2,
  Zap,
  Package,
  Plane,
  Users,
  Baby,
  Cake,
  Aperture,
  Award,
  Sun,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Camera;
}
