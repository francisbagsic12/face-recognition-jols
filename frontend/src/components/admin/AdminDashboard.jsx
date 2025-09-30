import React, { useState } from "react";
import "../admin/admin.css";
import OverView from "./overview/OverView";
import LoginRecord from "./login record/LoginRecord";
import Student from "./overview/student section/Student"; // Import the Student component
import Staff from "./overview/staff section/Staff";
import Visitor from "./overview/visitor component/Visitor";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdHome,
  IoMdLogIn,
  IoMdPeople,
  IoMdLogOut,
  IoMdMenu,
  IoMdSchool,
  IoMdBriefcase,
  IoMdPerson, // Import an icon for Students
} from "react-icons/io";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userActive, setUserActive] = useState(false);
  const [activeComponent, setActiveComponent] = useState("overview"); // New state to track active component

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const renderComponent = () => {
    switch (activeComponent) {
      case "overview":
        return (
          <>
            <OverView /> <LoginRecord />
          </>
        );
      case "loginRecord":
        return <LoginRecord />;
      case "students":
        return <Student />;
      case "staff":
        return <Staff />;
      case "visitor":
        return <Visitor />;
      default:
        return <OverView />;
    }
  };
  return (
    <div className="admin-dashboard d-flex">
      <nav className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Admin Dashboard</h3>
          <button
            className="btn btn-link d-md-none text-light"
            onClick={toggleSidebar}
          >
            <IoMdMenu size={24} /> {/* Changed from IoMenuSharp to IoMdMenu */}
          </button>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a
              className="nav-link"
              href="# "
              onClick={() => setActiveComponent("overview")}
            >
              <IoMdHome /> Overview
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => setActiveComponent("loginRecord")}
            >
              <IoMdLogIn /> Login Record
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link d-flex align-items-center justify-content-between"
              onClick={() => setUserActive(!userActive)}
            >
              <span>
                <IoMdPeople />
                Users
              </span>
              <span>{userActive ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </a>

            {userActive ? (
              <></>
            ) : (
              <>
                {" "}
                <ul
                  className={`nav flex-column sub-menu ${
                    userActive ? "show" : ""
                  }`}
                >
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => setActiveComponent("visitor")}
                    >
                      <IoMdPerson /> Visitor
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => setActiveComponent("staff")}
                    >
                      <IoMdBriefcase /> Staff
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => setActiveComponent("students")}
                    >
                      <IoMdSchool /> Student
                    </a>
                  </li>{" "}
                </ul>
              </>
            )}
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <IoMdLogOut /> Logout
            </a>
          </li>
        </ul>
      </nav>
      <main className={`main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
        <header className="navbar navbar-light bg-light">
          <button className="btn btn-link d-md-none" onClick={toggleSidebar}>
            <IoMdMenu size={24} />
          </button>
          <span className="navbar-brand mb-0 h1">Dashboard</span>
        </header>

        <div className="container-fluid mt-3">{renderComponent()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;
