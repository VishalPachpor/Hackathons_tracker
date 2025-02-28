-- CreateTable
CREATE TABLE "Hackathon" (
    "id" TEXT NOT NULL,
    "devfolioId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "registrationDeadline" TIMESTAMP(3),
    "participantCount" INTEGER NOT NULL DEFAULT 0,
    "registrationUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "location" TEXT,
    "mode" TEXT NOT NULL,
    "prizePool" TEXT,
    "organizerName" TEXT NOT NULL,
    "organizerLogo" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hackathon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncLog" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error" TEXT,

    CONSTRAINT "SyncLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hackathon_devfolioId_key" ON "Hackathon"("devfolioId");

-- CreateIndex
CREATE INDEX "Hackathon_status_idx" ON "Hackathon"("status");

-- CreateIndex
CREATE INDEX "Hackathon_startDate_idx" ON "Hackathon"("startDate");

-- CreateIndex
CREATE INDEX "Hackathon_endDate_idx" ON "Hackathon"("endDate");
