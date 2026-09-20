# Cendi Automation

Playwright test automation for Cendi, covering UI and API login flows.

## Tech stack

- [Playwright Test](https://playwright.dev/) (TypeScript)
- Node.js
- `dotenv` for local environment configuration

## Project structure

```
.
├── Utils/
│   └── helperMethods.ts        # Shared test helpers (e.g. capturing a response tied to a UI action)
├── tests/
│   ├── PageObjects/
│   │   ├── LoginPage.ts        # Page object for the login screen
│   │   └── MFAPage.ts          # Page object for the MFA/verification screen
│   └── Tests/
│       ├── API/
│       │   └── login.spec.ts   # API tests for the login endpoint
│       └── UI/
│           └── login.spec.ts   # End-to-end UI tests for login
├── .env                         # Local environment variables (see below)
├── playwright.config.ts         # Playwright configuration (projects, base URL, etc.)
└── tsconfig.json
```

Playwright is configured with two projects (see `playwright.config.ts`):

- **UI Tests** — runs specs in `tests/Tests/UI` against Desktop Chrome
- **API Tests** — runs specs in `tests/Tests/API`

Both projects currently point `baseURL` at a shared ngrok tunnel.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm

## Getting started

1. **Clone the repo and install dependencies**

   ```bash
   git clone <repo-url>
   cd Cendi_Automation
   npm install
   ```

2. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

3. **Configure environment variables**

   The UI login spec reads test credentials from environment variables via `dotenv`. Create a `.env` file in the project root with:

   ```
   DEV_EMAIL=<test-account-email>
   DEV_PASSWORD=<test-account-password>
   ```

   > **Note:** A `.env` file with real-looking credentials is currently committed to this repository. Treat those credentials as compromised, rotate them, and stop tracking `.env` in git going forward (see [Security note](#security-note) below).

4. **Run the tests**

   ```bash
   npx playwright test
   ```

   Run a single project:

   ```bash
   npx playwright test --project="UI Tests"
   npx playwright test --project="API Tests"
   ```

   Run a specific file:

   ```bash
   npx playwright test tests/Tests/UI/login.spec.ts
   ```

   Run in headed mode / with the UI mode runner:

   ```bash
   npx playwright test --headed
   npx playwright test --ui
   ```

5. **View the HTML report**

   ```bash
   npx playwright show-report
   ```

## CI

A GitHub Actions workflow (`.github/workflows/playwright.yml`) runs the full Playwright suite on pushes and pull requests to `main`/`master` and uploads the HTML report as a build artifact.

## Security note

`.env` is currently **not** in `.gitignore` and has already been committed with what appear to be real credentials. Before relying on this repo further:

1. Rotate the `DEV_EMAIL` / `DEV_PASSWORD` credentials for the affected account.
2. Remove `.env` from git tracking (`git rm --cached .env`) and add it to `.gitignore`.
3. If this repo is or will be public, consider scrubbing `.env` from git history as well.
