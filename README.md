# Kevin Jojo Portfolio

Personal portfolio for Kevin Jojo, an AI and machine learning engineer. The site presents work experience, skills, selected projects, certifications, LinkedIn posts, a booking section, and contact details.

- **Live site:** [kevinjojo.netlify.app](https://kevinjojo.netlify.app)
- **Source:** [github.com/Kevinjojo2003/portfolio-Website](https://github.com/Kevinjojo2003/portfolio-Website)

## Features

- Responsive single-page portfolio with project demos and source links
- English plus 19 additional language options, powered by i18next
- Dark themed interface with animated sections and an interactive talking avatar
- Resume download, booking link, LinkedIn posts, and contact form
- SEO, Open Graph, Twitter card, sitemap, and robots metadata
- Netlify deployment configuration with a single-page application fallback
- Capacitor configuration for iOS and Android projects
- Scheduled LinkedIn post sync to the portfolio carousel

## Technology

- React 18, TypeScript, and Vite
- Tailwind CSS, Radix UI, and Lucide icons
- Framer Motion animations
- i18next and react-i18next
- EmailJS contact form
- React Router, TanStack Query, and Supabase client integration
- Capacitor for native mobile wrappers

## Local development

### Requirements

- Node.js 18 or later
- npm

### Setup

```bash
git clone https://github.com/Kevinjojo2003/portfolio-Website.git
cd portfolio-Website
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run build:dev` | Create a development-mode build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Deployment

The site is hosted on [Netlify](https://kevinjojo.netlify.app). The repository's [`netlify.toml`](netlify.toml) sets the build command to `npm run build`, publishes the `dist` directory, and routes application paths to `index.html`.

To deploy through Netlify, connect the GitHub repository and use the build settings from `netlify.toml`. The production domain is `https://kevinjojo.netlify.app`.

### Automatic LinkedIn post sync

The GitHub Actions workflow in [`.github/workflows/linkedin-sync.yml`](.github/workflows/linkedin-sync.yml) checks for public posts on the 1st and 15th of each month and updates the five newest posts in [`src/data/linkedin-posts.json`](src/data/linkedin-posts.json). When it commits an update to `main`, the Netlify Git integration deploys the refreshed carousel.

To enable the sync, create a LinkedIn developer app with approved member-post read access using the [LinkedIn Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api?view=li-lms-2026-10), then add these repository Actions secrets under **Settings → Secrets and variables → Actions**:

- `LINKEDIN_ACCESS_TOKEN` — OAuth access token with `r_member_social` permission
- `LINKEDIN_AUTHOR_URN` — your author URN, in the format `urn:li:person:...`

LinkedIn restricts `r_member_social` to approved applications. The workflow skips safely and logs a warning until both secrets are configured. It only reads public posts; it does not publish to LinkedIn.

## Mobile app

The project includes Capacitor configuration for the app ID `com.kevinjojo.portfolio` and uses `dist` as its web assets directory. To create native platform projects, install the project dependencies, build the web app, and add the desired platform:

```bash
npm run build
npx cap add android
# or
npx cap add ios
npx cap sync
```

Open the generated project with Android Studio or Xcode using `npx cap open android` or `npx cap open ios`. iOS builds require macOS and Xcode. Review `capacitor.config.ts` and set the appropriate app configuration before producing a release build.

## Project structure

```text
src/
├── components/       # Page sections, shared UI, and navigation
├── hooks/            # Reusable React hooks
├── i18n/             # i18next setup and translations
├── integrations/     # External service clients and types
├── lib/              # Shared utilities
├── pages/            # Page composition
├── App.tsx           # Application providers and routes
└── main.tsx          # Vite entry point
public/               # Static assets, resume, robots.txt, and sitemap.xml
```

## Languages

English, Arabic, Bengali, Chinese, French, German, Hindi, Italian, Japanese, Kannada, Korean, Malay, Malayalam, Portuguese, Russian, Spanish, Tamil, Telugu, Turkish, and Vietnamese.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
