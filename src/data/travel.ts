export type Country = {
  id: string;
  name: string;
  flag: string;
  represents: string;
  note: string;
  /** Approx coordinates for the SVG world map (Equirectangular: lon -180..180, lat -90..90). */
  lon: number;
  lat: number;
};

export const countries: Country[] = [
  {
    id: "cn",
    name: "China",
    flag: "🇨🇳",
    represents: "Scale + Innovation",
    note: "Cities that move at platform speed.",
    lon: 104,
    lat: 35,
  },
  {
    id: "nl",
    name: "Netherlands",
    flag: "🇳🇱",
    represents: "Design + Systems Thinking",
    note: "Where infrastructure becomes urban poetry.",
    lon: 5.3,
    lat: 52.1,
  },
  {
    id: "fr",
    name: "France",
    flag: "🇫🇷",
    represents: "Culture + Elegance",
    note: "Taste as a non-functional requirement.",
    lon: 2.2,
    lat: 46.2,
  },
  {
    id: "it",
    name: "Italy",
    flag: "🇮🇹",
    represents: "Craftsmanship",
    note: "Centuries of attention to detail.",
    lon: 12.5,
    lat: 41.9,
  },
  {
    id: "ch",
    name: "Switzerland",
    flag: "🇨🇭",
    represents: "Precision",
    note: "Trains, tolerances, and trust by default.",
    lon: 8.2,
    lat: 46.8,
  },
  {
    id: "hu",
    name: "Hungary",
    flag: "🇭🇺",
    represents: "History + Resilience",
    note: "Old stones, sharp minds.",
    lon: 19.5,
    lat: 47.2,
  },
  {
    id: "es",
    name: "Spain",
    flag: "🇪🇸",
    represents: "Energy + Lifestyle",
    note: "Late dinners, long ideas.",
    lon: -3.7,
    lat: 40.4,
  },
  {
    id: "pt",
    name: "Portugal",
    flag: "🇵🇹",
    represents: "Calm + Beauty",
    note: "Golden hour as a national export.",
    lon: -8.2,
    lat: 39.4,
  },
  {
    id: "th",
    name: "Thailand",
    flag: "🇹🇭",
    represents: "Warmth + Fun",
    note: "Where reset buttons live.",
    lon: 100.5,
    lat: 15.9,
  },
];
