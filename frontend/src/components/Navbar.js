import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  let location = useLocation();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="far fa-edit mx-2">          
          </i>     
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                aria-current="page"
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>              
          {             
             localStorage.getItem('token')
             ? (<><Link type="button" className="btn btn-primary mx-2" onClick={handleLogOut} >Log out</Link></>)
             : (<><Link type="button" className="btn btn-primary mx-2" to="/login">Log in</Link>
               <Link type="button" className="btn btn-primary mx-2" to="/signup">Sign up</Link></>
               )              
          }             
        </div>
      </div>
    </nav>
  );
};
