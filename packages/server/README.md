# LinkShort Server

Backend API service for the LinkShort URL shortener. Built with NestJS and TypeScript, using Firebase Firestore as the database via Typesaurus.

## Architecture

```
         HTTP Request
              │
              ▼
┌─────────────────────────┐
│       Controller        │
│  link-shortener.ctrl    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│        Service          │
│  link-shortener.svc     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐     ┌──────────────────┐
│       Repository        │────►│  Firebase        │
│  link-shortener.repo    │     │  Firestore       │
└─────────────────────────┘     └──────────────────┘
```

## Tech Stack

- **Framework:** [NestJS](https://nestjs.com/) — A progressive Node.js framework
- **Language:** TypeScript 5.x
- **Database:** Firebase Firestore via [Typesaurus](https://typesaurus.com/)
- **Validation:** class-validator & class-transformer
- **Testing:** Jest

## Prerequisites

- Node.js v20 or higher
- npm or yarn
- Firebase project with Firestore enabled

## Environment Setup

Create a `.env` file in the server directory based on `.env.example`:

```bash
cp .env.example .env
```

Configure your Firebase credentials and other environment variables in the `.env` file.

## Getting Started

**Install dependencies:**

```bash
npm install
```

**Development** (with hot-reload):

```bash
npm run start:dev
```

The server starts on the port specified in your environment configuration (default: `http://localhost:3005`).

**Production:**

```bash
npm run build
npm run start:prod
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start the application |
| `npm run start:dev` | Start development server with watch mode |
| `npm run start:debug` | Start with debugging enabled |
| `npm run start:prod` | Start production server |
| `npm run build` | Build the application for production |
| `npm run lint` | Lint and auto-fix code |
| `npm run format` | Format code with Prettier |

## Project Structure

```
server/
├── src/
│   ├── config/           # Configuration modules
│   ├── lib/              # Shared libraries and utilities
│   ├── link-shortener/   # Link shortener feature module
│   ├── app.module.ts     # Root application module
│   ├── app.controller.ts # Root controller
│   ├── app.service.ts    # Root service
│   └── main.ts           # Application entry point
├── .env                  # Environment variables (create from .env.example)
├── .env.example          # Environment template
├── nest-cli.json         # NestJS CLI configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── tsconfig.build.json   # Build-specific TypeScript config
```

## API

The API follows RESTful principles and provides endpoints for URL shortening operations. Once the server is running, the API is accessible at the configured base URL.

## Code Quality

- **ESLint:** TypeScript-aware linting with recommended rules (`eslint.config.mjs`)
- **Prettier:** Single quotes and trailing commas (`.prettierrc`)