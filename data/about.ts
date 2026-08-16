import type { StudioPrinciple, StudioStory } from "@/types";

export const studioStory: StudioStory = {
  eyebrow: "Our story",
  title: "Every moment, told the way it felt",
  paragraphs: [
    "Every wedding is made of thousands of little moments — a nervous smile, a parent’s proud eyes, a quiet glance between two people, and laughter that fills the room.",
    "At Fotolites Studio, our photographers and filmmakers work quietly and thoughtfully, allowing genuine moments to unfold while creating photographs and films with a timeless visual language.",
    "Our team combines candid photography, refined portraiture, and cinematic filmmaking to create a visual story that feels genuine, beautiful, and unmistakably yours.",
    "Based in Chennai, we capture everything from beautifully intimate celebrations to grand South Indian and destination weddings — every story receives the same level of care, creativity, and attention to detail.",
  ],
  image: {
    src: "/assets/about/studio-story.jpg",
    alt: "Photographer working with natural window light in the studio",
    width: 1800,
    height: 1200,
  },
};

export const mission: StudioPrinciple = {
  id: "mission",
  title: "Mission",
  description:
    "To preserve the moments that matter most. We tell every wedding story with authenticity, artistry, and intention — capturing not just how your celebration looked, but how it felt, so the emotions and details stay vivid for generations to come.",
  icon: "Heart",
};

export const vision: StudioPrinciple = {
  id: "vision",
  title: "Vision",
  description:
    "To redefine wedding storytelling through timeless artistry — building a legacy where every frame feels intentional, every story feels personal, and every collection of memories grows more valuable with time.",
  icon: "Sparkles",
};
