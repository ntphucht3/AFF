-- Add missing columns to loan_packages table
ALTER TABLE loan_packages 
ADD COLUMN IF NOT EXISTS register_link TEXT,
ADD COLUMN IF NOT EXISTS detail_link TEXT;

-- Update existing records with empty strings if needed
UPDATE loan_packages 
SET register_link = COALESCE(register_link, ''),
    detail_link = COALESCE(detail_link, '')
WHERE register_link IS NULL OR detail_link IS NULL;
