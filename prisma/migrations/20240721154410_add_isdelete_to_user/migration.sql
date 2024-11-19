-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "DropUserLog" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "dropped_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DropUserLog_pkey" PRIMARY KEY ("id")
);
