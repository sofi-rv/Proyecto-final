import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export const PruebaEditar = () => {
    const { store, actions } = useContext(Context);
    const [courseList, setCourseList] = useState([]);
    const [code, setCode] = useState("");
    const [modality, setModality] = useState("");
    const ref = useRef(null);
    //función para traerse los cursos
    useEffect(() => {
        const getData = async () => {
            let response = await actions.fetchPromise("/api/addCourse")

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setCourseList(responseJson)
                setCode(responseJson.code)
                setModality(responseJson.modality)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        getData()
    }, [])

    //función para eliminar curso
    const deleteData = async (id) => {
        let response = await actions.fetchPromise(`/api/addCourse/${id}`, "DELETE")

        if (response.ok) {
            let responseJson = await response.json();
            console.log(responseJson);
            setCourseList((prevList) => prevList.filter((course) => course.id !== id));
        } else {
            let responseJson = await response.json();
            console.log(responseJson);
        }

    }

    //función para editar curso
    const editData = async (id) => {
        //Sección para enviar la data al backend
        let obj = {
            modality: modality,
            code: code,
        };

        let response = await actions.fetchPromise(`/api/addCourse/${id}`, "PUT", obj)

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
                text: "¡Error al editar!",
                /* footer: '<a href="">Why do I have this issue?</a>' */
                timer: 3500,
            });
        }

    };

    //funcion para filtrar los cursos por nombre
    //courseList.filter(course => {})

    return (
        <div className="container">
            <div>
                Buscar curso
                <input className="form-control" type="text" placeholder="Nombre del curso"></input> {/*Listener event.key === "Enter"*/}
            </div>
            {courseList && courseList.length > 0 ?
                <>
                    {courseList.map((item, index) => {
                        return (
                            <div>
                                <div className="row">
                                    <div className="col-11">
                                        <h4>{item.name}</h4>
                                        <div className="row">
                                            <div className="col-4">
                                                Descripción:{item.description}
                                            </div>
                                            <div className="col-4">
                                                Contenidos:{item.contents}
                                            </div>
                                            <div className="col-4">
                                                Código de curso:{item.code} <br></br>
                                                Proveedor:{item.provider} <br></br>
                                                Modalidad:{item.modality} <br></br>
                                                Costo:{item.cost} <br></br>
                                                Fecha de inicio:{item.start_date} <br></br>
                                                Fecha de finalización:{item.start_date}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-1 mt-4">
                                        <button type="button" className="btn btn-primary" onClick={() => {
                                            deleteData(item.id);
                                            console.log(item.id)
                                        }}><i className="fa-solid fa-trash"></i></button>
                                        {/* Button trigger modal */}
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalLong">
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                    </div>
                                </div>
                                {/* Modal */}
                                <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">Editar curso</h5>
                                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body bg-light">
                                                <div className="d-flex justify-content-between align-items-center pb-4">
                                                    <label className="me-3">Código</label>
                                                    <input
                                                        type="text"
                                                        className="addCourse_input"
                                                        defaultValue={item.code}
                                                        placeholder={item.code}
                                                        ref={ref}
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
                                                        defaultValue={item.modality}
                                                        onChange={(e) => {
                                                            setModality(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={() => {
                                                    editData(item.id);
                                                    location.reload();
                                                    console.log(item.id)
                                                }}>Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </>
                : <></>
            }


        </div>
    );
};