import { Link } from "react-router-dom";
import "./MyParcels.css";

function MyParcels() {

  const parcels = [
    {
      trackingId: "CC-10001",
      receiver: "Ram Sharma",
      type: "Document",
      date: "2026-09-15",
      status: "Delivered",
    },
    {
      trackingId: "CC-10002",
      receiver: "Sita Rai",
      type: "Package",
      date: "2026-09-16",
      status: "In Transit",
    },
    {
      trackingId: "CC-10003",
      receiver: "Hari Thapa",
      type: "Box",
      date: "2026-09-17",
      status: "Pending",
    },
  ];

  return (
    <div className="my-parcels">

      <div className="my-parcels-header">

        <h1>My Parcels</h1>

        <Link to="/book-parcel">
          + Book New Parcel
        </Link>

      </div>

      <table>

        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Receiver</th>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {parcels.map((parcel) => (

            <tr key={parcel.trackingId}>

              <td>{parcel.trackingId}</td>

              <td>{parcel.receiver}</td>

              <td>{parcel.type}</td>

              <td>{parcel.date}</td>

              <td>{parcel.status}</td>

              <td>
                <Link to="/track-parcel"> Track </Link>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <Link to="/customer-dashboard"> Dashboard</Link>

    </div>
  );
}

export default MyParcels;