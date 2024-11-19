/*
  Warnings:

  - You are about to drop the column `isadmin` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "isadmin",
ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false;
