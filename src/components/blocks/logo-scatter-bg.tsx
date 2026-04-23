import { cn } from "@/lib/utils";

type ScatterItem = {
  src: string;
  alt: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
  opacity?: number;
};

const scatterItems: ScatterItem[] = [
  { src: "/logos/atlassian.svg", alt: "Atlassian", top: "14%", left: "10%", size: 56, rotate: -18 },
  { src: "/logos/instawork.svg", alt: "Instawork", top: "20%", left: "82%", size: 62, rotate: 14 },
  {
    src: "/logos/greyorange.png",
    alt: "GreyOrange",
    top: "34%",
    left: "20%",
    size: 54,
    rotate: -10,
  },
  { src: "/logos/bizongo.svg", alt: "Bizongo", top: "40%", left: "74%", size: 58, rotate: 12 },
  {
    src: "/logos/iit-kanpur.png",
    alt: "IIT Kanpur",
    top: "52%",
    left: "12%",
    size: 64,
    rotate: -14,
  },
  { src: "/logos/atlassian.svg", alt: "Atlassian", top: "62%", left: "86%", size: 52, rotate: 16 },
  { src: "/logos/instawork.svg", alt: "Instawork", top: "70%", left: "28%", size: 56, rotate: -9 },
  { src: "/logos/bizongo.svg", alt: "Bizongo", top: "76%", left: "62%", size: 54, rotate: 8 },
];

export function LogoScatterBg({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {scatterItems.map((item, idx) => (
        <img
          key={`${item.alt}-${idx}`}
          src={item.src}
          alt=""
          className="absolute object-contain blur-[0.3px] select-none"
          style={{
            top: item.top,
            left: item.left,
            width: `${item.size}px`,
            opacity: item.opacity ?? 0.16,
            transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
            filter: "saturate(0.85)",
          }}
        />
      ))}
    </div>
  );
}
