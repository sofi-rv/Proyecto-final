import React, { useState, useEffect, useContext } from "react";
import "../../styles/courseDetails.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const CourseDetails = () => {

    const { store, actions } = useContext(Context);
    const [courseDetails, setCourseDetails] = useState({});
    const [courseSupplier, setCourseSupplier] = useState({});
    const { id } = useParams();
    console.log(id)

    useEffect(() => {
        const getData = async () => {
            let response = await actions.fetchPromise(`/api/addCourse/${id}`)

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setCourseDetails(responseJson)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        getData()

        const getSupplier = async () => {
            let response = await actions.fetchPromise(`/api/supplier/${id}`)

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setCourseSupplier(responseJson)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        getSupplier()
    }, [])

    return store.user && store.user.role == "user" ? (
        <div className="courseDetails_page my-4">
            <div className="courseDetails_content">
                {courseDetails && <h3 className="mb-4">{courseDetails.name}</h3>}
                {courseDetails && <p className="mb-4">{courseDetails.description}</p>}

                <div className="d-flex align-items-start">
                    <div className="me-5">
                        <h4>Contenidos:</h4>
                        <ul>
                            {courseDetails && <li>{courseDetails.contents}</li>}
                        </ul>
                    </div>
                    <div className="ms-5">
                        <p>Proveedor: {courseSupplier.supplier_name}</p>
                        {courseDetails && <p>Código: {courseDetails.code}</p>}

                        {courseDetails && <p>Costo: ${courseDetails.cost}</p>}

                        {courseDetails && <p>Modalidad: {courseDetails.modality}</p>}

                        {courseDetails && <p>Fecha de inicio: {courseDetails.start_date}</p>}

                        {courseDetails && <p>Fecha de finalización: {courseDetails.finish_date}</p>}

                    </div>
                </div>
                <Link className="courseDetails_button mt-5" to={`/registerCourse/${id}`}>
                    Matricular
                </Link>
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
