// Quick script to update departments with icons
// Run with: node scripts/quick-update.js

const { neon } = require('@neondatabase/serverless');

async function updateDepartments() {
  console.log('Updating departments with icons...');
  
  try {
    const sql = `
      UPDATE departments SET icon = '💻' WHERE slug = 'computer';
      UPDATE departments SET icon = '📡' WHERE slug = 'ec';
    `;
    
    const client = neon(process.env.DATABASE_URL);
    await client.query(sql);
    
    console.log('✅ Departments updated successfully!');
    
    // Verify updates
    const result = await client.query('SELECT slug, name, icon, accentColor FROM departments');
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
