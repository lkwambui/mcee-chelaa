export type ImageAsset = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
};

export const images = {
  heroPortrait: {
    src: "/images/Little-Mr-and-Miss-Nakuru-2026/photo7.jpeg",
    alt: "MC Chelaa hosting on stage during the Little Mr and Miss Nakuru 2026 pageant",
    width: 568,
    height: 852,
    caption: "Little Mr & Miss Nakuru 2026",
  },
  introPortrait: {
    src: "/images/mc-photos/03.jpeg",
    alt: "Portrait of MC Chelaa, spoken-word artist and event host",
    width: 1080,
    height: 1620,
  },
  aboutLead: {
    src: "/images/corporate-events/corporate-events4.jpeg",
    alt: "MC Chelaa speaking at a corporate event",
    width: 1600,
    height: 1066,
  },
  aboutSecondary: {
    src: "/images/studio-session/photo5.jpeg",
    alt: "MC Chelaa performing spoken word in a studio session",
    width: 1066,
    height: 1599,
  },
  mcService: {
    src: "/images/corporate-events/corporate-events1.jpeg",
    alt: "MC Chelaa hosting a live corporate event",
    width: 1600,
    height: 1066,
  },
  spokenWordService: {
    src: "/images/studio-session/photo9.jpeg",
    alt: "MC Chelaa performing spoken word on stage",
    width: 1066,
    height: 1599,
  },
  youthService: {
    src: "/images/Shujaaz-Nakuru-edition-2026/photo2.jpeg",
    alt: "MC Chelaa engaging a youth audience at Shujaaz Nakuru Edition 2026",
    width: 1200,
    height: 1599,
  },
  hostingService: {
    src: "/images/Amwik-event-Golden-Tulip-Hotel-Westlands-Nairobi-2026/photo6.jpeg",
    alt: "MC Chelaa hosting the AMWIK event at Golden Tulip Hotel in Nairobi",
    width: 1600,
    height: 1066,
  },
  speakingService: {
    src: "/images/media-appearance/media-appearance1.jpeg",
    alt: "MC Chelaa during a media appearance and public speaking engagement",
    width: 1600,
    height: 1066,
  },
  amwik: {
    src: "/images/Amwik-event-Golden-Tulip-Hotel-Westlands-Nairobi-2026/photo19.jpeg",
    alt: "MC Chelaa at the AMWIK event, Golden Tulip Hotel, Westlands Nairobi 2026",
    width: 1600,
    height: 1066,
  },
  littleMrMiss: {
    src: "/images/Little-Mr-and-Miss-Nakuru-2026/photo4.jpeg",
    alt: "MC Chelaa on stage at Little Mr and Miss Nakuru 2026",
    width: 1600,
    height: 1280,
  },
  shujaaz: {
    src: "/images/Shujaaz-Nakuru-edition-2026/photo2.jpeg",
    alt: "MC Chelaa at Shujaaz Nakuru Edition 2026",
    width: 1200,
    height: 1599,
  },
  eventStage: {
    src: "/images/events/event1.jpeg",
    alt: "MC Chelaa hosting a live event on stage",
    width: 2048,
    height: 1365,
  },
  awardsLead: {
    src: "/images/awards/awards1.jpeg",
    alt: "MC Chelaa at an awards recognition moment",
    width: 1600,
    height: 1066,
  },
  videoPoster: {
    src: "/images/studio-session/photo5.jpeg",
    alt: "MC Chelaa during a recorded spoken-word performance",
    width: 1066,
    height: 1599,
  },
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
