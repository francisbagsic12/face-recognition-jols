import React from "react";
import { useContext } from "react";
import { personInfo } from "../face cam/FaceRecognition";

const Card = () => {
  const info = useContext(personInfo);

  const defaultImage =
    "https://www.seekpng.com/png/full/133-1334822_default-staff-image-person-icon.png";
  const defaultName = "No Person Detected";
  const defaultType = "Please stand in front of the camera";

  const formatTime = (date) => {
    return date ? date.toLocaleTimeString() : "Not recorded";
  };

  return (
    <div className="container-fluid p-5">
      <div className="card">
        <div className="card-body">
          <img
            id="image-person"
            src={info.imahe || defaultImage}
            className="img-fluid"
            alt="Person"
          />
          <h5 className="card-title text-center display-3">
            {info.name || defaultName}
          </h5>
          <p className="card-text text-center display-6">
            {info.type
              ? info.type === "student"
                ? `Student - ${info.section}`
                : "Visitor"
              : defaultType}
          </p>
          <span
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "15%",
            }}
          >
            <p className="card-text text-center lead">
              Time in: {formatTime(info.timeIn)}
            </p>
            <p className="card-text text-center lead">
              Time out:{" "}
              {info.canTimeOut ? formatTime(info.timeOut) : "Not available yet"}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
