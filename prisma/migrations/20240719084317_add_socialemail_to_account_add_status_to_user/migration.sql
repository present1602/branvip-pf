-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('NORMAL', 'DROPPED', 'SUSPENDED', 'DORMANT');

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "social_email" TEXT;

-- AlterTable
ALTER TABLE "user_applicants" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "last_logged_in" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'NORMAL',
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
