-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('DELETED', 'NORMAL');

-- AlterTable
ALTER TABLE "user_board_comments" ADD COLUMN     "status" "CommentStatus" NOT NULL DEFAULT 'NORMAL';
