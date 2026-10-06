import { Link } from "react-router-dom";

function PaymentPending() {
    return (
        <div className="payment-result">
            <h1>Payment Pending</h1>

            <p>
                Your payment is still being processed.
            </p>

            <Link to="/customer/dashboard">
                Go to Dashboard
            </Link>
        </div>
    );
}

export default PaymentPending;