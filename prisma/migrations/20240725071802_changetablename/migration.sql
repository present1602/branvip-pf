/*
  Warnings:

  - You are about to drop the `DropUserLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_applicants" DROP CONSTRAINT "user_applicants_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_board_comments" DROP CONSTRAINT "user_board_comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_boards" DROP CONSTRAINT "user_boards_user_id_fkey";

-- DropTable
DROP TABLE "DropUserLog";

-- CreateTable
CREATE TABLE "dropped_user_log" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "dropped_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dropped_user_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_applicants" ADD CONSTRAINT "user_applicants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_board_comments" ADD CONSTRAINT "user_board_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_boards" ADD CONSTRAINT "user_boards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
