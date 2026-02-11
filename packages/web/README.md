# LinkShort Web Application

A modern, performant URL shortener web application built with Next.js 16, React 19, and TypeScript. Features a custom Material Design 3 inspired design system with dark/light theme support.

## 🚀 Features

- **URL Shortening**: Create short, memorable links with optional custom aliases
- **Theme Support**: Automatic dark/light theme with system preference detection
- **Type Safety**: Full TypeScript implementation with Zod validation
- **Responsive Design**: Mobile-first, accessible UI built with Tailwind CSS
- **Custom Design System**: Material Design 3 inspired tokens and components
- **Client-Side Validation**: Immediate feedback with Zod schemas
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **API Integration**: Type-safe API client with request/response validation

## 📋 Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun package manager

## 🛠️ Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Environment configuration**:

Copy `.example.env` to `.env.local` for development or `.env.production` for production:
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

## 🏃 Running the Application

**Development mode** (with hot reload):
```bash
npm run dev
```

**Production build**:
```bash
npm run build
npm start
```

**Linting**:
```bash
npm run lint
```

**Formatting**:
```bash
npm run format
```

## 📁 Project Structure

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
├── hooks/                 # Custom React hooks
│   └── useLinkShortener.ts    # Link shortening hook
├── lib/
│   ├── api-client.ts      # HTTP client with error handling
│   └── config.ts          # Environment configuration
├── services/              # API service layer
│   └── link-shortener.service.ts
├── styles/
│   ├── theme/             # Light/dark theme CSS variables
│   └── globals.css        # Global styles and design tokens
├── utils/                 # Utility functions
│   ├── cn.util.ts         # Class name utility
│   └── polymorphic.util.ts    # Polymorphic component types
└── validators/            # Zod validation schemas
    ├── common.validator.ts
    ├── link-shortener.validator.ts
    └── index.ts
```

## 🎨 Design System

The application uses a custom design system based on Material Design 3 principles:

- **Color System**: Semantic color tokens (primary, secondary, tertiary, error, success, warning, info)
- **Typography**: Responsive type scale with WCAG 2.2 compliant line-heights
- **Spacing**: Consistent 4px base spacing scale
- **Elevation**: Shadow system for depth and hierarchy
- **Motion**: Standardized duration and easing curves
- **Accessibility**: WCAG 2.1 AA compliant with proper touch targets and focus indicators

All design tokens are defined in `styles/globals.css` and mapped to Tailwind CSS utilities in `tailwind.config.js`.

## 🔌 API Integration

The application communicates with a backend API using a custom fetch-based client:

**Endpoints**:
- `POST /shorten` - Create a new short link

**Request/Response Flow**:
1. User input → Zod validation (client-side)
2. API request via `apiClient` → Backend validation
3. Response → Type-safe DTO → UI update

**Configuration**:
API base URL is configured via `NEXT_PUBLIC_API_BASE_URL` environment variable and validated at startup in `lib/config.ts`.

## 🧪 Validation

Client-side validation using Zod schemas prevents invalid requests:

- **URL Validation**: Must be valid HTTP/HTTPS URL
- **Custom Alias**: 3-50 characters, alphanumeric with hyphens/underscores
- **XSS Prevention**: Input sanitization before API calls

Validation schemas are located in `validators/` directory and match backend validation rules.

## 🎭 Theming

Theme system powered by `next-themes`:

- **Automatic Detection**: Respects system preference by default
- **Manual Toggle**: Switch between light/dark modes
- **No FOUC**: Theme applied before React hydration
- **Persistent**: Theme preference saved to localStorage

Theme colors defined in:
- `styles/theme/light.css` - Light mode tokens
- `styles/theme/dark.css` - Dark mode tokens

## 📱 Responsive Design

Mobile-first approach with Tailwind CSS breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with touch-optimized interactions.

## ♿ Accessibility

- **WCAG 2.1 Level AA** compliant
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Semantic HTML and ARIA labels
- **Focus Indicators**: Visible focus states
- **Color Contrast**: Minimum 4.5:1 for text
- **Touch Targets**: Minimum 44×44px for interactive elements

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript compiler options
- `tailwind.config.js` - Tailwind CSS with custom design tokens
- `postcss.config.js` - PostCSS with Tailwind and Autoprefixer
- `eslint.config.js` - ESLint rules for Next.js and TypeScript
- `prettier.config.js` - Code formatting preferences

## 📦 Dependencies

**Core**:
- `next` - React framework with App Router
- `react` & `react-dom` - UI library
- `next-themes` - Theme management
- `lucide-react` - Icon library
- `zod` - Schema validation

**Development**:
- `typescript` - Type system
- `tailwindcss` - Utility-first CSS
- `eslint` - Code linting
- `prettier` - Code formatting

See `package.json` for complete dependency list.

## 🐛 Troubleshooting

**"API_BASE_URL not defined" error**:
- Ensure `.env.local` exists with `NEXT_PUBLIC_API_BASE_URL` set
- Restart development server after changing environment variables

**Type errors**:
- Run `npm run build` to check for TypeScript errors
- Ensure all imports reference correct paths