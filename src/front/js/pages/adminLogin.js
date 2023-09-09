import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "../../styles/adminLogin.css";
export const AdminLogin = () => {
  const [admin_id, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);

  const adminlogin = async () => {
    //Sección de verificación
    if (password == "" || admin_id == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor llene ambos campos!",
        /* footer: '<a href="">Why do I have this issue?</a>' */
        timer: 3500,
      });
      return;
    }
    //Sección para enviar la data al backend
    let obj = {
      admin_id: admin_id,
      password: password,
    };
    let response = await actions.fetchPromise("/api/", "POST", obj);
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
      actions.activateAdminLoginConfirmation();
      //prueba - pero debe llevar a página principal de usuario
      navigate("/adminPrincipalPage"); // history.push("/")
    } else {
      let responseJson = await response.json();
      console.log(responseJson);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Error al ingresar!",
        /* footer: '<a href="">Why do I have this issue?</a>' */
        timer: 3500,
      });
    }
    return;
  };

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
            onChange={(e) => {
              setAdmin(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="form_input mb-4"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input type="button" value="Login" className="form_button mb-4" onClick={adminlogin} />
          <Link to="/" className="form_link mt-2">
            Volver al login principal
          </Link>
        </form>
      </div>
    </div>
  );
};
