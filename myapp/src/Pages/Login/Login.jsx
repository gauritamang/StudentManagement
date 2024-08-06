import React, { useEffect, useState } from "react";
import "./Login.css";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

function Login() {
  const loginData = useSelector((state) => state.loginData);
  const navigate = useNavigate();

  const [uData, setuData] = useState({
    email: "",
    password: "",
  });

  const [loginFail, setLoginFail] = useState(false);

  const handle = (e) => {
    setuData({ ...uData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submittesd ");
    console.log(uData.email);
    console.log(uData.password);
    console.log(loginData.email);
    console.log(loginData.password);
    if (
      uData.email === loginData.email &&
      uData.password === loginData.password
    ) {
      localStorage.setItem("loginData", JSON.stringify(uData));
      navigate("/dashboard");
    } else {
      setLoginFail(true);
    }
  };

  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col col-sm-5 form-col">
            <form action="" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="email"
                  name="email"
                  onChange={(e) => handle(e)}
                  value={uData.email}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput2"
                  className="form-label"
                >
                  password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleFormControlInput2"
                  placeholder="password"
                  name="password"
                  onChange={(e) => handle(e)}
                  value={uData.password}
                />
              </div>

              <button className=" btn bg-info ">submit</button>
            </form>
      {loginFail && <div className="incorrect-p">incorect password </div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
