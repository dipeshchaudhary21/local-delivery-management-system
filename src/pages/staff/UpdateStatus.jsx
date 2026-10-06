import { useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import "./UpdateStatus.css";

const initialParcels = [
  { trackingId: "CC-10001", receiver: "Ram Sharma", status: "Delivered" },
  { trackingId: "CC-10002", receiver: "Hari Thapa", status: "In Transit" },
  { trackingId: "CC-10003", receiver: "Sita Rai", status: "Pending" },
];

export default function UpdateStatus({ onLogout }) {
  const [parcels, setParcels] = useState(() =>
    JSON.parse(localStorage.getItem("staffAssignedParcels") || "null") || initialParcels
  );
  const [savedId, setSavedId] = useState("");

  function changeStatus(trackingId, status) {
    setParcels((current) => current.map((parcel) =>
      parcel.trackingId === trackingId ? { ...parcel, status } : parcel
    ));
    setSavedId("");
  }

  function saveStatus(trackingId) {
    localStorage.setItem("staffAssignedParcels", JSON.stringify(parcels));
    setSavedId(trackingId);
    window.setTimeout(() => setSavedId(""), 2000);
  }

  return (
    <DashboardSidebar role="staff" onLogout={onLogout}>
      <main className="update-status-page">
        <h1>Update Parcel Status</h1>
        <p>Choose the latest delivery status for each assigned parcel.</p>
        <div className="update-status-table-wrap">
          <table>
            <thead><tr><th>Tracking ID</th><th>Receiver</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel.trackingId}>
                  <td>{parcel.trackingId}</td>
                  <td>{parcel.receiver}</td>
                  <td>
                    <select
                      aria-label={`Status for ${parcel.trackingId}`}
                      value={parcel.status}
                      onChange={(event) => changeStatus(parcel.trackingId, event.target.value)}
                    >
                      <option>Pending</option>
                      <option>Picked Up</option>
                      <option>In Transit</option>
                      <option>Delivered</option>
                    </select>
                  </td>
                  <td>
                    <button type="button" onClick={() => saveStatus(parcel.trackingId)}>
                      {savedId === parcel.trackingId ? "Saved" : "Save"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </DashboardSidebar>
  );
}
