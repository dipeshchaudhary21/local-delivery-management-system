import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Login
import Login from "./pages/login/Login";

// Customer
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import BookParcel from "./pages/customer/BookParcel";
import TrackParcel from "./pages/customer/TrackParcel";
import MyParcels from "./pages/customer/MyParcels";
import CustomerProfile from "./pages/customer/CustomerProfile";

// Staff
import StaffDashboard from "./pages/staff/StaffDashboard";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCustomers from "./pages/admin/ManageCustomers";
import ManageParcels from "./pages/admin/ManageParcels";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Customer */}
        <Route
          path="/customer-dashboard"
          element={<CustomerDashboard />}
        />

        <Route
          path="/book-parcel"
          element={<BookParcel />}
        />

        <Route
          path="/track-parcel"
          element={<TrackParcel />}
        />

        <Route
          path="/my-parcels"
          element={<MyParcels />}
        />

        <Route
          path="/profile"
          element={<CustomerProfile />}
        />

        {/* Staff */}
        <Route
          path="/staff-dashboard"
          element={<StaffDashboard />}
        />

        {/* Admin */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/manage-customers"
          element={<ManageCustomers />}
        />

        <Route
          path="/manage-parcels"
          element={<ManageParcels />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;