-- CreateTable
CREATE TABLE "price_measurement" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "index" INTEGER,
    "price" INTEGER NOT NULL,
    "regular_price" INTEGER,
    "type" "PricingType" NOT NULL,
    "patent_office_fee" INTEGER,

    CONSTRAINT "price_measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceService" (
    "id" SERIAL NOT NULL,
    "index" INTEGER,
    "label" TEXT NOT NULL,
    "is_accent" BOOLEAN NOT NULL,
    "price_measurement_id" INTEGER NOT NULL,

    CONSTRAINT "PriceService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PriceService" ADD CONSTRAINT "PriceService_price_measurement_id_fkey" FOREIGN KEY ("price_measurement_id") REFERENCES "price_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
