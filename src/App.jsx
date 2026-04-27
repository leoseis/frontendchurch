import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Announcements from "./pages/Announcements";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Announcements />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;