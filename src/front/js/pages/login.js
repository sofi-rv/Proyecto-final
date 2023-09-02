import React from "react";
import "../../styles/login.css"

export const Login = () => {

    const handleLogin = (e) => {
        e.preventDefault()
    }

    return (
        <>

            <form method="post" className="mx-5" onSubmit={(e) => handleLogin(e)}>
                <div className="mb-3">
                    <label for="userEmail" className="form-label">Ingrese su correo electronico</label>
                    <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="userPassword" className="form-label">Ingrese su contraseña</label>
                    <input type="password" className="form-control" id="userPassword" />
                </div>
                <button type="submit" className="btn btn-primary d-block mx-auto mb-3">Iniciar sesión</button>
            </form>
        </>
    );
};
