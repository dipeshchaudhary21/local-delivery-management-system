import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">

        <h2>Admin Panel</h2>

        <Link to="/admin-dashboard">Dashboard </Link>

        <Link to="/manage-customers"> Customers </Link>

        <Link to="/manage-parcels">Parcels</Link>

        <Link to="/admin-dashboard"> Staff</Link>

        <Link to="/admin-dashboard">Reports</Link>

        <Link to="/"> Logout </Link>

      </aside>

      <main className="admin-main">

        <h1>Admin Dashboard</h1>

        <p>Welcome to Admin Dashboard</p>

        <div className="admin-cards">

          <div className="admin-card">
            <h3>Total Customers</h3>
            <h2>150</h2>
          </div>

          <div className="admin-card">
            <h3>Total Parcels</h3>
            <h2>320</h2>
          </div>

          <div className="admin-card">
            <h3>In Transit</h3>
            <h2>45</h2>
          </div>

          <div className="admin-card">
            <h3>Delivered</h3>
            <h2>250</h2>
          </div>

        </div>

        <h2>Management</h2>

        <div className="management">

          <Link to="/manage-customers">
            <h3>Manage Customers</h3>
            <p>Add, edit and delete customers</p>
          </Link>

          <Link to="/manage-parcels">
            <h3>Manage Parcels</h3>
            <p>Add, edit and delete parcels</p>
          </Link>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;