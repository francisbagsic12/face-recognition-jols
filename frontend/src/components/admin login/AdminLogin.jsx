import React from "react";
import "../admin login/adminLogin.css";
const AdminLogin = () => {
  const formCategory = [
    { name: "Username", type: "text" },
    { name: "Password", type: "password" },
  ];
  return (
    <section id="register-section">
      <div className="container-fluid">
        <div className="row m-5" id="row">
          <div className="col-sm-3">
            <div className="card" id="card">
              <div className="card-header" style={{ border: "none" }}>
                <h1 className="text-center text-white">Administrator Login</h1>
              </div>
              <div className="card-body">
                <form>
                  {" "}
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
                          marginBottom: "0.5rem",
                          marginLeft: "0.5rem",
                          color: "black",
                        }}
                      >
                        {name}
                      </label>
                      <input
                        type={type}
                        className="inpot"
                        id="forFName"
                        style={{
                          height: "45px",
                          borderRadius: "25px",
                          border: "none",
                          backgroundColor: "rgba(134, 113, 113, 0.53)",
                        }}
                      />
                    </span>
                  ))}
                  <div class="d-grid gap-2 col-10 mx-auto">
                    <button className="btn btn-success my-3 " id="submitBtn">
                      Login
                    </button>
                  </div>
                </form>
                <img
                  src="https://tse3.mm.bing.net/th/id/OIP.cOeAz-IvaLn2hb3fTZE5YQHaG8?rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="jolnhs"
                  className="img-fluid"
                  style={{ border: "1px solid yellow " }}
                />
              </div>
            </div>
          </div>
          <div
            className="col-sm-6"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              className="text-light text-center"
              style={{ fontFamily: "sans-serif", fontSize: "1.3rem" }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Molestias, ipsam maxime. Tempore, dolore! Tenetur enim laborum,
              provident vel quod debitis voluptas dolores facere impedit tempora
              voluptatibus exercitationem quisquam. Eligendi, dolor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
