/**
 * Portfolio Content Data
 * All placeholder content from CONTENT_STRUCTURE.md converted to JavaScript objects
 */

/**
 * Hero Section Content
 */
export const hero = {
  tagline: "MASCHA   Creative Technologist | Visual Artist with a feeling for style and deep expertise in cinematic language",
  title: ["Visual Artist", "Creative Technologist"],
  subtitle: "Crafting the Future of Cinematic Storytelling.",
};

/**
 * Featured Projects Data
 */
export const projects = [
  {
    id: "immersive-installation-dac",
    title: "Immersive Installation (DAC, 2025)",
    category: "Immersive Art Installation",
    year: "2025",
    client: "DAC (Danish Architecture Center)",
    role: "Artist",
    shortDescription: "Role: Artist",
    description: "The Challenge: To create a non-repeating, photorealistic animated journey through a synthetic world, maintaining visual coherence and a meditative, dreamlike quality for an immersive installation.\n\nThe Approach: Trained a bespoke generative model on Danish landscapes to create an endless, algorithmically-driven animation, blurring the line between the real and the imagined.",
    longDescription: "Created a groundbreaking immersive installation for the Danish Architecture Center that pushes the boundaries of AI-generated art. The project required developing a custom generative model trained specifically on Danish landscapes to produce an infinite, non-repeating visual journey. The installation maintains photorealistic quality while creating a meditative, dreamlike atmosphere that challenges viewers' perception of reality.",
    technologies: [
      "Custom AI Model Training",
      "Stable Diffusion",
      "ComfyUI",
      "Real-time Generation",
      "Danish Landscape Dataset",
      "Projection Mapping"
    ],
    images: {
      hero: "/images/AI and Hybrid campaigns_1.png",
      gallery: [
        "/images/AI and Hybrid campaigns_2.png",
        "/images/AI and Hybrid campaigns_3.avif",
        "/images/AI and Hybrid campaigns_4.avif"
      ]
    },
    video: "/videos/Immersive Installation.mp4",
    link: "#case-study-dac",
    featured: true,
    metrics: {
      duration: "Infinite loop",
      modelType: "Custom trained",
      exhibition: "DAC 2025"
    },
    recognition: "Exhibited at Danish Architecture Center 2025"
  },
  {
    id: "spec-film-porsche",
    title: "Spec Film (for Porsche)",
    category: "AI Cinematography",
    year: "2024",
    client: "Porsche (Spec Project)",
    role: "AI Director / VFX Art Director",
    shortDescription: "Role: AI Director / VFX Art Director",
    description: "The Challenge: To generate and seamlessly animation a photorealistic vehicle in fully AI-generated environments, ensuring temporal consistency, dynamic realism and cinematic quality across every shot.\n\nThe Approach: Developed a hybrid workflow combining generative backgrounds with advanced inpainting and temporal coherence techniques to produce a dynamic, fully synthetic cinematic sequence.",
    longDescription: "Developed an innovative AI-driven cinematographic approach for a Porsche spec film. The project required generating photorealistic vehicle animations within fully AI-created environments while maintaining temporal consistency and cinematic quality throughout. By combining generative backgrounds with advanced inpainting and temporal coherence techniques, created a seamless, dynamic visual experience that showcases the potential of AI in automotive advertising.",
    technologies: [
      "Stable Diffusion",
      "ControlNet",
      "Temporal Coherence AI",
      "Advanced Inpainting",
      "ComfyUI",
      "After Effects",
      "DaVinci Resolve"
    ],
    images: {
      hero: "/images/AI and Hybrid campaigns_5.jpeg",
      gallery: [
        "/images/AI and Hybrid campaigns_8.png",
        "/images/AI and Hybrid campaigns_9.jpg",
        "/images/AI and Hybrid campaigns_10.jpg"
      ]
    },
    video: "/videos/Spec Film.mp4",
    link: "#case-study-porsche",
    featured: true,
    metrics: {
      shots: "Multiple cinematic sequences",
      technique: "Hybrid AI workflow",
      quality: "Photorealistic"
    },
    recognition: "Porsche Spec Film 2024"
  },
  {
    id: "tv-commercial-burger-king",
    title: "TV Commercial (for Burger King)",
    category: "Commercial AI Production",
    year: "2024",
    client: "Burger King",
    role: "AI Director / Creative Technologist",
    shortDescription: "Role: AI Director / Creative Technologist",
    description: "The Challenge: To generate dynamic, hyperrealistic macro footage of food ingredients, a task traditionally requiring complex and expensive high-speed camera rigs.\n\nThe Approach: Architected a novel AI pipeline, training models to produce stunningly detailed macro shots with fluid camera motion, providing unparalleled creative freedom and production efficiency.",
    longDescription: "Revolutionized food commercial production by developing an AI pipeline that generates hyperrealistic macro footage without expensive high-speed camera equipment. The project involved training custom models to create stunning macro shots of food ingredients with dynamic camera movements. This novel approach provides unprecedented creative freedom while dramatically reducing production costs and time, setting a new standard for food advertising.",
    technologies: [
      "Custom AI Model Training",
      "Macro Photography AI",
      "Stable Diffusion",
      "High-Speed Camera Simulation",
      "ComfyUI",
      "After Effects"
    ],
    images: {
      hero: "/images/AI and Hybrid campaigns_11.jpg",
      gallery: [
        "/images/AI and Hybrid campaigns_1.png",
        "/images/AI and Hybrid campaigns_2.png",
        "/images/AI and Hybrid campaigns_3.avif"
      ]
    },
    video: "/videos/TV Commercial.mp4",
    link: "#case-study-burger-king",
    featured: true,
    metrics: {
      costSavings: "Significant vs traditional",
      quality: "Hyperrealistic macro",
      efficiency: "Rapid production"
    },
    recognition: "Burger King TV Commercial 2024"
  },
  {
    id: "ai-hybrid-campaigns",
    title: "Numerous AI and Hybrid Campaigns",
    category: "Commercial AI Production",
    year: "2022-2024",
    client: "Porsche, VW, Burger King, MAN and others",
    role: "AI Director / Creative Technologist",
    shortDescription: "Role: AI Director / Creative Technologist\nClients: Porsche; VW, Burger King, MAN and others",
    description: "Worked on numerous AI and hybrid campaigns for major brands including Porsche, VW, Burger King, MAN and others. Bringing cutting-edge AI technology to commercial production while maintaining the highest standards of creative quality and brand identity.",
    longDescription: "Led AI integration and creative technology across multiple high-profile campaigns for major automotive and food brands. Projects span from full AI-generated content to hybrid workflows that blend traditional production with AI enhancement. Clients include Porsche, Volkswagen, Burger King, MAN Trucks, and other leading brands. Each project demonstrates how AI can enhance creative possibilities while respecting brand guidelines and maintaining production excellence.",
    technologies: [
      "Stable Diffusion",
      "ComfyUI",
      "ControlNet",
      "After Effects",
      "DaVinci Resolve",
      "Custom AI Workflows",
      "Hybrid Production Pipelines"
    ],
    images: {
      hero: "/images/AI and Hybrid campaigns_4.avif",
      gallery: [
        "/images/AI and Hybrid campaigns_5.jpeg",
        "/images/AI and Hybrid campaigns_8.png",
        "/images/AI and Hybrid campaigns_9.jpg"
      ]
    },
    link: "#case-study-campaigns",
    featured: true,
    metrics: {
      clients: "Porsche, VW, Burger King, MAN, others",
      campaigns: "Numerous",
      years: "2022-2024"
    },
    recognition: "Multiple brand campaigns 2022-2024"
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
      category: "AI & Machine Learning",
      items: [
        { name: "ComfyUI", level: 95 },
        { name: "Stable Diffusion", level: 90 },
        { name: "Midjourney", level: 85 },
        { name: "Custom Model Training", level: 80 },
        { name: "Python (AI/ML)", level: 85 },
        { name: "TensorFlow/PyTorch", level: 75 }
      ]
    },
    {
      category: "VFX & Compositing",
      items: [
        { name: "Nuke", level: 90 },
        { name: "After Effects", level: 95 },
        { name: "DaVinci Resolve", level: 85 },
        { name: "Houdini", level: 70 },
        { name: "Mocha Pro", level: 80 }
      ]
    },
    {
      category: "Creative Technology",
      items: [
        { name: "TouchDesigner", level: 85 },
        { name: "Unreal Engine", level: 75 },
        { name: "Projection Mapping", level: 80 },
        { name: "Real-time Rendering", level: 85 }
      ]
    },
    {
      category: "Technical Skills",
      items: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 75 },
        { name: "GLSL Shaders", level: 70 },
        { name: "Git/Version Control", level: 85 },
        { name: "Pipeline Development", level: 80 }
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
      category: "Silver, AI Artist - The Ad No Man Saw",
      organization: "Gerety Awards",
      year: "2025",
      logo: "/images/gerety-logo.svg",
      description: "",
      project: "The Ad No Man Saw"
    },
    {
      title: "ADC Annual Awards",
      category: "Merit - At Second Glance",
      organization: "ADC",
      year: "2024",
      logo: "/images/adc-logo.svg",
      description: "",
      project: "At Second Glance"
    },
    {
      title: "Europe's Top Art Directors",
      category: "Ranked among Europe's Top Art Directors",
      organization: "ADC Annual Ranking",
      year: "2024",
      logo: "/images/adc-logo.svg",
      description: "ADC Annual Ranking 2024",
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
    startDate: "Q2 2025",
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
  email: "hello@mascha.art",
  socialMedia: {
    linkedin: "https://linkedin.com/in/mascha-artist",
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