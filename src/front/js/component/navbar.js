import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = (props) => {
  const { store, actions } = useContext(Context);

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
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close">
            </button>
          </div>
          <div className="offcanvas-body bg-dark">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {/* {store.user && store.user.role == "user" ?} */}
              <li><Link className="nav-link active ms-2" aria-current="page" to="/userPage" >
                Mi perfil
              </Link></li>
              <Link to="/reglament" className="nav-link active ms-2 mt-2">Normativa</Link> {/* revisar si quitar o no*/}
              <li><button className="bg-dark border-0" onClick={() => actions.logout()}><Link className="nav-link active" aria-current="page" to="/" >
                Cerrar sesión
              </Link></button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
