-- This is an empty migration.
ALTER TABLE orders
    ALTER COLUMN upload_image_url TYPE TEXT[] USING ARRAY[upload_image_url];