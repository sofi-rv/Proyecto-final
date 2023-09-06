import React from "react";
import { Link } from "react-router-dom";

import "../../styles/adminLogin.css";
export const AdminLogin = () => {
  return (
    <div className="adminLogin_page">
      <div className="adminLogin_content">
        <h3 className="adminLogin_title">Administrador</h3>
        <form className="adminLogin_form">
          <h3 className="mb-4">Login</h3>
          <input
            type="text"
            placeholder="ID de administrador"
            className="form_input mb-4"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="form_input mb-4"
          />
          <input type="submit" value="Login" className="form_button mb-4" />
          <Link to="/" className="form_link mt-2">
            Volver al login principal
          </Link>
        </form>
      </div>
    </div>
  );
};
