import React from "react";
// import "../register for student/regstudent.css";
const RegStudent = () => {
  const formCategory = [
    { name: "LRN numba", type: "text" },
    { name: "First Name", type: "text" },
    { name: "Last Name", type: "text" },
    { name: "security password Code ", type: "text" },
  ];
  return (
    <section id="register-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-5">
            <div className="card" id="card">
              <div className="card-header" style={{ border: "none" }}>
                <h1 className=" text-center">Student register form</h1>
              </div>
              <div className="card-body">
                <form style={{ height: "auto" }} className="">
                  {" "}
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      htmlFor="forGender"
                      className="lead"
                      style={{
                        color: "rgb(180, 173, 173)",
                        fontSize: "1rem",
                        marginTop: "1rem",
                        marginLeft: "0.5rem",
                      }}
                    >
                      Gender
                    </label>
                    <select
                      name="gender"
                      style={{
                        width: "100%",
                        textAlign: "center",
                        height: "45px",
                        borderRadius: "25px",
                        border: "none",
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                      }}
                      id="forGender"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </span>
                  <div
                    id="grade_and_section"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      height: "50px",
                    }}
                  >
                    {" "}
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",

                        alignContent: "center",
                      }}
                    >
                      <label
                        htmlFor="forGender"
                        className="lead"
                        style={{
                          color: "rgb(180, 173, 173)",
                          fontSize: "1rem",
                          marginTop: "1rem",
                          marginLeft: "0.5rem",
                        }}
                      >
                        Grade level
                      </label>
                      <select
                        name="gender"
                        style={{
                          width: "100%",
                          textAlign: "center",
                          height: "45px",
                          borderRadius: "25px",
                          border: "none",
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                        }}
                        id="forGender"
                      >
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                        <option value="Grade 9">Grade 9</option>
                        <option value="Grade 10">Grade 10</option>
                        <option value="Grade 11">Grade 11</option>
                        <option value="Grade 12">Grade 12</option>
                      </select>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                      <label
                        htmlFor="forGender"
                        className="lead"
                        style={{
                          color: "rgb(180, 173, 173)",
                          fontSize: "1rem",
                          marginTop: "1rem",
                          marginLeft: "0.5rem",
                        }}
                      >
                        Section
                      </label>
                      <select
                        name="gender"
                        style={{
                          width: "100%",
                          textAlign: "center",
                          height: "45px",
                          borderRadius: "25px",
                          border: "none",
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                        }}
                        id="forGender"
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">A</option>
                        <option value="D">B</option>
                        <option value="E">A</option>
                        <option value="F">B</option>
                      </select>
                    </span>
                  </div>
                  {formCategory.map(({ name, type }) => (
                    <span
                      key={Math.random()}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <label
                        htmlFor="forFName"
                        className="lead"
                        style={{
                          fontSize: "1rem",
                          marginTop: "1rem",
                          marginLeft: "0.5rem",
                          color: "rgb(180, 173, 173)",
                        }}
                      >
                        {name}
                      </label>
                      <input
                        type={type}
                        id="forFName"
                        style={{
                          height: "45px",
                          borderRadius: "25px",
                          border: "none",
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                        }}
                      />
                    </span>
                  ))}
                  <div class="d-grid gap-2 col-10 mx-auto">
                    <button className="btn btn-primary my-2 " id="submitBtn">
                      register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegStudent;
