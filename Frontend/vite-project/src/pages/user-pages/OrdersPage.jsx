import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style/OrdersPage.css"

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    // Function to decode the JWT token
    const decodeToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(window.atob(base64));
        return decoded;
    };

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not logged in.');
            setLoading(false);
            return;
        }

        // Decode the token to get the user_id
        const decodedToken = decodeToken(token);
        console.log(decodedToken);
        const userId = decodedToken.id;
        console.log(userId);

        // Fetch orders for the logged-in user
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/orders/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setOrders(response.data.orders);
            } catch (err) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="orders-page">
            <h1>Your Orders</h1>
            {orders.length === 0 ? (
                <div className="no-orders">No orders found.</div>
            ) : (

                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.bill_amount}</td>
                                    <td>{order.status}</td>
                                    <td>{new Date(order.created_at).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map((_, index) => (
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

export default OrdersPage;
