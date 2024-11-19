/*
  Warnings:

  - You are about to drop the column `status` on the `user_board_comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_board_comments" DROP COLUMN "status",
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "CommentStatus";
