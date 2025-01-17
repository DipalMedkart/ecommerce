import React, { useEffect } from "react";
import "../style/AdminPage.css";
import AdminNavbar from "../../component/AdminNavbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  // const [adminName, setAdminName] = useState("");

  const token = localStorage.getItem("token");

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(window.atob(base64));
    return decoded;
  };

  const decodedToken = decodeToken(token);
  // console.log(decodedToken);
  // const adminName = decodeToken.name;

  const handleNavigation = (section) => {
    setCurrentSection(section);
    alert(
      `Navigating to ${section.charAt(0).toUpperCase() + section.slice(1)}`
    );
  };

  useEffect(() => {
    axios.get("http://localhost:5000/users/users-count", {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
      .then(response => {
        setTotalUsers(response.data.count);
      })
      .catch(error => {
        console.error("Error fetching total users:", error);
      }); 
    axios.get("http://localhost:5000/users/orders-count", {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
      .then(response => {
        setTotalOrders(response.data.count);
      })
      .catch(error => {
        console.error("Error fetching total orders:", error);
      }); 

      axios.get("http://localhost:5000/users/pending-orders-count", {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
        .then(response => {
          setPendingOrders(response.data.count);
        })
        .catch(error => {
          console.error("Error fetching total orders:", error);
        })
  })

  return (
    <div className="admin-page-container">
      <section className="admin-navbar-section">
        <AdminNavbar onNavigate={handleNavigation} />
      </section>
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your application settings and data efficiently.</p>
      </header>

      <main className="admin-main">
        <section className="admin-navigation">
          <nav>
            <ul>
              <li onClick={() => navigate("/admin-dashboard/manage-users") }>
                User Management
              </li>
              <li onClick={() => alert("Navigating to Reports")}>Reports</li>
              <li onClick={() => alert("Navigating to Settings")}>Settings</li>
              <li onClick={() => alert("Navigating to Notifications")}>
                Notifications
              </li>
            </ul>
          </nav>
        </section>

        <section className="admin-content">
          <h2>Welcome, Admin!</h2>
          <p>Choose an option from the navigation menu to get started.</p>
          <div className="dashboard-widgets">
            <div className="widget">
              <h3>Total Users</h3>
              <p>{totalUsers}</p>
            </div>
            <div className="widget">
              <h3>Total Orders</h3>
              <p>{totalOrders}</p>
            </div>
            <div className="widget">
              <h3>Pending Orders</h3>
              <p>{pendingOrders}</p>
            </div>
            <div className="widget">
              <h3>System Health</h3>
              <p>Good</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="admin-footer">
        <p>&copy; {new Date().getFullYear()} Your Company. Admin Dashboard.</p>
      </footer>
    </div>
  );
};

export default AdminPage;
