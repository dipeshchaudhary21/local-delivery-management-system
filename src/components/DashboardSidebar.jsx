import { NavLink } from "react-router-dom";
import "./DashboardSidebar.css";

const navigation = {
  customer: {
    title: "Delivery Managemnet System",
    links: [
      ["Home", "/customer-dashboard"],
      ["Book Parcel", "/book-parcel"],
      ["Track Parcel", "/track-parcel"],
      ["Parcels", "/my-parcels"],
      ["My Profile", "/profile"],
    ],
  },
  staff: {
    title: "Staff Panel",
    links: [
      ["Home", "/staff-dashboard"],
      ["Assigned Parcels", "/assigned-parcels"],
      ["Update Status", "/update-status"],
      ["My Profile", "/staff-profile"],
    ],
  },
  admin: {
    title: "Admin Panel",
    links: [
      ["Home", "/admin-dashboard"],
      ["Manage Customers", "/manage-customers"],
      ["Manage Parcels", "/manage-parcels"],
      ["Reports", "/reports"],
    ],
  },
};

export default function DashboardSidebar({ role, onLogout, children }) {
  const { title, links } = navigation[role];

  return (
    <div className={`dashboard-layout dashboard-layout--${role}`}>
      <aside className="dashboard-sidebar">
        <h2>{title}</h2>
        <nav aria-label={`${role} navigation`}>
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} end>
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="dashboard-logout" type="button" onClick={onLogout}>
          Logout
        </button>
      </aside>
      <div className="dashboard-content">{children}</div>
    </div>
  );
}
