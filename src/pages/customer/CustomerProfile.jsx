import { useState } from "react";
import { Link } from "react-router-dom";
import "./CustomerProfile.css";

function CustomerProfile() {

  const [edit, setEdit] = useState(false);

  const [profile, setProfile] = useState({
    name: "Dipesh Chaudhary",
    email: "dipesh@gmail.com",
    phone: "9800000000",
    address: "Biratnagar, Nepal",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setEdit(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-page">

      <h1>My Profile</h1>

      <div className="profile-card">

        <label>Name</label>

        <input
          name="name"
          value={profile.name}
          disabled={!edit}
          onChange={handleChange}
        />

        <label>Email</label>

        <input
          name="email"
          value={profile.email}
          disabled={!edit}
          onChange={handleChange}
        />

        <label>Phone</label>

        <input
          name="phone"
          value={profile.phone}
          disabled={!edit}
          onChange={handleChange}
        />

        <label>Address</label>

        <input
          name="address"
          value={profile.address}
          disabled={!edit}
          onChange={handleChange}
        />

        {edit ? (
          <button onClick={handleSave}>
            Save
          </button>
        ) : (
          <button onClick={() => setEdit(true)}>
            Edit
          </button>
        )}

      </div>

      <Link to="/customer-dashboard">
        ← Dashboard
      </Link>

    </div>
  );
}

export default CustomerProfile;