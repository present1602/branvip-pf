-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "applicant_id" TEXT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "user_applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
