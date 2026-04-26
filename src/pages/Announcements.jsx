import { useEffect, useState } from "react";
import API from "../services/api";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("announcements/")
      .then((res) => {
        console.log("DATA:", res.data); // debug
        setAnnouncements(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ERROR:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📢 Announcements</h1>

      {loading && <p>Loading...</p>}

      {!loading && announcements.length === 0 && (
        <p>No announcements yet</p>
      )}

      {!loading &&
        announcements.map((item) => (
          <div key={item.id} style={{ marginBottom: "15px" }}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <small>Category: {item.category}</small>
          </div>
        ))}
    </div>
  );
}

export default Announcements;