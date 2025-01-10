

const db = require('./db');

// Test a query
(async () => {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('Database connected successfully:', result.rows[0]);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();







