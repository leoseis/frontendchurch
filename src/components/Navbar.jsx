import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("access");

  return (
   <nav style={{
  padding: "15px 30px",
  background: "#222",
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}}>
  <h2 style={{ margin: 0 }}>Hallelujiah Church</h2>

  <div>
    <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>
      Home
    </Link>

    <Link to="/login" style={{ color: "#fff" }}>
      Login
    </Link>
  </div>
</nav>
  );
}

export default Navbar;