import React from "react";
import { FaUserGraduate, FaUserTie, FaUserFriends } from "react-icons/fa";
import "../overview/overview.css";

const OverView = () => {
  const cards = [
    { title: "Students", count: 0, icon: FaUserGraduate, color: "primary" },
    { title: "Staff", count: 0, icon: FaUserTie, color: "success" },
    { title: "Visitors", count: 0, icon: FaUserFriends, color: "info" },
  ];

  return (
    <div className="overview-container">
      <h2 className="mb-4">Overview</h2>
      <div className="row">
        {cards.map((card, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className={`c1 card bg-${card.color} text-white h-100`}>
              <div className="c2 card-body d-flex flex-column align-items-center justify-content-center">
                <card.icon size={48} className="mb-3" />
                <h2 className="c3 card-title mb-0">{card.count}</h2>
                <p className="c4 card-text">{card.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverView;
