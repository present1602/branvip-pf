-- CreateTable
CREATE TABLE "LogoScrap" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "trademark_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogoScrap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LogoScrap" ADD CONSTRAINT "LogoScrap_trademark_id_fkey" FOREIGN KEY ("trademark_id") REFERENCES "trademark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogoScrap" ADD CONSTRAINT "LogoScrap_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
