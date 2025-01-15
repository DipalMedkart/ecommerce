const pool = require('../db/db'); 


// 1. create an order

const createOrder = async (req, res) => {
    const { user_id, items, status = 'Pending'} = req.body; // Default to 'Pending' if status is not provided.

    if (!user_id || !items || items.length === 0) {
        return res.status(400).json({ error: 'User ID and order items are required' });
    }

    try {
        // Start a transaction
        await pool.query('BEGIN');

        let billAmount = 0;

        items.forEach(item => {
            // console.log(`Item Sales Price: ${item.sales_price}, Quantity: ${item.quantity}`); // Log MRP and Quantity for debugging
            // billAmount += item.mrp * item.quantity;  // Ensure this calculation is correct
            billAmount += item.sales_price * item.quantity;  // Ensure this calculation is correct
        });
        billAmount = parseFloat(billAmount.toFixed(2)); 
        // const billAmount = items.reduce((total, item) => total + (item.mrp * item.quantity), 0);
        console.log(billAmount);

        // const finalBillAmount = bill_amount || billAmount;

        // Insert into Orders table with the status (default 'Pending')
        // const orderResult = await pool.query(
        //     `INSERT INTO Orders (user_id, status) VALUES ($1, $2) RETURNING *`,
        //     [user_id, status]
        // );

        const orderResult = await pool.query(
            `INSERT INTO Orders (user_id, status, bill_amount) VALUES ($1, $2, $3) RETURNING *`,
            [user_id, status, billAmount]
        );

        const orderId = orderResult.rows[0].id;

        // Insert into Order_Items table for each product in the order
        const orderItemsQuery = `
            INSERT INTO Order_Items (order_id, product_id, quantity) VALUES ($1, $2, $3)
        `;
        for (const item of items) {
            await pool.query(orderItemsQuery, [orderId, item.product_id, item.quantity]);
        }

        // Commit the transaction
        await pool.query('COMMIT');

        res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
        // Rollback in case of error
        await pool.query('ROLLBACK');
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};



// 2. Fetch all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await pool.query(`
            SELECT * FROM Orders
        `);
        res.status(200).json({ orders: orders.rows });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// 3. Fetch a user's orders
const getOrdersByUserId = async (req, res) => {
    const { id } = req.params;
    // const user_id = req.user_id;

    try {
        const orders = await pool.query(
            `SELECT * FROM Orders WHERE user_id = $1`,
            [id]
        );

        res.status(200).json({ orders: orders.rows });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ error: 'Failed to fetch user orders' });
    }
};

// 4. Update an order status
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }

    try {
        const result = await pool.query(
            `UPDATE Orders SET status = $1 WHERE id = $2 RETURNING *`,
            [status, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated', order: result.rows[0] });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
};

// 5. Delete an order
const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM Orders WHERE id = $1 RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};

// const deleteOrder = async (req, res) => {
//     const { id } = req.params;
//     const user_id = req.user_id; // From the JWT token (authenticate middleware)
//     const user_role = req.user_role;

//     try {
//         // Fetch the order to check if the user is allowed to delete it
//         const orderResult = await pool.query('SELECT * FROM Orders WHERE id = $1', [id]);
        
//         if (orderResult.rows.length === 0) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         const order = orderResult.rows[0];

//         // If the user is not an admin, they can only delete their own orders
//         if (order.user_id !== user_id && !user_role.includes('Admin')) {
//             return res.status(403).json({ error: 'You are not authorized to delete this order' });
//         }

//         // If user is authorized, delete the order
//         await pool.query('DELETE FROM Orders WHERE id = $1', [id]);

//         res.status(200).json({ message: 'Order deleted successfully' });

//     } catch (error) {
//         console.error('Error deleting order:', error);
//         res.status(500).json({ error: 'Failed to delete order' });
//     }
// };

// const deleteOrder = async (req, res) => {
//     const { id } = req.params;  // Order ID from the URL
//     const user_id = req.user_id;  // From the decoded JWT token
  
//     try {
//       // Fetch the order to check if it exists
//       const orderResult = await pool.query('SELECT * FROM Orders WHERE id = $1', [id]);
  
//       if (orderResult.rows.length === 0) {
//         return res.status(404).json({ error: 'Order not found' });
//       }
  
//       const order = orderResult.rows[0];

//       if (req.user_role === 'Admin') {
//         await pool.query('DELETE FROM Orders WHERE id = $1', [id]);
//         return res.status(200).json({ message: 'Order deleted successfully' });
//       }
  
//       // If the user is not an admin, they can only delete their own orders
//       if (order.user_id !== user_id) {
//         return res.status(403).json({ error: 'You are not authorized to delete this order' });
//       }
  
//       // If user is authorized, delete the order
//       await pool.query('DELETE FROM Orders WHERE id = $1', [id]);
  
//       res.status(200).json({ message: 'Order deleted successfully' });
  
//     } catch (error) {
//       console.error('Error deleting order:', error);
//       res.status(500).json({ error: 'Failed to delete order' });
//     }
//   };
  


module.exports = {
    createOrder,
    getAllOrders,
    getOrdersByUserId,
    updateOrderStatus,
    deleteOrder,
};
