import React, { useState, useEffect, useContext } from "react";
import "../../styles/addCourse.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AddCourse = () => {
  const [code, setCode] = useState("");
  const [course, setCourse] = useState("");
  const [category, setCategory] = useState("");
  const [provider, setProvider] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [modality, setModality] = useState("");
  const [finish_date, setFinishDate] = useState("");
  const [contents, setContents] = useState("");
  const { store, actions } = useContext(Context);
  let navigate = useNavigate(""); // useHistory("")

  const addcourse = async () => {
    //Sección de verificación
    if (code == "" || course == "" || description == "" || modality == "") {
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
      course: course,
      code: code,
      category: category,
      provider: provider,
      cost: cost,
      description: description,
      modality: modality,
      start_date: start_date,
      finish_date: finish_date,
      contents: contents,
    };
    let response = await actions.fetchPromise("/api/addCourse", "POST", obj);
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
      navigate("/adminPrincipalPage"); // history.push("/")
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
    <>
      <div className="addCourse_page">
        <form className="addCourse_form my-5" id="addCourse_form">
          <h3 className="addCourse_title py-3">Agregar curso</h3>
          <div>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <label className="me-3">Código</label>
              <input
                type="text"
                className="addCourse_input"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <label className="me-3">Nombre de curso</label>
              <input
                type="text"
                className="addCourse_input"
                onChange={(e) => {
                  setCourse(e.target.value);
                }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <label className="me-3">Categoria</label>
              <select
                className="picker addCourse_input"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="">Elija una categoría</option>
                <option value="true">Tecnología</option>
                <option value="false">Humanístico</option>
              </select>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <label className="me-3">Proveedor</label>
              <input
                type="text"
                className="addCourse_input"
                onChange={(e) => {
                  setProvider(e.target.value);
                }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <label className="me-3">Costo</label>
              <input
                type="number"
                min="0"
                className="addCourse_input"
                onChange={(e) => {
                  setCost(e.target.value);
                }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <label className="me-3">Descripción</label>
              <textarea
                rows={6}
                form="addCourse_form"
                className="addCourse_textarea"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <label className="me-3">Fecha de inicio</label>
              <input
                type="text"
                className="addCourse_input"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <label className="me-3">Modalidad</label>
              <input
                type="text"
                className="addCourse_input"
                onChange={(e) => {
                  setModality(e.target.value);
                }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <label className="me-3">Fecha de finalización</label>
              <input
                type="text"
                className="addCourse_input"
                onChange={(e) => {
                  setFinishDate(e.target.value);
                }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <label className="me-3">Contenidos</label>
              <input
                type="text"
                className="addCourse_input"
                onChange={(e) => {
                  setContents(e.target.value);
                }}
              />
            </div>
          </div>
          <input
            type="button"
            value="Agregar"
            className="addCourse_button my-4"
            onClick={addcourse}
          />
        </form>
      </div>
    </>
  );
};
