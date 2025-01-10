const jwt = require('jsonwebtoken');

// Middleware to verify Admin role
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  try {
    const { role } = jwt.verify(token, process.env.JWT_SECRET);
    if (role !== 'Admin') {
      return res.status(403).json({ message: 'Only Admin can access.' });
    }

    next(); 
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = verifyAdmin;
