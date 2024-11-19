/*
  Warnings:

  - You are about to drop the column `userId` on the `dropped_user_log` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `dropped_user_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dropped_user_log" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;
