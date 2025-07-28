-- Force refresh Supabase schema cache
NOTIFY pgrst, 'reload schema';

-- Verify columns exist
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'loan_packages' 
ORDER BY ordinal_position;
