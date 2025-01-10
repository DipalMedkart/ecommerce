// require('dotenv').config(); // Load environment variables from .env file
// const { Pool } = require('pg');


// const pool = new Pool({
//   host: process.env.DB_HOST,      // Database host
//   port: process.env.DB_PORT,      // Database port
//   user: process.env.DB_USER,      // Database username
//   password: process.env.DB_PASSWORD || 'root', // Database password
//   database: process.env.DB_NAME,  // Database name

// });

// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('Password Type:', typeof process.env.DB_PASSWORD);

// const query = (text, params) => {
//     return pool.query(text, params);
//   };
  
//   // Gracefully shut down the connection pool
//   const closePool = () => {
//     return pool.end();
//   };
  
//   // Export the query and closePool functions
//   module.exports = {
//     query,
//     closePool
//   }

// // module.exports = {
// //   pool
// // };


// // const { Sequelize } = require('sequelize');
// // require('dotenv').config(); // Load environment variables

// // // Initialize Sequelize instance
// // const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, "root", {
// //   host: process.env.DB_HOST,
// //   dialect: 'postgres',
 
// // });

// // // Export the connection for reuse
// // module.exports = sequelize;

const { Pool } = require('pg');

// Configuration for PostgreSQL connection
const pool = new Pool({
  user: 'postgres',        
  host: 'localhost',        
  database: 'ecommerce',
  password: 'root',
  port: 5432,              
});

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,               
// });

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to the database');
  release();
});

module.exports = pool;
