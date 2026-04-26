import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Announcements from "./pages/Announcements";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
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