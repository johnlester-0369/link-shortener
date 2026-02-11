
# LinkShort Server

Backend API service for the LinkShort URL shortener application. Built with NestJS and TypeScript, providing a robust and scalable link management system.

## Tech Stack

- **Framework:** [NestJS](https://nestjs.com/) - A progressive Node.js framework
- **Language:** TypeScript 5.x
- **Database:** Firebase Firestore (via [Typesaurus](https://typesaurus.com/))
- **Validation:** class-validator & class-transformer
- **Testing:** Jest

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v20 or higher recommended)
- npm or yarn package manager
- Firebase project with Firestore enabled

## Environment Setup

1. Create a `.env` file in the server directory based on `.env.example`:

```bash
cp .env.example .env
```

2. Configure your Firebase credentials and other environment variables in the `.env` file.

## Getting Started

### Installation

Install dependencies:

```bash
npm install
```

### Development

Run the development server with hot-reload:

```bash
npm run start:dev
```

The server will start on the port specified in your environment configuration (default: http://localhost:3000).

### Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
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
├── dist/                 # Compiled output (generated)
├── node_modules/         # Dependencies (generated)
├── .env                  # Environment variables (create from .env.example)
├── .env.example          # Environment template
├── nest-cli.json         # NestJS CLI configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── tsconfig.build.json   # Build-specific TypeScript config
```

## API Documentation

The API follows RESTful principles and provides endpoints for URL shortening operations. Once the server is running, you can access the API at the configured base URL.

## Code Quality

This project uses ESLint and Prettier to maintain code quality and consistency:

- **ESLint:** TypeScript-aware linting with recommended rules
- **Prettier:** Automatic code formatting with single quotes and trailing commas

Configuration files:
- `eslint.config.mjs` - ESLint rules and TypeScript integration
- `.prettierrc` - Code formatting preferences