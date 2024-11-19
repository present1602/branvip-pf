-- CreateTable
CREATE TABLE "UserBoardMedia" (
    "id" SERIAL NOT NULL,
    "fiename" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "user_board_id" TEXT NOT NULL,

    CONSTRAINT "UserBoardMedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBoardMedia" ADD CONSTRAINT "UserBoardMedia_user_board_id_fkey" FOREIGN KEY ("user_board_id") REFERENCES "user_boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
