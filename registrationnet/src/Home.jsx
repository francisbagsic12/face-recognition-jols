import React from "react";

const Home = () => {
  return (
    <div
      className="container-fluid"
      style={{
        border: "1px solid black",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        className="row m-5  justify-content-center "
        style={{ border: "1px solid black" }}
      >
        <div
          className=" col-xs-12 col-sm-7   col-md-7 col-xl-3  m-1 "
          style={{ border: "1px solid black", height: "150px" }}
        >
          <button className="btn btn-primary">Student</button>
        </div>
        <div
          className="col-xs-12  col-sm-7  col-md-7  col-xl-3 m-1"
          style={{ border: "1px solid black", height: "150px" }}
        >
          <button className="btn btn-primary">Visitor</button>
        </div>
        <div
          className="col-xs-12  col-sm-7  col-md-7 col-xl-3  m-1 "
          style={{ border: "1px solid black", height: "150px" }}
        >
          <button className="btn btn-primary">Student</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
