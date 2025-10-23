/**
 * Portfolio Content Data
 * All content for portfolio website
 */

/**
 * Hero Section Content
 */
export const hero = {
  title: ["VISUAL", "ARTIST", "CREATIVE", "TECHNOLO", "GIST"],
  subtitle: ""
};

/**
 * Featured Projects Data
 */
export const projects = [
  {
    id: "immersive-installation",
    title: "Generative Worlds: The Perpetual Journey",
    client: "Danish Architecture Center",
    year: "2025",
    category: "Immersive Art Installation",
    role: "Artist",
    shortDescription: "Role: Artist",
    description: "The Challenge: To craft a meditative, endless visual experience that could transport the viewer. The goal was to build a world that breathes, evolving infinitely without repetition, blurring the line between a digital creation and a natural system.\n\nThe Approach: A proprietary generative model was trained to dream of the Danish landscape. The resulting algorithm produces a perpetual, hypnotic journey, creating an installation that is a living piece of digital nature.",
    video: "https://player.vimeo.com/video/1129570738?h=1768ffda44",
    images: {
      hero: "/images/AI and Hybrid campaigns_1.png",
      gallery: [
        "/images/AI and Hybrid campaigns_2.png",
        "/images/AI and Hybrid campaigns_3.avif"
      ]
    },
    technologies: ["Generative AI", "Custom Models", "Custom Workflow"],
    metrics: {
      label: "Installation Duration",
      value: "Endless Loop"
    }
  },
  {
    id: "spec-film-porsche",
    title: "AI Cinematography: A Vehicle with Soul",
    client: "Porsche",
    year: "2025",
    category: "AI Cinematography",
    role: "AI Artist / VFX Art Director",
    shortDescription: "Role: AI Artist / VFX Art Director",
    description: "The Challenge: To give a synthetic vehicle a tangible soul. The goal was to craft a dynamic, emotionally resonant sequence where the car remained perfectly consistent while moving through a vast, dreamlike world. This demanded absolute realism and a powerful cinematic language.\n\nThe Approach: As the AI Artist, I orchestrated a multi-tool workflow to achieve the required consistency and cinematic quality. By layering several generative techniques and applying a final temporal stabilization pass, I produced a seamless and dynamic sequence that pushes the boundaries of synthetic cinematography.",
    video: "https://player.vimeo.com/video/1129571713?h=9e784ab9f0",
    images: {
      hero: "/images/AI and Hybrid campaigns_5.jpeg",
      gallery: [
        "/images/AI and Hybrid campaigns_8.png",
        "/images/AI and Hybrid campaigns_9.jpg"
      ]
    },
    technologies: ["AI Cinematography", "Product Coherence", "Inpaint Workflows"],
    metrics: {
      label: "Shots Generated",
      value: "50+"
    }
  },
  {
    id: "tv-commercial-burger-king",
    title: "TV Commercial",
    client: "Burger King",
    year: "2025",
    category: "Commercial AI Production",
    role: "AI Artist / Creative Technologist",
    shortDescription: "Role: AI Artist / Creative Technologist",
    description: "The Challenge: To generate dynamic, hyperrealistic macro footage of food ingredients, a task traditionally requiring complex and expensive high-speed camera rigs.\n\nThe Approach: Architected a novel AI pipeline, training models to produce stunningly detailed macro shots with fluid camera motion, providing unparalleled creative freedom and production efficiency.",
    video: "https://player.vimeo.com/video/1129569198?h=4579aecc7f",
    images: {
      hero: "/images/AI and Hybrid campaigns_11.jpg",
      gallery: [
        "/images/AI and Hybrid campaigns_10.jpg",
        "/images/AI and Hybrid campaigns_4.avif"
      ]
    },
    technologies: ["Macro AI Generation", "Custom Pipelines", "High-Speed Simulation", "Food LoRA Training"],
    metrics: {
      label: "Production Time Saved",
      value: "70%"
    }
  },
  {
    id: "ai-hybrid-campaigns",
    title: "Numerous AI and Hybrid Campaigns",
    client: "Porsche, VW, Burger King, MAN and others",
    year: "2023-2025",
    category: "Multiple Campaigns",
    role: "AI Director / Creative Technologist",
    shortDescription: "Role: AI Director / Creative Technologist",
    description: "A collection of cutting-edge campaigns combining AI-generated content with traditional production methods, pushing the boundaries of what's possible in commercial visual storytelling.",
    images: {
      hero: "/images/AI and Hybrid campaigns_1.png",
      gallery: [
        "/images/AI and Hybrid campaigns_2.png",
        "/images/AI and Hybrid campaigns_3.avif",
        "/images/AI and Hybrid campaigns_4.avif",
        "/images/AI and Hybrid campaigns_5.jpeg",
        "/images/AI and Hybrid campaigns_8.png",
        "/images/AI and Hybrid campaigns_9.jpg",
        "/images/AI and Hybrid campaigns_10.jpg",
        "/images/AI and Hybrid campaigns_11.jpg"
      ]
    },
    technologies: ["AI Generation", "Art Direction", "Hybrid Workflows", "Inpainting", "Coherent product"],
    metrics: {
      label: "Campaigns Delivered",
      value: "15+"
    }
  }
];

/**
 * Experience / CV Data
 */
