import { useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import "./AssignedParcels.css";

const parcels = [
  { trackingId: "CC-10001", receiver: "Ram Sharma", address: "Kathmandu", status: "Delivered" },
  { trackingId: "CC-10002", receiver: "Hari Thapa", address: "Pokhara", status: "In Transit" },
  { trackingId: "CC-10003", receiver: "Sita Rai", address: "Biratnagar", status: "Pending" },
];

export default function AssignedParcels({ onLogout }) {
  const [assignedParcels] = useState(() =>
    JSON.parse(localStorage.getItem("staffAssignedParcels") || "null") || parcels
  );

  return (
    <DashboardSidebar role="staff" onLogout={onLogout}>
      <main className="assigned-parcels-page">
        <h1>Assigned Parcels</h1>
        <p>Parcels assigned to you for delivery.</p>
        <div className="assigned-parcels-table-wrap">
          <table>
            <thead>
              <tr><th>Tracking ID</th><th>Receiver</th><th>Address</th><th>Status</th></tr>
            </thead>
            <tbody>
              {assignedParcels.map((parcel) => (
                <tr key={parcel.trackingId}>
                  <td>{parcel.trackingId}</td><td>{parcel.receiver}</td><td>{parcel.address}</td><td>{parcel.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </DashboardSidebar>
  );
}
