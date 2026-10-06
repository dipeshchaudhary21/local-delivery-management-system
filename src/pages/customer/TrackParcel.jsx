import { useState } from "react";
import "./TrackParcel.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { apiRequest } from "../../services/api";

function TrackParcel({ onLogout }) {
  const [trackingId, setTrackingId] = useState("");
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      setError("Please enter tracking ID");
      return;
    }

    setLoading(true);
    setError("");
    setParcel(null);

    try {
      const result = await apiRequest(
        `/parcels/track.php?tracking_id=${encodeURIComponent(
          trackingId.trim()
        )}`
      );

      console.log("API RESULT:", result);

      if (result.success) {
        setParcel(result.parcel);
      } else {
        setError(result.message || "Parcel not found");
      }
    } catch (err) {
      console.error("TRACK ERROR:", err);
      setError(err.message || "Unable to track parcel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardSidebar role="customer" onLogout={onLogout}>
      <div className="track-page">
        <h1>Track Parcel</h1>

        <form onSubmit={handleTrack} className="track-form">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Tracking..." : "Track Parcel"}
          </button>
        </form>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {parcel && (
          <div className="tracking-result">
            <h2>{parcel.tracking_id}</h2>

            <p>
              <strong>Receiver:</strong> {parcel.receiver_name}
            </p>

            <p>
              <strong>Phone:</strong> {parcel.receiver_phone}
            </p>

            <p>
              <strong>Address:</strong> {parcel.receiver_address}
            </p>

            <p>
              <strong>Type:</strong> {parcel.parcel_type}
            </p>

            <p>
              <strong>Weight:</strong> {parcel.weight} kg
            </p>

            <p>
              <strong>Delivery Charge:</strong> Rs.{" "}
              {parcel.delivery_charge}
            </p>

            <p>
              <strong>Delivery Status:</strong>{" "}
              {parcel.status}
            </p>

            <p>
              <strong>Payment Status:</strong>{" "}
              {parcel.payment_status}
            </p>

            <p>
              <strong>Booked:</strong>{" "}
              {new Date(parcel.created_at).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </DashboardSidebar>
  );
}

export default TrackParcel;