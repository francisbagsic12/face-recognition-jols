import React from "react";
import RegStaff from "./component/register fot staff/RegStaff";
import RegStudent from "./component/register for student/RegStudent";
import RegisterForm from "./component/registration/RegisterForm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
const App = () => {
  return (
    <>
      {" "}
      <Router>
        <Routes>
          // Routes for local network
          <>
            <Route path="/register-visitor" element={<RegisterForm />} />
            <Route path="/register-student" element={<RegStudent />} />
            <Route path="/register-staff" element={<RegStaff />} />
            <Route
              path="*"
              element={
                <>
                  <h1 className="display-1 text-center">404 Not Found:(</h1>
                </>
              }
            />
          </>
        </Routes>
      </Router>
    </>
  );
};

export default App;
