-- CreateTable
CREATE TABLE "GolfShotBasic" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "golfClubId" INTEGER NOT NULL,
    "left" BOOLEAN,
    "right" BOOLEAN,
    "onTarget" BOOLEAN,
    "long" BOOLEAN,
    "short" BOOLEAN,
    "pinHigh" BOOLEAN,

    CONSTRAINT "GolfShotBasic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GolfClub" (
    "id" SERIAL NOT NULL,
    "club" TEXT NOT NULL,
    "brand" TEXT,
    "model" TEXT,

    CONSTRAINT "GolfClub_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GolfShotBasic" ADD CONSTRAINT "GolfShotBasic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GolfShotBasic" ADD CONSTRAINT "GolfShotBasic_golfClubId_fkey" FOREIGN KEY ("golfClubId") REFERENCES "GolfClub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
