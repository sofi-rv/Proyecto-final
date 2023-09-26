import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";


import "../../styles/approvalReview.css";

export const ApprovalReview = () => {

    const [approvalList, setApprovalList] = useState([])
    const { store, actions } = useContext(Context);


    useEffect(() => {
        const getData = async () => {
            let response = await actions.fetchPromise("/api/enrollment")

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setApprovalList(responseJson)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        getData()

    }, []);

    const handleApproval = async (id, index) => {
        // @TODO hacer la logica de aprobacion en la base de datos
        // removeApprovalFromList(position)
        //Sección para enviar la data al backend
        let obj = {
            condition: "Aprobados"
        };
        let response = await actions.fetchPromise(`/api/condition/${id}`, "PUT", obj);
        if (response.ok) {
            let responseJson = await response.json();
            console.log(responseJson);
            removeApprovalFromList(index);
            Swal.fire({
                position: "center",
                icon: "success",
                title: responseJson.message,
                showConfirmButton: false,
                timer: 1500,
            });
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
    }

    const handleRejection = async (id, index) => {
        // @TODO hacer la logica de rechazo en la base de datos
        // removeApprovalFromList(position)
        //Sección para enviar la data al backend
        let obj = {
            condition: "Reprobados"
        };
        let response = await actions.fetchPromise(`/api/condition/${id}`, "PUT", obj);
        if (response.ok) {
            let responseJson = await response.json();
            console.log(responseJson);
            removeApprovalFromList(index);
            Swal.fire({
                position: "center",
                icon: "success",
                title: responseJson.message,
                showConfirmButton: false,
                timer: 1500,
            });
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
    }

    const removeApprovalFromList = (position) => {
        let temp = [...approvalList]
        temp.splice(position, 1)
        setApprovalList(temp)
    }
    useEffect(() => { console.log("renderizando de nuevo") }, [approvalList])

    return store.user && store.user.role == "admin" ? (
        <div className="approvalReview_page">
            <div className="approvalReview_content">
                <h3 className="ms-5 my-4">Solicitudes</h3>
                <div className="approvalReview_list mx-5 mb-5">
                    {approvalList && approvalList.length > 0 ?
                        <>
                            {approvalList.map((item, index) => {

                                return (
                                    (item.approval_doc) !== "" && (item.condition) == "En curso" &&
                                    <div key={index}>
                                        <div className="approvalReview_listItem d-flex justify-content-between align-items-center">
                                            <div>
                                                <h4>{item.user_name} {item.user_lastname}</h4>
                                                <p>{item.id_number}</p>
                                                <p>{item.course_name}</p> {/* agregar codigo de curso*/}
                                                <Link to={item.approval_doc} className="form_link">
                                                    Link del comprobante enviado
                                                </Link>
                                            </div>
                                            <div>
                                                <button className="approvalReview_button mb-4" onClick={() => handleApproval(item.id, index)}>Aprobar</button>
                                                <button className="approvalReview_button" onClick={() => handleRejection(item.id, index)}>Reprobar</button>
                                            </div>
                                        </div>
                                        {(() => {
                                            if (index + 1 !== length) {
                                                return (
                                                    <hr />
                                                )
                                            }
                                        })()}
                                    </div>
                                )
                            })}
                        </>
                        : <></>}
                </div>
            </div>
        </div>
    )
        :
        (
            <div className="alert alert-danger d-flex justify-content-center" role="alert">
                <i className="fa-solid fa-circle-exclamation mt-1 me-1"></i><b>Solo administradores. No tienes permitido entrar a esta página</b>
            </div>
        )
};
