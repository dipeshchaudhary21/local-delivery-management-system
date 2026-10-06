import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BookParcel.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { apiRequest } from "../../services/api";

function BookParcel({ onLogout }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    receiverName: "",
    receiverPhone: "",
    address: "",
    parcelType: "Document",
    weight: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.receiverName ||
      !form.receiverPhone ||
      !form.address ||
      !form.weight
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      // Get logged-in customer saved during login.
      const user = JSON.parse(sessionStorage.getItem("user") || "null");

      if (!user || !user.id) {
        alert("Please login first.");
        setLoading(false);
        navigate("/customer-login");
        return;
      }

      // Remove "kg" if user enters something like "2 kg"
      const weight = parseFloat(form.weight);

      if (isNaN(weight) || weight <= 0) {
        alert("Please enter a valid weight.");
        setLoading(false);
        return;
      }

      // --------------------------------
      // 1. CREATE PARCEL
      // --------------------------------
      const parcel = await apiRequest(
        "/parcels/create.php",
        {
          method: "POST",

          body: JSON.stringify({
            sender_id: user.id,

            receiver_name: form.receiverName,

            receiver_phone: form.receiverPhone,

            receiver_address: form.address,

            parcel_type: form.parcelType,

            weight: weight,

            description: form.description,
          }),
        }
      );

      if (!parcel.success) {
        throw new Error(
          parcel.message || "Parcel booking failed"
        );
      }

      if (!parcel.parcel_id) {
        throw new Error("Parcel was created, but the server did not return its ID.");
      }

      // --------------------------------
      // 2. START KHALTI PAYMENT
      // --------------------------------
      const payment = await apiRequest(
        "/payments/initiate.php",
        {
          method: "POST",

          body: JSON.stringify({
            parcel_id: parcel.parcel_id,

            user_id: user.id,
          }),
        }
      );

      if (!payment.success) {
        throw new Error(
          payment.message ||
            "Unable to start payment"
        );
      }

      if (!payment.payment_url) {
        throw new Error("Payment was initialized, but the server did not return a payment link.");
      }

      // --------------------------------
      // 3. REDIRECT TO KHALTI
      // --------------------------------
      window.location.assign(payment.payment_url);

    } catch (error) {
      console.error(error);

      alert(error.message);

      setLoading(false);
    }
  };

  return (
    <DashboardSidebar
      role="customer"
      onLogout={onLogout}
    >
      <div className="book-page">

        <h1>Book New Parcel</h1>

        <form onSubmit={handleSubmit}>

          <label>
            Receiver Name
          </label>

          <input
            name="receiverName"
            value={form.receiverName}
            onChange={handleChange}
            required
          />

          <label>
            Receiver Phone
          </label>

          <input
            name="receiverPhone"
            value={form.receiverPhone}
            onChange={handleChange}
            required
          />

          <label>
            Delivery Address
          </label>

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <label>
            Parcel Type
          </label>

          <select
            name="parcelType"
            value={form.parcelType}
            onChange={handleChange}
          >
            <option value="Document">
              Document
            </option>

            <option value="Package">
              Package
            </option>

            <option value="Box">
              Box
            </option>

            <option value="Other">
              Other
            </option>
          </select>

          <label>
            Weight (kg)
          </label>

          <input
            name="weight"
            type="number"
            step="0.1"
            min="0.1"
            placeholder="e.g. 2"
            value={form.weight}
            onChange={handleChange}
            required
          />

          <label>
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Book Parcel & Pay"}
          </button>

        </form>

        <Link to="/customer-dashboard">
          Back to Dashboard
        </Link>

      </div>
    </DashboardSidebar>
  );
}

export default BookParcel;
