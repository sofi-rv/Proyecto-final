import React from "react";
import { Link } from "react-router-dom";

import "../../styles/login.css";

export const Login = () => {

	return (
        <div className="login_content">
            <div className="login_form">
                <form className="login_form_content">
                    <h2 className="login_form_title">Login</h2>
                    <p className="mb-4">¿No tienes una cuenta? <Link to="/" className="form_link">Registrate!</Link></p>
                    <input type="email" placeholder="Email de la empresa" className="form_input mb-4"/>
                    <input type="password" placeholder="Contraseña" className="form_input mb-2"/>

                    <Link to="/passwordRecover" className="form_link my-2 text-center">¿Olvidaste tu contraseña?</Link>
                    <input type="submit" value="Login" className="form_button my-4"/>

                    <Link to="/" className="form_link text-center text-danger">Ingresar como administrador</Link>
                </form>
            </div>
            <div className="login_text">
                <h2 className="login_text_title">¡Bienvenido!</h2>
                <p>Bienvenido al programa de capacitaciones para <br/> empleados de Company. Ingresa para acceder a <br/> los cursos disponibles</p>
            </div>
        </div>
	);
};