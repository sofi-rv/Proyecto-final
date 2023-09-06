import React from "react";
import { Link } from "react-router-dom";
import "../../styles/register.css";

export const Register = () => {
  return (
    <div className="register_page">
      <form className="register_form">
        <h3 className="register_title mb-4">Registro de usuario</h3>
        <input
          type="text"
          placeholder="Nombre completo"
          className="register_input mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          className="register_input mb-4"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="register_input mb-4"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="register_input mb-4"
        />
        <input
          type="submit"
          value="Registrarse"
          className="register_button mb-4"
        />
        <Link to="/" className="register_link mb-4">
          ¿Ya tenias una cuenta? Volver a login
        </Link>
      </form>
    </div>
  );
};
