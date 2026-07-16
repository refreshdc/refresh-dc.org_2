# Refresh DC

Community website for [Refresh DC](https://refresh-dc.org), a Washington, DC-based creative and tech meetup group founded in 2006.

## Tech Stack

- **Static Site Generator:** [Eleventy (11ty)](https://www.11ty.dev/) v2
- **Templating:** Nunjucks (`.njk`) for pages/layouts, Markdown for content
- **CSS:** Tailwind CSS v3 with `@tailwindcss/typography`, processed via PostCSS
- **Interactivity:** Alpine.js (CDN)
- **Fonts:** Bricolage Grotesque + Inter (Google Fonts)
- **Deployment:** Netlify

## Getting Started

### Prerequisites

- Node.js
- npm

### Install & Run

```bash
npm install
npm run dev
```

The dev server runs Eleventy and Tailwind CSS in parallel via `npm-run-all`.

### Build for Production

```bash
npm run build
```

Output is written to `_site/`.

## Project Structure

```
src/
├── _data/              # Global data (site config, events API, nav, analytics)
│   ├── site.json       # Site name, URL, description, social handles
│   ├── navigation.json # Nav menu items
│   ├── heroCarousel.json # Homepage photo carousel config
│   ├── events.js       # Eventbrite API integration (dynamic data)
│   └── posthog.js      # PostHog config from env vars
├── _includes/
│   ├── layouts/        # base.njk, blog.njk
│   └── components/     # navbar, hero, events, newsletter, footer, etc.
├── blog/               # Markdown blog posts
├── team/               # Markdown team member profiles
├── assets/             # CSS, images, SVG icons
├── index.njk           # Homepage
├── about.njk           # About page with team grid
├── contact.njk         # Contact page
├── conduct.njk         # Code of Conduct
└── 404.njk             # Custom 404
public/                 # Static passthrough files (logo, robots.txt)
```

## Content

### Blog Posts

Add Markdown files to `src/blog/` with frontmatter:

```yaml
---
title: "Post Title"
snippet: "Short description"
image: { src: "/path/to/image.jpg", alt: "Alt text" }
publishDate: "2024-01-15"
category: "Category"
author: "Author Name"
tags: [tag1, tag2]
draft: false
---
```

Posts with `draft: true` or a future `publishDate` are excluded from the build.

### Team Members

Add Markdown files to `src/team/` with frontmatter:

```yaml
---
name: "Member Name"
title: "Role"
avatar: { src: "/path/to/avatar.jpg", alt: "Alt text" }
linkedin: "https://linkedin.com/in/username"
publishDate: "2024-01-01"
draft: false
---
```

## Integrations

- **Eventbrite** — Events fetched at build time and displayed on the homepage
- **Mailchimp** — Newsletter signup form
- **PostHog** — Product analytics (loaded when env var is set)
- **Web3Forms** — Contact form submissions

## Brand

Brand colors defined in `tailwind.config.js`:

- `rf-blue`: #123456
- `rf-green`: #4CAF50
- `rf-grey`: #ECECEC

## License

Content is licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
