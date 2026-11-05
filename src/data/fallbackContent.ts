import { images, type ImageAsset } from "@/config/imageConfig";
import type { PortfolioItem, SiteContent } from "@/services/content/types";

const portfolioItem = (
  id: string,
  title: string,
  category: PortfolioItem["category"],
  description: string,
  image: ImageAsset,
  year?: string,
  videoSrc?: string
): PortfolioItem => ({ id, title, category, description, image, year, videoSrc });

export const fallbackContent: SiteContent = {
  hero: {
    eyebrow: "MC · Spoken Word · Event Host",
    title: "More Than a Voice.",
    titleAccent: "An experience that moves people.",
    description:
      "A dynamic Master of Ceremonies, spoken-word artist and youth empowerment advocate creating memorable experiences through storytelling, performance and impactful conversations.",
    primaryCta: { label: "Book MC Chelaa", to: "/contact" },
    secondaryCta: { label: "Explore My Work", to: "/portfolio" },
    meta: ["Based in Nakuru, Kenya", "Corporate, private and community events"],
    image: images.heroPortrait,
  },
  intro: {
    eyebrow: "A creative practice rooted in story",
    heading: "Presence, poetry and purpose.",
    paragraphs: [
      "MC Chelaa is a media creative, poetess and event host who blends stage confidence with emotional intelligence. Her work moves between live hosting, spoken word and advocacy, always centred on connecting honestly with an audience.",
      "As founder of Walking Shadow Poetry Kenya, she champions storytelling as a tool for healing, empowerment, mental-health awareness and resilience.",
    ],
    quote: "Furaha Yako ni Choice Yako",
    image: images.introPortrait,
    signature: "Precious Owoko",
  },
  identities: {
    eyebrow: "What I do",
    heading: "One voice, many stages.",
    description:
      "From corporate programmes and celebrations to poetry stages and youth conversations, each engagement is approached with preparation, warmth and a clear sense of purpose.",
    items: [
      {
        icon: "mic",
        title: "Master of Ceremonies",
        description: "Premium stage presence, programme coordination and audience command.",
        to: "/services#master-of-ceremonies",
      },
      {
        icon: "pen",
        title: "Spoken Word & Poetry",
        description: "Emotion-led performances that bring language, memory and feeling together.",
        to: "/services#spoken-word",
      },
      {
        icon: "users",
        title: "Youth Empowerment",
        description: "Storytelling, mental-health awareness and conversations that empower young people.",
        to: "/services#youth-empowerment",
      },
      {
        icon: "radio",
        title: "Hosting & Presentations",
        description: "Warm, intelligent hosting for broadcast, live and digital platforms.",
        to: "/services#hosting",
      },
      {
        icon: "speaker",
        title: "Public Speaking",
        description: "Talks and engagements shaped around story, confidence and creative purpose.",
        to: "/services#public-speaking",
      },
    ],
  },
  services: {
    eyebrow: "Services",
    heading: "Work that meets the moment.",
    description:
      "Each service is shaped around the occasion, the audience and the story that needs to be told. The aim is always the same: an experience that feels considered, alive and memorable.",
    items: [
      {
        id: "master-of-ceremonies",
        icon: "mic",
        title: "Master of Ceremonies",
        summary: "Premium stage presence for events that need to flow beautifully.",
        description:
          "As an MC, MC Chelaa brings structure, warmth and poise to a programme. She works with organisers to understand the run of show, then holds the room with confident transitions, thoughtful engagement and a presence that feels both polished and human.",
        expectations: [
          "A prepared host who understands the programme and audience",
          "Confident stage presence and smooth transitions",
          "Warm, professional audience engagement",
        ],
        idealFor: ["Corporate events", "Weddings", "Graduations", "Celebrations"],
        image: images.mcService,
      },
      {
        id: "spoken-word",
        icon: "pen",
        title: "Spoken Word & Poetry",
        summary: "Performance that turns language into a shared experience.",
        description:
          "Her spoken-word work is emotion-driven and deeply present. Performances can be shaped for summits, faith-based gatherings, creative showcases and intimate sessions, bringing poetry into the room as a living, breathing thing.",
        expectations: [
          "Original, emotion-led performance",
          "Material considered for the occasion",
          "Poetry that creates a genuine connection with the audience",
        ],
        idealFor: ["Summits", "Faith-based events", "Creative showcases", "Intimate sessions"],
        image: images.spokenWordService,
      },
      {
        id: "youth-empowerment",
        icon: "users",
        title: "Youth Empowerment",
        summary: "Storytelling that encourages resilience, confidence and possibility.",
        description:
          "Through storytelling, poetry and open conversation, MC Chelaa creates spaces where young people can be seen and heard. Her advocacy work centres on mental-health awareness, resilience and the power of owning your own narrative.",
        expectations: [
          "Conversations grounded in empathy and respect",
          "Storytelling that meets young audiences where they are",
          "A focus on confidence, resilience and mental-health awareness",
        ],
        idealFor: ["Schools and universities", "Youth programmes", "Community initiatives", "Awareness campaigns"],
        image: images.youthService,
      },
      {
        id: "hosting",
        icon: "radio",
        title: "Hosting & Presentations",
        summary: "A natural host for live, broadcast and digital spaces.",
        description:
          "With experience across media, acting and live events, MC Chelaa brings an easy confidence to hosting. She can guide a conversation, hold a broadcast segment or present a live programme with clarity, energy and intelligence.",
        expectations: [
          "Clear, engaging presentation",
          "Comfort across live and recorded formats",
          "A host who listens as well as speaks",
        ],
        idealFor: ["TV and radio segments", "Live streams", "Panel conversations", "Brand events"],
        image: images.hostingService,
      },
      {
        id: "public-speaking",
        icon: "speaker",
        title: "Public Speaking & Engagements",
        summary: "Talks shaped by lived experience and creative purpose.",
        description:
          "MC Chelaa speaks on creativity, storytelling, youth empowerment and the work of building a meaningful creative practice. Each engagement is approached with honesty, warmth and a focus on what will genuinely resonate with the room.",
        expectations: [
          "A talk shaped around your theme and audience",
          "Honest, grounded storytelling",
          "Practical encouragement for creatives and young leaders",
        ],
        idealFor: ["Conferences", "Panel discussions", "Creative workshops", "Mentorship sessions"],
        image: images.speakingService,
      },
    ],
  },
  featuredExperiences: {
    eyebrow: "Featured experiences",
    heading: "Recent stages.",
    description:
      "A selection of recent events and appearances. Each one reflects a different room, a different audience and the same commitment to holding the moment well.",
    items: [
      {
        slug: "amwik-event-2026",
        title: "AMWIK Event",
        location: "Golden Tulip Hotel, Westlands Nairobi",
        year: "2026",
        description:
          "A high-profile women-in-media event hosted with polished stage transitions, warm audience command and premium brand presence.",
        image: images.amwik,
      },
      {
        slug: "little-mr-miss-nakuru-2026",
        title: "Little Mr & Miss Nakuru 2026",
        location: "Nakuru",
        year: "2026",
        description:
          "A vibrant family-centred pageant featuring energetic hosting, seamless stage coordination and memorable candidate moments.",
        image: images.littleMrMiss,
      },
      {
        slug: "shujaaz-nakuru-edition-2026",
        title: "Shujaaz Nakuru Edition 2026",
        location: "Nakuru",
        year: "2026",
        description:
          "A youth-driven edition delivered with dynamic pacing, confident crowd interaction and impactful storytelling throughout the event.",
        image: images.shujaaz,
      },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    heading: "Moments in motion.",
    description:
      "A living archive of hosted events, celebrations, spoken-word performances, media appearances and community work.",
    categories: [
      "Corporate",
      "Weddings & Celebrations",
      "Conferences",
      "Spoken Word",
      "Community & Youth",
      "Media",
    ],
    items: [
      portfolioItem(
        "corporate-01",
        "Corporate programme hosting",
        "Corporate",
        "Holding the room with clarity and warmth during a corporate event.",
        {
          src: "/images/corporate-events/corporate-events1.jpeg",
          alt: "MC Chelaa hosting a corporate event",
        },
        "2026"
      ),
      portfolioItem(
        "corporate-02",
        "Brand event stage",
        "Corporate",
        "A polished stage moment from a brand event.",
        {
          src: "/images/corporate-events/corporate-events2.jpeg",
          alt: "MC Chelaa on stage at a brand event",
        }
      ),
      portfolioItem(
        "corporate-03",
        "Company celebration",
        "Corporate",
        "Hosting a company celebration with energy and ease.",
        {
          src: "/images/corporate-events/corporate-events5.jpeg",
          alt: "MC Chelaa hosting a company celebration",
        }
      ),
      portfolioItem(
        "corporate-04",
        "Corporate audience engagement",
        "Corporate",
        "Keeping the audience connected throughout the programme.",
        {
          src: "/images/corporate-events/corporate-events7.jpeg",
          alt: "MC Chelaa engaging a corporate audience",
        }
      ),
      portfolioItem(
        "conference-01",
        "AMWIK Event",
        "Conferences",
        "Hosting a women-in-media event at Golden Tulip Hotel, Westlands Nairobi.",
        images.amwik,
        "2026"
      ),
      portfolioItem(
        "conference-02",
        "AMWIK programme moment",
        "Conferences",
        "A stage moment from the AMWIK event programme.",
        {
          src: "/images/Amwik-event-Golden-Tulip-Hotel-Westlands-Nairobi-2026/photo4.jpeg",
          alt: "MC Chelaa during the AMWIK event programme",
        },
        "2026"
      ),
      portfolioItem(
        "conference-03",
        "Media conference",
        "Conferences",
        "Contributing to a media-focused conference conversation.",
        {
          src: "/images/Amwik-event-Golden-Tulip-Hotel-Westlands-Nairobi-2026/photo12.jpeg",
          alt: "MC Chelaa at a media conference",
        }
      ),
      portfolioItem(
        "conference-04",
        "Panel and presentation",
        "Conferences",
        "A presentation moment within a conference programme.",
        {
          src: "/images/Amwik-event-Golden-Tulip-Hotel-Westlands-Nairobi-2026/photo15.jpeg",
          alt: "MC Chelaa presenting at a conference",
        }
      ),
      portfolioItem(
        "wedding-01",
        "Wedding celebration",
        "Weddings & Celebrations",
        "Hosting a wedding celebration with elegance and warmth.",
        {
          src: "/images/wedding/wedding1.jpeg",
          alt: "MC Chelaa hosting a wedding celebration",
        }
      ),
      portfolioItem(
        "wedding-02",
        "Wedding reception",
        "Weddings & Celebrations",
        "Keeping the reception flowing beautifully.",
        {
          src: "/images/wedding/wedding3.jpeg",
          alt: "MC Chelaa at a wedding reception",
        }
      ),
      portfolioItem(
        "wedding-03",
        "A joyful celebration",
        "Weddings & Celebrations",
        "A celebratory moment from a wedding programme.",
        {
          src: "/images/wedding/wedding6.jpeg",
          alt: "MC Chelaa during a wedding celebration",
        }
      ),
      portfolioItem(
        "wedding-04",
        "The room together",
        "Weddings & Celebrations",
        "Bringing guests into the moment at a wedding celebration.",
        {
          src: "/images/wedding/wedding9.jpeg",
          alt: "MC Chelaa with guests at a wedding celebration",
        }
      ),
      portfolioItem(
        "baby-shower-01",
        "Baby shower celebration",
        "Weddings & Celebrations",
        "Hosting a warm, joyful baby shower.",
        {
          src: "/images/baby-shower/baby-shower1.jpeg",
          alt: "MC Chelaa hosting a baby shower celebration",
        }
      ),
      portfolioItem(
        "spoken-01",
        "Spoken word performance",
        "Spoken Word",
        "A performance shaped by language, memory and feeling.",
        {
          src: "/images/studio-session/photo5.jpeg",
          alt: "MC Chelaa performing spoken word",
        }
      ),
      portfolioItem(
        "spoken-02",
        "Poetry in the room",
        "Spoken Word",
        "A live poetry moment with an attentive audience.",
        {
          src: "/images/studio-session/photo9.jpeg",
          alt: "MC Chelaa performing poetry live",
        }
      ),
      portfolioItem(
        "spoken-03",
        "Studio session",
        "Spoken Word",
        "A recorded spoken-word session.",
        {
          src: "/images/studio-session/photo12.jpeg",
          alt: "MC Chelaa in a spoken-word studio session",
        }
      ),
      portfolioItem(
        "spoken-04",
        "Creative expression",
        "Spoken Word",
        "A portrait moment from a creative performance session.",
        {
          src: "/images/mc-photos/03.jpeg",
          alt: "Portrait of MC Chelaa during a creative session",
        }
      ),
      portfolioItem(
        "youth-01",
        "Shujaaz Nakuru Edition 2026",
        "Community & Youth",
        "A youth-driven edition delivered with dynamic pacing and confident crowd interaction.",
        images.shujaaz,
        "2026"
      ),
      portfolioItem(
        "youth-02",
        "Youth audience engagement",
        "Community & Youth",
        "Keeping a young audience connected and involved.",
        {
          src: "/images/Shujaaz-Nakuru-edition-2026/photo4.jpeg",
          alt: "MC Chelaa engaging a youth audience at Shujaaz Nakuru Edition 2026",
        },
        "2026"
      ),
      portfolioItem(
        "youth-03",
        "Little Mr & Miss Nakuru",
        "Community & Youth",
        "A family-centred pageant with energetic hosting and stage coordination.",
        images.littleMrMiss,
        "2026"
      ),
      portfolioItem(
        "youth-04",
        "Community pageant moment",
        "Community & Youth",
        "A candid moment from Little Mr and Miss Nakuru 2026.",
        {
          src: "/images/Little-Mr-and-Miss-Nakuru-2026/photo2.jpeg",
          alt: "MC Chelaa at Little Mr and Miss Nakuru 2026",
        },
        "2026"
      ),
      portfolioItem(
        "graduation-01",
        "Graduation ceremony",
        "Community & Youth",
        "Hosting a graduation ceremony with warmth and occasion.",
        {
          src: "/images/graduation/graduation1.jpeg",
          alt: "MC Chelaa hosting a graduation ceremony",
        }
      ),
      portfolioItem(
        "graduation-03",
        "A milestone celebrated",
        "Community & Youth",
        "A celebratory graduation programme moment.",
        {
          src: "/images/graduation/graduation3.jpeg",
          alt: "MC Chelaa at a graduation celebration",
        }
      ),
      portfolioItem(
        "media-01",
        "Media appearance",
        "Media",
        "A media appearance and conversation.",
        {
          src: "/images/media-appearance/media-appearance1.jpeg",
          alt: "MC Chelaa during a media appearance",
        }
      ),
      portfolioItem(
        "media-02",
        "On-air conversation",
        "Media",
        "A broadcast conversation about creativity and storytelling.",
        {
          src: "/images/media-appearance/media-appearance3.jpeg",
          alt: "MC Chelaa in an on-air media conversation",
        }
      ),
      portfolioItem(
        "awards-01",
        "Awards recognition",
        "Media",
        "An awards recognition moment.",
        images.awardsLead,
        "2025"
      ),
      portfolioItem(
        "awards-02",
        "Recognition night",
        "Media",
        "A moment from an awards recognition evening.",
        {
          src: "/images/awards/awards3.jpeg",
          alt: "MC Chelaa at an awards recognition evening",
        },
        "2025"
      ),
    ],
  },
  media: {
    eyebrow: "Media",
    heading: "Watch the work.",
    description:
      "Performance clips, event highlights and conversations that offer a closer look at the practice.",
    featured: {
      id: "voices-of-artists",
      title: "Voices of Artists Podcast",
      description:
        "A reflective conversation where MC Chelaa shares her creative journey, purpose-driven storytelling and media impact.",
      type: "video",
      src: "/videos/voices-of-artists.mp4",
      poster: {
        src: "/images/studio-session/photo5.jpeg",
        alt: "MC Chelaa during the Voices of Artists podcast recording",
      },
    },
    items: [
      {
        id: "awards-moment",
        title: "Awards Moment",
        description:
          "A highlight from an award-stage recognition, capturing poise, gratitude and a growing creative influence.",
        type: "video",
        src: "/videos/awards.mp4",
        poster: {
          src: "/images/awards/awards1.jpeg",
          alt: "MC Chelaa at an awards moment",
        },
      },
      {
        id: "mama-glow",
        title: "Mama Glow Event",
        description:
          "A live event hosting clip showing warm crowd connection, smooth stage transitions and audience engagement.",
        type: "video",
        src: "/videos/mama-glow-event.mp4",
        poster: {
          src: "/images/events/event1.jpeg",
          alt: "MC Chelaa hosting the Mama Glow event",
        },
      },
    ],
    appearances: [
      {
        id: "appearance-1",
        title: "Media conversation",
        image: {
          src: "/images/media-appearance/media-appearance1.jpeg",
          alt: "MC Chelaa during a media conversation",
        },
      },
      {
        id: "appearance-2",
        title: "Studio appearance",
        image: {
          src: "/images/media-appearance/media-appearance2.jpeg",
          alt: "MC Chelaa during a studio appearance",
        },
      },
      {
        id: "appearance-3",
        title: "On-air feature",
        image: {
          src: "/images/media-appearance/media-appearance3.jpeg",
          alt: "MC Chelaa in an on-air feature",
        },
      },
      {
        id: "appearance-4",
        title: "Broadcast moment",
        image: {
          src: "/images/media-appearance/media-appearance4.jpeg",
          alt: "MC Chelaa in a broadcast moment",
        },
      },
      {
        id: "appearance-5",
        title: "Interview setting",
        image: {
          src: "/images/media-appearance/media-appearance5.jpeg",
          alt: "MC Chelaa in an interview setting",
        },
      },
      {
        id: "appearance-6",
        title: "Media engagement",
        image: {
          src: "/images/media-appearance/media-appearance6.jpeg",
          alt: "MC Chelaa at a media engagement",
        },
      },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    heading: "Words from the room.",
    items: [
      {
        quote:
          "MC Chelaa brought an elegant energy to our gala and held every room transition with confidence and class.",
        author: "Corporate Events Lead",
        context: "Nakuru",
      },
      {
        quote:
          "Her spoken word performance was powerful and deeply moving. Our audience still talks about it months later.",
        author: "Creative Director",
        context: "Faith & Arts Summit",
      },
      {
        quote:
          "Professional, prepared, and emotionally intelligent on stage — exactly what premium events need.",
        author: "Wedding Planner",
        context: "Rift Valley",
      },
    ],
  },
  achievements: {
    eyebrow: "Recognition",
    heading: "Milestones along the way.",
    description:
      "A record of recognition across content creation, hosting, the arts and leadership.",
    items: [
      {
        title: "Content Creator of the Year",
        organisation: "Valuable Brands South Rift Awards",
        year: "2025",
        result: "2nd Runner-Up",
        description:
          "A milestone honouring consistent storytelling, audience connection and visible creative impact.",
        featured: true,
      },
      {
        title: "MC of the Year Recognition Award",
        organisation: "FEMA Awards",
        year: "2025",
        result: "Recognition Award",
        description:
          "Celebrated for refined stage presence, audience command and memorable event delivery.",
      },
      {
        title: "Content Creator of the Year",
        organisation: "AMWIK",
        year: "Recent",
        result: "2nd Runner-Up",
        description:
          "Recognised for compelling digital storytelling and consistent content performance.",
      },
      {
        title: "Arts, Culture & Entertainment",
        organisation: "Zuri Awards",
        year: "2024",
        result: "Nominee",
        description:
          "Shortlisted among emerging voices shaping arts, culture and entertainment.",
      },
      {
        title: "Most Promising Founder (Under 30)",
        organisation: "SHE Awards East Africa",
        year: "Recent",
        result: "Nominee",
        description:
          "Highlighted for leadership, innovation and youth-centred creative influence.",
      },
      {
        title: "Miss Laikipia University",
        organisation: "Laikipia University",
        year: "2019–2020",
        result: "Title Holder",
        description:
          "An early recognition that strengthened confidence, poise and public presence.",
      },
    ],
  },
  about: {
    eyebrow: "About MC Chelaa",
    heading: "A storyteller shaped by stage and purpose.",
    intro:
      "Precious Owoko, known as MC Chelaa, is a media creative, poetess and event host working across live stages, broadcast and community spaces.",
    paragraphs: [
      "As the founder of Walking Shadow Poetry Kenya, MC Chelaa is a rising leader in Kenya's creative and media space, uniquely blending art, leadership and social impact. She champions storytelling as a tool for healing, empowerment, mental-health awareness and resilience.",
      "Her voice moves between elegance and emotional depth — from intimate spoken-word sessions to high-level corporate stages. With experience in broadcasting, acting, poetry and community engagement, she continues to influence and inspire through authentic storytelling, faith-driven purpose and creative expression.",
      "She mentors young creatives and advocates for youth empowerment through media, artistry and intentional visibility.",
    ],
    image: images.aboutLead,
    secondaryImage: images.aboutSecondary,
    values: [
      {
        title: "Storytelling as healing",
        description:
          "Believing that honest stories can help people feel seen, understood and less alone.",
      },
      {
        title: "Presence with purpose",
        description:
          "Bringing preparation, warmth and intention to every stage and every room.",
      },
      {
        title: "Youth and mental health",
        description:
          "Creating conversations that support resilience, confidence and emotional awareness.",
      },
      {
        title: "Creative excellence",
        description:
          "Treating every performance, host role and collaboration as a craft worth doing well.",
      },
    ],
    journey: [
      {
        year: "2019–2020",
        title: "Miss Laikipia University",
        description: "An early recognition that strengthened confidence, poise and public presence.",
      },
      {
        year: "2024",
        title: "Zuri Awards nominee",
        description: "Shortlisted in Arts, Culture & Entertainment among emerging voices.",
      },
      {
        year: "2025",
        title: "Content Creator of the Year — 2nd Runner-Up",
        description: "Recognised at the Valuable Brands South Rift Awards.",
      },
      {
        year: "2025",
        title: "MC of the Year Recognition Award",
        description: "Honoured at the FEMA Awards for stage presence and event delivery.",
      },
      {
        year: "2026",
        title: "Featured hosting engagements",
        description:
          "AMWIK Event, Shujaaz Nakuru Edition and Little Mr & Miss Nakuru 2026.",
      },
    ],
    quote:
      "Storytelling is not just what I do on stage. It is how I make sense of the world and invite other people to do the same.",
  },
  contact: {
    eyebrow: "Contact & booking",
    heading: "Let's create something memorable.",
    description:
      "Share a few details about your event, the audience and what you have in mind. The more context you can give, the easier it is to shape a considered response.",
    bookingNote:
      "This form currently prepares an email to MC Chelaa. No booking is submitted until you send that email.",
    eventTypes: [
      "Corporate event",
      "Wedding or celebration",
      "Conference",
      "Graduation",
      "Spoken-word performance",
      "Youth or community event",
      "Media appearance",
      "Other",
    ],
  },
  social: {
    eyebrow: "Follow the work",
    heading: "Stay close to the story.",
    description:
      "New stages, performances, conversations and behind-the-scenes moments are shared across social media.",
  },
  bookingCta: {
    eyebrow: "Bookings",
    heading: "Bring a considered presence to your next event.",
    description:
      "For corporate programmes, celebrations, poetry stages and conversations that matter, start with a note about what you are planning.",
    cta: { label: "Start a booking enquiry", to: "/contact" },
  },
  footer: {
    introduction:
      "Master of Ceremonies, spoken-word artist and youth empowerment advocate based in Nakuru, Kenya.",
    services: [
      "Master of Ceremonies",
      "Spoken Word & Poetry",
      "Youth Empowerment",
      "Hosting & Presentations",
      "Public Speaking",
    ],
  },
  notFound: {
    eyebrow: "404",
    heading: "This page has left the stage.",
    description:
      "The page you are looking for may have moved or no longer exists. Return home or explore the work instead.",
    cta: { label: "Back to home", to: "/" },
  },
};
