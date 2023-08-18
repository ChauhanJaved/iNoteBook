import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";

export default function Signup() {
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handdleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handdleOnSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, password, cpassword } = credentials;
    // check if password and cpassword are same
    if (password !== cpassword) {
      showAlert("Passwords do not match", "danger");      
      return;
    }   
    
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      showAlert("Congratulation, your account has been created successfully", "success"); 
      navigate("/");            
    } else {
      showAlert(json.error, "danger");      
    }
  };

  return (
    <div className="container">
      <form onSubmit={handdleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"            
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            autoComplete="username"
            onChange={handdleOnChange}
            required={true}            
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            autoComplete="username"
            onChange={handdleOnChange}
            required={true}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            autoComplete="current-password"
            onChange={handdleOnChange}
            required={true}
            minLength={6}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            autoComplete="current-password"
            onChange={handdleOnChange}
            required={true}
            minLength={6}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create User
        </button>
      </form>
    </div>
  );
}
