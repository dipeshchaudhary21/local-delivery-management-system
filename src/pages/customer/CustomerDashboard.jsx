import { Link } from "react-router-dom";
import "./CustomerDashboard.css";
import DashboardSidebar from "../../components/DashboardSidebar";

function CustomerDashboard({ onLogout }) {
  return (
    <DashboardSidebar role="customer" onLogout={onLogout}><div className="home">
      <main className="main">

        <div className="nav">
          <h1>Customer Dashboard</h1>
          <p> Welcome to Local Delivery Management System </p>
        </div>

        <div className="customer-cards">

          <div className="card">
            <h3>Total Parcels</h3>
            <h2>12</h2>
          </div>

          <div className="card">
            <h3>Pending</h3>
            <h2>3</h2>
          </div>

          <div className="card">
            <h3>Delivered</h3>
            <h2>5</h2>
          </div>

        </div>

        <h2>Quick Actions</h2>

        <div className="customer-actions">
          <Link to="/book-parcel"> Book New Parcel </Link>
          <Link to="/track-parcel"> Track Parcel </Link>
          <Link to="/my-parcels">  My Parcels </Link>
        </div>

      </main>

    </div></DashboardSidebar>
  );
}

export default CustomerDashboard;
