
-- brand_meaning 컬럼을 design_requests로 변경
ALTER TABLE orders
RENAME COLUMN brand_meaning TO design_requests;

-- brand_name 컬럼을 what_to_include로 변경
ALTER TABLE orders
RENAME COLUMN brand_name TO what_to_include;