
# LinkShort

A full-stack URL shortener monorepo. Built with Next.js 16 + React 19 on the frontend and NestJS on the backend, backed by Firebase Firestore.

## Packages

| Package | Description | Default Port |
|---------|-------------|--------------|
| [`packages/web`](./packages/web) | Next.js frontend with Material Design 3 design system | `3000` |
| [`packages/server`](./packages/server) | NestJS REST API with Firebase Firestore | `3005` |

## Prerequisites

- Node.js v20 or higher
- npm
- Firebase project with Firestore enabled

## Quick Start

```bash
# 1. Install all dependencies
make install

# 2. Configure environment variables
cp packages/server/.env.example packages/server/.env
cp packages/web/.example.env packages/web/.env.local
# Edit both files with your Firebase credentials and API URLs

# 3. Start development servers (web + server concurrently)
make dev
```

## Available Commands

```
make help          Show all available commands with port defaults

make install       Install dependencies for all packages
make dev           Start both web and server in development mode
make dev-web       Start only the web frontend
make dev-server    Start only the server backend
make build         Build both packages for production
make start         Start server in production mode
make preview       Preview web production build
make lint          Run ESLint on all packages
make format        Format code with Prettier across all packages
make clean         Remove build artifacts and node_modules
make check         Verify required tools are installed
make status        Show current install and build state
```

## Port Configuration

Default ports are defined as Makefile variables and can be overridden at invocation without editing any files:

```bash
# Override web port only
make dev WEB_PORT=4000

# Override server port only
make dev SERVER_PORT=3010

# Override both
make dev WEB_PORT=4000 SERVER_PORT=3010

# Works for any command that starts a server
make dev-web WEB_PORT=4000
make dev-server SERVER_PORT=3010
make start SERVER_PORT=3010
make preview WEB_PORT=4000
```

**How it works under the hood:**

Both frameworks receive their port via an inline `PORT=` environment variable prepended to the npm command (e.g. `PORT=4000 npm run dev`):

- **Next.js** — supports `PORT=<n> next dev` as documented in the [official CLI reference](https://nextjs.org/docs/app/api-reference/cli/next). Note: `PORT` cannot be set in `.env` because the HTTP server initialises before env files are loaded.
- **NestJS** — has no `--port` CLI flag. The application reads `process.env.PORT` inside `main.ts` at bootstrap (`app.listen(process.env.PORT ?? 3005)`), so the same inline env var approach applies ([NestJS configuration docs](https://docs.nestjs.com/techniques/configuration)).

## Environment Setup

**Server** (`packages/server/.env`):
```env
# Copy from packages/server/.env.example
FIREBASE_PROJECT_ID=your-project-id
# ... other Firebase credentials
```

**Web** (`packages/web/.env.local`):
```env
# Copy from packages/web/.example.env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3005
```

> If you change `SERVER_PORT`, update `NEXT_PUBLIC_API_BASE_URL` in `packages/web/.env.local` to match.

## Tech Stack

**Frontend**
- [Next.js 16](https://nextjs.org/) with App Router
- [React 19](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/) with custom Material Design 3 tokens
- [Zod](https://zod.dev/) for client-side validation
- [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode

**Backend**
- [NestJS 11](https://nestjs.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) + [Typesaurus](https://typesaurus.com/) for Firestore
- [class-validator](https://github.com/typestack/class-validator) for request validation

## Project Structure

```
link-shortener/
├── packages/
│   ├── web/          # Next.js frontend
│   └── server/       # NestJS backend
├── Makefile          # Monorepo orchestration
└── README.md
```
