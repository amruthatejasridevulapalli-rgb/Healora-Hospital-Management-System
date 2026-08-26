import "../styles/navbar.css";
import { FaBell, FaMoon, FaSearch, FaHeart } from "react-icons/fa";

function Navbar() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <header className="navbar">

      <div className="brand">
        <FaHeart className="brand-icon" />

        <div>
          <h1>Healora</h1>
          <p>{greeting}, Amrutha 👋</p>
        </div>
      </div>

      <div className="nav-right">

        <div className="search-box">
          <FaSearch />
          <input placeholder="Search..." />
        </div>

        <button className="icon-btn">
          <FaMoon />
        </button>

        <button className="icon-btn">
          <FaBell />
        </button>

      </div>

    </header>
  );
}

export default Navbar;