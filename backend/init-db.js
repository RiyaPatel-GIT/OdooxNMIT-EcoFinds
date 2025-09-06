const pool = require('./config/db');

const initDatabase = async () => {
  try {
    // Create users table
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        display_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await pool.query(createUsersTable);
    console.log('✅ Users table created successfully');

    // Check if any users exist
    const userCount = await pool.query('SELECT COUNT(*) FROM users');
    console.log(`📊 Total users in database: ${userCount.rows[0].count}`);

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

// Run initialization
initDatabase()
  .then(() => {
    console.log('🎉 Database initialization completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Database initialization failed:', error);
    process.exit(1);
  });
