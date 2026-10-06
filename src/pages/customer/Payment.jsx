import { useState } from "react";
import { apiRequest } from "../../services/api";

function Payment({ parcelId, userId }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePayment = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await apiRequest(
                "/payments/initiate.php",
                {
                    method: "POST",
                    body: JSON.stringify({
                        parcel_id: parcelId,
                        user_id: userId
                    })
                }
            );

            if (data.success) {
                // Redirect customer to Khalti
                window.location.href = data.payment_url;
            }

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="payment-container">

            <h2>Courier Payment</h2>

            <p>
                Pay your courier delivery charge using Khalti.
            </p>

            <button
                onClick={handlePayment}
                disabled={loading}
            >
                {loading
                    ? "Connecting to Khalti..."
                    : "Pay with Khalti"}
            </button>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

        </div>
    );
}

export default Payment;