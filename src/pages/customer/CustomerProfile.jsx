import { useState } from "react";
import "./CustomerProfile.css";
import DashboardSidebar from "../../components/DashboardSidebar";

function CustomerProfile({ onLogout }) {
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("courierProfile");
    return savedProfile
      ? JSON.parse(savedProfile)
      : { name: "Dipesh Chaudhary", email: "dipesh@gmail.com", phone: "9800000000", address: "Biratnagar, Nepal" };
  });
  const [savedProfile, setSavedProfile] = useState(profile);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    localStorage.setItem("courierProfile", JSON.stringify(profile));
    setSavedProfile(profile);
    setEdit(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setProfile(savedProfile);
    setEdit(false);
  };

  const handleImageChange = (event) => {
    const image = event.target.files?.[0];
    if (!image) return;

    if (!image.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProfile((current) => ({ ...current, avatar: reader.result }));
      setEdit(true);
    };
    reader.readAsDataURL(image);
    event.target.value = "";
  };

  return (
    <DashboardSidebar role="customer" onLogout={onLogout}><div className="profile-page">

      <h1>My Profile</h1>

      <div className="profile-avatar-wrap">
        <label className="profile-avatar-circle" htmlFor="profile-avatar-input" title="Change profile photo">
          <img src={profile.avatar || "/default-avatar.svg"} alt="Profile avatar" />
          <span>Change photo</span>
          <input id="profile-avatar-input" type="file" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>

      <form className="profile-card" onSubmit={handleSave}>
        <label htmlFor="profile-name">Name</label>
        <input id="profile-name" name="name" value={profile.name} disabled={!edit} onChange={handleChange} required />

        <label htmlFor="profile-email">Email</label>
        <input id="profile-email" name="email" type="email" value={profile.email} disabled={!edit} onChange={handleChange} required />

        <label htmlFor="profile-phone">Phone</label>
        <input id="profile-phone" name="phone" type="tel" value={profile.phone} disabled={!edit} onChange={handleChange} required />

        <label htmlFor="profile-address">Address</label>
        <input id="profile-address" name="address" value={profile.address} disabled={!edit} onChange={handleChange} required />

        <div className="profile-actions">
          {edit ? (
            <>
              <button className="profile-cancel" type="button" onClick={handleCancel}>Cancel</button>
              <button className="profile-save" type="submit">Save changes</button>
            </>
          ) : (
            <button className="profile-edit" type="button" onClick={() => setEdit(true)}>Edit profile</button>
          )}
        </div>
      </form>
    </div></DashboardSidebar>
  );
}

export default CustomerProfile;
