-- Update existing departments with icons
UPDATE departments SET icon = '💻' WHERE slug = 'computer';
UPDATE departments SET icon = '📡' WHERE slug = 'ec';

-- Verify the updates
SELECT slug, name, icon, accentColor FROM departments;
