import React from "react";
import { Link } from "react-router-dom"

import "../../styles/passwordRecover.css";

export const PasswordRecover = () => {
	return (
        <div className="recover_page">
            <form className="recover_form"> 
                <h3 className="recover_title mb-4">Recuperar Contraseña</h3>
                <label className="mb-4">Ingrese la direccion de correo asociada a su cuenta</label>
                <input type="email" placeholder="Email" className="recover_input mb-4"/>
                <input type="submit" value="Enviar" className="recover_button mb-4"/>
                <Link to="/login" className="recover_link mb-4">Volver a Login</Link>
            </form>
        </div>
	);
};