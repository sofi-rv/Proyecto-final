import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/addCourse.css";
import Swal from "sweetalert2";

export const EditCourse = () => {
    const [code, setCode] = useState("");
    const [modality, setModality] = useState("");
    const { store, actions } = useContext(Context);
    let navigate = useNavigate(""); // useHistory("")
    const [courseList, setCourseList] = useState([]);

    //función para traerse los cursos
    useEffect(() => {
        const getData = async (id) => {
            let response = await actions.fetchPromise(`/api/addCourse/${id}`)

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setCourseList(responseJson)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        getData()
    }, [])

    //función para editar los cursos
    const editData = async (id) => {

        //Sección para enviar la data al backend
        let obj = {
            modality: modality,
            code: code,
        };

        let response = await actions.fetchPromise(`/api/addCourse/${id}`, "PUT")

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

    };

    return (
        <>
            <div className="addCourse_page">
                <form className="addCourse_form my-5" id="addCourse_form">
                    <h3 className="addCourse_title py-3">Editar curso</h3>
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

                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Categoria</label>
                            <select
                                className="picker addCourse_input"

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

                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Costo</label>
                            <input
                                type="number"
                                min="0"
                                className="addCourse_input"

                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Descripción</label>
                            <textarea
                                rows={6}
                                form="addCourse_form"
                                className="addCourse_textarea"

                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Contenidos</label>
                            <input
                                type="text"
                                className="addCourse_input"

                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Fecha de inicio</label>
                            <input
                                type="date"
                                className="addCourse_input"

                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Fecha de finalización</label>
                            <input
                                type="date"
                                className="addCourse_input"

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
                        value="Editar"
                        className="addCourse_button my-4"
                        onClick={() => {
                            editData(search?.id);
                        }}
                    />
                </form>
            </div>
        </>
    );
}