/*
  Warnings:

  - You are about to drop the `verificationtokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "verificationtokens";

-- CreateTable
CREATE TABLE "Verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Verificationtokens_token_key" ON "Verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Verificationtokens_identifier_token_key" ON "Verificationtokens"("identifier", "token");
