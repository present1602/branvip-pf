-- DB sql 작성
CREATE TABLE AuthCode
(
    id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email     VARCHAR(255)                               NOT NULL,
    code      VARCHAR(255)                               NOT NULL,
    createdAt TIMESTAMP        DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE auth_code
(
    id         SERIAL PRIMARY KEY,
    email      VARCHAR(255)                        NOT NULL,
    code       VARCHAR(255)                        NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- email 로그인으로 인한 password table 생성
ALTER TABLE users
    ADD COLUMN password VARCHAR(255);

CREATE TABLE "PasswordResetToken"
(
    "token"     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userEmail" TEXT        NOT NULL,
    "expiresAt" TIMESTAMPTZ NOT NULL,
    CONSTRAINT "PasswordResetToken_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users" ("email") ON DELETE CASCADE
);

CREATE INDEX "user_idx" ON "PasswordResetToken" ("userEmail");

-- banner table 생성

CREATE TABLE banners
(
    id               SERIAL PRIMARY KEY,
    title            VARCHAR(255) NOT NULL,
    image_url_pc     TEXT         NOT NULL,
    image_url_mobile TEXT         NOT NULL,
    start_date       TIMESTAMP    NOT NULL,
    end_date         TIMESTAMP    NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

ALTER TABLE banners
    ADD COLUMN description TEXT;


ALTER TABLE banners
    ADD COLUMN link varchar(255);

-- admin 권한 부여
ALTER TABLE users
    ADD COLUMN isAdmin boolean DEFAULT false;

-- -- 초기설정
-- UPDATE users SET isAdmin = false WHERE users.isAdmin IS NULL;


-- product_select 테이블 생성
CREATE TABLE product_select
(
    id       SERIAL PRIMARY KEY,
    img_path TEXT NOT NULL,
    title    TEXT NOT NULL
);

-- product_items 테이블 생성
CREATE TABLE product_items
(
    id                SERIAL PRIMARY KEY,
    product_select_id INT  NOT NULL,
    code              TEXT NOT NULL,
    title             TEXT NOT NULL,
    index             INT  NOT NULL,
    FOREIGN KEY (product_select_id) REFERENCES product_select (id) ON DELETE CASCADE
);

-- -- code를 text로
-- ALTER TABLE product_items ALTER COLUMN code TYPE TEXT;

-- index를 autoincrement 설정
-- ALTER TABLE product_items alter column index type GENERATED ALWAYS AS IDENTITY;

-- Logo Type 테이블 생성
CREATE TABLE logo_type
(
    id         SERIAL PRIMARY KEY,
    label      TEXT,
    sub_label  TEXT,
    image_path TEXT
);

CREATE TABLE recommend_logo
(
    id           SERIAL PRIMARY KEY,
    image_path   TEXT NOT NULL,
    logo_type_id INT  NOT NULL,
    bg_color     TEXT,
    FOREIGN KEY (logo_type_id) REFERENCES logo_type (id) ON DELETE CASCADE
);

-- 로고 타입이 없어서 컬럼을 추가함
ALTER TABLE orders
    ADD COLUMN logo_type TEXT;
-- ALTER TABLE orders ADD COLUMN recommend_logo_ids INT[];

ALTER TABLE orders
    ADD COLUMN recommend_logo_image_path TEXT[];

ALTER TABLE orders
    ADD COLUMN colors TEXT[];

ALTER TABLE orders
    ADD COLUMN other_request TEXT;

-- applicants 제약조건 변경
alter table public.user_applicants
    alter column type drop not null;

alter table public.user_applicants
    alter column register_number drop not null;

alter table public.user_applicants
    alter column signature_url drop not null;

alter table public.user_applicants
    alter column address drop not null;

alter table public.user_applicants
    alter column "addressDetail" drop not null;

alter table public.user_applicants
    alter column "addressPostCode" drop not null;


ALTER TABLE public.user_applicants
    ADD COLUMN "is_verification" BOOLEAN DEFAULT false;


-- ALTER TABLE my_table ALTER COLUMN my_column TYPE TEXT[];

select * from users;

ALTER TABLE "ApplicantTrademark"
ADD CONSTRAINT "fk_applicant_id"
FOREIGN KEY ("applicant_id")
REFERENCES "user_applicants"(id);

TRUNCATE TABLE "_prisma_migrations";
