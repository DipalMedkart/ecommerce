const pool = require('../db/db');  

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, role FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the user exists
    const userCheck = await pool.query("SELECT id FROM users WHERE id = $1", [
      id,
    ]);

    if (userCheck.rowCount === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    // Delete the user
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user." });
  }
};

// get the number of total users
const getUsersCount = async(req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) AS count FROM users");
    res.json({ count: result.rows[0].count });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
const getOrdersCount = async(req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) AS count FROM orders");
    res.json({ count: result.rows[0].count });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const pendingOrders = async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) AS count FROM orders WHERE status = $1", ['Pending']);
    res.json({ count: result.rows[0].count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending orders" });
  }
}

module.exports = { getAllUsers, deleteUser, getUsersCount, pendingOrders, getOrdersCount};