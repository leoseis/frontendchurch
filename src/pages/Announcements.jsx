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
    <div style={{ padding: "20px" }}>
      <h1>📢 Announcements</h1>

      {token && <button onClick={handleLogout}>Logout</button>}

      {user && <p>Welcome, {user.username}</p>}

      {user?.is_staff && (
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

      {announcements.length === 0 ? (
        <p>No announcements yet</p>
      ) : (
        announcements.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Announcements;