import React from "react";
import { Link } from "react-router-dom";

export const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <img src="https://i0.wp.com/www.iedunote.com/img/23559/what-is-a-company.jpg?w=1080&quality=100&ssl=1" alt="logo" height="50px" width="50px" />
        <Link className="navbar-brand" to="/principalPage">Company</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex={-1} id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body bg-dark">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {props?.links.map((link, index) => {
                return (
                  <li className="nav-item" key={index}>
                    <Link className="nav-link active" aria-current="page" to={link.path}>{link.name}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
