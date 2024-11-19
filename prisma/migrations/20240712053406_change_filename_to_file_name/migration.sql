/*
  Warnings:

  - You are about to drop the column `fiename` on the `UserBoardMedia` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `UserBoardMedia` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `UserBoardMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserBoardMedia" DROP COLUMN "fiename",
DROP COLUMN "is_active",
ADD COLUMN     "fileName" TEXT NOT NULL;
