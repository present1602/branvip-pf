/*
  Warnings:

  - You are about to drop the `PriceService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PriceService" DROP CONSTRAINT "PriceService_price_measurement_id_fkey";

-- DropTable
DROP TABLE "PriceService";

-- CreateTable
CREATE TABLE "price_service" (
    "id" SERIAL NOT NULL,
    "index" INTEGER,
    "label" TEXT NOT NULL,
    "is_accent" BOOLEAN NOT NULL,
    "price_measurement_id" INTEGER NOT NULL,

    CONSTRAINT "price_service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "price_service" ADD CONSTRAINT "price_service_price_measurement_id_fkey" FOREIGN KEY ("price_measurement_id") REFERENCES "price_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
