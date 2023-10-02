-- CreateTable
CREATE TABLE "Following" (
    "followerId" INTEGER NOT NULL,
    "followeeId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Following_followeeId_followerId_key" ON "Following"("followeeId", "followerId");

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_followeeId_fkey" FOREIGN KEY ("followeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
