import type { Review, Stat, VideoTestimonial } from "@/types";

export const reviews: Review[] = [
  {
    id: "r-1",
    author: "Shiva Rk",
    role: "Local Guide",
    rating: 5,
    quote:
      "We had an amazing experience with our photographer for both the pre-wedding shoot and our wedding. They made us feel comfortable and captured our moments beautifully with natural, candid shots. From Pre-wedding shoot to album delivery, it was seamless. We highly recommend their services to anyone looking to preserve their special moments perfectly and beautifully for a lifetime.",
    date: "2026-03-29",
    category: "pre-wedding",
    source: "google",
    serviceSlug: "pre-wedding",
    featured: true,
  },
  {
    id: "r-2",
    author: "Jai Ganesh",
    role: "Local Guide",
    rating: 5,
    quote: "They really did a very good job!",
    date: "2026-02-15",
    category: "wedding",
    source: "google",
    serviceSlug: "wedding",
  },
  {
    id: "r-3",
    author: "Gayathri Rajan",
    rating: 5,
    quote:
      "We had such a great experience with the team! The groom and I are not camera people at all and we hardly smile, but they somehow made us feel super comfortable. They guided us with poses and kept everything easy and natural. We were relaxed the whole time. The team worked so hard throughout the event — big thanks to them! Highly recommended!",
    date: "2026-02-15",
    category: "wedding",
    source: "google",
    serviceSlug: "wedding",
  },
  {
    id: "r-4",
    author: "Ajaykumar P",
    rating: 4,
    quote:
      "Thank you for capturing our special moments so perfectly. Your passion, dedication, and calm attitude made us feel very comfortable throughout. Every picture tells a story, and we'll cherish these memories forever. Amazing work and great commitment!",
    date: "2026-02-08",
    category: "wedding",
    source: "google",
    serviceSlug: "wedding",
  },
  {
    id: "r-5",
    author: "Mahdhoom Mohamed",
    rating: 5,
    quote:
      "We booked this team for our baby shower function, and I must say the entire crew is highly professional, friendly, calm, and very cooperative. From the beginning, we had only a minimal discussion, yet they clearly understood our theme, requirements, and expectations, including the complete photoshoot. Their approach was very smooth and stress-free, which really matters during special occasions. The quality of work and results speak for themselves — you can check their Instagram page to see how they continuously enhance their work. They stay updated with current trends and keep improving month by month and year by year, which truly elevates their photography. They offer very affordable pricing, are extremely approachable, and if you clearly explain your requirements, you'll definitely receive more than 100% satisfaction. You can blindly book them for any occasion like birthday parties, weddings, engagements, baby showers, housewarming functions, or any event that needs professional photography and photoshoots. Highly recommended! 👏📸",
    date: "2025-12-28",
    category: "maternity",
    source: "google",
    serviceSlug: "maternity",
    featured: true,
  },
  {
    id: "r-6",
    author: "LA Vijay",
    rating: 5,
    quote:
      "We chose Fotolites for our Wedding photography, and they delivered beyond expectations. The team covered all the events perfectly, with great creativity and professionalism. We are amazed by their work. From candid shots to traditional coverage, everything was done with perfection. The team was friendly, organized, and highly professional. The final output was stunning and a big thanks to Fotolites team for capturing our event so beautifully. We are extremely happy with the results. Highly recommend Fotolites. 😊❤️🤝",
    date: "2025-11-23",
    category: "wedding",
    source: "google",
    serviceSlug: "wedding",
    featured: true,
  },
  {
    id: "r-7",
    author: "Ambrishaa Narayanan",
    rating: 5,
    quote:
      "Had a great experience with Srinivas and team.. they had a great patience to tolerate all my requirements — be it the poses, the album, the long marriage rituals, delay in the rituals. The photos were more than perfect especially the solo and couple shots — not to forget the album — THE PERFECT ALBUM — quality of the sheets were at best and even there were texture variation in the album which suited our dresses and photos in the album — not to forget the video — the videos had exactly what is important and much needed — nothing more nothing less, you neither get bored nor feel less coverage. They are definitely value for money — each and every penny I have paid is worth it.",
    date: "2025-11-02",
    category: "wedding",
    source: "google",
    serviceSlug: "wedding",
  },
  {
    id: "r-8",
    author: "Minumithra Neethirajan",
    rating: 5,
    quote:
      "Had an amazing experience with Fotolites Studio for our engagement! 💍 They captured every moment beautifully, delivered top-quality photos on a budget, and were super professional throughout. Highly recommend them! 📸✨",
    date: "2025-10-26",
    category: "engagement",
    source: "google",
    serviceSlug: "engagement",
    featured: true,
  },
  {
    id: "r-9",
    author: "Sneha Saras",
    rating: 5,
    quote:
      "We're glad that we chose Fotolites studio for capturing each and every memory of our wedding — starting from the pre wedding outdoor shoot till the end of our big day. The members of the team are very friendly, patient and responsive. They paid heed to every small request of us and did their level best, the output turned out in ways we haven't expected. The prices quoted by them are comparatively lesser than other big photography studios but the results are strikingly better than those studios. The whole team was passionate in improvising themselves in every next shoot with new ideas and styles, they made us comfortable and not camera awkward. Hats off to their editing team for perfectly bringing each frame to life. Thank you Fotolites for capturing the best of all of us. Keep challenging and growing more in the future.",
    date: "2025-10-19",
    category: "wedding",
    source: "google",
    serviceSlug: "wedding",
    featured: true,
  },
  {
    id: "r-10",
    author: "Divya Raju",
    rating: 4,
    quote:
      "A big thanks to the Fotolites Studio team. Our joy and emotions were beautifully captured by them 🥰 I appreciate their patience and attention which made us feel so comfortable during the shoot. We got exactly what we wanted ✨",
    date: "2025-04-25",
    category: "wedding",
    source: "google",
    serviceSlug: "wedding",
  },
  {
    id: "r-11",
    author: "Revathi Baskar",
    rating: 5,
    quote:
      "Your work was awesome. Output comes very well. Thank you so much for your wonderful work.",
    date: "2025-04-01",
    category: "wedding",
    source: "google",
    serviceSlug: "wedding",
  },
  {
    id: "r-12",
    author: "Rajalakshmi",
    rating: 4,
    quote:
      "We are very much satisfied with your work on our engagement and wedding. Staff has been very friendly and did a great service. Album quality is excellent and everyone loved it!! Thank you ❤",
    date: "2023-08-09",
    category: "wedding",
    source: "google",
    serviceSlug: "wedding",
  },
  {
    id: "r-13",
    author: "Devi Sri S",
    rating: 5,
    quote:
      "It was a beautiful experience with Fotolites studio. We booked them for our baby shower and they delivered wonderful service. Photographer arrived very early to the event and captured our moments excellently. I should mention the album outcome — it was total worth it and incredible. All friends and family members praised the album editing, quality of album and final look. I love the overall experience with them ❤️",
    date: "2023-09-14",
    category: "maternity",
    source: "google",
    serviceSlug: "maternity",
  },
  {
    id: "r-14",
    author: "Pachai Yappan",
    rating: 4,
    quote:
      "The Fotolites studio team is a group of extremely sweet and co-operative people. All the moments were so beautifully captured. Overall good experience ☺️ — we were totally satisfied with Fotolites studio 👍🏻",
    date: "2022-06-18",
    category: "wedding",
    source: "google",
    serviceSlug: "wedding",
  },
  {
    id: "r-15",
    author: "Tarun Kumar",
    rating: 5,
    quote:
      "I took a baby shoot here.. the quality is very good. It's very professional and they think in all angles to capture the best... they improve their values day by day... hardworking young minds... keep rocking ya... 👏👏",
    date: "2020-11-25",
    category: "baby",
    source: "google",
    serviceSlug: "baby",
  },
];

