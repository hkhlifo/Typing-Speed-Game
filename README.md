# TypeRush - Typing Speed Game

A full-stack typing speed game where authenticated users complete a sequence of 20 randomly generated alphabets as quickly as possible.

Incorrect key presses add a 0.5-second penalty to the final score.

## Features

- User registration and login
- JWT-based authentication
- Protected game routes
- Random 20-character typing sequences
- Real-time timer starting from 0 seconds
- Progress tracking
- 0.5-second penalty for every incorrect key press
- Automatic keyboard focus during gameplay
- Local personal best score tracking
- Game result persistence using PostgreSQL
- Personal game history
- Global leaderboard
- Input validation using Zod
- Meaningful GraphQL authentication and validation errors

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Apollo Client
- Tailwind CSS

### Backend

- Bun
- TypeScript
- GraphQL Yoga
- Prisma
- PostgreSQL
- Docker Compose
- Zod
- JWT authentication

## Project Structure

```text
typing-game-speed/
├── apps/
│   ├── api/        # Bun + TypeScript + GraphQL backend
│   └── web/        # React frontend
├── docker-compose.yaml
└── README.md
```

## Prerequisites

Make sure the following are installed:

* Bun
* Docker Desktop
* Git

## Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd typing-game-speed
```

### 2. Start PostgreSQL

```bash
docker compose up -d
```

The PostgreSQL database runs through Docker Compose.

### 3. Configure backend environment variables

Create the following file:

```text
apps/api/.env
```

Add:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:55432/typing_game"
JWT_SECRET="replace-this-with-a-long-random-secret"
PORT=4000
```

### 4. Install backend dependencies

```bash
cd apps/api
bun install
```

### 5. Run Prisma migrations

```bash
bunx prisma migrate dev --config prisma7.config.ts
```

### 6. Start the backend

```bash
bun run dev
```

The GraphQL API will run at:

`http://localhost:4000/graphql`

### 7. Install frontend dependencies

Open another terminal and run:

```bash
cd apps/web
npm install
```

### 8. Start the frontend

```bash
npm run dev
```

Open the URL shown by Vite in your browser.

---

# Game Scoring

Each completed game contains exactly **20 characters**.

The final score is calculated as:

```text
Final Time = Completion Time + Penalty Time
Penalty Time = Wrong Attempts × 0.5 seconds
```

A lower final time is better.

---

# GraphQL Functionality

## Authentication

* `register`
* `login`
* `currentUser`

## Game

* `saveGameResult`
* `gameHistory`
* `bestScore`

## Leaderboard

* `leaderboard`

---

# Database

The application uses PostgreSQL with Prisma.

## Main Models

* `User`
* `GameResult`

Each game result stores:

* Completion time
* Correct characters
* Wrong attempts
* Penalty time
* Final time
* Generated sequence
* Creation timestamp

Prisma migrations are included in:

```text
apps/api/prisma/migrations
```

---

# Key Design Decisions

* GraphQL is used as the API layer for authentication, game persistence, history, and leaderboard functionality.
* JWT authentication is sent through the `Authorization` header using the Bearer token format.
* Zod validates user registration, login, and game result input.
* PostgreSQL runs inside Docker to provide a consistent local development environment.
* Prisma migrations are used for database schema versioning.
* Game logic calculates the penalty and final score on the backend before persistence.
* The leaderboard displays the best score for each user, ordered by the lowest final time.

---

# Running the Application

### Start PostgreSQL

```bash
docker compose up -d
```

### Start the API

```bash
cd apps/api
bun run dev
```

### Start the Frontend

```bash
cd apps/web
npm run dev
```

Register an account and start playing.

---

# Environment Variables Example

Create:

```text
apps/api/.env.example
```

With the following content:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:55432/typing_game"
JWT_SECRET="replace-with-a-long-random-secret"
PORT=4000
```
Important: This is only an example file. Your real .env stays private