export const experience = {
  title: "Professional Journey",
  timeline: [
    {
      year: "Current",
      title: "Freelance Artist & Creative Technologist",
      company: "Independent",
      type: "Freelance",
      description: "Architecting bespoke AI workflows for advanced visual productions.",
      highlights: []
    },
    {
      year: "Feb 2023 - Present",
      title: "AI Artist & Creative Technologist",
      company: "Grabarz & Partner",
      type: "Full-time",
      description: "",
      highlights: []
    },
    {
      year: "Jun 2022 - Dec 2022",
      title: "Art Director",
      company: "M&C Saatchi",
      type: "Full-time",
      description: "",
      highlights: []
    },
    {
      year: "Dec 2020 - Feb 2022",
      title: "Motion Design & Art Direction",
      company: "da.de Agentur",
      type: "Full-time",
      description: "",
      highlights: []
    }
  ],
  craft: [
    {
      title: "Generative Concept & Creation",
      description: "From the initial spark of an idea to a fully realized synthetic world, I create the unseeable."
    },
    {
      title: "Cinematic Direction & Motion",
      description: "I direct the camera and choreograph movement to tell a compelling story and evoke emotion."
    },
    {
      title: "Visual Art Direction",
      description: "I establish the complete visual language of a project, from color and composition to mood and tone."
    },
    {
      title: "Seamless Integration & Photorealism",
      description: "Using advanced inpainting and temporal coherence, I ensure every element feels tangible and real."
    },
    {
      title: "High-Fidelity Finishing",
      description: "I employ cutting-edge upscaling techniques to polish every frame to a pristine, cinematic standard."
    }
  ],
  skills: [
    {
      category: "Technical Skills",
      items: [
        { name: "pipeline development", level: 90 },
        { name: "comfyui", level: 90 },
        { name: "model training", level: 90 },
        { name: "python", level: 70 },
        { name: "java", level: 50 },
        { name: "photoshop", level: 95 },
        { name: "after effects", level: 95 },
        { name: "unreal engine", level: 80 },
        { name: "touchdesigner", level: 70 }
      ]
    }
  ],
  education: [
    {
      degree: "Master of Arts in Digital Media",
      institution: "University of Applied Sciences, Berlin",
      year: "2015 - 2017",
      focus: "Computational Arts, Generative Design, Interactive Media",
      thesis: "Exploring Aesthetic Possibilities in Neural Style Transfer"
    },
    {
      degree: "Bachelor of Fine Arts",
      institution: "Hamburg Academy of Fine Arts",
      year: "2011 - 2015",
      focus: "Digital Arts, Film Production, Photography",
      honors: "Graduated with Distinction"
    }
  ]
};

/**
 * Awards & Recognition Data
 */
export const awards = {
  title: "Awards & Recognition",
  items: [
    {
      title: "Gerety Awards",
      category: "Silver, AI Artist",
      organization: "Gerety Awards",
      year: "2025",
      description: "The Ad No Man Saw",
      project: "The Ad No Man Saw"
    },
    {
      title: "ADC Annual Awards",
      category: "Merit",
      organization: "ADC",
      year: "2024",
      description: "At Second Glance",
      project: "At Second Glance"
    },
    {
      title: "Europe's Top Art Directors",
      category: "Ranking",
      organization: "ADC",
      year: "2024",
      description: "Ranked among Europe's Top Art Directors, ADC Annual Ranking 2024",
      project: ""
    }
  ]
};

/**
 * Contact Information
 */
export const contact = {
  availability: {
    status: "Available for select projects",
    startDate: null,
    preferredProjectTypes: [
      "Feature Films (VFX)",
      "High-end Commercials",
      "Art Installations",
      "Live Events",
      "R&D Collaborations"
    ]
  },
  location: {
    city: "Berlin",
    country: "Germany",
    timezone: "CET (UTC+1)",
    remoteWork: true,
    willingToTravel: true
  },
  email: "m.sheludiakova@gmail.com",
  socialMedia: {
    linkedin: "https://www.linkedin.com/in/mascha-sheludiakova/",
    instagram: "https://instagram.com/mascha.visuals",
    vimeo: "https://vimeo.com/mascha",
    twitter: "https://twitter.com/mascha_tech",
    github: "https://github.com/mascha-creative"
  },
  ratesInfo: "Day rates and project quotes available upon request"
};

/**
 * About Section (Long Form)
 */
export const about = {
  title: "About",
  description: "I am a Berlin-based creative technologist and visual artist pioneering the use of artificial intelligence in cinematic narrative.\n\nMy work merges deep technical R&D with a directorial eye for cinematography and composition, creating visuals that were previously impossible. I collaborate with agencies, production compannies, filmmakers and studios to architect and execute the future of visual expression.",
  
  passions: [
    "Innovation in Film VFX - Developing AI workflows that enhance rather than replace traditional craftsmanship",
    "Real-Time Visual Systems - Creating responsive, generative environments for live performance and installation",
    "Knowledge Sharing - Speaking at industry conferences and mentoring the next generation of creative technologists",
    "Technical Artistry - Finding the sweet spot where cutting-edge technology meets compelling visual storytelling"
  ],
  
  currentlyAvailableFor: [
    "Feature film VFX supervision and AI pipeline development",
    "High-end commercial visual effects and art direction",
    "Interactive installation design and technical production",
    "Research and development collaborations",
    "Speaking engagements and workshops"
  ]
};

/**
 * SEO & Meta Information
 */
export const seo = {
  title: "Mascha - AI Visual Director & Creative Technologist",
  description: "Berlin-based creative technologist specializing in AI-driven visual effects, cinematography, and immersive experiences for film production and live entertainment.",
  keywords: [
    "AI visual effects",
    "creative technologist",
    "AI cinematography",
    "ComfyUI artist",
    "VFX artist Berlin",
    "generative AI art",
    "real-time visuals",
    "AI art direction",
    "machine learning VFX",
    "computational creativity"
  ],
  ogImage: "/images/og-image.jpg",
  twitterCard: "summary_large_image"
};

/**
 * Export all content as a single object
 */
export const content = {
  hero,
  projects,
  experience,
  awards,
  contact,
  about,
  seo
};

/**
 * Default export
 */
export default content;