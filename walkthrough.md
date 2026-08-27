# TypeRush – Implementation Walkthrough

## Overview

TypeRush is a full-stack typing speed game where authenticated users complete a sequence of 20 randomly generated alphabet characters as quickly as possible.

The application was built with a React frontend and a Bun + TypeScript backend using GraphQL Yoga, PostgreSQL, Prisma, and Docker Compose.

## Authentication

Users can register and log in through GraphQL mutations.

Passwords are hashed before being stored in the database. After successful authentication, the backend generates a JWT token.

The frontend stores the token locally and automatically attaches it to GraphQL requests using the Authorization header:

```text
Authorization: Bearer <token>
```

Protected backend operations validate the token and use the authenticated user's ID when saving or retrieving game data.

## Game Flow

When a game starts:

1. A random sequence of 20 alphabet characters is generated.
2. The timer starts from 0 seconds.
3. The keyboard/input remains focused for continuous typing.
4. The player progresses only when the correct key is pressed.
5. Incorrect key presses are counted.
6. Every incorrect key press adds a 0.5-second penalty.
7. After all 20 characters are completed, the final score is calculated.

The scoring formula is:

```text
Final Time = Completion Time + (Wrong Attempts × 0.5)
```

A lower final time represents a better score.

## Best Score

The user's previous best score is stored locally in the browser.

After completing a game, the application compares the latest result with the previous best score and displays whether the player achieved a new personal best or should try again.

## Backend Validation and Persistence

Game results are validated before being stored.

The backend verifies important conditions such as:

- Completion time must be greater than zero.
- Exactly 20 correct characters must be completed.
- Wrong attempts cannot be negative.
- The sequence must contain exactly 20 characters.

The backend calculates the penalty time and final time before saving the result.

Each completed game result is stored in PostgreSQL with:

- User ID
- Completion time
- Correct characters
- Wrong attempts
- Penalty time
- Final time
- Generated sequence
- Creation timestamp

## Database

The database uses PostgreSQL and is managed with Prisma.

The main models are:

- `User`
- `GameResult`

A user can have multiple game results.

Prisma migrations are included in the repository so the database schema can be reproduced easily.

PostgreSQL runs through Docker Compose to provide a consistent local development environment.

## GraphQL API

The application exposes GraphQL operations for:

### Authentication

- Register
- Login
- Current user

### Game Results

- Save game result
- Game history
- Best score

### Leaderboard

The leaderboard retrieves the best game result for each user and orders players by their lowest final time.

## Frontend

The frontend is built using React and Vite.

Apollo Client is used to communicate with the GraphQL API.

The application includes:

- Home page
- Registration page
- Login page
- Protected game page
- Personal game history
- Global leaderboard

React Router is used for navigation, and protected routes prevent unauthenticated users from accessing the game.

## Key Decisions

A few key implementation decisions were:

- Using GraphQL to keep frontend and backend communication structured.
- Calculating the final game score on the backend instead of trusting the frontend calculation.
- Using JWT authentication for protected operations.
- Using Zod for input validation.
- Using Prisma migrations for reproducible database setup.
- Using Docker Compose to run PostgreSQL consistently.
- Keeping the application structure simple and feature-based without unnecessary abstraction.

## How to Run

### 1. Start PostgreSQL

```bash
docker compose up -d
```

### 2. Start the backend

```bash
cd apps/api
bun install
bunx prisma migrate dev --config prisma7.config.ts
bun run dev
```

### 3. Start the frontend

```bash
cd apps/web
npm install
npm run dev
```

The GraphQL API runs at:

```text
http://localhost:4000/graphql
```

After starting both applications, users can register, log in, play the typing game, save completed results, view their game history, and compete on the leaderboard
