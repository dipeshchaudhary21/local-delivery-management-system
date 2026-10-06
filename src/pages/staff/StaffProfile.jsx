import { useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import "./StaffProfile.css";

const defaultProfile = {
  name: "Bikash Karki",
  email: "bikash@example.com",
  phone: "9800000000",
  branch: "Kathmandu",
};

export default function StaffProfile({ onLogout }) {
  const [profile, setProfile] = useState(() =>
    JSON.parse(localStorage.getItem("courierStaffProfile") || "null") || defaultProfile
  );
  const [savedProfile, setSavedProfile] = useState(profile);
  const [editing, setEditing] = useState(false);

  function handleChange(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  }

  function saveProfile(event) {
    event.preventDefault();
    localStorage.setItem("courierStaffProfile", JSON.stringify(profile));
    setSavedProfile(profile);
    setEditing(false);
  }

  function cancelEdit() {
    setProfile(savedProfile);
    setEditing(false);
  }

  function changeAvatar(event) {
    const image = event.target.files?.[0];
    if (!image) return;
    if (!image.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProfile((current) => ({ ...current, avatar: reader.result }));
      setEditing(true);
    };
    reader.readAsDataURL(image);
    event.target.value = "";
  }

  return (
    <DashboardSidebar role="staff" onLogout={onLogout}>
      <main className="staff-profile-page">
        <h1>My Profile</h1>
        <div className="staff-profile-avatar-wrap">
          <label className="staff-profile-avatar" htmlFor="staff-avatar-input" title="Change profile photo">
            <img src={profile.avatar || "/default-avatar.svg"} alt="Staff profile" />
            <span>Change photo</span>
            <input id="staff-avatar-input" type="file" accept="image/*" onChange={changeAvatar} />
          </label>
        </div>
        <form className="staff-profile-card" onSubmit={saveProfile}>
          <label htmlFor="staff-name">Name</label>
          <input id="staff-name" name="name" value={profile.name} onChange={handleChange} disabled={!editing} required />

          <label htmlFor="staff-email">Email</label>
          <input id="staff-email" name="email" type="email" value={profile.email} onChange={handleChange} disabled={!editing} required />

          <label htmlFor="staff-phone">Phone</label>
          <input id="staff-phone" name="phone" type="tel" value={profile.phone} onChange={handleChange} disabled={!editing} required />

          <label htmlFor="staff-branch">Branch</label>
          <input id="staff-branch" name="branch" value={profile.branch} onChange={handleChange} disabled={!editing} required />

          <div className="staff-profile-actions">
            {editing ? (
              <>
                <button type="button" className="staff-profile-cancel" onClick={cancelEdit}>Cancel</button>
                <button type="submit">Save changes</button>
              </>
            ) : (
              <button type="button" onClick={() => setEditing(true)}>Edit profile</button>
            )}
          </div>
        </form>
      </main>
    </DashboardSidebar>
  );
}
