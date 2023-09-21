import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "../../styles/login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  let navigate = useNavigate(""); // useHistory("")

  const register = async () => {
    //Sección de verificación
    if (password == "" || email == "") {
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
      email: email,
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
      localStorage.setItem("token", responseJson.token);
      let userInfo = responseJson.user;
      // actions.userInfo(userInfo)
      actions.activateLoginConfirmation(userInfo);
      if (userInfo.role == "user") {
        navigate("/principalPage"); // history.push("/")
      } else if (userInfo.role == "admin") {
        navigate("/adminPrincipalPage"); // history.push("/")
      }

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
    // if (response.data.user.admin) {
    //   setStore({
    //     admin: true,
    //     auth: true,
    //     userId: response.data.user.id,
    //   });

    // } else {
    //   setStore({
    //     auth: true,
    //     userId: response.data.user.id,
    //   });
    // }
    return;
  };



  return (
    <div className="login_content">
      <div className="login_form">
        <form className="login_form_content">
          <h2 className="login_form_title">Login</h2>
          <p className="mb-4">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="form_link">
              Registrate!
            </Link>
          </p>
          <input
            type="email"
            placeholder="Email de la empresa"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form_input mb-4"
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form_input mb-2"
          />

          <Link to="/passwordRecover" className="form_link my-2 text-center">
            ¿Olvidaste tu contraseña?
          </Link>
          <input
            type="button"
            value="Login"
            className="form_button my-4"
            onClick={register}
          />

          <Link to="/adminLogin" className="form_link text-center text-black">
            Ingresar como administrador
          </Link>
        </form>
      </div>
      <div className="login_text">
        <h2 className="login_text_title">¡Bienvenido!</h2>
        <p>
          Bienvenido al programa de capacitaciones para <br /> empleados de
          Company C.R. <br />Ingresa para acceder a
          los cursos disponibles
        </p>
      </div>
    </div>
  );
};
