import { Link } from "react-router-dom";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  return (
    <div className="customer-dashboard">

      <aside className="customer-sidebar">

        <h2>Courier System</h2>

        <Link to="/customer-dashboard"> Dashboard</Link>
        <Link to="/book-parcel"> Book Parcel </Link>
        <Link to="/track-parcel"> Track Parcel </Link>
        <Link to="/my-parcels">  My Parcels </Link>
        <Link to="/profile">  My Profile </Link>
        <Link to="/"> Logout </Link>

      </aside>

      <main className="customer-main">

        <h1>Customer Dashboard</h1>

        <p> Welcome to Courier Management System </p>

        <div className="customer-cards">

          <div className="customer-card">
            <h3>Total Parcels</h3>
            <h2>12</h2>
          </div>

          <div className="customer-card">
            <h3>Pending</h3>
            <h2>3</h2>
          </div>

          <div className="customer-card">
            <h3>In Transit</h3>
            <h2>4</h2>
          </div>

          <div className="customer-card">
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

    </div>
  );
}

export default CustomerDashboard;