export const featuredReviews = reviews.filter((r) => r.featured);

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "vt-1",
    title: "Ella & James — Wedding Film",
    client: "Ella Mercer",
    category: "wedding",
    poster: "/assets/video-testimonials/vt-1.jpg",
    duration: "2:14",
    quote: "It felt like reliving the day — only softer, and somehow more true.",
  },
  {
    id: "vt-2",
    title: "Waiting for You — Maternity Film",
    client: "Divya Krishnan",
    category: "maternity",
    poster: "/assets/video-testimonials/vt-2.jpg",
    duration: "1:48",
    quote: "A gentle little film of this season — we'll watch it again once the baby arrives.",
  },
  {
    id: "vt-3",
    title: "First Light — Baby Session",
    client: "Hannah Cole",
    category: "baby",
    poster: "/assets/video-testimonials/vt-3.jpg",
    duration: "1:12",
    quote: "A quiet film of the earliest days — we'll treasure it forever.",
  },
];

export const reviewStats: Stat[] = [
  {
    id: "rs-rating",
    value: 4.9,
    suffix: "★",
    decimals: 1,
    label: "Average Rating",
  },
  {
    id: "rs-reviews",
    value: 320,
    suffix: "+",
    label: "Client Reviews",
  },
  {
    id: "rs-recommend",
    value: 98,
    suffix: "%",
    label: "Would Recommend",
  },
  {
    id: "rs-repeat",
    value: 45,
    suffix: "%",
    label: "Return Clients",
  },
];
