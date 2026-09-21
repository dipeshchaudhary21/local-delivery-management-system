import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BookParcel.css";

function BookParcel() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    receiverName: "",
    receiverPhone: "",
    address: "",
    parcelType: "Document",
    weight: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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

    alert("Parcel booked successfully!");

    navigate("/my-parcels");
  };

  return (
    <div className="book-page">

      <h1>Book New Parcel</h1>

      <form onSubmit={handleSubmit}>

        <label>Receiver Name</label>

        <input
          name="receiverName"
          value={form.receiverName}
          onChange={handleChange}
        />

        <label>Receiver Phone</label>

        <input
          name="receiverPhone"
          value={form.receiverPhone}
          onChange={handleChange}
        />

        <label>Delivery Address</label>

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <label>Parcel Type</label>

        <select
          name="parcelType"
          value={form.parcelType}
          onChange={handleChange}
        >
          <option>Document</option>
          <option>Package</option>
          <option>Box</option>
          <option>Other</option>
        </select>

        <label>Weight</label>

        <input
          name="weight"
          placeholder="e.g. 2 kg"
          value={form.weight}
          onChange={handleChange}
        />

        <label>Description</label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">
          Book Parcel
        </button>

      </form>

      <Link to="/customer-dashboard">
        ← Dashboard
      </Link>

    </div>
  );
}

export default BookParcel;