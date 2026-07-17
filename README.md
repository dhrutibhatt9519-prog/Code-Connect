# CodeConnect

CodeConnect is a developer-focused learning and networking platform for discovering workshops, hackathons, conferences, mentorship sessions, career events, bootcamps, and open-source meetups. It pairs a polished standalone Angular frontend with a lightweight JSON Server API.

## Features

- Search, filter, and sort 12 realistic developer opportunities
- Responsive event cards with categories, skill levels, technology badges, format, pricing, and favorites
- Detailed opportunity pages with agenda, prerequisites, speakers, packages, availability, and FAQ
- Persistent favorites and light/dark theme preferences using `localStorage`
- Three-step registration wizard with package capacity, ticket quantity, participant `FormArray`, live totals, review, and confirmation
- JSON Server registration creation with unique `CC-2026-XXXXXX` references
- My Registrations dashboard with status filters and confirmation-based PATCH cancellation
- Loading, empty, error, invalid-route, submission, success, and cancellation states
- Responsive header/mobile navigation, accessible controls, keyboard focus states, and wildcard 404 page

## Technology stack

- Angular 21 standalone components (no NgModules)
- TypeScript 5.9, SCSS, Angular Router
- Reactive Forms, HttpClient, RxJS, Angular signals
- JSON Server 1.x
- Vitest through Angular's unit-test builder

## Installation

Requirements: Node.js 22 or newer and npm.

```bash
git clone <repository-url>
cd code-connect
npm install
```

## Running locally

Run the frontend and API together:

```bash
npm run dev
```

Then open [http://localhost:4200](http://localhost:4200). The API runs at [http://localhost:3000](http://localhost:3000).

Alternatively, use two terminals:

```bash
npm run api
npm start
```

Other commands:

```bash
npm run build      # production build
npm run test:ci    # one-pass unit test run
npm test           # tests in watch mode
```

The generated Angular workspace does not include an ESLint builder, so there is no lint command. Strict Angular compilation and the test suite are the available automated checks.

## Folder structure

```text
src/app/
├── core/
│   ├── constants/          # API and sample-user constants
│   ├── models/             # Opportunity and registration contracts
│   └── services/           # HTTP, favorites, and theme services
├── features/
│   ├── opportunities/      # Listing, cards, and details
│   ├── registration/       # Wizard and its four focused steps/states
│   ├── registrations/      # My Registrations dashboard
│   ├── favorites/          # Saved opportunity view
│   └── not-found/          # Wildcard route
├── layout/                 # Header and footer
├── shared/components/      # Loading, empty, and confirmation UI
├── app.config.ts
└── app.routes.ts
```

## API endpoints

The sample data lives in `db.json`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/opportunities` | List all opportunities |
| GET | `/opportunities/:id` | Fetch one opportunity |
| GET | `/registrations?userId=user1` | Fetch the sample user's registrations |
| POST | `/registrations` | Create a registration |
| PATCH | `/registrations/:id` | Update registration status |

## Screenshots

> Add screenshots here after deployment.

- Opportunities desktop view — `docs/screenshots/opportunities-desktop.png`
- Opportunity details — `docs/screenshots/opportunity-details.png`
- Registration wizard — `docs/screenshots/registration-wizard.png`
- My Registrations mobile view — `docs/screenshots/registrations-mobile.png`
- Dark theme — `docs/screenshots/dark-theme.png`

## Future improvements

- Server-side filtering and pagination for a larger catalog
- Calendar exports and registration reminder emails
- Waitlists when package capacity reaches zero
- Organizer tools and opportunity submission workflows
- End-to-end browser tests and automated accessibility audits
- Real user accounts when the product moves beyond the JSON Server prototype
