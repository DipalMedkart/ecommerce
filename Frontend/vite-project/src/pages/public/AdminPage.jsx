import React from "react";
import "../style/AdminPage.css";
import AdminNavbar from "../../component/AdminNavbar";
import { useState } from "react";

const AdminPage = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");

  const handleNavigation = (section) => {
    setCurrentSection(section);
    alert(
      `Navigating to ${section.charAt(0).toUpperCase() + section.slice(1)}`
    );
  };

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
              <li onClick={() => alert("Navigating to User Management")}>
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
              <p>150</p>
            </div>
            <div className="widget">
              <h3>New Reports</h3>
              <p>12</p>
            </div>
            <div className="widget">
              <h3>System Health</h3>
              <p>Good</p>
            </div>
            <div className="widget">
              <h3>Pending Tasks</h3>
              <p>5</p>
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
