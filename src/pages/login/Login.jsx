import { useState } from "react";
import { apiRequest } from "../../services/api";

function CustomerLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await apiRequest("/auth/login.php", {
                method: "POST",
                body: JSON.stringify({ email, password })
            });

            const customer = data.user;
            const customerId = customer?.id ?? customer?.customer_id;

            if (customer?.role !== "customer" || !customerId) {
                throw new Error("Customer account required");
            }

            sessionStorage.setItem(
                "user",
                JSON.stringify({ ...customer, id: customerId })
            );

            window.location.href = "/customer-dashboard";

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Customer Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>

                {error && (
                    <p style={{ color: "red" }}>{error}</p>
                )}
            </form>
        </div>
    );
}

export default CustomerLogin;
