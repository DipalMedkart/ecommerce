import { useEffect, useState } from "react";
import axios from "axios";
import "../style/ManageOrders.css"


const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orders/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        console.log(response.data);

        const orderData = response.data.orders;
        if (Array.isArray(orderData)) {
          setOrders(orderData);
        } else {
          console.error("Expected an array, but got:", orderData);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Handle deleting an order
  const handleDelete = async (orderId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this order?');
    if (isConfirmed) {

      try {
        await axios.delete(`http://localhost:5000/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrders(orders.filter((order) => order.id !== orderId)); // Update the UI
      } catch (error) {
        console.error("Error deleting order:", error);
      }
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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentOrders = orders.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="manage-orders">
      <h2>Manage Orders</h2>
      {orders.length === 0 ? (
        <h2>No orders found.</h2>) : (

        <>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user_id}</td>
                  <td>{order.bill_amount}</td>
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


          <div className="pagination">
            {Array.from({ length: Math.ceil(orders.length / productsPerPage) }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>

      )}
    </div>
  );
};

export default ManageOrders;
