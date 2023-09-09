import React from "react";
import { Link } from "react-router-dom";

export const Navbar = (props) => {
  return (
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <img src="https://i0.wp.com/www.iedunote.com/img/23559/what-is-a-company.jpg?w=1080&quality=100&ssl=1" alt="logo" height="50px" width="50px" />
        <Link class="navbar-brand" to="/principalPage">Company</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body bg-dark">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              {props?.links.map((link, index) => {
                return (
                  <li class="nav-item" key={index}>
                    <Link class="nav-link active" aria-current="page" to={link.path}>{link.name}</Link>
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
