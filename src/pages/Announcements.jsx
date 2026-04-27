import { useState, useEffect } from "react";
import API from "../services/api";

function Announcements() {

  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login";
  };

  const fetchAnnouncements = () => {
    API.get("announcements/")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    API.get("auth/me/")
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await API.post("announcements/", {
        title,
        body,
        category: "general",
      });

      setTitle("");
      setBody("");
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      alert("Only admin can create announcements");
    }
  };

  // ✅ RETURN MUST BE INSIDE FUNCTION
  return (
  <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px" }}>
    <h1 style={{ textAlign: "center" }}>📢 Announcements</h1>

    {token && (
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )}

    {user && (
      <p style={{ textAlign: "center" }}>
        Welcome, <strong>{user.username}</strong>
      </p>
    )}

    {/* FORM */}
    {user?.is_staff && (
      <form
        onSubmit={handleCreate}
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h3>Create Announcement</h3>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button type="submit">Post</button>
      </form>
    )}

    <hr style={{ margin: "30px 0" }} />

    {/* LIST */}
    {announcements.length === 0 ? (
      <p style={{ textAlign: "center" }}>No announcements yet</p>
    ) : (
      announcements.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "15px",
            border: "1px solid #eee",
            borderRadius: "8px",
            marginBottom: "15px",
            background: "#fafafa",
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <small style={{ color: "#777" }}>{item.category}</small>
        </div>
      ))
    )}
  </div>
  );
}

export default Announcements;