export type Experiment = {
  id: string;
  name: string;
  summary: string;
  description: string;
  href: string;
  domain: string;
  image: string;
  accent: "violet" | "cyan" | "amber" | "emerald";
};

export const experiments: Experiment[] = [
  {
    id: "finlux",
    name: "Finlux",
    summary: "Premium personal finance dashboard concept with calm interactions.",
    description:
      "A luxury-styled fintech surface for budgets, subscriptions, transactions, and insights, designed with smooth motion and polished glassmorphism details.",
    href: "https://finlux.samatscale.com",
    domain: "finlux.samatscale.com",
    image: "/images/experiments/finlux.png",
    accent: "violet",
  },
  {
    id: "timeleft",
    name: "Time Left",
    summary: "A life-in-weeks reminder that makes urgency feel tangible.",
    description:
      "Helps you imagine that time is running out by visualizing remaining weeks, so long-term plans feel immediate and easier to prioritize.",
    href: "https://timeleft.samatscale.com/?birthYear=1996",
    domain: "timeleft.samatscale.com",
    image: "/images/experiments/timeleft.png",
    accent: "amber",
  },
  {
    id: "movie-swiper",
    name: "MovieSwiper",
    summary: "Group movie selection flow that removes decision friction.",
    description:
      "Create or join a room, swipe together, and settle on a winner quickly with a UI tuned for collaborative picks and fast session loops.",
    href: "https://movieswipe.samatscale.com",
    domain: "movieswipe.samatscale.com",
    image: "/images/experiments/movieswiper.png",
    accent: "cyan",
  },
  {
    id: "mac-client",
    name: "MacClient",
    summary: "Remote quick actions for your Mac from a clean launcher UI.",
    description:
      "A control surface to trigger common Mac actions remotely, optimized for speed, glanceability, and a distraction-free command layout.",
    href: "https://maccontrol.samatscale.com",
    domain: "maccontrol.samatscale.com",
    image: "/images/experiments/macclient.png",
    accent: "emerald",
  },
];
