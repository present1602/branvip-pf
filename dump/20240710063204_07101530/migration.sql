-- upload_image_url 컬럼 추가
ALTER TABLE orders
ADD COLUMN upload_image_url TEXT[];

-- 기존 데이터를 새로운 컬럼으로 이동
UPDATE orders
SET upload_image_url = ARRAY[trademark_image_url];

-- 기존 trademark_image_url 컬럼 삭제
ALTER TABLE orders
DROP COLUMN trademark_image_url;