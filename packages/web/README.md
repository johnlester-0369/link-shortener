# LinkShort Web

URL shortener frontend built with Next.js 16, React 19, and TypeScript. Features a custom Material Design 3-inspired design system with dark/light theme support.

## Architecture

```
┌──────────────┐   ┌──────────────────────┐   ┌─────────────────┐   ┌─────────────┐
│   page.tsx   │──►│  LinkShortenerForm   │──►│ useLinkShort    │──►│  API Client │
│  App Router  │   │  components/ui/*     │   │   (hook)        │   │  :3005      │
└──────────────┘   └──────────────────────┘   └─────────────────┘   └─────────────┘
```

## Features

- **URL Shortening** — Create short links with optional custom aliases
- **Theme Support** — Automatic dark/light theme with system preference detection
- **Type Safety** — Full TypeScript with Zod validation
- **Responsive Design** — Mobile-first, accessible UI with Tailwind CSS
- **Custom Design System** — Material Design 3 inspired tokens and components
- **Client-Side Validation** — Immediate feedback with Zod schemas
- **Error Handling** — Comprehensive error handling with user-friendly messages
- **API Integration** — Type-safe API client with request/response validation

## Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

## Installation

**Install dependencies:**

```bash
npm install
```

**Environment configuration:**

```bash
cp .example.env .env.local
```

Update the API base URL:

```env
# For local development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3005

# For production
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

## Running the Application

**Development** (with hot reload):

```bash
npm run dev
```

**Production:**

```bash
npm run build
npm start
```

**Linting:**

```bash
npm run lint
```

**Formatting:**

```bash
npm run format
```

## Project Structure

```
web/
├── app/                    # Next.js App Router
│   ├── icon.tsx           # Dynamic favicon generation
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Layout components (Navbar, Footer)
│   ├── theme/             # Theme toggle component
│   ├── ui/                # Reusable UI components
│   └── LinkShortenerForm.tsx  # Main form component
├── dto/                   # Data Transfer Objects
├── hooks/
│   └── useLinkShortener.ts    # Link shortening hook
├── lib/
│   ├── api-client.ts      # HTTP client with error handling
│   └── config.ts          # Environment configuration
├── services/
│   └── link-shortener.service.ts
├── styles/
│   ├── theme/             # Light/dark theme CSS variables
│   └── globals.css        # Global styles and design tokens
├── utils/
│   ├── cn.util.ts         # Class name utility
│   └── polymorphic.util.ts
└── validators/            # Zod validation schemas
    ├── common.validator.ts
    ├── link-shortener.validator.ts
    └── index.ts
```

## Design System

Custom design system based on Material Design 3 principles:

- **Color System** — Semantic tokens (primary, secondary, tertiary, error, success, warning, info)
- **Typography** — Responsive type scale with WCAG 2.2 compliant line-heights
- **Spacing** — 4px base spacing scale
- **Elevation** — Shadow system for depth and hierarchy
- **Motion** — Standardized duration and easing curves
- **Accessibility** — WCAG 2.1 AA compliant touch targets and focus indicators

Design tokens are defined in `styles/globals.css` and mapped to Tailwind CSS utilities in `tailwind.config.js`.

## API Integration

The application communicates with the backend using a custom fetch-based client:

**Endpoints:**
- `POST /shorten` — Create a new short link

**Request/Response Flow:**
1. User input → Zod validation (client-side)
2. API request via `apiClient` → Backend validation
3. Response → Type-safe DTO → UI update

API base URL is configured via `NEXT_PUBLIC_API_BASE_URL` and validated at startup in `lib/config.ts`.

## Validation

Client-side validation with Zod prevents invalid requests:

- **URL Validation** — Must be valid HTTP/HTTPS URL
- **Custom Alias** — 3–50 characters, alphanumeric with hyphens/underscores
- **XSS Prevention** — Input sanitization before API calls

Schemas in `validators/` match backend validation rules.

## Theming

Powered by `next-themes`:

- **Automatic Detection** — Respects system preference by default
- **Manual Toggle** — Switch between light/dark modes
- **No FOUC** — Theme applied before React hydration
- **Persistent** — Theme preference saved to localStorage

Theme colors defined in `styles/theme/light.css` and `styles/theme/dark.css`.

## Responsive Design

Mobile-first with Tailwind CSS breakpoints:

- **Mobile** — < 640px
- **Tablet** — 640px–1024px
- **Desktop** — > 1024px

## Accessibility

- WCAG 2.1 Level AA compliant
- Full keyboard navigation
- Semantic HTML and ARIA labels
- Visible focus states
- Minimum 4.5:1 color contrast for text
- Minimum 44×44px touch targets

## Configuration Files

- `next.config.ts` — Next.js configuration
- `tsconfig.json` — TypeScript compiler options
- `tailwind.config.js` — Tailwind CSS with custom design tokens
- `postcss.config.js` — PostCSS with Tailwind and Autoprefixer
- `eslint.config.js` — ESLint rules for Next.js and TypeScript
- `prettier.config.js` — Code formatting preferences

## Dependencies

**Core:** `next`, `react`, `react-dom`, `next-themes`, `lucide-react`, `zod`

**Development:** `typescript`, `tailwindcss`, `eslint`, `prettier`

See `package.json` for the complete dependency list.

## Troubleshooting

**"API_BASE_URL not defined" error:**
- Ensure `.env.local` exists with `NEXT_PUBLIC_API_BASE_URL` set
- Restart the development server after changing environment variables

**Type errors:**
- Run `npm run build` to check for TypeScript errors
- Ensure all imports reference correct paths