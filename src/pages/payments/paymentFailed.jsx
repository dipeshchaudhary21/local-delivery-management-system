import { Link } from "react-router-dom";

function PaymentFailed() {
    return (
        <div className="payment-result">
            <h1>Payment Failed</h1>

            <p>
                Your payment could not be completed.
            </p>

            <Link to="/customer/dashboard">
                Return to Dashboard
            </Link>
        </div>
    );
}

export default PaymentFailed;