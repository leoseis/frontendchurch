import { useState, useEffect } from "react";
import API from "../services/api";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const token = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login";
  };

  const fetchAnnouncements = () => {
    API.get("announcements/")
      .then((res) => {
        setAnnouncements(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await API.post("announcements/", {
        title,
        body,
        category: "general",
      });

      alert("Announcement created!");

      setTitle("");
      setBody("");

      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      alert("Only admin can create announcements");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📢 Announcements</h1>

      {/* ✅ LOGOUT BUTTON (FIXED POSITION) */}
      {token && <button onClick={handleLogout}>Logout</button>}

      {/* FORM */}
      {token && (
        <form onSubmit={handleCreate}>
          <h3>Create Announcement</h3>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br /><br />

          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <br /><br />

          <button type="submit">Post</button>
        </form>
      )}

      <hr />

      {/* LIST */}
      {announcements.length === 0 ? (
        <p>No announcements yet</p>
      ) : (
        announcements.map((item) => (
          <div key={item.id} style={{ marginBottom: "15px" }}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <small>{item.category}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default Announcements;