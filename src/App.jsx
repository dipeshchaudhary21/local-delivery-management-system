
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import AssignedParcels from "./pages/staff/AssignedParcels";
import UpdateStatus from "./pages/staff/UpdateStatus";
import StaffProfile from "./pages/staff/StaffProfile";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import BookParcel from "./pages/customer/BookParcel";
import TrackParcel from "./pages/customer/TrackParcel";
import MyParcels from "./pages/customer/MyParcels";
import CustomerProfile from "./pages/customer/CustomerProfile";
import ManageCustomers from "./pages/admin/ManageCustomers";
import ManageParcels from "./pages/admin/ManageParcels";
import Reports from "./pages/admin/Reports";
import PaymentSuccess from "./pages/payments/paymentSuccess";
import PaymentFailed from "./pages/payments/paymentFailed";
import PaymentPending from "./pages/payments/paymentPending";
import { apiRequest } from "./services/api";

import "./App.css";

function Login({ onLogin }) {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (role === "customer") {
      try {
        const response = await apiRequest("/auth/login.php", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        const customer = response.user;
        const customerId = customer?.id ?? customer?.customer_id;

        if (!customer || customer.role !== "customer" || !customerId) {
          throw new Error("The login response did not include a customer ID.");
        }

        sessionStorage.setItem(
          "user",
          JSON.stringify({ ...customer, id: customerId })
        );
        onLogin(role);
      } catch (loginError) {
        setError(loginError.message || "Unable to log in");
      }
      return;
    }

    onLogin(role);
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>

        <h1>Courier Management System</h1>
        <p>Login to your Account</p>

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="customer">Customer</option>
        </select>

        <label>Email Address</label>
        <input type="email" placeholder="Enter email" value={email}  onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
        <p>Create New Account! <Link to="/register">Register</Link></p>

      </form>
    </div>
  );
}

function Register({ onRegister }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("courierUsers") || "[]");
    if (users.some((user) => user.email.toLowerCase() === form.email.toLowerCase())) {
      alert("An account with this email already exists");
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };
    localStorage.setItem("courierUsers", JSON.stringify([...users, newUser]));
    localStorage.setItem("courierProfile", JSON.stringify({
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: "",
    }));
    onRegister();
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p>Register as a courier customer</p>

        <label htmlFor="register-name">Full Name</label>
        <input id="register-name" name="name" autoComplete="name" value={form.name} onChange={handleChange} required />

        <label htmlFor="register-email">Email Address</label>
        <input id="register-email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} required />

        <label htmlFor="register-phone">Phone</label>
        <input id="register-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} required />

        <label htmlFor="register-password">Password</label>
        <input id="register-password" name="password" type="password" autoComplete="new-password" minLength={6} value={form.password} onChange={handleChange} required />

        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input id="register-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" minLength={6} value={form.confirmPassword} onChange={handleChange} required />

        <button type="submit">Create Account</button>
        <p>Already registered? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("courierRole")
  );

  function handleLogin(role) {
    if (role !== "customer") {
      sessionStorage.removeItem("user");
    }
    localStorage.setItem("courierRole", role);
    setUser(role);
  }

  function handleLogout() {
    localStorage.removeItem("courierRole");
    sessionStorage.removeItem("user");
    setUser(null);
  }

  const dashboardForRole = (role) => {
    if (user !== role) return <Navigate to="/" replace />;

    if (role === "admin") return <AdminDashboard onLogout={handleLogout} />;
    if (role === "staff") return <StaffDashboard onLogout={handleLogout} />;
    return <CustomerDashboard onLogout={handleLogout} />;
  };

  const pageForRole = (role, page) =>
    user === role ? page : <Navigate to="/" replace />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register onRegister={() => handleLogin("customer")} />} />
        <Route path="/" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to={`/${user}-dashboard`} replace />} />
        <Route path="/admin-dashboard" element={dashboardForRole("admin")} />
        <Route path="/staff-dashboard" element={dashboardForRole("staff")} />
        <Route path="/assigned-parcels" element={pageForRole("staff", <AssignedParcels onLogout={handleLogout} />)} />
        <Route path="/update-status" element={pageForRole("staff", <UpdateStatus onLogout={handleLogout} />)} />
        <Route path="/staff-profile" element={pageForRole("staff", <StaffProfile onLogout={handleLogout} />)} />
        <Route path="/customer-dashboard" element={dashboardForRole("customer")} />
        <Route path="/book-parcel" element={pageForRole("customer", <BookParcel onLogout={handleLogout} />)} />
        <Route path="/track-parcel" element={pageForRole("customer", <TrackParcel onLogout={handleLogout} />)} />
        <Route path="/my-parcels" element={pageForRole("customer", <MyParcels onLogout={handleLogout} />)} />
        <Route path="/profile" element={pageForRole("customer", <CustomerProfile onLogout={handleLogout} />)} />
        <Route path="/manage-customers" element={pageForRole("admin", <ManageCustomers onLogout={handleLogout} />)} />
        <Route path="/manage-parcels" element={pageForRole("admin", <ManageParcels onLogout={handleLogout} />)} />
        <Route path="/reports" element={pageForRole("admin", <Reports onLogout={handleLogout} />)} />
        <Route path="/admin/parcels" element={pageForRole("admin", <ManageParcels onLogout={handleLogout} />)} />
        <Route path="/payment/success" element={<PaymentSuccess />}/>
        <Route path="/payment/failed" element={<PaymentFailed />}/>
        <Route path="/payment/pending" element={<PaymentPending />}/>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
