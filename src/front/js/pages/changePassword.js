import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../../styles/passwordRecover.css";

export const ChangePassword = () => {
    const { store, actions } = useContext(Context)
    const [password, setPassword] = useState("");
    let navigate = useNavigate(""); // useHistory("")
    let user_email = store.user ? store.user.email : "";

    const resetPassword = async () => {
        //Sección de verificación
        if (password == "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Por favor ingrese su nueva contraseña!",
                /* footer: '<a href="">Why do I have this issue?</a>' */
                timer: 3500,
            });
            return;
        }
        //Sección para enviar la data al backend
        let obj = {
            password: password
        };
        let response = await actions.fetchPromise(`/api/change_password/${user_email}`, "PUT", obj);
        if (response.ok) {
            let responseJson = await response.json();
            console.log(responseJson);
            Swal.fire({
                position: "center",
                icon: "success",
                title: responseJson.message,
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/"); // history.push("/")
        } else {
            let responseJson = await response.json();
            console.log(responseJson);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Error al cambiar contraseña!",
                /* footer: '<a href="">Why do I have this issue?</a>' */
                timer: 3500,
            });
        }
        return;
    };

    return store.user && store.user.role == "user" || "admin" ? (
        <div className="recover_page">
            <form className="recover_form">
                <h3 className="recover_title mb-4">Cambiar Contraseña</h3>
                <label className="mb-4">
                    Ingrese su nueva contraseña
                </label>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    className="recover_input mb-4"
                />
                <input type="submit" value="Enviar" className="recover_button mb-4" onClick={resetPassword} />
            </form>
        </div>
    )
        :
        (
            <div className="alert alert-danger d-flex justify-content-center" role="alert">
                <i className="fa-solid fa-circle-exclamation mt-1 me-1"></i><b>Solo usuarios y administradores. No tienes permitido entrar a esta página</b>
            </div>
        )
};
