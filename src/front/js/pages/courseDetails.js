import React, { useState, useEffect, useContext } from "react";
import "../../styles/courseDetails.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const CourseDetails = () => {

    const { store, actions } = useContext(Context);
    const [courseDetails, setCourseDetails] = useState({});
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
    }, [])

    return (
        <div className="courseDetails_page">
            <div className="courseDetails_content">
                {courseDetails && <h3>{courseDetails.name}</h3>}
                {courseDetails && <p>{courseDetails.description}</p>}
                <div className="d-flex align-items-start">
                    <div className="me-5">
                        <h4>Contenidos:</h4>
                        <ul>
                            {courseDetails && <li>{courseDetails.contents}</li>}
                            {/* <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li> */}
                        </ul>
                    </div>
                    <div className="ms-5">
                        {courseDetails && <p className="mb-1">Costo: ${courseDetails.cost}</p>}
                        {courseDetails && <p className="mb-1">Modalidad: {courseDetails.modality}</p>}
                        {courseDetails && <p className="mb-1">Fecha de inicio: {courseDetails.start_date}</p>}
                        {courseDetails && <p className="mb-1">Fecha de finalización: {courseDetails.finish_date}</p>}
                        {/* <p className="mb-1">Duración: X meses</p> */}
                        {courseDetails && <p>Código: {courseDetails.code}</p>}
                    </div>
                </div>
                <Link to={`/registerCourse/${id}`}>
                    <button className="courseDetails_button mt-5">Matricular</button>
                </Link>
            </div>
        </div>
    )
};
