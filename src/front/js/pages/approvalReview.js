import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../styles/approvalReview.css";

export const ApprovalReview = () => {

    const [approvalList, setApprovalList] = useState([])

    useEffect(() => {
        //@TODO Estos datos deben venir de la base de datos
        let approvalList = [
            { "NombreEmpleado": "Nombre del empleado", "CedulaEmpleado": "Cédula", "CodigoCurso": "Código del curso", "LinkComprobante": "#" },
            { "NombreEmpleado": "Nombre del empleado", "CedulaEmpleado": "Cédula", "CodigoCurso": "Código del curso", "LinkComprobante": "#" },
            { "NombreEmpleado": "Nombre del empleado", "CedulaEmpleado": "Cédula", "CodigoCurso": "Código del curso", "LinkComprobante": "#" },
            { "NombreEmpleado": "Nombre del empleado", "CedulaEmpleado": "Cédula", "CodigoCurso": "Código del curso", "LinkComprobante": "#" },
        ]
        setApprovalList(approvalList)
    }, []);

    const handleApproval = (position) => {
        // @TODO hacer la logica de aprobacion en la base de datos
        removeApprovalFromList(position)
    }

    const handleRejection = (position) => {
        // @TODO hacer la logica de rechazo en la base de datos
        removeApprovalFromList(position)
    }

    const removeApprovalFromList = (position) => {
        let temp = [...approvalList]
        temp.splice(position, 1)
        setApprovalList(temp)
    }

    return (
        <div className="approvalReview_page">
            <div className="approvalReview_content">
                <h3 className="ms-5 my-4">Solicitudes</h3>
                <div className="approvalReview_list mx-5 mb-5">
                    {approvalList.map((element, index, { length }) => {

                        return (
                            <div key={index}>
                                <div className="approvalReview_listItem d-flex justify-content-between align-items-center">
                                    <div>
                                        <h4>{element.NombreEmpleado}</h4>
                                        <p>{element.CedulaEmpleado}</p>
                                        <p>{element.CodigoCurso}</p>
                                        <Link to={element.LinkComprobante} className="form_link">
                                            Link del comprobante enviado
                                        </Link>
                                    </div>
                                    <div>
                                        <button className="approvalReview_button mb-4" onClick={() => handleApproval(index)}>Aprobar</button>
                                        <button className="approvalReview_button" onClick={() => handleRejection(index)}>Reprobar</button>
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
                </div>
            </div>
        </div>
    );
};
