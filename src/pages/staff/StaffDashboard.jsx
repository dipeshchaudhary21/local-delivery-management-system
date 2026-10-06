import "./StaffDashboard.css";
import DashboardSidebar from "../../components/DashboardSidebar";

function StaffDashboard({ onLogout }) {

  const parcels = [
    {
      trackingId: "CC-10001",
      receiver: "Ram Sharma",
      address: "Kathmandu",
      status: "Delivered",
    },
    {
      trackingId: "CC-10002",
      receiver: "Hari Thapa",
      address: "Pokhara",
      status: "In Transit",
    },
    {
      trackingId: "CC-10003",
      receiver: "Sita Rai",
      address: "Biratnagar",
      status: "Pending",
    },
  ];

  return (
    <DashboardSidebar role="staff" onLogout={onLogout}><div className="staff-dashboard">
      <main className="staff-main">

        <h1>Staff Dashboard</h1>

        <p>Welcome to Staff Dashboard</p>

        <div className="staff-cards">

          <div>
            <h3>Assigned Parcels</h3>
            <h2>12</h2>
          </div>

          <div>
            <h3>Pending Pickup</h3>
            <h2>4</h2>
          </div>

          <div>
            <h3>Delivered</h3>
            <h2>3</h2>
          </div>

        </div>
        <h2>Assigned Parcels</h2>
        <table>

          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Receiver</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel.trackingId}>
                <td>{parcel.trackingId}</td>
                <td>{parcel.receiver}</td>
                <td>{parcel.address}</td>
                <td>{parcel.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div></DashboardSidebar>
  );
}

export default StaffDashboard;
