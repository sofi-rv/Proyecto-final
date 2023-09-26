import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/maintenance.css";
import { Link } from "react-router-dom";

export const Maintenance = () => {
    const { store, actions } = useContext(Context);
    const [courseList, setCourseList] = useState([]);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [category, setCategory] = useState("");
    const [cost, setCost] = useState("");
    const [description, setDescription] = useState("");
    const [modality, setModality] = useState("");
    const [start_date, setStartDate] = useState("");
    const [finish_date, setFinishDate] = useState("");
    const [contents, setContents] = useState("");
    const ref = useRef(null);

    const [alertMessage, setAlert] = useState("");
    const [coursesList, setCourses] = useState([])

    //función para traerse los cursos
    useEffect(() => {
        const getData = async () => {
            let response = await actions.fetchPromise("/api/courses")

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
            name: name,
            code: code,
            category: category,
            cost: cost,
            description: description,
            modality: modality,
            start_date: start_date,
            finish_date: finish_date,
            contents: contents,
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

                <h3 className="ms-4 mb-4">Eliminar o editar cursos</h3>
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
                    {/* {coursesList.map((course, index) => {
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
                    })} */}

                    {courseList && courseList.length > 0 ?
                        <>
                            {courseList.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className="row p-4">
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
                                                                defaultValue={item.name}
                                                                placeholder={item.name}
                                                                ref={ref}
                                                                onChange={(e) => {
                                                                    setName(e.target.value);
                                                                }}

                                                            />
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center pb-4">
                                                            <label className="me-3">Categoria</label>
                                                            <select
                                                                className="picker addCourse_input"
                                                                defaultValue={item.category}
                                                                placeholder={item.category}
                                                                ref={ref}
                                                                onChange={(e) => {
                                                                    setCategory(e.target.category);
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

                                                            />
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center pb-4">
                                                            <label className="me-3">Costo</label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                className="addCourse_input"
                                                                defaultValue={item.cost}
                                                                placeholder={item.cost}
                                                                ref={ref}
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
                                                                defaultValue={item.description}
                                                                placeholder={item.description}
                                                                ref={ref}
                                                                onChange={(e) => {
                                                                    setDescription(e.target.value);
                                                                }}

                                                            />
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center pb-4">
                                                            <label className="me-3">Contenidos</label>
                                                            <textarea
                                                                rows={6}
                                                                form="addCourse_form"
                                                                className="addCourse_textarea"
                                                                defaultValue={item.contents}
                                                                placeholder={item.contents}
                                                                ref={ref}
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
                                                                defaultValue={item.start_date}
                                                                placeholder={item.start_date}
                                                                ref={ref}
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
                                                                defaultValue={item.finish_date}
                                                                placeholder={item.finish_date}
                                                                ref={ref}
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
