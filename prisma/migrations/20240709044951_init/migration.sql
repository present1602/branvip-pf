-- CreateEnum
CREATE TYPE "ApplicantType" AS ENUM ('INDIVIDUAL', 'COMPANY');

-- CreateEnum
CREATE TYPE "OperationStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('INIT', 'PENDING', 'PAYMENTED');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('ALL', 'DESIGN', 'APPLICATION');

-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('DESIGN', 'APPLICATION', 'APPLICATION_WITH_DESIGN');

-- CreateEnum
CREATE TYPE "TargetGender" AS ENUM ('FEMALE', 'MALE', 'ALL');

-- CreateTable
CREATE TABLE "ApplicantTrademark" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applicant_id" TEXT NOT NULL,
    "application_number" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "ApplicantTrademark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_mailing" BOOLEAN,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "token" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_code" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banners" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image_url_pc" TEXT NOT NULL,
    "image_url_mobile" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "link" TEXT,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" SERIAL NOT NULL,
    "contact_type" VARCHAR,
    "contact_message" VARCHAR,
    "phone_number" VARCHAR,
    "name" VARCHAR,
    "email" VARCHAR,
    "status" VARCHAR NOT NULL DEFAULT 'new',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_price" (
    "id" SERIAL NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_trademark" (
    "id" SERIAL NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "trademark_id" INTEGER NOT NULL,

    CONSTRAINT "contact_trademark_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_trademark_v2" (
    "id" SERIAL NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "application_number" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "contact_trademark_v2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "help_guide" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seq" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "help_guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "label" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR,
    "type" VARCHAR NOT NULL DEFAULT 'mood',
    "color" VARCHAR(10),
    "bg-color" VARCHAR(10),
    "thumbnail_url" VARCHAR,
    "image_url" VARCHAR,
    "description" TEXT,

    CONSTRAINT "label_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logo_type" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "sub_label" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,

    CONSTRAINT "logo_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_id" TEXT NOT NULL,
    "type" "PricingType" NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "features" TEXT[],

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_reference_trademarks" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_id" TEXT NOT NULL,
    "application_number" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "order_reference_trademarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "type" "OrderType" NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'INIT',
    "operation_status" "OperationStatus" NOT NULL DEFAULT 'PENDING',
    "brand_name" TEXT,
    "brand_meaning" TEXT,
    "brand_service" TEXT,
    "is_logo_included" BOOLEAN DEFAULT false,
    "is_wordmark_included" BOOLEAN DEFAULT false,
    "trademark_name_kr" TEXT,
    "trademark_name_en" TEXT,
    "trademark_image_url" TEXT,
    "target_gender" "TargetGender",
    "selected_moods" TEXT[],
    "product_type_codes" TEXT[],
    "reference_ai_image_urls" TEXT[],
    "total_price" INTEGER NOT NULL,
    "service_introduction" TEXT,
    "application_multiplier" INTEGER NOT NULL DEFAULT 0,
    "ten_percent_discount_amount" INTEGER NOT NULL DEFAULT 0,
    "total_patent_office_fee" INTEGER NOT NULL DEFAULT 0,
    "is_two_application" BOOLEAN DEFAULT false,
    "logo_type" TEXT,
    "recommend_logo_image_path" TEXT[],
    "colors" TEXT[],
    "other_request" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "regular_price" INTEGER,
    "type" "PricingType" NOT NULL,
    "features" TEXT[],
    "primary_features" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "period_text" TEXT,
    "description" TEXT,
    "patent_office_fee" INTEGER,

    CONSTRAINT "pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_items" (
    "id" SERIAL NOT NULL,
    "product_select_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "product_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_select" (
    "id" SERIAL NOT NULL,
    "img_path" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "product_select_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_type" (
    "code" VARCHAR(2) NOT NULL,
    "title" VARCHAR NOT NULL,
    "is_shown" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "product_type_pk" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "recommend_logo" (
    "id" SERIAL NOT NULL,
    "image_path" TEXT NOT NULL,
    "logo_type_id" INTEGER NOT NULL,
    "bg_color" TEXT NOT NULL DEFAULT 'FFFFFF',

    CONSTRAINT "recommend_logo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trademark" (
    "id" SERIAL NOT NULL,
    "application_number" VARCHAR,
    "application_date" DATE,
    "app_reference_number" VARCHAR,
    "reg_reference_number" VARCHAR,
    "registration_number" VARCHAR,
    "registration_date" DATE,
    "public_number" VARCHAR,
    "public_date" DATE,
    "trademark_name" VARCHAR,
    "trademark_name_name_en" VARCHAR,
    "last_disposal_code_name" VARCHAR,
    "last_disposal_date" DATE,
    "international_register_number" VARCHAR,
    "international_register_date" DATE,
    "type_code" VARCHAR,
    "kind_code_name" VARCHAR,
    "application_status" VARCHAR,
    "title" VARCHAR,
    "image_url" VARCHAR,
    "thumbnail_url" VARCHAR,
    "applicant_name" VARCHAR,
    "agent_name" VARCHAR,
    "registration_rightholder_name" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_connected_kipris" BOOLEAN,
    "applicant_code" VARCHAR,
    "applicant_address" VARCHAR,
    "agent_address" VARCHAR,
    "agent_code" VARCHAR,

    CONSTRAINT "trademark_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trademark_label" (
    "id" SERIAL NOT NULL,
    "trademark_id" INTEGER NOT NULL,
    "label_id" INTEGER NOT NULL,

    CONSTRAINT "trademark_label_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trademark_product_type" (
    "trademark_id" INTEGER NOT NULL,
    "product_type_code" VARCHAR(2) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "trademark_vienna_code" (
    "id" SERIAL NOT NULL,
    "trademark_id" INTEGER NOT NULL,
    "vienna_code" VARCHAR(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trademark_vienna_code_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_applicants" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "type" "ApplicantType",
    "register_number" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "signature_url" TEXT DEFAULT '',
    "applicant_number" TEXT,
    "address" TEXT,
    "addressDetail" TEXT,
    "addressPostCode" TEXT,
    "name_en" TEXT,
    "is_verification" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_applicants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_board_comments" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "board_id" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL,

    CONSTRAINT "user_board_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_boards" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "action_link" TEXT,

    CONSTRAINT "user_boards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_payment_methods" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "card_name" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "billing_key" TEXT NOT NULL,

    CONSTRAINT "user_payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "phone_number" TEXT,
    "agree_service_terms" BOOLEAN NOT NULL DEFAULT true,
    "agree_privacy_terms" BOOLEAN DEFAULT true,
    "agreed_terms_at" TIMESTAMP(3),
    "password" TEXT,
    "isadmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "vienna_code" (
    "code" VARCHAR(6) NOT NULL,
    "parent_code" VARCHAR(6),
    "title" VARCHAR,
    "note" VARCHAR,

    CONSTRAINT "vienna_code_pk" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE INDEX "user_idx" ON "PasswordResetToken"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "label_id_uindex" ON "label"("id");

-- CreateIndex
CREATE INDEX "pricing_type_index" ON "pricing"("type");

-- CreateIndex
CREATE UNIQUE INDEX "product_type_code_uindex" ON "product_type"("code");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "trademark_id_uindex" ON "trademark"("id");

-- CreateIndex
CREATE UNIQUE INDEX "trademark_application_number_uindex" ON "trademark"("application_number");

-- CreateIndex
CREATE UNIQUE INDEX "trademark_app_reference_number_uindex" ON "trademark"("app_reference_number");

-- CreateIndex
CREATE UNIQUE INDEX "trademark_international_register_number_uindex" ON "trademark"("international_register_number");

-- CreateIndex
CREATE UNIQUE INDEX "trademark_label_id_uindex" ON "trademark_label"("id");

-- CreateIndex
CREATE INDEX "trademark_label_label_id_index" ON "trademark_label"("label_id");

-- CreateIndex
CREATE INDEX "trademark_label_trademark_id_index" ON "trademark_label"("trademark_id");

-- CreateIndex
CREATE INDEX "trademark_product_type_product_type_code_index" ON "trademark_product_type"("product_type_code");

-- CreateIndex
CREATE INDEX "trademark_product_type_trademark_id_index" ON "trademark_product_type"("trademark_id");

-- CreateIndex
CREATE UNIQUE INDEX "trademark_product_type_trademark_id_product_type_code_key" ON "trademark_product_type"("trademark_id", "product_type_code");

-- CreateIndex
CREATE UNIQUE INDEX "trademark_vienna_code_id_uindex" ON "trademark_vienna_code"("id");

-- CreateIndex
CREATE INDEX "trademark_vienna_code_trademark_id_index" ON "trademark_vienna_code"("trademark_id");

-- CreateIndex
CREATE INDEX "trademark_vienna_code_vienna_code_index" ON "trademark_vienna_code"("vienna_code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "vienna_code_code_uindex" ON "vienna_code"("code");

-- AddForeignKey
ALTER TABLE "ApplicantTrademark" ADD CONSTRAINT "ApplicantTrademark_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "user_applicants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_price" ADD CONSTRAINT "contact_price_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_trademark" ADD CONSTRAINT "contact_trademark_contact_id_fk" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contact_trademark" ADD CONSTRAINT "contact_trademark_trademark_id_fk" FOREIGN KEY ("trademark_id") REFERENCES "trademark"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contact_trademark_v2" ADD CONSTRAINT "contact_trademark_v2_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_reference_trademarks" ADD CONSTRAINT "order_reference_trademarks_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_items" ADD CONSTRAINT "product_items_product_select_id_fkey" FOREIGN KEY ("product_select_id") REFERENCES "product_select"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommend_logo" ADD CONSTRAINT "recommend_logo_logo_type_id_fkey" FOREIGN KEY ("logo_type_id") REFERENCES "logo_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trademark_label" ADD CONSTRAINT "trademark_label_label_id_fk" FOREIGN KEY ("label_id") REFERENCES "label"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trademark_label" ADD CONSTRAINT "trademark_label_trademark_id_fk" FOREIGN KEY ("trademark_id") REFERENCES "trademark"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trademark_product_type" ADD CONSTRAINT "trademark_product_type_product_type_code_fk" FOREIGN KEY ("product_type_code") REFERENCES "product_type"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trademark_product_type" ADD CONSTRAINT "trademark_product_type_trademark_id_fk" FOREIGN KEY ("trademark_id") REFERENCES "trademark"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trademark_vienna_code" ADD CONSTRAINT "trademark_vienna_code_trademark_id_fk" FOREIGN KEY ("trademark_id") REFERENCES "trademark"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trademark_vienna_code" ADD CONSTRAINT "trademark_vienna_code_vienna_code_code_fk" FOREIGN KEY ("vienna_code") REFERENCES "vienna_code"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_applicants" ADD CONSTRAINT "user_applicants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_board_comments" ADD CONSTRAINT "user_board_comments_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "user_boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_board_comments" ADD CONSTRAINT "user_board_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_boards" ADD CONSTRAINT "user_boards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_payment_methods" ADD CONSTRAINT "user_payment_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vienna_code" ADD CONSTRAINT "vienna_code_vienna_code_code_fk" FOREIGN KEY ("parent_code") REFERENCES "vienna_code"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;
