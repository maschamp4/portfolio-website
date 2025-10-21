# Content Update Guide

Complete guide to replacing placeholder content with your real portfolio content.

---

## Table of Contents

1. [Overview](#overview)
2. [Content Files](#content-files)
3. [Updating Projects](#updating-projects)
4. [Updating Experience & CV](#updating-experience--cv)
5. [Updating Awards](#updating-awards)
6. [Updating Hero Section](#updating-hero-section)
7. [Updating About Section](#updating-about-section)
8. [Updating Contact Information](#updating-contact-information)
9. [Managing Images & Videos](#managing-images--videos)
10. [Best Practices](#best-practices)
11. [Testing Your Changes](#testing-your-changes)

---

## Overview

All portfolio content is centralized in one file for easy updates:

**📍 Main Content File:** [`src/data/content.js`](src/data/content.js:1)

This file contains all text, project data, experience, awards, and contact information. Simply edit this file to update your entire website!

### Why This Approach?

- ✅ **Single source of truth** - Update once, changes everywhere
- ✅ **No HTML editing** - Work with clean JavaScript objects
- ✅ **Version control friendly** - Easy to track changes
- ✅ **Modular structure** - Organized by section
- ✅ **Type safety** - Clear data structure to follow

---

## Content Files

### Primary Content File

| File | Purpose | What to Update |
|------|---------|----------------|
| [`src/data/content.js`](src/data/content.js:1) | All website content | Everything! Projects, experience, awards, bio, contact |

### HTML File (Minimal Changes)

| File | Purpose | What to Update |
|------|---------|----------------|
| [`index.html`](index.html:1) | Page structure & SEO | Meta tags, page title (optional) |

### Media Assets

| Directory | Purpose | What to Add |
|-----------|---------|-------------|
| [`public/images/projects/`](public/images/projects/) | Project images | Hero images, gallery images |
| [`public/images/awards/`](public/images/awards/) | Award logos | Organization logos (SVG preferred) |
| [`public/images/profile/`](public/images/profile/) | About/profile photos | Your profile photo |
| [`public/videos/projects/`](public/videos/projects/) | Project videos | Demo reels, case study videos |

---

## Updating Projects

Projects are the centerpiece of your portfolio. Each project should showcase your best work.

### Location

Edit the `projects` array in [`src/data/content.js`](src/data/content.js:18)

### Project Structure

```javascript
{
  id: "unique-project-id",           // Unique identifier (lowercase-with-dashes)
  title: "Project Name",             // Display title
  category: "Project Category",      // e.g., "AI Cinematography", "VFX"
  year: "2024",                      // Year completed
  client: "Client Name",             // Client or company
  role: "Your Role",                 // Your role on the project
  description: "Short description",  // 1-2 sentences (shown in grid)
  longDescription: "Detailed...",    // 3-4 paragraphs (for case studies)
  technologies: ["Tool1", "Tool2"],  // Array of tools/technologies used
  images: {
    hero: "/images/projects/...",    // Main project image
    gallery: [...]                   // Array of additional images
  },
  video: "/videos/projects/...",     // Optional: demo reel path
  link: "#case-study-id",            // Link to case study or external URL
  featured: true,                    // Show on homepage
  metrics: {                         // Optional: project metrics
    key: "value"
  },
  recognition: "Award or note"       // Optional: special recognition
}
```

### Step-by-Step: Update a Project

1. **Open** [`src/data/content.js`](src/data/content.js:1)

2. **Find** the project you want to update (e.g., "Nexus Protocol")

3. **Replace** placeholder text with your real content:

```javascript
{
  id: "my-real-project",
  title: "My Actual Project Name",
  category: "AI-Enhanced VFX",
  year: "2024",
  client: "Real Client Name",
  role: "Lead VFX Artist & Technical Director",
  
  description: "Replace this with your concise 1-2 sentence project summary that will appear in the project grid. Make it compelling!",
  
  longDescription: "Replace with full project description. Tell the story: What was the challenge? What was your approach? What tools did you use? What was the outcome? Include specific details that demonstrate your expertise. This appears in case study modals or detail pages.",
  
  technologies: [
    "ComfyUI",
    "After Effects", 
    "Python",
    "DaVinci Resolve"
    // Add your actual tools
  ],
  
  images: {
    hero: "/images/projects/my-project-hero.jpg",
    gallery: [
      "/images/projects/my-project-01.jpg",
      "/images/projects/my-project-02.jpg",
      "/images/projects/my-project-03.jpg"
    ]
  },
  
  video: "/videos/projects/my-project-reel.mp4",
  link: "https://vimeo.com/your-video-id", // Or internal link
  featured: true,
  
  metrics: {
    duration: "8 weeks",
    shots: "120+",
    team: "4 artists"
  },
  
  recognition: "Featured at SIGGRAPH 2024"
}
```

4. **Add** your project images to [`public/images/projects/`](public/images/projects/)

5. **Save** and test with `npm run dev`

### Adding New Projects

To add more than 5 projects:

```javascript
export const projects = [
  // ... existing 5 projects ...
  
  // Add new project at the end
  {
    id: "new-project-6",
    title: "New Project Title",
    category: "Category",
    year: "2024",
    // ... rest of project data
  }
];
```

### Removing Projects

Simply delete or comment out projects you don't want to display:

```javascript
export const projects = [
  // First project stays
  {
    id: "project-1",
    // ...
  },
  
  /*
  // Commenting out project-2 (won't display)
  {
    id: "project-2",
    // ...
  },
  */
  
  // Third project stays
  {
    id: "project-3",
    // ...
  }
];
```

### Project Tips

**✅ DO:**
- Use high-quality hero images (1920×1080 or larger)
- Write compelling, specific descriptions
- Include measurable outcomes (metrics)
- List all relevant tools and technologies
- Keep featured projects to 5-7 for best impact

**❌ DON'T:**
- Use low-resolution or placeholder images
- Write vague descriptions like "This was a great project"
- Exceed 10 featured projects (gets overwhelming)
- Forget to add corresponding images to `/public/images/projects/`

---

## Updating Experience & CV

Your professional background and skills demonstrate your expertise.

### Location

Edit the `experience` object in [`src/data/content.js`](src/data/content.js:207)

### Timeline Structure

```javascript
export const experience = {
  timeline: [
    {
      year: "2023 - Present",        // Time period
      position: "Your Position",     // Job title
      company: "Company Name",        // Company/organization
      type: "Full-time",              // Full-time, Freelance, Contract
      description: "Brief overview",  // 2-3 sentences about the role
      highlights: [                   // Array of key achievements
        "Achievement 1",
        "Achievement 2",
        "Achievement 3"
      ]
    }
    // Add more positions...
  ],
  
  skills: [
    {
      category: "Category Name",      // e.g., "AI & Machine Learning"
      items: [
        { name: "Tool Name", level: 90 },  // level: 0-100
        { name: "Another Tool", level: 85 }
      ]
    }
    // Add more skill categories...
  ],
  
  education: [
    {
      degree: "Degree Name",
      institution: "University Name",
      year: "2015 - 2017",
      focus: "Major/Focus Area",
      thesis: "Thesis title (optional)"
    }
  ]
};
```

### Step-by-Step: Update Experience

1. **Update Timeline:**

```javascript
timeline: [
  {
    year: "2023 - Present",
    position: "Your Current Role",
    company: "Your Current Company",
    type: "Freelance", // or "Full-time", "Contract"
    description: "Describe what you do in this role. Focus on AI/creative technology work relevant to the portfolio audience.",
    highlights: [
      "Specific achievement with numbers",
      "Another quantifiable accomplishment",
      "Key project or innovation you led",
      "Recognition or award received"
    ]
  },
  // Add previous positions in reverse chronological order
  {
    year: "2021 - 2023",
    position: "Previous Role",
    // ... etc
  }
]
```

2. **Update Skills:**

```javascript
skills: [
  {
    category: "AI & Machine Learning",
    items: [
      { name: "ComfyUI", level: 95 },
      { name: "Stable Diffusion", level: 90 },
      { name: "Midjourney", level: 85 },
      // Update levels honestly (0-100)
      // 90-100: Expert
      // 75-89: Advanced
      // 60-74: Intermediate
      // 0-59: Basic
    ]
  },
  {
    category: "VFX & Compositing",
    items: [
      { name: "After Effects", level: 95 },
      { name: "Nuke", level: 80 },
      // Add your actual tools
    ]
  },
  // Add more categories as needed
]
```

3. **Update Education:**

```javascript
education: [
  {
    degree: "Master of Arts in Digital Media",
    institution: "Your University",
    year: "2015 - 2017",
    focus: "Your focus area",
    thesis: "Your thesis title",
    honors: "Graduated with Distinction" // Optional
  },
  {
    degree: "Bachelor of Fine Arts",
    institution: "Your University",
    year: "2011 - 2015",
    focus: "Your major"
  }
]
```

---

## Updating Awards

Awards and recognition build credibility and showcase your accomplishments.

### Location

Edit the `awards` array in [`src/data/content.js`](src/data/content.js:325)

### Award Structure

```javascript
{
  id: "award-01",                    // Unique identifier
  title: "Award Name",               // Official award title
  category: "Award Category",        // e.g., "Technical Achievement"
  organization: "Awarding Body",     // Organization that gave award
  year: "2024",                      // Year received
  logo: "/images/awards/logo.svg",   // Path to organization logo
  description: "Brief description",  // What the award recognizes
  project: "Related Project Name"    // Optional: which project won
}
```

### Step-by-Step: Update Awards

1. **Replace** placeholder awards with real ones:

```javascript
export const awards = [
  {
    id: "award-01",
    title: "Your Actual Award Name",
    category: "Category (e.g., Best Visual Effects)",
    organization: "The Organization That Gave It",
    year: "2024",
    logo: "/images/awards/organization-logo.svg",
    description: "Brief description of what this award recognizes",
    project: "Project Name" // Which of your projects won this
  },
  // Add more awards...
];
```

2. **Add award logos:**
   - Download organization logos (SVG format preferred)
   - Place in [`public/images/awards/`](public/images/awards/)
   - Update `logo` path in content.js

3. **Order by importance:**
   - Most recent/prestigious first
   - Related to your target audience's interests

### Award Tips

**✅ DO:**
- Include industry-recognized awards (SIGGRAPH, VES, D&AD, etc.)
- Add professional residencies and fellowships
- Include speaking engagements at major conferences
- Mention significant recognitions (Featured Artist, etc.)

**❌ DON'T:**
- Include every minor award (quality over quantity)
- List awards older than 5-7 years unless very prestigious
- Forget to add official logos for credibility

---

## Updating Hero Section

The hero section is the first thing visitors see - make it impactful!

### Location

Edit the `hero` object in [`src/data/content.js`](src/data/content.js:9)

### Structure

```javascript
export const hero = {
  tagline: "Your professional tagline",
  title: ["WORD1", "WORD2", "WORD3"],  // 3 powerful words
  subtitle: "One-line value proposition",
};
```

### Step-by-Step: Update Hero

```javascript
export const hero = {
  // Your professional tagline (1-2 lines max)
  tagline: "Replace with your authentic professional description that resonates with your target audience",
  
  // 3 impactful words that define your work
  // These appear as large animated text
  title: ["YOUR", "KEY", "STRENGTHS"],
  // Examples: ["AI", "TECHNOLOGY", "CREATIVE DIRECTION"]
  //          ["VFX", "STORYTELLING", "INNOVATION"]
  //          ["ARTIST", "TECHNOLOGIST", "VISIONARY"]
  
  // Your value proposition in one compelling sentence
  subtitle: "What makes you unique and valuable to clients",
};
```

### Hero Tips

**Tagline Best Practices:**
- Focus on what you do + who you serve
- Keep it under 15 words
- Use active, confident language
- Example: "Creative Technologist specializing in AI-driven visual effects for film and immersive experiences"

**Title Words:**
- Choose 3 powerful, concise words
- Reflect your core expertise
- Can be skills, disciplines, or values
- Keep them impactful (AI, TECHNOLOGY, INNOVATION, etc.)

**Subtitle:**
- State your unique value proposition
- Mention target industry or clients
- Keep it under 20 words
- Example: "Pioneering AI-driven visual storytelling for film and immersive experiences"

---

## Updating About Section

Your about section builds personal connection and credibility.

### Location

Edit the `about` object in [`src/data/content.js`](src/data/content.js:444)

### Structure

```javascript
export const about = {
  bio: `Multi-paragraph biography...`,
  
  passions: [
    "What drives you professionally",
    "Another key passion or focus area",
    // ...
  ],
  
  currentlyAvailableFor: [
    "Type of project you're seeking",
    "Another project type",
    // ...
  ]
};
```

### Step-by-Step: Update About

```javascript
export const about = {
  // Your professional bio (3-4 paragraphs)
  bio: `Replace this with your authentic story. Start with who you are and what you do. 

Then describe your background, approach, and philosophy. What makes your work unique? What's your creative process?

Finally, mention key achievements, recognition, or impact. Where has your work been featured? What have you accomplished?`,
  
  // 3-4 things you're passionate about professionally
  passions: [
    "What aspect of your work excites you most",
    "Another area you're deeply interested in",
    "Your approach or philosophy",
    "What drives your creative work"
  ],
  
  // Types of work you want to attract
  currentlyAvailableFor: [
    "Specific type of project #1",
    "Specific type of project #2",
    "Consulting or advisory work",
    "Speaking or teaching opportunities"
  ]
};
```

### Writing Your Bio

**Paragraph 1: Introduction**
- Who you are (name optional, but title/role essential)
- Where you're based
- What you specialize in
- Who you work with/for

**Paragraph 2: Approach & Philosophy**
- Your unique approach or methodology
- Your creative philosophy
- Technical + artistic balance
- What you believe about your field

**Paragraph 3: Experience & Impact**
- Major projects or clients
- Recognition and awards
- Speaking engagements
- Publications or features

### Bio Tips

**✅ DO:**
- Write in first person ("I'm" not "Mascha is")
- Be specific and concrete
- Show personality while staying professional
- Mention target clients/industries
- Include quantifiable achievements

**❌ DON'T:**
- Use generic buzzwords without substance
- Write in third person (sounds impersonal)
- Make it too long (3-4 paragraphs max)
- List every project or tool
- Be overly humble or overly boastful

---

## Updating Contact Information

Make it easy for potential clients to reach you!

### Location

Edit the `contact` object in [`src/data/content.js`](src/data/content.js:411)

### Structure

```javascript
export const contact = {
  availability: {
    status: "Your current status",
    startDate: "When available",
    preferredProjectTypes: [...]
  },
  location: {
    city: "Your City",
    country: "Your Country",
    timezone: "Your Timezone",
    remoteWork: true,
    willingToTravel: true
  },
  email: "your@email.com",
  socialMedia: {
    linkedin: "URL",
    instagram: "URL",
    vimeo: "URL",
    twitter: "URL",
    github: "URL"
  },
  ratesInfo: "Info about rates"
};
```

### Step-by-Step: Update Contact

```javascript
export const contact = {
  availability: {
    status: "Available for select projects", // or "Fully booked", "Available immediately"
    startDate: "Q2 2025", // When you can start new work
    preferredProjectTypes: [
      "Feature Films (VFX)",
      "High-end Commercials",
      "Art Installations",
      // List project types you WANT to work on
    ]
  },
  
  location: {
    city: "Your City",
    country: "Your Country",
    timezone: "CET (UTC+1)", // Your timezone
    remoteWork: true, // Do you work remotely?
    willingToTravel: true // Will you travel for projects?
  },
  
  email: "your.actual@email.com", // Your real email
  
  socialMedia: {
    linkedin: "https://linkedin.com/in/your-profile",
    instagram: "https://instagram.com/your-handle",
    vimeo: "https://vimeo.com/your-channel",
    twitter: "https://twitter.com/your-handle",
    github: "https://github.com/your-username"
  },
  
  ratesInfo: "Day rates and project quotes available upon request"
};
```

### Contact Tips

**Email:**
- Use a professional email address
- Consider domain-based email (you@yourdomain.com)
- Make sure it's actively monitored

**Social Media:**
- Only include platforms you actively use
- Ensure profiles are professional and up-to-date
- Remove any platforms you don't use (delete the line)
- Order by importance to your work

**Availability:**
- Be honest about current status
- Update regularly (monthly check-in)
- Specify preferred project types to attract right clients

---

## Managing Images & Videos

High-quality media assets are crucial for a visual portfolio.

### Image Requirements

**Project Hero Images:**
- **Size:** 1920×1080 minimum (landscape)
- **Format:** JPG or WebP
- **File size:** <500KB (compressed)
- **Location:** [`public/images/projects/`](public/images/projects/)

**Project Gallery Images:**
- **Size:** 1200×800 minimum
- **Format:** JPG or WebP
- **File size:** <200KB each
- **Location:** Same as hero images

**Award Logos:**
- **Format:** SVG (preferred) or PNG with transparency
- **Size:** Square or landscape (300×150px minimum)
- **Location:** [`public/images/awards/`](public/images/awards/)

**Profile Photo:**
- **Size:** 800×800 minimum (square crop recommended)
- **Format:** JPG or WebP
- **File size:** <200KB
- **Location:** [`public/images/profile/`](public/images/profile/)

**OG Image (Social Sharing):**
- **Size:** 1200×630 (specific requirement)
- **Format:** JPG
- **File size:** <300KB
- **Location:** [`public/images/og-image.jpg`](public/images/og-image.jpg)

### Video Requirements

**Project Demo Reels:**
- **Format:** MP4 (H.264 codec)
- **Resolution:** 1920×1080
- **Length:** 30-90 seconds (shorter is better)
- **File size:** <10MB (heavily compressed)
- **Location:** [`public/videos/projects/`](public/videos/projects/)

### Image Optimization Tools

**Online Tools (Free):**
- [TinyPNG](https://tinypng.com/) - Compress PNG/JPG
- [Squoosh](https://squoosh.app/) - Advanced compression
- [Compressor.io](https://compressor.io/) - Bulk compression

**Command Line (Advanced):**
```bash
# Install Sharp CLI
npm install -g sharp-cli

# Optimize and convert to WebP
npx sharp -i input.jpg -o output.webp -f webp -q 80

# Resize to specific dimensions
npx sharp -i input.jpg -o output.jpg --resize 1920x1080
```

**Batch Processing:**
```bash
# Optimize all images in a directory
cd public/images/projects
for file in *.jpg; do
  npx sharp -i "$file" -o "optimized-$file" -q 80
done
```

### Adding Images Step-by-Step

1. **Prepare your images:**
   - Crop/edit in your preferred tool
   - Export at correct dimensions
   - Compress to target file size

2. **Name your files clearly:**
   ```
   project-name-hero.jpg
   project-name-01.jpg
   project-name-02.jpg
   award-organization-logo.svg
   ```

3. **Place in correct directory:**
   - Projects: `public/images/projects/`
   - Awards: `public/images/awards/`
   - Profile: `public/images/profile/`

4. **Update paths in [`content.js`](src/data/content.js:1):**
   ```javascript
   images: {
     hero: "/images/projects/project-name-hero.jpg",
     gallery: [
       "/images/projects/project-name-01.jpg",
       "/images/projects/project-name-02.jpg"
     ]
   }
   ```

5. **Test locally:**
   - Run `npm run dev`
   - Check all images load
   - Verify image quality
   - Check file sizes in Network tab

### Video Optimization

**Using HandBrake (Free, Recommended):**
1. Download [HandBrake](https://handbrake.fr/)
2. Import your video
3. Preset: "Web" → "Gmail Large 3 Minutes 720p30"
4. Adjust:
   - Video: RF 25-28 (higher = smaller file)
   - Dimensions: 1920×1080 max
5. Export to `public/videos/projects/`

**Using FFmpeg (Command Line):**
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k output.mp4
```

**Video Hosting Alternatives:**

Instead of self-hosting, consider:
- **Vimeo** (Recommended): Professional, high-quality playback
- **YouTube**: Free, but ads may appear
- **Wistia**: Professional video hosting with analytics

Then embed or link instead of hosting files:
```javascript
video: "https://vimeo.com/your-video-id"
```

---

## Best Practices

### Content Writing

**Be Specific:**
❌ "I worked on various VFX projects"
✅ "I delivered 120+ VFX shots for a supernatural thriller series, pioneering AI-powered temporal interpolation techniques"

**Show Impact:**
❌ "The project was successful"
✅ "The installation attracted 5,000+ visitors and was featured in 30+ international publications"

**Use Numbers:**
❌ "Many awards"
✅ "8 industry awards including SIGGRAPH Featured Artist and D&AD Pencil Winner"

**Target Your Audience:**
- Write for film/VFX industry professionals
- Use industry terminology appropriately
- Demonstrate both technical and artistic capabilities
- Show you understand client needs

### SEO Best Practices

Update meta tags in [`index.html`](index.html:9):

```html
<title>Your Name - AI Visual Director & Creative Technologist</title>
<meta name="description" content="Your compelling 155-character description for search results">
<meta name="keywords" content="ai vfx, creative technologist, your specialties">
```

**Good SEO Description:**
- 150-160 characters
- Include key skills and location
- Compelling call-to-action implied
- Example: "Berlin-based AI Visual Director specializing in film VFX, generative art, and real-time visuals. Available for feature films and commercial projects."

### Accessibility

**Image Alt Text:**

In HTML, add descriptive alt text:
```html
<img src="/images/projects/project-hero.jpg" 
     alt="Detailed description of what the image shows">
```

**Link Text:**

Make link text descriptive:
❌ "Click here"
✅ "View full case study on Vimeo"

---

## Testing Your Changes

### 1. Local Testing

```bash
# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

**Check:**
- [ ] All text displays correctly
- [ ] No spelling or grammar errors
- [ ] Images load (no broken images)
- [ ] Links work correctly
- [ ] Social media links open correct profiles
- [ ] Contact email is correct

### 2. Content Review

**Read through as a visitor:**
- Does it tell a compelling story?
- Is it clear what you do?
- Would someone want to hire you?
- Is there a clear call-to-action?

**Check for consistency:**
- Dates accurate and consistent?
- Writing style consistent throughout?
- All placeholder text replaced?
- Professional tone maintained?

### 3. Mobile Testing

```bash
# Test on actual mobile device
# OR use Chrome DevTools

# In Chrome:
# 1. Press F12
# 2. Click device toggle (phone icon)
# 3. Select different devices
```

**Verify:**
- [ ] Text readable on small screens
- [ ] Images display properly
- [ ] Navigation works
- [ ] Forms usable on mobile

### 4. Browser Testing

Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Edge

### 5. Proofreading Checklist

- [ ] Run spell check
- [ ] Read everything out loud
- [ ] Check dates and numbers
- [ ] Verify all links work
- [ ] Check email address
- [ ] Verify social media URLs
- [ ] Review for typos in code

---

## Quick Reference

### File Locations

| Content Type | File | Lines |
|-------------|------|-------|
| Projects | [`src/data/content.js`](src/data/content.js:18) | 18-202 |
| Experience | [`src/data/content.js`](src/data/content.js:207) | 207-320 |
| Awards | [`src/data/content.js`](src/data/content.js:325) | 325-406 |
| Contact | [`src/data/content.js`](src/data/content.js:411) | 411-439 |
| About | [`src/data/content.js`](src/data/content.js:444) | 444-465 |
| Hero | [`src/data/content.js`](src/data/content.js:9) | 9-13 |
| SEO | [`src/data/content.js`](src/data/content.js:470) | 470-487 |

### Essential Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Common Issues

**Images not loading?**
- Check file path starts with `/` not `./`
- Verify file actually exists in `public/` directory
- Check file name matches exactly (case-sensitive)

**Text changes not showing?**
- Save the [`content.js`](src/data/content.js:1) file
- Refresh browser (Ctrl/Cmd + R)
- Clear browser cache if needed (Ctrl/Cmd + Shift + R)

**Broken after editing?**
- Check browser console for errors (F12)
- Look for JavaScript syntax errors (missing commas, quotes)
- Restore from Git if needed: `git checkout src/data/content.js`

---

## Next Steps

After updating content:

1. ✅ **Test thoroughly** - Follow testing checklist above
2. ✅ **Get feedback** - Ask trusted colleagues to review
3. ✅ **Optimize images** - Compress all images before deploying
4. ✅ **Update regularly** - Keep portfolio current (quarterly updates)
5. ✅ **Deploy** - Follow [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md)

---

**Remember:** Your portfolio is never "finished" - it's a living document that grows with your career. Update it regularly with new projects, achievements, and refined messaging.

---

**Last Updated:** October 2024  
**Need Help?** Review [`PROJECT_SUMMARY.md`](PROJECT_SUMMARY.md) for complete project overview