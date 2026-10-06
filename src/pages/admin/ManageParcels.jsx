import { useState } from "react";
import { Link } from "react-router-dom";
import "./ManageParcels.css";
import DashboardSidebar from "../../components/DashboardSidebar";

function ManageParcels({ onLogout }) {

  const [parcels, setParcels] = useState([
    {
      id: 1,
      trackingId: "CC-10001",
      customer: "Dipesh",
      receiver: "Ram Sharma",
      staff: "Bikash",
      type: "Document",
      weight: "1 kg",
      date: "2026-09-15",
      status: "Delivered",
    },
    {
      id: 2,
      trackingId: "CC-10002",
      customer: "Sita",
      receiver: "Hari Thapa",
      staff: "Ramesh",
      type: "Package",
      weight: "2 kg",
      date: "2026-09-16",
      status: "In Transit",
    },
  ]);

  const handleDelete = (id) => {

    if (window.confirm("Delete parcel?")) {

      setParcels(
        parcels.filter(
          (parcel) => parcel.id !== id
        )
      );

    }
  };

  return (
    <DashboardSidebar role="admin" onLogout={onLogout}><div className="manage-parcels">
      <div className="parcel-header">
        <h1>Manage Parcels</h1>
      </div>

      <div className="parcel-list">
        <table>
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Customer</th>
              <th>Receiver</th>
              <th>Staff</th>
              <th>Type</th>
              <th>Weight</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (

              <tr key={parcel.id}>

                <td>{parcel.trackingId}</td>
                <td>{parcel.customer}</td>
                <td>{parcel.receiver}</td>
                <td>{parcel.staff}</td>
                <td>{parcel.type}</td>
                <td>{parcel.weight}</td>
                <td>{parcel.date}</td>
                <td>{parcel.status}</td>

                <td>
                  <button onClick={() => handleDelete(parcel.id) } > Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></DashboardSidebar>
  );
}

export default ManageParcels;