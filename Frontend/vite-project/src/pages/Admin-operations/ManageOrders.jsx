import { useEffect, useState } from "react";
import axios from "axios";
import "../style/ManageOrders.css"


const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orders/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Handle deleting an order
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(orders.filter((order) => order.id !== orderId)); // Update the UI
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Handle updating the order status
  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/orders/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setOrders(orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="manage-orders">
      <h2>Manage Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_id}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleStatusChange(order.id, "Completed")}>
                  Mark as Completed
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(order.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
