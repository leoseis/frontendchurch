import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("access");

  return (
    <nav style={{
      padding: "10px",
      background: "#222",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h3>Church App</h3>

      <div>
        <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>
          Home
        </Link>

        {!token && (
          <Link to="/login" style={{ color: "#fff" }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;