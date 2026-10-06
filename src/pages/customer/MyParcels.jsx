import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyParcels.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { apiRequest } from "../../services/api";

function MyParcels({ onLogout }) {

  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadParcels = async () => {

    try {

      const user = JSON.parse(
        sessionStorage.getItem("user")
      );

      if (!user || !user.id) {
        setError("Please login first.");
        return;
      }

      const data = await apiRequest(
        `/parcels/list.php?user_id=${user.id}`
      );

      if (data.success) {
        setParcels(data.parcels);
      } else {
        setError(data.message);
      }

    } catch (error) {

      console.error(error);

      setError(
        error.message || "Unable to load parcels"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadParcels();
  }, []);

  return (
    <DashboardSidebar
      role="customer"
      onLogout={onLogout}
    >

      <div className="my-parcels">

        <h1>My Parcels</h1>

        {loading && (
          <p>Loading parcels...</p>
        )}

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          parcels.length === 0 && (
            <div className="no-parcels">

              <h3>No parcels found</h3>

              <p>
                You have not booked any parcels yet.
              </p>

              <Link to="/book-parcel">
                Book New Parcel
              </Link>

            </div>
          )}

        {!loading &&
          parcels.length > 0 && (

            <div className="parcel-list">

              {parcels.map((parcel) => (

                <div
                  className="parcel-card"
                  key={parcel.id}
                >

                  <div className="parcel-header">

                    <h3>
                      {parcel.tracking_id}
                    </h3>

                    <span
                      className={`status ${parcel.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {parcel.status}
                    </span>

                  </div>

                  <div className="parcel-details">

                    <p>
                      <strong>
                        Receiver:
                      </strong>{" "}
                      {parcel.receiver_name}
                    </p>

                    <p>
                      <strong>
                        Phone:
                      </strong>{" "}
                      {parcel.receiver_phone}
                    </p>

                    <p>
                      <strong>
                        Address:
                      </strong>{" "}
                      {parcel.receiver_address}
                    </p>

                    <p>
                      <strong>
                        Type:
                      </strong>{" "}
                      {parcel.parcel_type}
                    </p>

                    <p>
                      <strong>
                        Weight:
                      </strong>{" "}
                      {parcel.weight} kg
                    </p>

                    <p>
                      <strong>
                        Delivery Charge:
                      </strong>{" "}
                      Rs. {parcel.delivery_charge}
                    </p>

                    <p>
                      <strong>
                        Payment:
                      </strong>{" "}
                      <span
                        className={
                          parcel.payment_status === "Paid"
                            ? "paid"
                            : "unpaid"
                        }
                      >
                        {parcel.payment_status}
                      </span>
                    </p>

                    <p>
                      <strong>
                        Booked:
                      </strong>{" "}
                      {new Date(
                        parcel.created_at
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

      </div>

    </DashboardSidebar>
  );
}

export default MyParcels;