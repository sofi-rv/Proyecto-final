import React, { useState, useEffect, useContext } from "react";
import "../../styles/addCourse.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AddCourse = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [provider, setProvider] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [modality, setModality] = useState("");
  const [finish_date, setFinishDate] = useState("");
  const [contents, setContents] = useState("");
  const { store, actions } = useContext(Context);
  const [suppliersList, setSuppliersList] = useState([]);
  let navigate = useNavigate(""); // useHistory("")

  //Agregar curso
  const addcourse = async () => {
    //Sección de verificación
    if (code == "" || name == "" || description == "" || modality == "") {
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
      code: code,
      category: category,
      provider_id: provider,
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

  //Traer informacion de los proveedores
  useEffect(() => {
    const cargaData = async () => {
      let response = await actions.fetchPromise("/api/suppliers")

      if (response.ok) {
        let responseJson = await response.json();
        console.log(responseJson);
        setSuppliersList(responseJson)
      } else {
        let responseJson = await response.json();
        console.log(responseJson);
      }

    }
    cargaData()
  }, [])


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
                  setName(e.target.value);
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
                <option value="Tecnología">Tecnología</option>
                <option value="Humanístico">Humanístico</option>
              </select>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <label className="me-3">Proveedor</label>
              <select defaultValue="0" onChange={(e) => setProvider(e.target.value)}
                className="picker addCourse_input"
              >
                <option disabled value="0">Selecciona una opcion</option>
                {suppliersList && suppliersList.length > 0 ?
                  <>
                    {suppliersList.map((item, index) => {

                      return (
                        <option value={item.id}>{item.name}</option>
                      )
                    })}
                  </>
                  : <></>}

              </select>
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
              <label className="me-3">Contenidos</label>
              <input
                type="text"
                className="addCourse_input"
                onChange={(e) => {
                  setContents(e.target.value);
                }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <label className="me-3">Fecha de inicio</label>
              <input
                type="date"
                className="addCourse_input"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center pb-4">
              <label className="me-3">Fecha de finalización</label>
              <input
                type="date"
                className="addCourse_input"
                onChange={(e) => {
                  setFinishDate(e.target.value);
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
