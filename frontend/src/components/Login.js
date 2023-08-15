import { React, useState } from "react";

export default function Login() {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({email: "", password: ""});
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",        
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    if(json.success){      
      localStorage.setItem('token', json.authtoken);
      console.log(json.authtoken);
    } else {  
      alert(json.error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Login
        </button>
      </form>
    </div>
  );
}
