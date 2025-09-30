import React from "react";
const RegStaff = () => {
  const formCategory = [
    { name: "LRN number", type: "text" },
    { name: "First Name", type: "text" },
    { name: "Last Name", type: "text" },
    { name: "security password Code ", type: "text" },
  ];
  const position = [
    { name: "Principal" },
    { name: "asisstant Principal" },
    { name: "registrar staff" },
    { name: "canteen staff " },
    { name: "teacher" },
    { name: "school guard" },
  ];
  return (
    <section id="register-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-5">
            <div className="card" id="card">
              <div className="card-header" style={{ border: "none" }}>
                <h1 className="text-center ">Staff register form</h1>
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
                        marginTop: "0.5rem",
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
                      Position
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
                      {position.map(({ name }) => (
                        <option value="Grade 7" key={Math.random()}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </span>
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
                    <button className="btn btn-primary my-3" id="submitBtn">
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

export default RegStaff;
