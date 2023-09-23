import React, { useState } from "react";

import "../../styles/maintenance.css";
import { Link } from "react-router-dom";

export const Maintenance = () => {

    const [alertMessage, setAlert] = useState("");
    const [coursesList, setCourses] = useState([])

    const handleSearch = (e) => {
        e.preventDefault()
        let categoryOfSearch = document.querySelector('input[type=radio][name="category"]:checked').value
        let textToSearch = e.target.search.value

        if (categoryOfSearch == "searchForCourseCode" && textToSearch.length < 6 && textToSearch.length > 0) {
            setAlert(
                <div className="alert alert-danger w-50 mx-auto mb-2" role="alert">
                    El código no es correcto.
                </div>
            )
            setCourses(
                []
            )
            return
        }

        if (categoryOfSearch != "" && textToSearch != "") {
            // @TODO Solicitar los datos de la base de datos aqui
            let courses = [
                { "name": "Excel 1", "code": "000111", "supplier": "xxxxx", "modality": "Virtual" },
                { "name": "PowerBI 2", "code": "000112", "supplier": "xxxxx", "modality": "Virtual" },
                { "name": "Ingles 1", "code": "000113", "supplier": "xxxxx", "modality": "Presencial" },
            ]
            let coursesFilter = []

            if (categoryOfSearch == "searchForCourseName") {
                coursesFilter = courses.filter((element) => {
                    return element.name.toLowerCase().includes(textToSearch.toLowerCase())
                })
            } else {
                coursesFilter = courses.filter((element) => {
                    return element.code == textToSearch
                })
            }
            setCourses(coursesFilter)
            if (coursesFilter.length == 0) {
                setAlert(
                    <div className="alert alert-danger w-50 mx-auto my-3" role="alert">
                        No hay cursos por mostrar.
                    </div>
                )
            } else {
                setAlert(
                    ""
                )
            }
        } else {

            setAlert(
                <div className="alert alert-danger w-50 mx-auto my-3" role="alert">
                    Debe seleccionar una categoria e ingresar los datos de busqueda.
                </div>
            )
            setCourses([])
        }
    }

    const handleCheckBoxClick = (e) => {
        document.querySelector('input[type=radio][name=category]').forEach((element) => {
            element.checked = false
        })
        e.target.check
    }

    return store.user && store.user.role == "admin" ? (
        <div className="maintenance_page">
            <div className="maintenance_content">
                {alertMessage}

                <h3 className="ms-4">Eliminar o editar cursos</h3>
                <div className="maintenance_searchForm mx-4 mb-5">
                    <form method="post" onSubmit={(e) => handleSearch(e)}>
                        <label className="maintenance_searchForm_title maintenance_label me-3">Busqueda de cursos:</label>
                        <label className="maintenance_label me-3">Por Nombre</label>
                        <input type="radio" name="category" value={"searchForCourseName"} onClick={(e) => handleCheckBoxClick(e)} className="maintenance_input" />
                        <label className="maintenance_label mx-3">Por Codigo</label>
                        <input type="radio" name="category" value={"searchForCourseCode"} onClick={(e) => handleCheckBoxClick(e)} className="maintenance_input me-3" />
                        <input type="text" name="search" required />
                        <input type="submit" value="Buscar" />
                    </form>
                </div>

                <div className="maintenance_courseList mx-4 mb-4">
                    {coursesList.map((course, index) => {
                        return (
                            <div className="maintenance_courseElement" key={index}>
                                <div className="d-flex justify-content-between" >
                                    <div>
                                        <h4 className="mb-3">{course.name}</h4>
                                        <p className="mb-3">Código: {course.code}</p>
                                        <p className="mb-3">Proveedor: {course.supplier}</p>
                                        <p>Modalidad: {course.modality}</p>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <button className="maintenance_courseButton mb-3">Eliminar</button>
                                        <Link to="/updateCourse" className=" maintenance_courseButton maintenance_courseEditButton">Editar</Link>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )
                    })}
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
