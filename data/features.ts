import type { Feature } from "@/types";

/**
 * Studio pillars — editorial, not generic SaaS feature cards.
 */
export const features: Feature[] = [
  {
    id: "feat-light",
    title: "Light, before anything else",
    description:
      "We wait for the quiet hour, the soft window, the honest shadow — so every frame feels lived-in, not staged.",
    icon: "Sun",
  },
  {
    id: "feat-presence",
    title: "Presence over performance",
    description:
      "Direction that disappears. A calm crew. Room for real glances — the ones you didn't know you made.",
    icon: "Heart",
  },
  {
    id: "feat-finish",
    title: "A finish that ages well",
    description:
      "Color graded with restraint. Galleries delivered with clarity. Images that still feel true years from now.",
    icon: "Aperture",
  },
];
