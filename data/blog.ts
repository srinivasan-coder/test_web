import type { BlogPost } from "@/types";

const amara = {
  name: "Amara Osei",
  role: "Founder & Photographer",
  avatar: "/assets/blog/authors/amara.jpg",
};

const leon = {
  name: "Leon Hart",
  role: "Videographer",
  avatar: "/assets/blog/authors/leon.jpg",
};

const noor = {
  name: "Noor Rahman",
  role: "Editor",
  avatar: "/assets/blog/authors/noor.jpg",
};

export const blogPosts: BlogPost[] = [
  {
    id: "b-1",
    slug: "the-art-of-natural-light",
    title: "The Art of Natural Light",
    excerpt:
      "Why we chase the quiet hours — and how soft, directional light shapes a photograph's emotion.",
    content: `
## Reading the room

Light is the first decision we make on any shoot. Before posing, before lenses, before music — we look for where the light is kind.

Natural light does not demand attention. It invites it. Soft window light, open shade, the last twenty minutes before sunset — these are the hours when faces relax and rooms feel honest.

## Direction over intensity

We care less about how bright a space is, and more about **direction**. Side light sculpts. Back light separates. Overhead light, without diffusion, rarely flatters.

A few habits we return to:

- Face your subject toward the brightest clean source
- Use a wall or sheer curtain as a natural modifier
- Step back before you add artificial light

## Waiting is part of the craft

Sometimes the photograph is not ready yet. Clouds move. Guests settle. A child softens. We build time into every timeline for these small gifts — because the best natural light moments cannot be forced.

> The goal is not a brighter picture. The goal is a truer one.
`.trim(),
    category: "tips",
    cover: {
      src: "/assets/blog/the-art-of-natural-light.jpg",
      alt: "Soft natural light through a window",
      width: 1600,
      height: 1067,
    },
    author: amara,
    publishedAt: "2026-06-10",
    readingTime: 6,
    tags: ["lighting", "technique"],
    featured: true,
  },
  {
    id: "b-2",
    slug: "behind-the-scenes-paper-cities",
    title: "Behind the Scenes: Paper Cities",
    excerpt:
      "A look inside our Milan editorial — from mood board to final frame.",
    content: `
## The brief

*Paper Cities* began as a conversation about geometry — how architecture can hold a figure without overpowering it. We wanted clean lines, quiet color, and a sense of stillness.

## Planning

We built a mood board of concrete, linen, and late-afternoon shadow. Locations were scouted on foot the day before. Call sheets stayed short. The crew stayed small.

### What we packed

1. Two mirrorless bodies
2. A 35mm and 85mm prime
3. One portable LED for fill
4. A lean wardrobe rack in neutrals

## On the day

We shot for five hours across three locations. The best frames came when we stopped chasing variety and let one facade, one dress, and one gesture breathe.

The takeaway: editorial polish is rarely about more. It is about fewer decisions, made carefully.
`.trim(),
    category: "behind-the-scenes",
    cover: {
      src: "/assets/blog/behind-the-scenes-paper-cities.jpg",
      alt: "Editorial architecture photography",
      width: 1600,
      height: 1067,
    },
    author: leon,
    publishedAt: "2026-04-22",
    readingTime: 8,
    tags: ["editorial", "process"],
    featured: true,
  },
  {
    id: "b-3",
    slug: "our-everyday-camera-bag",
    title: "What's in Our Everyday Camera Bag",
    excerpt:
      "The lean, dependable kit we reach for on nine out of ten shoots.",
    content: `
## Less kit, more attention

Gear should get out of the way. Here is the minimal, reliable setup we carry — and why we have stopped chasing more.

### Core bodies

- **Canon EOS R5** — color we trust for skin
- **Sony A7IV** — silent ceremonies and events

### Lenses that earn their place

- 35mm f/1.4 for environment and movement
- 50mm f/1.2 for intimate portraits
- 85mm f/1.4 for compression and calm

### Small things that matter

Spare batteries. Lens cloths. A compact reflector. Gaffer tape. We would rather leave a second flash at the studio than leave patience at home.

If your bag is heavy, your feet get slow — and slow feet miss the quiet moments.
`.trim(),
    category: "gear",
    cover: {
      src: "/assets/blog/our-everyday-camera-bag.jpg",
      alt: "Camera gear laid out on a table",
      width: 1600,
      height: 1067,
    },
    author: amara,
    publishedAt: "2026-03-05",
    readingTime: 5,
    tags: ["gear", "kit"],
  },
  {
    id: "b-4",
    slug: "how-to-prepare-for-your-wedding-timeline",
    title: "How to Prepare for Your Wedding Timeline",
    excerpt:
      "A calm checklist for couples — so photography feels seamless from getting ready to the last dance.",
    content: `
## Start with feeling, not minutes

A good timeline protects emotion. It leaves room for hugs that run long and light that arrives late.

## Our recommended structure

1. **Getting ready** — 90 minutes with soft window light
2. **First look** (optional) — 20 unhurried minutes
3. **Ceremony buffer** — arrive 30 minutes early
4. **Family formals** — a short, prioritized list
5. **Golden hour portraits** — 30–45 minutes protected
6. **Reception** — coverage that stays discreet

## Tips that always help

- Share vendor contacts early
- Choose two portrait locations, not ten
- Build a 15-minute pad before sunset

We will help refine every block. Your job is to stay present — ours is to anticipate.
`.trim(),
    category: "tips",
    cover: {
      src: "/assets/blog/how-to-prepare-for-your-wedding-timeline.jpg",
      alt: "Wedding ceremony aisle with florals",
      width: 1600,
      height: 1067,
    },
    author: amara,
    publishedAt: "2026-05-18",
    readingTime: 7,
    tags: ["weddings", "planning"],
    featured: true,
  },
  {
    id: "b-5",
    slug: "color-that-ages-well",
    title: "Color That Ages Well",
    excerpt:
      "How we grade galleries for longevity — restrained tones, honest skin, no trend-chasing.",
    content: `
## Timeless over trendy

We grade for the album you will open in twenty years. That means restrained contrast, honest skin, and color that does not shout the year it was made.

## Our approach

- Preserve natural skin warmth
- Keep whites clean, not clinical
- Let shadows hold detail
- Avoid heavy teal-orange stylization

Noor's editing notes are simple: *if you notice the grade before the moment, we went too far.*

## Consistency across a gallery

A wedding gallery should feel like one continuous day. We match sequences carefully so ceremony, portraits, and reception share the same quiet language.
`.trim(),
    category: "inspiration",
    cover: {
      src: "/assets/blog/color-that-ages-well.jpg",
      alt: "Photographer reviewing images in soft light",
      width: 1600,
      height: 1067,
    },
    author: noor,
    publishedAt: "2026-02-14",
    readingTime: 6,
    tags: ["editing", "color"],
  },
  {
    id: "b-6",
    slug: "studio-notes-marina-boulevard",
    title: "Studio Notes from Marina Boulevard",
    excerpt:
      "A short welcome to our light-filled studio space — and how we use it for portraits and product.",
    content: `
## A quieter creative home

In 2024 we moved into our Marina Boulevard studio — north light, soft floors, and room for families and brands alike.

## What the space is for

- Newborn and family portraiture
- Executive headshots
- Product and still-life work
- Pre-production meetings

Clients often say it feels calm the moment they arrive. That is intentional. The room is part of the photograph.

If you would like to visit before booking, we are happy to host a short walkthrough.
`.trim(),
    category: "news",
    cover: {
      src: "/assets/blog/studio-notes-marina-boulevard.jpg",
      alt: "Bright modern studio interior",
      width: 1600,
      height: 1067,
    },
    author: amara,
    publishedAt: "2026-01-20",
    readingTime: 4,
    tags: ["studio", "news"],
  },
  {
    id: "b-7",
    slug: "filming-with-restraint",
    title: "Filming with Restraint",
    excerpt:
      "Why our wedding films favor longer holds, natural sound, and fewer cuts.",
    content: `
## Motion that breathes

We make films the way we make photographs — with patience. Longer holds. Natural sound. Fewer cuts. The goal is presence, not pace.

## What we listen for

Vow voices. Dinner laughter. A parent's quiet aside. These details carry more emotion than a soundtrack alone.

## A simple structure

1. A soft opening with place and light
2. Ceremony and vows, largely unbroken
3. A portrait interlude
4. Reception energy, still observational
5. A closing that returns to stillness

If a film feels hurried, it usually needed one more breath — not one more clip.
`.trim(),
    category: "behind-the-scenes",
    cover: {
      src: "/assets/blog/filming-with-restraint.jpg",
      alt: "Couple dancing at a wedding reception",
      width: 1600,
      height: 1067,
    },
    author: leon,
    publishedAt: "2025-12-08",
    readingTime: 5,
    tags: ["film", "weddings"],
  },
  {
    id: "b-8",
    slug: "five-frames-that-changed-how-we-see",
    title: "Five Frames That Changed How We See",
    excerpt:
      "A personal list of photographs — not ours — that still influence how we approach light and gesture.",
    content: `
## Looking outward

Every photographer carries a private museum. Here are five frames that continue to shape our eye — lessons in patience, gesture, and light.

## What they taught us

- **Gesture over pose** — a hand mid-motion says more than a perfect smile
- **Negative space** — emptiness can be the subject
- **Ordinary light** — overcast days can be luminous
- **Proximity** — step closer, then closer again
- **Ending early** — leave one frame unmade

Inspiration is not imitation. It is a reminder of what honesty looks like when someone else found it first.
`.trim(),
    category: "inspiration",
    cover: {
      src: "/assets/blog/five-frames-that-changed-how-we-see.jpg",
      alt: "Vintage camera and photographs on a desk",
      width: 1600,
      height: 1067,
    },
    author: amara,
    publishedAt: "2025-11-02",
    readingTime: 6,
    tags: ["inspiration", "craft"],
  },
  {
    id: "b-9",
    slug: "drone-coverage-when-it-helps",
    title: "Drone Coverage: When It Helps",
    excerpt:
      "Aerial frames are powerful — and easy to overuse. Here's when we recommend them.",
    content: `
## Elevation with intention

Drone coverage can reveal scale, setting, and a sense of place no ladder can match. It can also feel gimmicky when used without purpose.

## We recommend aerials when

- The venue sits in a landscape worth seeing
- Guests gather in a pattern that reads from above
- The couple wants a cinematic establishing sequence

## We skip them when

- Airspace is restricted
- Weather is unsafe
- The story is better told at eye level

Used well, a drone is just another way to describe where love unfolded — not a highlight reel trick.
`.trim(),
    category: "gear",
    cover: {
      src: "/assets/blog/drone-coverage-when-it-helps.jpg",
      alt: "Drone flying over a coastal landscape",
      width: 1600,
      height: 1067,
    },
    author: leon,
    publishedAt: "2025-10-12",
    readingTime: 4,
    tags: ["drone", "gear"],
  },
];

export const featuredPosts = blogPosts.filter((p) => p.featured);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
