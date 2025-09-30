import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import FaceRecognition from "./components/face cam/FaceRecognition";
import AdminDashboard from "./components/admin/AdminDashboard";
import NotFound from "./components/404/NotFound";
import AdminLogin from "./components/admin login/AdminLogin";
const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
const options = [
  {
    name: "Enable body scrolling",
    scroll: true,
    backdrop: false,
  },
];
const App = () => {
  return (
    <Router>
      <Routes>
        {isLocal ? (
          // Routes for local network
          <>
            {" "}
            <Route path="/" element={<Navigate to="/admin-login" replace />} />
            <Route path="/face-recognition" element={<FaceRecognition />} />
            <Route path="*" element={<NotFound />} />
            {options.map((props, idx) => (
              <Route
                path="/admin-dashboard"
                element={<AdminDashboard key={idx} {...props} />}
              />
            ))}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
          </>
        ) : (
          // Routes for network
          <>\</>
        )}
      </Routes>
    </Router>
  );
};

export default App;
