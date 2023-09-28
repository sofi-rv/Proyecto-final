import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../../styles/passwordRecover.css";

export const PasswordRecover = () => {
  const { store, actions } = useContext(Context)
  const [email, setEmail] = useState("");
  let navigate = useNavigate(""); // useHistory("")

  const resetPassword = async (e) => {
    e.preventDefault()
    //Sección de verificación
    if (email == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Por favor ingrese su correo!",
        /* footer: '<a href="">Why do I have this issue?</a>' */
        timer: 3500,
      });
      return;
    }
    //Sección para enviar la data al backend
    let obj = {
      email: email
    };
    let response = await actions.fetchPromise("/api/password_recovery", "POST", obj);
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
        text: "¡Error al registrar!",
        /* footer: '<a href="">Why do I have this issue?</a>' */
        timer: 3500,
      });
    }
    return;
  };

  return store.user && store.user.role == "user" || "admin" ? (
    <div className="recover_page">
      <form className="recover_form">
        <h3 className="recover_title mb-4">Recuperar Contraseña</h3>
        <label className="mb-4">
          Ingrese la direccion de correo asociada a su cuenta
        </label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="recover_input mb-4"
        />
        <input type="submit" value="Enviar" className="recover_button mb-4" onClick={resetPassword} />
        <Link to="/" className="recover_link mb-4">
          Volver a Login
        </Link>
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
