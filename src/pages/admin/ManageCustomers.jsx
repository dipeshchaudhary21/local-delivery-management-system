import { useState } from "react";
import { Link } from "react-router-dom";
import "./ManageCustomers.css";

function ManageCustomers() {

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Dipesh Chaudhary",
      email: "dipesh@gmail.com",
      phone: "9800000000",
      address: "Biratnagar",
    },
    {
      id: 2,
      name: "Ram Sharma",
      email: "ram@gmail.com",
      phone: "9811111111",
      address: "Kathmandu",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
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
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {

      setCustomers(
        customers.map((customer) =>
          customer.id === editingId
            ? { ...customer, ...form }
            : customer
        )
      );

      alert("Customer updated!");

    } else {

      setCustomers([
        ...customers,
        {
          id: Date.now(),
          ...form,
        },
      ]);

      alert("Customer added!");
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

    setEditingId(null);
  };

  const handleEdit = (customer) => {

    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    });

    setEditingId(customer.id);
  };

  const handleDelete = (id) => {

    if (window.confirm("Delete customer?")) {

      setCustomers(
        customers.filter(
          (customer) => customer.id !== id
        )
      );

    }
  };

  return (
    <div className="manage-customers">

      <div className="customer-header">

        <h1>Manage Customers</h1>

        <Link to="/admin-dashboard"> Admin Dashboard </Link>

      </div>

      <div className="customer-form">

        <h2>
          {editingId
            ? "Edit Customer"
            : "Add Customer"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Customer Name" value={form.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange}/>

          <button type="submit">{editingId ? "Update" : "Add"}</button>
        </form>

      </div>

      <div className="customer-list">

        <h2>Customer List</h2>

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>

                <td>
                  <button onClick={() =>handleEdit(customer)}>Edit</button>
                  <button onClick={() => handleDelete(customer.id) }> Delete </button>
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageCustomers;