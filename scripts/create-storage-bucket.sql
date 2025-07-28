-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('card-images', 'card-images', true);

-- Set up RLS policies for the bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'card-images');

CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'card-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update" ON storage.objects FOR UPDATE 
WITH CHECK (bucket_id = 'card-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE 
USING (bucket_id = 'card-images' AND auth.role() = 'authenticated');
