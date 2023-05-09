import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    try {
      const res = await fetch("http://localhost:9002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 400 || !res) {
        window.alert("Invalid Credentials");
      } else {
        window.confirm("Login Successfull");
        navigate("/car-details");
      }
    } catch (error) {
      console.log(error);
    }
    setValues({
      email: "",
      password: "",
    });
  };
  
  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100">
      <div className="login">
        <h2 className="mb-3">Login</h2>
        <form className="needs-validation" onSubmit={handleSubmit}>
          <div className="form-group was-validated mb-2">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              className="form-control"
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group was-validated mb-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              className="form-control"
              onChange={handleInput}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-4">
            Log In
          </button>
          <p className="signup text-center">
            Don't have an account yet?
            <Link to="/register" style={{ textDecoration: "none" }}>
              <span> Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
