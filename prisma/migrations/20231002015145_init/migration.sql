-- DropIndex
DROP INDEX "Comment_userId_postId_key";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");
