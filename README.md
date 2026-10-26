# Juliana — Design Atelier II

Open `index.html` to preview locally; deploy the entire folder to Vercel as a static site. Includes a custom `404.html`, SEO meta, SVG social preview and resume PDF.

## Included upgrades
- Theme toggle with an animated circular water-wave reveal expanding outward from the clicked toggle (native View Transitions; animated veil fallback; reduced-motion instant switch). Theme persists in localStorage.
- Kinetic typography, layered project visual treatment, motion-conscious cinematic contact, project quick preview modal, categorized skills, copy email, back to top.
- Accessibility-minded focus indicators, semantic headings, tab keyboard controls, dialog, reduced motion.

## Before publication
1. Replace conceptual project visuals with real screenshots and publish detailed case studies when ready.
2. Verify URLs for PeakAthlete, Bherlyn, resume and email.
3. Test desktop/mobile browsers, keyboard controls, theme transition and actual live performance.
4. After deploying, add the exact live canonical URL and update og:image with its absolute URL for consistent social media previews.
5. Check claims about CRO/SEO/GA4 and adjust if these are still learning topics.

This is a static project with no npm dependencies.


### Theme update
Dark/light palettes now include contrasting labels throughout. Switching theme creates five staggered concentric ripples radiating from the theme button and an expanding full-page theme reveal (View Transitions API, where supported). Reduced-motion preference disables these animations.


## Performance fix (theme switch)
The theme button uses a single GPU-friendly transform/opacity ripple (480ms) instead of page-wide View Transition snapshots, clipping, and multiple oversized rings. Reduced-motion users get an instant switch.


## Version update — layout stability
- Instant dark/light theme switch without ripple or theme transition.
- Sticky top navigation while scrolling.
- Straight, single-line animated motto strip.
- Consistent Selected Work stage dimensions and caption grid when changing projects.
- More intentional and responsive sizing for [02] / THE PERSON.


GreenSort screenshots: Four web images in assets/greensort/ are added to the Selected Work showcase. Record/detail regions are blurred as a precaution, but client approval remains necessary before public publishing. Screenshot selection is managed by script.js; you can replace these .webp files with approved images of the same filenames.
