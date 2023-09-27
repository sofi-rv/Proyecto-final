import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/userPage.css";

export const UserPage = () => {
    const { store, actions } = useContext(Context);
    const [userDetails, setUserDetails] = useState({});
    const [academicRecord, setAcademicRecord] = useState({});
    const [approvalDoc, setApprovalDoc] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    let user_id = store.user.id;
    console.log(user_id);

    useEffect(() => {
        //Cargar informacion del usuario
        const getData = async () => {
            let response = await actions.fetchPromise(`/api/user/${user_id}`)

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setUserDetails(responseJson)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        getData()

        //Cargar expediente académico
        const getRecord = async () => {
            let response = await actions.fetchPromise(`/api/enrollment/${user_id}`)

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setAcademicRecord(responseJson)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        getRecord()

    }, [])

    //Ingresar comprobante de aprobación
    const addApprovalDoc = async () => {
        //Sección de verificación
        if (approvalDoc == "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Por favor ingrese el link!",
                /* footer: '<a href="">Why do I have this issue?</a>' */
                timer: 3500,
            });
            return;
        }
        //Sección para enviar la data al backend
        let obj = {
            approval_doc: approvalDoc
        };
        console.log(obj)
        let response = await actions.fetchPromise(`/api/enrollment/${selectedCourseId}`, "PUT", obj);
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

            setApprovalDoc("");
        } else {
            let responseJson = await response.json();
            console.log(responseJson);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Error al enviar!",
                /* footer: '<a href="">Why do I have this issue?</a>' */
                timer: 3500,
            });
        }
        return;
    };

    return store.user && store.user.role == "user" ? (
        <div className="ms-5 mt-4 user_page">
            {/* <div className="d-flex align-items-center"> */}

            <div className="d-flex align-items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user_img" height="200px" width="200px" />
                <div className="ms-4">
                    {userDetails && <h3 className="fw-bold">{userDetails.name} {userDetails.lastname}</h3>}
                    {userDetails && <h5>{userDetails.email}</h5>}
                    <br />
                    <Link to="/changePassword" style={{ textDecoration: "none" }}>
                        Cambiar contraseña
                    </Link>

                </div>
            </div>

            <div className="mt-4 me-5">
                <h3 className="mb-3">Historial de capacitaciones</h3>

                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button user_page_accordion collapsed bg-warning" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Capacitaciones en curso
                                <img src="https://cdn-icons-png.flaticon.com/512/3208/3208749.png" alt="approve_icon" height="25px" width="25px" className="ms-3" />
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                {/* <div className="user_page_accordion_item">
                                    Big Data Managment
                                </div>
                                <div className="user_page_accordion_item">
                                    Alta direccion de ciberseguridad
                                </div> */}
                                {academicRecord && academicRecord.length > 0 ?
                                    <>
                                        {academicRecord.map((item, index) => {
                                            return (
                                                item.condition == "En curso" &&
                                                <ul key={index} className="list-group">
                                                    <li className="list-group-item p-4">
                                                        <div className="row">
                                                            <div className="col-8">
                                                                <h5>{item.course_name}</h5>
                                                                Código: {item.course_code} <br />
                                                                Fecha de inicio: {item.course_start_date}
                                                            </div>
                                                            <div className="col-4">
                                                                {/* -- Button trigger modal -- */}
                                                                <button type="button" className="btn btn-primary mt-4" style={{ float: "right" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                                                    setSelectedCourseId(item.course_id)
                                                                }} >
                                                                    Enviar comprobante
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* -- Modal -- */}
                                                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id="exampleModalLabel">Comprobante de aprobación</h5>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        Ingrese el link de su comprobante para realizar la solicitud de aprobación del curso
                                                                        <input
                                                                            type="text"
                                                                            className="addCourse_input"
                                                                            onChange={(e) => {
                                                                                setApprovalDoc(e.target.value);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                                        <button type="button" className="btn btn-primary" onClick={() => {
                                                                            addApprovalDoc()
                                                                        }}>Enviar</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            )
                                        })}
                                    </>
                                    : <></>}
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button user_page_accordion collapsed bg-success" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Capacitaciones aprobadas
                                <img src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png" alt="approve_icon" height="25px" width="25px" className="ms-3" />
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                {/* <div className="user_page_accordion_item">
                                    Big Data Managment
                                </div>
                                <div className="user_page_accordion_item">
                                    Alta direccion de ciberseguridad
                                </div> */}
                                {academicRecord && academicRecord.length > 0 ?
                                    <>
                                        {academicRecord.map((item, index) => {
                                            return (
                                                item.condition == "Aprobados" &&
                                                <ul key={index} className="list-group">
                                                    <li className="list-group-item p-4">

                                                        <div>
                                                            <h5>{item.course_name}</h5>
                                                            Código: {item.course_code} <br />
                                                            Fecha de finalización: {item.course_finish_date}
                                                        </div>


                                                    </li>
                                                </ul>
                                            )
                                        })}
                                    </>
                                    : <></>}
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button user_page_accordion collapsed bg-danger" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Capacitaciones reprobadas
                                <img src="https://as1.ftcdn.net/v2/jpg/01/45/20/02/1000_F_145200273_450ViYipr5uU3WIwqzwjsRDHYTMcUH9P.jpg" alt="approve_icon" height="25px" width="25px" className="ms-3" />
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                {/* <div className="user_page_accordion_item">
                                    Big Data Managment
                                </div>
                                <div className="user_page_accordion_item">
                                    Alta direccion de ciberseguridad
                                </div> */}
                                {academicRecord && academicRecord.length > 0 ?
                                    <>
                                        {academicRecord.map((item, index) => {
                                            return (
                                                item.condition == "Reprobados" &&
                                                <ul key={index} className="list-group">
                                                    <li className="list-group-item p-4">

                                                        <div>
                                                            <h5>{item.course_name}</h5>
                                                            Código: {item.course_code} <br />
                                                            Fecha de finalización: {item.course_finish_date}
                                                        </div>


                                                    </li>
                                                </ul>
                                            )
                                        })}
                                    </>
                                    : <></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        :
        (
            <div className="alert alert-danger d-flex justify-content-center" role="alert">
                <i className="fa-solid fa-circle-exclamation mt-1 me-1"></i><b>Solo usuarios. No tienes permitido entrar a esta página</b>
            </div>
        )
};
