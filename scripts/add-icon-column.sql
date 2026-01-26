-- Add icon column to departments table
ALTER TABLE departments 
ADD COLUMN IF NOT EXISTS icon VARCHAR(10);

-- Update existing departments with default icons
UPDATE departments SET icon = '💻' WHERE slug = 'computer';
UPDATE departments SET icon = '📡' WHERE slug = 'ec';
