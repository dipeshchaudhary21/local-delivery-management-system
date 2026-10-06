import { Link } from "react-router-dom";

function PaymentSuccess() {
    return (
        <div className="payment-result">
            <h1>Payment Successful</h1>

            <p>
                Your parcel has been booked successfully.
            </p>

            <Link to="/customer/dashboard">
                Go to Dashboard
            </Link>
        </div>
    );
}

export default PaymentSuccess;