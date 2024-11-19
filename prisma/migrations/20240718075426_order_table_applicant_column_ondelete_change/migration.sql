-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_applicant_id_fkey";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "user_applicants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
