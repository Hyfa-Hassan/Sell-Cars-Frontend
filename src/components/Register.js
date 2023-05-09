import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "name":
          if (!value) {
            stateObj[name] = "Please enter the name.";
          }
          break;
        case "email":
          if (!value) {
            stateObj[name] = "Please enter your Email.";
          }
          break;
        case "contact":
          if (!value) {
            stateObj[name] = "Please enter your Contact No..";
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = "Please enter the Password.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, contact, email, password } = values;
    console.log(name, email, contact, password);
    try {
      const res = await fetch("http://localhost:9002/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          contact,
          password,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("User Already Exists!");
      } else {
        window.alert("Registered Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="wrapper d-flex align-items-center justify-content-center w-100">
      <div className="register">
        <h2 className="heading mb-3">Create an account!</h2>

        <form className="needs-validation" onSubmit={handleSubmit}>
          <div className="form-group was-validated mb-2">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              className="form-control"
              onChange={handleInput}
              onBlur={validateInput}
              required
            />
            {error.name && (
              <span className="invalid-feedback">{error.name}</span>
            )}
          </div>

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
              onBlur={validateInput}
              required
            />
            {error.email && (
              <span className="invalid-feedback">{error.email}</span>
            )}
          </div>

          <div className="form-group was-validated mb-2">
            <label htmlFor="contact" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={values.contact}
              className="form-control"
              onChange={handleInput}
              onBlur={validateInput}
              required
            />
            {error.contact && (
              <span className="invalid-feedback">{error.contact}</span>
            )}
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
              onBlur={validateInput}
              required
            />
            {error.password && (
              <span className="invalid-feedback">{error.password}</span>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100 mt-4">
            Sign Up
          </button>

          <p className="signup text-center">
            Already have an account?
            <Link to="/" style={{ textDecoration: "none" }}>
              <span> Sign In</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
