const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/db'); 


// Signup controller
// const signup = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: 'Name, email, and password are required.' });
//   }

//   try {
//     // Check if the email is already in use
//     const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (existingUser.rows.length > 0) {
//       return res.status(400).json({ message: 'Email is already registered.' });
//     }

//     // Validate role
//     const validRoles = ['Customer', 'Admin']; 
//     let userRole = 'Customer'; 

//     // If role is provided and the logged-in user is an Admin, assign it
//     if (req.user && req.user.role === 'Admin' && role) {
//       if (!validRoles.includes(role)) {
//         return res.status(400).json({ message: `Invalid role. Valid roles are: ${validRoles.join(', ')}` });
//       }
//       userRole = role;
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save the user to the database
//     const result = await pool.query(
//       'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
//       [name, email, hashedPassword, userRole]
//     );

//     res.status(201).json({ message: 'User created successfully.', user: result.rows[0] });
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating user.', error: err.message });
//   }
// };

const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
    // Check if the email is already in use
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Validate and assign role
    const validRoles = ['Customer', 'Admin'];
    const userRole = role && validRoles.includes(role) ? role : 'Customer';

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, userRole]
    );

    res.status(201).json({
      message: 'User created successfully.',
      user: {
        id: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email,
        role: result.rows[0].role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user.', error: err.message });
  }
};






// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if the user exists
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // console.log('User:', user);
    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role || 'Customer' },
      process.env.JWT_SECRET,
      { expiresIn: '10d' }
    );

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in.', error: err.message });
  }
};

module.exports = { signup, login };
