# AWS-Hextris-website

Node.js / Express website for **HexTris** that serves Pug-rendered pages and integrates with AWS:
- **Authentication** via **Amazon Cognito** (sign up, verify, login, logout)
- **Leaderboard / profile data** via **Amazon DynamoDB** (table: `cloud7_score`, GSI: `LeaderboardIndex`)
- Session-based auth using `express-session`

## Tech Stack
- **Server:** Node.js, Express
- **Views:** Pug
- **Logging:** morgan
- **Sessions:** express-session
- **AWS:** DynamoDB (DocumentClient) and Cognito (AWS SDK v3 client is included in dependencies)
- **Styling/Frontend:** CSS + client JS (served from `public/`)

## Project Structure (high-level)
- `app.js` – Express app entrypoint, middleware setup, routes, view engine
- `routes/`
  - `authRouter.js` – signup/login/logout/verify routes (Cognito-backed)
  - `leaderboardRouter.js` – leaderboard page route
  - `profileRouter.js` – profile page route (requires session)
- `controllers/`
  - `leaderboardController.js` – controller for leaderboard view
- `models/`
  - `scoreModel.js` – DynamoDB access for rankings, player info, and rank lookup
- `views/` – Pug templates (index/login/verify/profile/leaderboard, etc.)
- `public/` – static assets (CSS/JS/images)

## Routes
Base routes registered in `app.js`:

### `GET /`
Renders the landing page:
- View: `index`
- `pageName`: `"HexTris"`

### `/auth` (Authentication)
Implemented in `routes/authRouter.js`:
- `GET /auth/login` – render login page
- `POST /auth/login` – login with `playerId` + `password`
  - On success sets `req.session.user = { playerId, idToken }` then redirects to `/profile`
- `POST /auth/signUp` – sign up with `playerId`, `email`, `password`, then renders `verify`
- `POST /auth/verify` – confirm sign up with verification code, renders `verify`
- `POST /auth/logout` – destroys session and redirects to `/`

### `/leaderboard`
- `GET /leaderboard` – renders `leaderboard` with rankings from DynamoDB (`ScoreModel.getRankings()`)

### `/profile`
- `GET /profile` – requires a logged-in session (`req.session.user`)
  - If not logged in: redirects to `/auth/login`
  - If logged in: loads player info + rank from DynamoDB and renders `profile`

## Data Model (DynamoDB)
`models/scoreModel.js` uses region `us-west-2` and a DynamoDB table:

- **TableName:** `cloud7_score`
- **GSI:** `LeaderboardIndex`
- Rankings query uses a partition key value: `gsiPartitionKey = "leaderboard"`
- Rank is computed by querying by `scoreNegative` (stored as negative score for sorting)

## Configuration / Environment Variables
Create a `.env` file (it is ignored by git) and set at least:

- `SESSION_SECRET` – required for `express-session`
- `PORT` – optional (defaults to `3003`)
- `NODE_ENV` – set to `production` in production deployments

> Note: In production mode, the session cookie uses:
> - `secure: true`
> - `httpOnly: true`
> - `domain: "hextrixweb.jbbalahadia.ca"`

If you deploy to a different domain, update the cookie domain logic in `app.js`.

## Install & Run (Development)
Requirements: Node.js installed.

```bash
npm install
npm run dev
```

This starts the app (via nodemon) and listens on:

- `http://localhost:3003` (unless `PORT` is set)

## Running in Production
Typical approach:

```bash
npm install --omit=dev
NODE_ENV=production SESSION_SECRET="your-secret" node app.js
```

Ensure you are behind HTTPS in production so secure cookies work properly.

## Notes / Known Issues
- `controllers/authController.js` exists but is empty (routes currently call Cognito service directly).
- `controllers/profileController.js` is effectively unused/incomplete (profile behavior is implemented in `routes/profileRouter.js`).
- `routes/profileRouter.js` has a `POST /login` handler that references `html` (undefined) and likely should be removed or implemented.

## License
Currently marked as `UNLICENSED` in `package.json`.
