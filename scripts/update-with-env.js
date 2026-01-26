// Script to update departments using .env.local
// Run with: node scripts/update-with-env.js

const fs = require('fs');
const path = require('path');

// Read .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse DATABASE_URL from .env.local
const DATABASE_URL = envContent
  .split('\n')
  .find(line => line.startsWith('DATABASE_URL='))
  ?.split('=')[1]
  ?.trim();

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env.local');
  process.exit(1);
}

console.log('🔗 Found DATABASE_URL');

// Import Neon client
const { neon } = require('@neondatabase/serverless');

async function updateDepartments() {
  console.log('Updating departments with icons...');
  
  try {
    // Update computer department
    await client`UPDATE departments SET icon = '💻' WHERE slug = 'computer'`;
    
    // Update ec department
    await client`UPDATE departments SET icon = '📡' WHERE slug = 'ec'`;
    
    console.log('✅ Departments updated successfully!');
    
    // Verify updates
    const result = await client`SELECT slug, name, icon, accentColor FROM departments`;
    console.log('\n📋 Updated departments:');
    result.rows.forEach(row => {
      console.log(`  ${row.slug}: ${row.name} ${row.icon} (${row.accentcolor || 'default color'})`);
    });
    
  } catch (error) {
    console.error('❌ Error updating departments:', error.message);
  } finally {
    process.exit(0);
  }
}

updateDepartments();
