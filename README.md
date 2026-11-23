# Shafayet Sadik Sowad: Academic Website

A one-page academic website for PhD applications (Fall 2027), laid out like a classic academic template. It's built with **Astro**, **Tailwind CSS v4** and **anime.js v4**. The site is fully static, ships about 16 KB of gzipped JavaScript and scores 100 on Lighthouse.

Live at **https://shafayetsadik.github.io/portfolio-site/**

## Editing content

All text on the site comes from one file: [`src/data/cv.ts`](src/data/cv.ts).
To make words bold, wrap them in `**double asterisks**`. They render as bold on the site.

| To change… | Edit |
|---|---|
| Name, position line, bio, PhD status line, email, links | `profile` |
| Google Scholar / ORCID links (a link stays hidden while its value is `null`) | `profile.scholar`, `profile.orcid` |
| The Research section (interests list + background paragraphs) | `focusAreas`, `research` |
| Papers and the dataset | `journalPapers`, `conferencePapers`, `underReview`, `dataset` |
| Thesis and supervisor | `education.thesis` |
| Jobs | `experience` |
| Projects (`featured: true` gets a full row; the rest go in the "Other projects" line) | `projects` |
| Skills, IELTS, leadership, awards | the matching export |

**Paper links:** each paper can have `pdf`, `code` and `dataset` URLs. Each one shows up as a `[PDF]`, `[Code]` or `[Dataset]` link under the paper.

The **Download CV** button serves `public/Shafayet_Sadik_Sowad_CV.pdf`. To update the CV, replace that file and keep the same name.

## Adding images

- **Headshot:** put the photo at `src/assets/headshot.jpg`, then set `photo: 'headshot.jpg'` in `profile`.
- **Paper figures:** put each figure in `src/assets/papers/`, for example `src/assets/papers/dib-2026.png`. Then add `image: 'dib-2026.png'` to that paper. Until a paper has a figure, its thumbnail shows the venue name instead.
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
  components/          one component per section (Intro, Research, Publications, …)
  layouts/Base.astro   <head>, SEO and theme setup
  scripts/ui.ts        theme toggle, "Show all" on phones, back-to-top
  scripts/motion.ts    subtle fade-ins with anime.js WAAPI (skipped when reduced motion is on)
  styles/global.css    design tokens (light/dark) and shared styles
```
