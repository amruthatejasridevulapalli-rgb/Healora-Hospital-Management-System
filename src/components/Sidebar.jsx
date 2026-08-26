import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

import {
  FaHome,
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaFlask,
  FaPills,
  FaFileInvoiceDollar,
  FaShieldAlt,
  FaChartBar,
  FaBell,
  FaCog,
  FaHeartbeat,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Patients", path: "/patients", icon: <FaUserInjured /> },
    { name: "Doctors", path: "/doctors", icon: <FaUserMd /> },
    { name: "Appointments", path: "/appointments", icon: <FaCalendarCheck /> },
    { name: "Laboratory", path: "/laboratory", icon: <FaFlask /> },
    { name: "Pharmacy", path: "/pharmacy", icon: <FaPills /> },
    { name: "Billing", path: "/billing", icon: <FaFileInvoiceDollar /> },
    { name: "Insurance", path: "/insurance", icon: <FaShieldAlt /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Notifications", path: "/notifications", icon: <FaBell /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <FaHeartbeat className="logo-icon" />
        <div>
          <h2>Healora</h2>
          <p>Healthcare, Happier.</p>
        </div>
      </div>

      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-profile">
        <div className="avatar">A</div>

        <div>
          <h4>Amrutha</h4>
          <p>Administrator</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;