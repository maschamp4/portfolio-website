# Portfolio Website - Testing Checklist

Comprehensive testing guide for the Mascha Portfolio Website.

---

## 📋 Table of Contents

1. [Pre-Testing Setup](#pre-testing-setup)
2. [Visual Testing Checklist](#visual-testing-checklist)
3. [Animation Verification](#animation-verification)
4. [Three.js Scene Testing](#threejs-scene-testing)
5. [Form Functionality](#form-functionality)
6. [Responsive Testing](#responsive-testing)
7. [Performance Benchmarks](#performance-benchmarks)
8. [Browser Testing Matrix](#browser-testing-matrix)
9. [Accessibility Testing](#accessibility-testing)
10. [Final Checks](#final-checks)

---

## Pre-Testing Setup

### Required Tools

- [ ] Modern browser with DevTools (Chrome recommended)
- [ ] Mobile device or browser DevTools device emulation
- [ ] Internet connection for CDN resources
- [ ] Screen recording tool (optional, for bug reports)

### Before Testing

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Open browser DevTools:**
   - Press `F12` or `Ctrl+Shift+I`
   - Keep Console tab open to monitor logs

3. **Clear browser cache:**
   - `Ctrl+Shift+Delete` > Clear cached images and files
   - Or hard refresh: `Ctrl+Shift+R`

4. **Check console for errors:**
   - Should see initialization logs
   - No red error messages

### Test Environment Checklist

- [ ] Development server running on `http://localhost:3000`
- [ ] Browser DevTools open
- [ ] Console shows "Application initialized successfully!"
- [ ] No JavaScript errors in console
- [ ] Page loaded completely (no pending network requests)

---

## Visual Testing Checklist

### Header / Navigation

**Desktop (≥1024px):**
- [ ] Logo "MASCHA" visible in top-left
- [ ] Navigation menu visible in top-right
- [ ] All nav links visible: Projects, Experience, Awards, About, Contact
- [ ] "Contact" button has CTA styling (border/accent)
- [ ] Header has glass morphism effect (subtle backdrop blur)
- [ ] Header remains fixed on scroll
- [ ] Smooth scroll to sections when clicking nav links

**Tablet (768-1023px):**
- [ ] Logo visible
- [ ] Navigation menu visible or hamburger icon
- [ ] All links accessible
- [ ] Touch targets are adequate (44x44px minimum)

**Mobile (<768px):**
- [ ] Logo visible and properly sized
- [ ] Hamburger menu icon visible
- [ ] Menu opens when clicking hamburger
- [ ] Menu covers full screen or slides in smoothly
- [ ] Close button visible when menu is open
- [ ] Nav links stack vertically
- [ ] Touch-friendly spacing between links

### Hero Section

**Visual Elements:**
- [ ] Tagline "Artist & Creative Technologist..." visible
- [ ] Main title displays three lines:
  - "AI"
  - "TECHNOLOGY"
  - "CREATIVE DIRECTION"
- [ ] Subtitle "Pioneering AI-driven..." visible
- [ ] Two CTA buttons: "View Projects" and "Get in Touch"
- [ ] Scroll indicator at bottom (text + animated line)

**Three.js Canvas:**
- [ ] 3D morphing shape visible
- [ ] Shape appears glass-like with transparency
- [ ] Shape is centered or positioned aesthetically
- [ ] Shape renders without flickering
- [ ] No WebGL errors in console

**Responsive:**
- [ ] Desktop: Large title (5-6rem font size)
- [ ] Tablet: Medium title (3-4rem)
- [ ] Mobile: Smaller title (2-3rem)
- [ ] All text remains readable
- [ ] Buttons stack on mobile if needed
- [ ] 3D shape scales appropriately (or 2D fallback on mobile)

### Projects Section

**Section Header:**
- [ ] Label "Featured Work" visible (small text)
- [ ] Section title "Selected Projects" visible
- [ ] Description text visible
- [ ] Header centered and properly spaced

**Project Cards (5 total):**
- [ ] All 5 project cards render
- [ ] Each card has:
  - [ ] Project image (hero image)
  - [ ] Project title
  - [ ] Project category/type
  - [ ] Short description
  - [ ] "View Case Study" link or button
- [ ] Images load properly (no broken images)
- [ ] Alternating layout (left/right) on desktop
- [ ] Cards stack vertically on mobile
- [ ] Card borders/dividers visible (if applicable)

**Project Data:**
1. [ ] "Cinematic AI: The Last Journey"
2. [ ] "Real-Time AI Visuals for Live Performance"
3. [ ] "AI-Enhanced VFX Pipeline"
4. [ ] "Interactive AI Art Installation"
5. [ ] "Generative Storytelling Platform"

### Experience Section

**Section Header:**
- [ ] Label "Background" visible
- [ ] Section title "Experience" visible
- [ ] Description text visible

**Timeline:**
- [ ] Vertical timeline line visible
- [ ] Timeline entries ordered chronologically (newest first)
- [ ] Each entry has:
  - [ ] Date/year
  - [ ] Job title/position
  - [ ] Company/organization
  - [ ] Description
  - [ ] Visual marker/dot on timeline
- [ ] Timeline connects all entries smoothly
- [ ] Text is legible and well-spaced

**Skills Section:**
- [ ] Skills list or grid visible
- [ ] Skills organized by category (if applicable):
  - [ ] AI/ML Tools
  - [ ] Creative Software
  - [ ] Technical Skills
- [ ] Skill badges/pills styled consistently

**Responsive:**
- [ ] Timeline remains vertical on all screens
- [ ] Timeline line adjusts for mobile
- [ ] Text wraps appropriately
- [ ] Skills grid adapts to screen size

### Awards Section

**Section Header:**
- [ ] Label "Recognition" visible
- [ ] Section title "Awards & Honors" visible
- [ ] Description text visible

**Awards Grid:**
- [ ] Grid layout visible (2-4 columns on desktop)
- [ ] 8+ award cards displayed
- [ ] Each card has:
  - [ ] Award title
  - [ ] Organization/festival
  - [ ] Year
  - [ ] Award image/badge (if applicable)
- [ ] Cards have consistent styling
- [ ] Grid is balanced and visually appealing

**Responsive:**
- [ ] Desktop: 3-4 columns
- [ ] Tablet: 2 columns
- [ ] Mobile: 1 column

### About Section

**Content:**
- [ ] Label "About" visible
- [ ] Section title "Who I Am" visible
- [ ] Three paragraphs of bio text visible
- [ ] Profile image visible
- [ ] Image has proper aspect ratio
- [ ] Text is readable and well-formatted

**Responsive:**
- [ ] Desktop: Text and image side-by-side
- [ ] Mobile: Image and text stack vertically

### Contact Section

**Section Header:**
- [ ] Label "Get in Touch" visible
- [ ] Section title "Let's Create Together" visible
- [ ] Availability status visible

**Contact Form:**
- [ ] Name field visible
- [ ] Email field visible
- [ ] Project Type dropdown visible
- [ ] Message textarea visible
- [ ] Submit button visible
- [ ] Form fields have glass morphism styling
- [ ] Labels are clearly visible
- [ ] Error message areas present (but hidden initially)

**Contact Info:**
- [ ] Email address displayed and clickable
- [ ] Location displayed
- [ ] Availability status displayed
- [ ] Social media links visible:
  - [ ] LinkedIn
  - [ ] Instagram
  - [ ] Vimeo
  - [ ] GitHub

**Responsive:**
- [ ] Form takes full width on mobile
- [ ] Contact info stacks below form on mobile
- [ ] Touch-friendly input fields

### Footer

- [ ] Logo/brand name visible
- [ ] Tagline visible
- [ ] Navigation links (Projects, Experience, Awards, About, Contact)
- [ ] Social media icons
- [ ] Copyright text
- [ ] "Crafted with ❤️ in Berlin" text
- [ ] Footer has appropriate background color/styling

---

## Animation Verification

### Scroll Animations

**Hero Section:**
- [ ] Title lines fade in and slide up sequentially on load
- [ ] Tagline fades in before title
- [ ] Subtitle fades in after title
- [ ] CTA buttons fade in last
- [ ] Scroll indicator animates (line moves down)
- [ ] All animations are smooth (no jank)
- [ ] Animations trigger on page load

**Sections on Scroll:**
- [ ] Section headers fade in when scrolling into view
- [ ] Section content follows with slight delay
- [ ] Animations trigger at ~70% viewport visibility
- [ ] Animations only play once (no repeat on scroll back)
- [ ] Smooth transition (ease-out timing)

**Project Cards:**
- [ ] Cards fade in sequentially (staggered)
- [ ] Cards slide up slightly as they fade in
- [ ] Images have subtle parallax effect on scroll (optional)
- [ ] Stagger delay: ~0.1-0.2s between cards

**Experience Timeline:**
- [ ] Timeline line "draws" from top to bottom on scroll
- [ ] Timeline entries fade in as line reaches them
- [ ] Entry dots appear with scale animation
- [ ] Skills fade in with stagger

**Awards Grid:**
- [ ] Award cards fade in with stagger
- [ ] Cards may have slight rotation/scale on entry (optional)
- [ ] Stagger creates wave effect across grid

**About Section:**
- [ ] Profile image fades in
- [ ] Text blocks fade in with stagger
- [ ] Image and text may animate from opposite directions

**Contact Form:**
- [ ] Form fields fade in sequentially
- [ ] Contact info fades in
- [ ] Social icons fade in with stagger

### Hover Animations

**Navigation Links:**
- [ ] Links have hover state (color change, underline, etc.)
- [ ] Hover animation is smooth (0.3s transition)
- [ ] Active link has distinct styling

**Buttons (Primary & Ghost):**
- [ ] Background color/opacity changes on hover
- [ ] Slight scale increase (1.05x) on hover
- [ ] Smooth transition
- [ ] Cursor changes to pointer

**Project Cards:**
- [ ] Card lifts on hover (translateY or shadow increase)
- [ ] Image scales slightly (zoom in)
- [ ] "View Case Study" link changes color/underline
- [ ] Hover state is visible but subtle

**Award Cards:**
- [ ] Card lifts on hover
- [ ] Subtle scale or shadow change
- [ ] Smooth transition

**Social Icons:**
- [ ] Icons scale or change color on hover
- [ ] Smooth transition

### Magnetic Effect

**Elements with Magnetic Hover:**
- [ ] Buttons move toward cursor on hover
- [ ] Effect is subtle (5-10px max movement)
- [ ] Element returns to position when cursor leaves
- [ ] Smooth easing (not instant)
- [ ] Works on:
  - [ ] Hero CTA buttons
  - [ ] Navigation links (optional)
  - [ ] Project card links
  - [ ] Contact form submit button

**Testing:**
1. Move cursor slowly toward button from different angles
2. Verify button moves toward cursor
3. Move cursor away and verify return animation
4. Test on desktop only (not mobile)

### Smooth Scroll (Lenis)

- [ ] Scroll feels smooth and buttery
- [ ] No sudden jumps or glitches
- [ ] Momentum scrolling on trackpad
- [ ] Smooth deceleration at end of scroll
- [ ] Works with mouse wheel
- [ ] Works with trackpad
- [ ] Navigation links trigger smooth scroll to sections
- [ ] Scroll position is correct when jumping to sections

**Test Procedure:**
1. Scroll down entire page slowly
2. Scroll up entire page slowly
3. Quick scroll gestures (flick)
4. Click navigation links
5. Use keyboard (spacebar, arrow keys)

---

## Three.js Scene Testing

### Initial Render

- [ ] 3D shape visible on page load
- [ ] Shape renders within 1-2 seconds
- [ ] No black screen or WebGL errors
- [ ] Shape is positioned correctly (centered or as designed)
- [ ] Shape has glass-like material (transparent, refractive)
- [ ] Lighting is appropriate
- [ ] No z-fighting or rendering artifacts

### Morphing Animation

**Idle State:**
- [ ] Shape continuously morphs (vertices move)
- [ ] Morphing is smooth and organic
- [ ] Morphing speed is appropriate (not too fast/slow)
- [ ] Shape maintains overall structure (doesn't explode)

**Scroll Interaction:**
- [ ] Shape responds to scroll position
- [ ] Shape rotates as you scroll
- [ ] Shape scale changes (grows/shrinks) on scroll
- [ ] Morph intensity may increase/decrease on scroll
- [ ] Color/opacity may change on scroll
- [ ] Interactions feel connected to scroll (not random)

### Performance

**Desktop:**
- [ ] Consistent 60 FPS
- [ ] No frame drops during scroll
- [ ] No stuttering or jank
- [ ] CPU usage reasonable (check Task Manager)

**Mobile:**
- [ ] 30+ FPS (acceptable on mobile)
- [ ] Shape may be simplified (lower polygon count)
- [ ] No crashes or freezes
- [ ] Battery drain is acceptable

**Check FPS:**
1. Open DevTools > Performance
2. Start recording
3. Scroll page up and down
4. Stop recording
5. Check FPS graph (should be mostly green/blue, 60fps)

### Browser Compatibility

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Edge
- [ ] Works in Safari (if available)
- [ ] Graceful fallback if WebGL not supported
  - [ ] 2D gradient animation shows instead
  - [ ] Or shape section is hidden
  - [ ] No error messages to user

### Responsive Behavior

- [ ] Desktop: Full complexity, 60fps target
- [ ] Tablet: Moderate complexity
- [ ] Mobile: Simplified or 2D fallback
- [ ] Shape scales appropriately on window resize
- [ ] No layout shift when shape loads

---

## Form Functionality

### Field Validation

**Name Field:**
- [ ] Required (shows error if empty)
- [ ] Error message: "Please enter your name"
- [ ] Accepts letters, spaces, hyphens
- [ ] Error clears when valid input entered

**Email Field:**
- [ ] Required (shows error if empty)
- [ ] Validates email format (name@domain.com)
- [ ] Error message: "Please enter a valid email"
- [ ] Error clears when valid email entered
- [ ] Test invalid emails: "test", "test@", "@test.com", "test @test.com"

**Project Type Dropdown:**
- [ ] Optional (no error if empty)
- [ ] Options visible when clicked
- [ ] Selection updates field
- [ ] Default option: "Select a project type"

**Message Field:**
- [ ] Required (shows error if empty)
- [ ] Error message: "Please enter a message"
- [ ] Accepts multi-line text
- [ ] Textarea resizes or scrolls for long messages
- [ ] Error clears when valid input entered

### Form Submission

**Valid Submission:**
1. Fill all required fields correctly
2. Click "Send Message" button
3. [ ] Form submits (or shows "coming soon" message if backend not implemented)
4. [ ] Loading state on button (spinner or "Sending...")
5. [ ] Success message displayed
6. [ ] Form clears after successful submission

**Invalid Submission:**
1. Leave fields empty or enter invalid data
2. Click "Send Message" button
3. [ ] Form does not submit
4. [ ] Error messages appear for invalid/empty fields
5. [ ] First error field receives focus
6. [ ] User can correct errors and resubmit

**Edge Cases:**
- [ ] Very long message (1000+ characters)
- [ ] Special characters in name (é, ñ, etc.)
- [ ] Copy-paste long email
- [ ] Rapid clicking submit button (debounce)

### Accessibility

- [ ] All fields have associated labels
- [ ] Required fields marked with `aria-required="true"`
- [ ] Error messages have `role="alert"`
- [ ] Can navigate form with Tab key
- [ ] Can submit with Enter key
- [ ] Form is usable with keyboard only

---

## Responsive Testing

### Breakpoints to Test

Test at these specific widths (use DevTools device emulation):

| Breakpoint | Width | Device Type |
|------------|-------|-------------|
| **Mobile S** | 320px | iPhone SE |
| **Mobile M** | 375px | iPhone 12 Pro |
| **Mobile L** | 425px | Large phones |
| **Tablet** | 768px | iPad |
| **Laptop** | 1024px | Small laptops |
| **Desktop** | 1440px | Standard desktop |
| **Large Desktop** | 1920px+ | Large monitors |

### Layout Checks per Breakpoint

**Mobile (320-767px):**
- [ ] Single column layout throughout
- [ ] Header: Logo + hamburger menu
- [ ] Hero: Stacked content, smaller text
- [ ] Projects: Cards stack vertically
- [ ] Experience: Timeline remains readable
- [ ] Awards: Single column
- [ ] Contact: Form takes full width
- [ ] All text is readable (not too small)
- [ ] Touch targets ≥44x44px
- [ ] No horizontal scrollbar
- [ ] Images scale properly

**Tablet (768-1023px):**
- [ ] 2-column layouts where appropriate
- [ ] Header: May show full nav or hamburger
- [ ] Hero: Moderate text size
- [ ] Projects: 2-column grid or stacked with larger cards
- [ ] Awards: 2-column grid
- [ ] Text remains comfortable to read
- [ ] Good use of screen space

**Desktop (1024px+):**
- [ ] Multi-column layouts
- [ ] Header: Full navigation visible
- [ ] Hero: Large text, impactful design
- [ ] Projects: Alternating left/right layout
- [ ] Awards: 3-4 column grid
- [ ] Experience: Timeline with side content
- [ ] Contact: Form and info side-by-side
- [ ] Ample whitespace
- [ ] Professional appearance

### Orientation Testing (Mobile/Tablet)

**Portrait:**
- [ ] All sections visible and functional
- [ ] Vertical scroll works smoothly
- [ ] Content fits within viewport width

**Landscape:**
- [ ] Layout adapts appropriately
- [ ] No awkward spacing
- [ ] All content accessible
- [ ] Hamburger menu may change behavior

### Device-Specific Testing

**iOS Devices (Safari):**
- [ ] Smooth scroll works
- [ ] Three.js renders correctly
- [ ] Touch interactions work
- [ ] No viewport height issues (100vh bug)
- [ ] Forms are usable

**Android Devices (Chrome):**
- [ ] All features work as expected
- [ ] Performance is acceptable
- [ ] Touch interactions responsive

### Touch Interactions

- [ ] All buttons are tappable
- [ ] Links have adequate spacing
- [ ] Form fields can be focused with touch
- [ ] No accidental clicks from proximity
- [ ] Swipe/scroll gestures work smoothly
- [ ] No hover-only features (or touch alternatives provided)

---

## Performance Benchmarks

### Lighthouse Audit

Run Lighthouse audit (DevTools > Lighthouse):

**Performance (Target: >90):**
- [ ] First Contentful Paint (FCP): <1.8s
- [ ] Largest Contentful Paint (LCP): <2.5s
- [ ] Total Blocking Time (TBT): <200ms
- [ ] Cumulative Layout Shift (CLS): <0.1
- [ ] Speed Index: <3.4s

**Accessibility (Target: >95):**
- [ ] All images have alt text
- [ ] Proper heading hierarchy
- [ ] Color contrast sufficient
- [ ] Form labels associated
- [ ] ARIA attributes used correctly

**Best Practices (Target: >90):**
- [ ] HTTPS (in production)
- [ ] No console errors
- [ ] Images have correct aspect ratios
- [ ] Uses HTTP/2

**SEO (Target: >90):**
- [ ] Page has meta description
- [ ] Title tag descriptive
- [ ] Links have descriptive text
- [ ] Images have alt text

### Network Performance

Open DevTools > Network:

**Page Load:**
- [ ] Total size: <3MB (uncompressed)
- [ ] Total requests: <50
- [ ] Load time: <3s on 3G, <1s on 4G/WiFi
- [ ] Critical resources load first

**Asset Breakdown:**
- [ ] HTML: <50KB
- [ ] CSS: <100KB
- [ ] JavaScript: <500KB (unminified dev build)
- [ ] Fonts: <200KB
- [ ] Images: Optimized (WebP preferred)

### Runtime Performance

Open DevTools > Performance:

**Scroll Performance:**
1. Record while scrolling page
2. [ ] Maintain 60fps on desktop
3. [ ] No long tasks (>50ms)
4. [ ] No forced reflows
5. [ ] Smooth scroll timeline

**Three.js Performance:**
1. Monitor FPS while 3D scene active
2. [ ] 60fps on desktop with dedicated GPU
3. [ ] 30-60fps on integrated graphics
4. [ ] No memory leaks (check over time)

**Animation Performance:**
1. Check requestAnimationFrame usage
2. [ ] GSAP animations use GPU acceleration (transforms)
3. [ ] No layout thrashing
4. [ ] Smooth transitions

### Memory Usage

Open DevTools > Memory:

1. Take heap snapshot on page load
2. Interact with page (scroll, hover, etc.)
3. Take another snapshot
4. [ ] Memory growth is minimal (<10MB)
5. [ ] No detached DOM nodes
6. [ ] Event listeners cleaned up properly

---

## Browser Testing Matrix

Test in multiple browsers and devices:

### Desktop Browsers

| Browser | Version | Pass | Notes |
|---------|---------|------|-------|
| **Chrome** | Latest | [ ] | Primary dev browser |
| **Firefox** | Latest | [ ] | Check animations |
| **Edge** | Latest | [ ] | Chromium-based |
| **Safari** | Latest (Mac) | [ ] | WebKit differences |
| **Opera** | Latest | [ ] | Optional |

### Mobile Browsers

| Browser | Device | Pass | Notes |
|---------|--------|------|-------|
| **Safari** | iOS 14+ | [ ] | iPhone/iPad |
| **Chrome** | Android 10+ | [ ] | Most Android devices |
| **Samsung Internet** | Android | [ ] | Popular on Samsung |
| **Firefox Mobile** | Android | [ ] | Optional |

### Cross-Browser Checks

**All Browsers:**
- [ ] Page loads without errors
- [ ] Layout is consistent
- [ ] Colors and fonts render correctly
- [ ] Animations work smoothly
- [ ] Three.js scene renders (if WebGL supported)
- [ ] Form validation works
- [ ] All links functional
- [ ] No console errors

**Known Browser Differences:**
- Safari: May need `-webkit-` prefixes for some CSS
- Firefox: Slightly different scrollbar styling
- Edge: Generally same as Chrome (Chromium)
- Mobile Safari: 100vh height quirk, no smooth scroll CSS

---

## Accessibility Testing

### Keyboard Navigation

- [ ] Can tab through all interactive elements
- [ ] Tab order is logical (top to bottom)
- [ ] Focus indicators are visible
- [ ] Can navigate menu with keyboard
- [ ] Can submit form with keyboard (Enter)
- [ ] Can close modals/menus with Escape
- [ ] No keyboard traps

### Screen Reader Testing

Use a screen reader (NVDA, JAWS, or VoiceOver):

- [ ] Page title is read
- [ ] Headings are announced with level
- [ ] Landmarks are recognized (header, main, nav, footer)
- [ ] Images have descriptive alt text
- [ ] Links have descriptive text (no "click here")
- [ ] Form labels are associated and read
- [ ] Error messages are announced
- [ ] Skip link works ("Skip to main content")

### Color Contrast

- [ ] Text has sufficient contrast (4.5:1 for body, 3:1 for large text)
- [ ] Links are distinguishable without color alone
- [ ] Error states are not indicated by color only
- [ ] Focus indicators are visible

### Reduced Motion

Test with reduced motion preference:

**Windows:** Settings > Ease of Access > Display > Show animations
**Mac:** System Preferences > Accessibility > Display > Reduce motion

- [ ] Animations respect `prefers-reduced-motion` media query
- [ ] No automatic animations if user prefers reduced motion
- [ ] Critical animations still convey information
- [ ] Page remains functional without animations

---

## Final Checks

### Content Review

- [ ] All placeholder text replaced with real content
- [ ] Spelling and grammar checked
- [ ] Links point to correct destinations
- [ ] Email addresses and contact info correct
- [ ] Social media links work and open in new tabs
- [ ] Images are appropriate and high quality
- [ ] Copyright year is correct
- [ ] No "Lorem ipsum" text remaining

### Technical Review

- [ ] No console errors
- [ ] No console warnings (or explained)
- [ ] All images load (no 404s)
- [ ] All fonts load
- [ ] Favicon displays correctly
- [ ] Page title and meta tags correct
- [ ] Open Graph tags for social sharing
- [ ] Sitemap.xml exists (if applicable)
- [ ] Robots.txt configured (if applicable)

### Cross-Device Testing Summary

Tested on:
- [ ] Windows desktop (Chrome, Firefox, Edge)
- [ ] Mac desktop (Chrome, Safari)
- [ ] iPhone (Safari)
- [ ] Android phone (Chrome)
- [ ] iPad (Safari)
- [ ] Different screen sizes (320px to 1920px+)

### Sign-Off

**Tester Name:** _________________
**Date:** _________________
**Overall Result:** ☐ Pass ☐ Pass with minor issues ☐ Fail
**Issues Found:** _________________
**Recommended Actions:** _________________

---

## Issue Reporting Template

When you find bugs, report them using this format:

```
**Issue Title:** [Brief description]

**Severity:** Critical / Major / Minor

**Browser/Device:** Chrome 90 / iPhone 12 Pro

**Steps to Reproduce:**
1. Go to [section]
2. Do [action]
3. Observe [issue]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots/Video:**
[Attach if possible]

**Console Errors:**
[Copy any error messages]

**Additional Notes:**
[Any other relevant info]
```

---

## Quick Test Checklist

For rapid testing, use this abbreviated checklist:

### 5-Minute Smoke Test

- [ ] Page loads without errors
- [ ] Hero section visible with 3D shape
- [ ] All sections render (Projects, Experience, Awards, About, Contact)
- [ ] Navigation works
- [ ] Form is interactive
- [ ] No major layout issues
- [ ] No console errors

### 15-Minute Functional Test

- [ ] Complete 5-minute smoke test
- [ ] Test scroll animations (at least 3 sections)
- [ ] Test hover effects on buttons and cards
- [ ] Submit form with validation
- [ ] Test on 2 breakpoints (mobile + desktop)
- [ ] Check Three.js performance
- [ ] Test with keyboard navigation

### 60-Minute Full Test

- [ ] Complete all sections of this checklist
- [ ] Test in 3+ browsers
- [ ] Test on 2+ devices
- [ ] Run Lighthouse audit
- [ ] Document all issues found
- [ ] Verify fixes (if any applied)

---

**Good luck with testing! 🧪**

**Updated:** October 2024  
**Version:** 1.0.0  
**Maintainer:** Mascha Portfolio Development Team