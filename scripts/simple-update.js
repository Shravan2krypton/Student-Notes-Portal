// Simple update script using existing database connection
// Run with: npm run simple-update

const fs = require('fs');
const path = require('path');

// Read .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');

// Parse DATABASE_URL from .env.local
const DATABASE_URL = envContent
  .split('\n')
  .find(line => line.startsWith('DATABASE_URL='))
  ?.split('=')[1]
  ?.trim();

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env.local');
  console.log('Please ensure DATABASE_URL is set in your .env.local file');
  process.exit(1);
}

console.log('🔗 Found DATABASE_URL');

// Create a simple SQL update
async function updateDatabase() {
  console.log('🔄 Updating database...');
  
  try {
    // Use fetch to execute SQL via Neon API
    const response = await fetch('https://neon.tech/sql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DATABASE_URL.split('/').pop()}`,
      },
      body: JSON.stringify({
        sql: `
          UPDATE departments SET icon = '💻' WHERE slug = 'computer';
          UPDATE departments SET icon = '📡' WHERE slug = 'ec';
        `
      })
    });
    
    if (response.ok) {
      console.log('✅ Database updated successfully!');
      
      // Verify updates
      const verifyResponse = await fetch('https://neon.tech/sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DATABASE_URL.split('/').pop()}`,
        },
        body: JSON.stringify({
          sql: 'SELECT slug, name, icon, accentColor FROM departments ORDER BY slug'
        })
      });
      
      if (verifyResponse.ok) {
        const result = await verifyResponse.json();
        console.log('\n📋 Updated departments:');
        result.forEach(row => {
          console.log(`  ${row.slug}: ${row.name} ${row.icon} (${row.accentcolor || 'default color'})`);
        });
      }
    } else {
      console.error('❌ Error updating database:', response.statusText);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

updateDatabase();
