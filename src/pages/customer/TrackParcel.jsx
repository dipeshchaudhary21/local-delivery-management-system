import { useState } from "react";
import { Link } from "react-router-dom";
import "./TrackParcel.css";

function TrackParcel() {
  const [trackingId, setTrackingId] = useState("");
  const [parcel, setParcel] = useState(null);

  const trackParcel = () => {

    if (!trackingId) {
      alert("Please enter tracking ID");
      return;
    }

    setParcel({
      trackingId,
      receiver: "Ram Sharma",
      type: "Package",
      status: "In Transit",
    });
  };

  return (
    <div className="track-page">

      <h1>Track Parcel</h1>

      <input
        placeholder="Enter Tracking ID"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
      />

      <button onClick={trackParcel}>
        Track
      </button>

      {parcel && (
        <div className="tracking-result">

          <h2>Parcel Information</h2>

          <p>
            <b>Tracking ID:</b> {parcel.trackingId}
          </p>

          <p>
            <b>Receiver:</b> {parcel.receiver}
          </p>

          <p>
            <b>Type:</b> {parcel.type}
          </p>

          <p>
            <b>Status:</b> {parcel.status}
          </p>

        </div>
      )}

      <Link to="/customer-dashboard">
        ← Dashboard
      </Link>

    </div>
  );
}

export default TrackParcel;