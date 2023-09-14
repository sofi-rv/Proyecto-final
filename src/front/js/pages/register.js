import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/register.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  let navigate = useNavigate(""); // useHistory("")

  const register = async () => {
    //Sección de verificación
    if (password == "" || email == "" || name == "" || lastname == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Por favor llene todos los campos!",
        /* footer: '<a href="">Why do I have this issue?</a>' */
        timer: 3500,
      });
      return;
    }
    //Sección para enviar la data al backend
    let obj = {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
      role: ""
    };
    let response = await actions.fetchPromise("/api/register", "POST", obj);
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

  return (
    <div className="register_page">
      <form className="register_form">
        <h3 className="register_title mb-4">Registro de usuario</h3>
        <input
          type="text"
          placeholder="Nombre"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="register_input mb-4"
        />
        <input
          type="text"
          placeholder="Apellidos"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          className="register_input mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="register_input mb-4"
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="register_input mb-4"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="register_input mb-4"
        />
        <input
          type="button"
          value="Registrarse"
          className="register_button mb-4"
          onClick={register}
        />
        <Link to="/" className="register_link mb-4">
          ¿Ya tenias una cuenta? Volver a login
        </Link>
      </form>
    </div>
  );
};
