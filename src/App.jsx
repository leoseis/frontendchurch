import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Announcements from "./pages/Announcements";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Announcements />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;