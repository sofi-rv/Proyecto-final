import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/maintenance.css";
import { Link } from "react-router-dom";

export const Maintenance = () => {
    const { store, actions } = useContext(Context);
    const [courseList, setCourseList] = useState([]);
    // const [courseCategory, setCourseCategory] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [category, setCategory] = useState("by-name");
    const [cost, setCost] = useState("");
    const [description, setDescription] = useState("");
    const [modality, setModality] = useState("");
    const [start_date, setStartDate] = useState("");
    const [finish_date, setFinishDate] = useState("");
    const [contents, setContents] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseSupplier, setCourseSupplier] = useState({});
    const ref = useRef(null);

    const [alertMessage, setAlert] = useState("");
    const [coursesList, setCourses] = useState([])


    useEffect(() => {
        //función para traerse los cursos
        const getData = async () => {
            let response = await actions.fetchPromise("/api/courses")

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setCourseList(responseJson)
                setCourses(responseJson)
                setName(responseJson.name)
                setCode(responseJson.code)
                setCategory(responseJson.category)
                setCost(responseJson.cost)
                setDescription(responseJson.description)
                setModality(responseJson.modality)
                setStartDate(responseJson.start_date)
                setFinishDate(responseJson.finish_date)
                setContents(responseJson.contents)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        getData()


        getSupplier(selectedCourseId)
    }, [])

    //función para traerse los proveedores
    const getSupplier = async (id) => {
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
    const editData = async () => {
        //Sección para enviar la data al backend

        if (!selectedCourse) {
            // Handle the case where no course is selected
            return;
        }

        let obj = {
            name: name || selectedCourse.name,
            code: code || selectedCourse.code,
            category: category || selectedCourse.category,
            cost: cost || selectedCourse.cost,
            description: description || selectedCourse.description,
            modality: modality || selectedCourse.modality,
            start_date: start_date || selectedCourse.start_date,
            finish_date: finish_date || selectedCourse.finish_date,
            contents: contents || selectedCourse.contents,
        };

        let response = await actions.fetchPromise(`/api/addCourse/${selectedCourse.id}`, "PUT", obj)

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
        // let categoryOfSearch = document.querySelector('input[type=radio][name="category"]:checked').value
        let textToSearch = e.target.value

        if (category == "by-code" && textToSearch.length < 6 && textToSearch.length > 0) {
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

        if (textToSearch != "") {
            // @TODO Solicitar los datos de la base de datos aqui
            let courses = [
                { "name": "Excel 1", "code": "000111", "supplier": "xxxxx", "modality": "Virtual" },
                { "name": "PowerBI 2", "code": "000112", "supplier": "xxxxx", "modality": "Virtual" },
                { "name": "Ingles 1", "code": "000113", "supplier": "xxxxx", "modality": "Presencial" },
            ]
            let coursesFilter = []

            if (category == "by-name") {
                coursesFilter = courseList.filter((element) => {
                    return element.name.toLowerCase().includes(textToSearch.toLowerCase())
                })
                console.log(coursesFilter)
            } else {
                coursesFilter = courseList.filter((element) => {
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
            setCourses(courseList)
        }
    }

    // const handleCheckBoxClick = (e) => {
    //     document.querySelector('input[type=radio][name=category]').forEach((element) => {
    //         element.checked = false
    //     })
    //     e.target.check
    // }

    console.log(category)
    return store.user && store.user.role == "admin" ? (
        <div className="maintenance_page">
            <div className="maintenance_content">
                {alertMessage}

                <h3 className="ms-4 mb-4">Eliminar o editar cursos</h3>

                <div className="maintenance_searchForm mx-4 mb-5">
                    <form method="post" >
                        <label className="maintenance_searchForm_title maintenance_label me-3 d-inline">Búsqueda de cursos:</label>
                        <div className="d-inline" onChange={(e) => setCategory(e.target.value)}>
                            <label className="maintenance_label me-3">Por Nombre</label>
                            <input type="radio" name="category" value="by-name" defaultChecked className="maintenance_input" />
                            <label className="maintenance_label mx-3">Por Codigo</label>
                            <input type="radio" name="category" value="by-code" className="maintenance_input me-3" />
                        </div>

                        <input className="d-inline" type="text" name="search" required onChange={(e) => handleSearch(e)} />

                    </form>
                </div>

                <div className="maintenance_courseList mx-4 mb-5 ">
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

                    {coursesList && coursesList.length > 0 ?
                        <>
                            {coursesList.map((item, index) => {
                                const buttonId = `verMasButton-${index}`;
                                const modalId = `collapseExample-${index}`;

                                return (
                                    <ul key={index} className="list-group border border-secondary border-bottom-0">
                                        <li className="list-group-item">

                                            <div key={index}>
                                                <div className="row p-4">
                                                    <div className="col-11">
                                                        <h4>{item.name}</h4>

                                                        <div>
                                                            <div>
                                                                Código: {item.code}
                                                            </div>

                                                            <a className="btn btn-outline-primary mt-4 mb-2" style={{ borderRadius: "20px" }} data-bs-toggle="collapse" href={`#${modalId}`} role="button" aria-expanded="false" aria-controls={modalId} onClick={() => {
                                                                setSelectedCourse(item);
                                                                console.log(item.id)
                                                                getSupplier(item.id)
                                                            }}>
                                                                Ver más
                                                            </a>
                                                        </div>
                                                        <div className="collapse" id={modalId}>
                                                            <div className="card card-body">
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        Categoría: {selectedCourse ? selectedCourse.category : ''} <br />
                                                                        <br />
                                                                        Costo: ${selectedCourse ? selectedCourse.cost : ''} <br />
                                                                        <br />
                                                                        Proveedor: {courseSupplier.supplier_name}<br />
                                                                        <br />
                                                                        Descripción: {selectedCourse ? selectedCourse.description : ''}
                                                                    </div>
                                                                    <div className="col-6">
                                                                        Modalidad: {selectedCourse ? selectedCourse.modality : ''} <br />
                                                                        <br />
                                                                        Fecha de inicio: {selectedCourse ? selectedCourse.start_date : ''} <br />
                                                                        <br />
                                                                        Fecha de finalización: {selectedCourse ? selectedCourse.finish_date : ''} <br />
                                                                        <br />
                                                                        Contenidos: {selectedCourse ? selectedCourse.contents : ''}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-1 mt-4">
                                                        <div>
                                                            <button type="button" className="btn btn-primary button-hover-trash" style={{ border: "none", backgroundColor: "white" }} onClick={() => {
                                                                deleteData(item.id);
                                                                location.reload();
                                                            }}><i className="fa-solid fa-trash" style={{ color: "gray" }}></i></button>
                                                        </div>

                                                        {/* Button trigger modal */}
                                                        <button type="button" className="btn btn-primary button-hover-pen mt-2" style={{ border: "none", backgroundColor: "white" }} data-bs-toggle="modal" data-bs-target="#exampleModalLong" onClick={() => {
                                                            setSelectedCourse(item);
                                                        }}>
                                                            <i className="fa-solid fa-pen" style={{ color: "gray" }}></i>
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
                                                                        defaultValue={selectedCourse ? selectedCourse.code : ''}
                                                                        placeholder={selectedCourse ? selectedCourse.code : ''}
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
                                                                        defaultValue={selectedCourse ? selectedCourse.name : ''}
                                                                        placeholder={selectedCourse ? selectedCourse.name : ''}
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
                                                                        defaultValue={selectedCourse ? selectedCourse.category : ''}
                                                                        placeholder={selectedCourse ? selectedCourse.category : ''}
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
                                                                {/* <div className="d-flex justify-content-between align-items-center pb-4">
                                                                    <label className="me-3">Proveedor</label>
                                                                    <input
                                                                        type="text"
                                                                        className="addCourse_input"

                                                                    />
                                                                </div> */}
                                                                <div className="d-flex justify-content-between align-items-center pb-4">
                                                                    <label className="me-3">Costo</label>
                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        className="addCourse_input"
                                                                        defaultValue={selectedCourse ? selectedCourse.cost : ''}
                                                                        placeholder={selectedCourse ? selectedCourse.cost : ''}
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
                                                                        defaultValue={selectedCourse ? selectedCourse.description : ''}
                                                                        placeholder={selectedCourse ? selectedCourse.description : ''}
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
                                                                        defaultValue={selectedCourse ? selectedCourse.contents : ''}
                                                                        placeholder={selectedCourse ? selectedCourse.contents : ''}
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
                                                                        defaultValue={selectedCourse ? selectedCourse.start_date : ''}
                                                                        placeholder={selectedCourse ? selectedCourse.start_date : ''}
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
                                                                        defaultValue={selectedCourse ? selectedCourse.finish_date : ''}
                                                                        placeholder={selectedCourse ? selectedCourse.finish_date : ''}
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
                                                                        defaultValue={selectedCourse ? selectedCourse.modality : ''}
                                                                        placeholder={selectedCourse ? selectedCourse.modality : ''}
                                                                        onChange={(e) => {
                                                                            setModality(e.target.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="button" className="btn btn-primary" onClick={() => {
                                                                    editData();
                                                                    location.reload();
                                                                    console.log(item.id)
                                                                }}>Save changes</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </li>
                                    </ul>

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
