# Shafayet Sadik Sowad: Portfolio

A one-page portfolio site built with **Astro**, **Tailwind CSS v4** and **anime.js v4**. It's a fully static site with about 23 KB of gzipped JavaScript, and it scores 100 on Lighthouse.

Live at **https://shafayetsadik.github.io/portfolio-site/**

## Editing content

All text on the site comes from one file: [`src/data/cv.ts`](src/data/cv.ts).
To make words bold, wrap them in `**double asterisks**`. They render as bold on the site.

| To change… | Edit |
|---|---|
| Name, role, summary, email, phone, links | `profile` |
| Experience | `experience` |
| Projects | `projects` |
| Papers and the dataset | `journalPapers`, `conferencePapers`, `underReview`, `dataset` |
| Skills, education, IELTS, leadership, awards | the matching export |
| The 4 numbers under the hero | `highlights` |

The **Download CV** button serves `public/Shafayet_Sadik_Sowad_CV.pdf`. To update the CV, replace that file and keep the same name.

## Adding images

- **Headshot:** put the photo at `src/assets/headshot.jpg`, then set `photo: 'headshot.jpg'` in `profile`.
- **Project photos:** put each photo in `src/assets/projects/`, for example `src/assets/projects/mars-rover.jpg`. Then add `image: 'mars-rover.jpg'` to that project in `projects`.

Astro automatically resizes images and converts them to AVIF/WebP at build time.

## Commands

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

- `npm install` installs the dependencies. You only need it once.
- `npm run dev` starts a local preview at http://localhost:4321/portfolio-site/
- `npm run build` creates the production build in `dist/`.

## Deploying

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
For this to work, the repo needs **Settings → Pages → Source** set to **GitHub Actions**.

If the repo is ever renamed to `shafayetsadik.github.io`, change `base` in `astro.config.mjs` to `'/'`. The site will then be served at the root of that domain.

## Structure

```
src/
  data/cv.ts           all content
  components/          one component per section (Hero, About, Experience, …)
  layouts/Base.astro   <head>, SEO and theme setup
  scripts/ui.ts        theme toggle, mobile menu, active-section highlight
  scripts/motion.ts    anime.js animations (skipped when reduced motion is on)
  styles/global.css    design tokens (light/dark) and shared styles
```
