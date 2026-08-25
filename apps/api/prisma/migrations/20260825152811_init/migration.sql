-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "completionTime" DOUBLE PRECISION NOT NULL,
    "correctCharacters" INTEGER NOT NULL,
    "wrongAttempts" INTEGER NOT NULL,
    "penaltyTime" DOUBLE PRECISION NOT NULL,
    "finalTime" DOUBLE PRECISION NOT NULL,
    "sequence" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "GameResult_userId_createdAt_idx" ON "GameResult"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "GameResult_finalTime_idx" ON "GameResult"("finalTime");

-- AddForeignKey
ALTER TABLE "GameResult" ADD CONSTRAINT "GameResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
