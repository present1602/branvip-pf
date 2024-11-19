/*
  Warnings:

  - You are about to drop the column `addressDetail` on the `user_applicants` table. All the data in the column will be lost.
  - You are about to drop the column `addressPostCode` on the `user_applicants` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `user_applicants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_applicants" DROP COLUMN "addressDetail",
DROP COLUMN "addressPostCode",
DROP COLUMN "phoneNumber",
ADD COLUMN     "address_detail" TEXT,
ADD COLUMN     "address_post_code" TEXT,
ADD COLUMN     "biz_registration_number" TEXT,
ADD COLUMN     "company_name" TEXT,
ADD COLUMN     "company_name_en" TEXT,
ADD COLUMN     "corp_registration_number" TEXT,
ADD COLUMN     "owner_email" TEXT,
ADD COLUMN     "owner_phone_number" TEXT,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "signiture_image" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_applicant_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "signiture_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "signiture_image_user_applicant_id_key" ON "signiture_image"("user_applicant_id");

-- AddForeignKey
ALTER TABLE "signiture_image" ADD CONSTRAINT "signiture_image_user_applicant_id_fkey" FOREIGN KEY ("user_applicant_id") REFERENCES "user_applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
