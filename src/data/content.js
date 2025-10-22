/**
 * Portfolio Content Data
 * All content for portfolio website
 */

/**
 * Hero Section Content
 */
export const hero = {
  title: ["VISUAL", "ARTIST", "CREATIVE", "TECHNOLO", "GIST"],
  subtitle: "Crafting the Future of Cinematic Storytelling."
};

/**
 * Featured Projects Data
 */
export const projects = [
  {
    id: "immersive-installation",
    title: "Immersive Installation",
    client: "Danish Architecture Center",
    year: "2025",
    category: "Immersive Art Installation",
    role: "Artist",
    shortDescription: "Role: Artist",
    description: "The Challenge: To create a non-repeating, photorealistic animated journey through a synthetic world, maintaining visual coherence and a meditative, dreamlike quality for an immersive installation.\n\nThe Approach: Trained a bespoke generative model on Danish landscapes to create an endless, algorithmically-driven animation, blurring the line between the real and the imagined.",
    video: "/videos/Immersive Installation.mp4",
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
    title: "AI Film",
    client: "Porsche",
    year: "2025",
    category: "AI Cinematography",
    role: "AI Artist / VFX Art Director",
    shortDescription: "Role: AI Artist / VFX Art Director",
    description: "The Challenge: To create a fully AI-generated car sequence with absolute photorealism and temporal consistency. The core difficulty was maintaining the vehicle's integrity and dynamic motion across a series of complex, generative shots.\n\nThe Approach: I engineered a proprietary workflow that layers generative AI for environments with advanced object inpainting and coherence models. This method ensures the vehicle remains perfectly consistent while allowing for dynamic, cinematic camera movement, delivering a final, polished sequence.",
    video: "/videos/Spec Film.mp4",
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
    video: "/videos/TV Commercial.mp4",
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
    year: "2023-2024",
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
      company: "G&P",
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
  description: "I am a Berlin-based director and visual artist pioneering the use of artificial intelligence in cinematic narrative.\n\nMy work merges deep technical R&D with a directorial eye for cinematography and composition, creating visuals that were previously impossible. I collaborate with filmmakers and studios to architect and execute the future of visual expression.",
  
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