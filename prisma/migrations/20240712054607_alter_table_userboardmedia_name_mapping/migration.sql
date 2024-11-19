/*
  Warnings:

  - You are about to drop the `UserBoardMedia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBoardMedia" DROP CONSTRAINT "UserBoardMedia_user_board_id_fkey";

-- DropTable
DROP TABLE "UserBoardMedia";

-- CreateTable
CREATE TABLE "user_board_media" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_board_id" TEXT NOT NULL,

    CONSTRAINT "user_board_media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_board_media" ADD CONSTRAINT "user_board_media_user_board_id_fkey" FOREIGN KEY ("user_board_id") REFERENCES "user_boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
