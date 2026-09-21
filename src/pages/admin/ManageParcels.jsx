import { useState } from "react";
import { Link } from "react-router-dom";
import "./ManageParcels.css";

function ManageParcels() {

  const [parcels, setParcels] = useState([
    {
      id: 1,
      trackingId: "CC-10001",
      customer: "Dipesh",
      receiver: "Ram Sharma",
      staff: "Bikash",
      type: "Document",
      weight: "1 kg",
      date: "2026-09-15",
      status: "Delivered",
    },
    {
      id: 2,
      trackingId: "CC-10002",
      customer: "Sita",
      receiver: "Hari Thapa",
      staff: "Ramesh",
      type: "Package",
      weight: "2 kg",
      date: "2026-09-16",
      status: "In Transit",
    },
  ]);

  const [form, setForm] = useState({
    trackingId: "",
    customer: "",
    receiver: "",
    staff: "",
    type: "Document",
    weight: "",
    date: "",
    status: "Pending",
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !form.trackingId ||
      !form.customer ||
      !form.receiver ||
      !form.staff ||
      !form.weight ||
      !form.date
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {

      setParcels(
        parcels.map((parcel) =>
          parcel.id === editingId
            ? { ...parcel, ...form }
            : parcel
        )
      );

      alert("Parcel updated!");

    } else {

      setParcels([
        ...parcels,
        {
          id: Date.now(),
          ...form,
        },
      ]);

      alert("Parcel added!");
    }

    setForm({
      trackingId: "",
      customer: "",
      receiver: "",
      staff: "",
      type: "Document",
      weight: "",
      date: "",
      status: "Pending",
    });

    setEditingId(null);
  };

  const handleEdit = (parcel) => {

    setForm({
      trackingId: parcel.trackingId,
      customer: parcel.customer,
      receiver: parcel.receiver,
      staff: parcel.staff,
      type: parcel.type,
      weight: parcel.weight,
      date: parcel.date,
      status: parcel.status,
    });

    setEditingId(parcel.id);
  };

  const handleDelete = (id) => {

    if (window.confirm("Delete parcel?")) {

      setParcels(
        parcels.filter(
          (parcel) => parcel.id !== id
        )
      );

    }
  };

  return (
    <div className="manage-parcels">

      <div className="parcel-header">

        <h1>Manage Parcels</h1>

        <Link to="/admin-dashboard">
          ← Admin Dashboard
        </Link>

      </div>

      <div className="parcel-form">

        <h2>
          {editingId
            ? "Edit Parcel"
            : "Add Parcel"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            name="trackingId"
            placeholder="Tracking ID"
            value={form.trackingId}
            onChange={handleChange}
          />

          <input
            name="customer"
            placeholder="Customer"
            value={form.customer}
            onChange={handleChange}
          />

          <input
            name="receiver"
            placeholder="Receiver"
            value={form.receiver}
            onChange={handleChange}
          />

          <input
            name="staff"
            placeholder="Staff"
            value={form.staff}
            onChange={handleChange}
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option>Document</option>
            <option>Package</option>
            <option>Box</option>
          </select>

          <input
            name="weight"
            placeholder="Weight"
            value={form.weight}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>Picked Up</option>
            <option>In Transit</option>
            <option>Delivered</option>
          </select>

          <button type="submit">
            {editingId ? "Update Parcel" : "Add Parcel"}
          </button>

        </form>

      </div>

      <div className="parcel-list">

        <h2>All Parcels</h2>

        <table>

          <thead>

            <tr>
              <th>Tracking ID</th>
              <th>Customer</th>
              <th>Receiver</th>
              <th>Staff</th>
              <th>Type</th>
              <th>Weight</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {parcels.map((parcel) => (

              <tr key={parcel.id}>

                <td>{parcel.trackingId}</td>
                <td>{parcel.customer}</td>
                <td>{parcel.receiver}</td>
                <td>{parcel.staff}</td>
                <td>{parcel.type}</td>
                <td>{parcel.weight}</td>
                <td>{parcel.date}</td>
                <td>{parcel.status}</td>

                <td>

                  <button
                    onClick={() =>
                      handleEdit(parcel)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(parcel.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageParcels;