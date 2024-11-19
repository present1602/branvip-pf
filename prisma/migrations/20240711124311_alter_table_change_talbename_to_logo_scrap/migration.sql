/*
  Warnings:

  - You are about to drop the `LogoScrap` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LogoScrap" DROP CONSTRAINT "LogoScrap_trademark_id_fkey";

-- DropForeignKey
ALTER TABLE "LogoScrap" DROP CONSTRAINT "LogoScrap_user_id_fkey";

-- DropTable
DROP TABLE "LogoScrap";

-- CreateTable
CREATE TABLE "logo_scrap" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "trademark_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logo_scrap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "logo_scrap" ADD CONSTRAINT "logo_scrap_trademark_id_fkey" FOREIGN KEY ("trademark_id") REFERENCES "trademark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logo_scrap" ADD CONSTRAINT "logo_scrap_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
