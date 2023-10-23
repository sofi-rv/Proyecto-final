import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/principalPage.css";

export const PrincipalPage = () => {
    const { store, actions } = useContext(Context);
    const [septemberCourses, setSeptemberCourses] = useState([])
    const [octoberCourses, setOctoberCourses] = useState([])
    const [CoursesList, setCoursesList] = useState([]);

    const obtenerMes = (fecha) => {
        const arrayFecha = fecha.split("-")
        const traerMes = Number(arrayFecha[1])
        console.log(traerMes)
        return traerMes
    }

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const bimestre = ["I", "II", "II", "IV", "V", "VI"]
    const imagen = ["https://img.freepik.com/free-vector/hand-coding-concept-illustration_114360-8113.jpg", "https://img.freepik.com/free-vector/designer-girl-concept-illustration_114360-4455.jpg", "https://img.freepik.com/vector-gratis/ilustracion-concepto-analisis-empresarial_114360-4224.jpg?w=826&t=st=1696020724~exp=1696021324~hmac=bc74a23861094c2ca3587873b3e34cec8f1e3bc4707fcbe05e0a9441aca40c23", "https://img.freepik.com/vector-gratis/ilustracion-concepto-traductor_114360-6334.jpg?w=826&t=st=1696020910~exp=1696021510~hmac=826e4f6ceb03752a44ee0d5e100eda3ef8628b32eb156ebcbd8585a2f8face9e"]

    const d = new Date();
    console.log(d);
    const today_month = d.getMonth() + 1;
    console.log(today_month)

    function getBimesterNumber(monthNumber) {
        if (monthNumber >= 1 && monthNumber <= 12) {
            return bimestre[Math.ceil(monthNumber / 2) - 1];
        } else {
            return "Invalid month number";
        }
    }

    useEffect(() => {
        //@TODO Estos datos deben venir de la base de datos
        const getData = async () => {
            let response = await actions.fetchPromise("/api/courses")

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setCoursesList(responseJson)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        getData()
    }, []);




    // Esto almacena en dos arreglos diferentes dependiendo del mes del curso
    //     let septemberCoursesList = courseList.filter((element) => { return element.Mes == "Septiembre" })
    //     let octoberCoursesList = courseList.filter((element) => { return element.Mes == "Octubre" })
    //     setSeptemberCourses(septemberCoursesList)
    //     setOctoberCourses(octoberCoursesList)
    // 


    const handleCarouselButtons = (direction, month) => {
        // Esto sirve para dar el efecto en el carousel de que se mueven las cartas de una en una
        if (CoursesList.length) {
            let list = direction == "left" ? moveCarouselListLeft(CoursesList) : moveCarouselListRight(CoursesList)
            setCoursesList(list)
        } else if (month == "Octubre" && septemberCourses.length) {
            let list = direction == "left" ? moveCarouselListLeft(octoberCourses) : moveCarouselListRight(octoberCourses)
            setCoursesList(list)
        }
    }

    const moveCarouselListLeft = (CoursesList) => {
        // Esto lo que hace es eliminar la primera carta del carousel y ponerla al final, para dar el efecto de que el carousel se movio a la izquierda
        let tempElement = CoursesList[0]
        CoursesList.splice(0, 1)
        CoursesList.push(tempElement)

        let listModified = CoursesList.map((element) => { return element })
        return listModified
    }


    const moveCarouselListRight = (CoursesList) => {
        // Esto lo que hace es eliminar la ultima carta del carousel y ponerla al inicio, para dar el efecto de que el carousel se movio a la derecha
        let tempElement = CoursesList[CoursesList.length - 1]
        CoursesList.splice(CoursesList.length - 1, 1)
        CoursesList.unshift(tempElement)

        let listModified = CoursesList.map((element) => { return element })
        return listModified
    }

    return store.user && store.user.role == "user" ? (
        <>
            <main>
                <article>
                    <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade" data-bs-ride="carousel">
                        <div className="carousel-inner principalPage_carousel">
                            <div className="carousel-item active principalPage_carousel_card">
                                <img src="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/05/23151218/BA-Courses.png" className="principalPage_carousel_img" alt="principalPage_landing_img" />
                            </div>
                            <div className="carousel-item principalPage_carousel_card">
                                <img src="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/04/01170800/Free-Online-Courses-with-Certificates.jpg" className="principalPage_carousel_img" alt="principalPage_landing_img" />
                            </div>
                            <div className="carousel-item principalPage_carousel_card">
                                <img src="https://www.oberlo.com/media/1603898030-womans-hands-typing-laptop-scaled.jpg?fit=max&fm=jpg&w=1824" className="principalPage_carousel_img" alt="principalPage_landing_img" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </article>
                <article className="mt-5 mx-4">
                    <h2 className="mb-4">¡Bienvenido a la agenda de capacitaciones {getBimesterNumber(today_month)} Bimestre 2023!</h2>
                    <p>En un mundo en constante evolución, la adquisición de nuevos conocimientos y habilidades se ha convertido en un pilar fundamental para el éxito tanto en el ámbito personal como profesional. En [Nombre de tu Empresa o Plataforma], estamos comprometidos con la excelencia en la educación y el desarrollo continuo de las personas.</p>
                    <div className="my-4">
                        <h4 className="my-4">Cursos disponibles {today_month % 2 == 0 ? meses[today_month - 2] : meses[today_month - 1]}</h4>
                        <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade my-4" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="d-flex justify-content-center">
                                        <div className="my-carousel"> {/*d-flex*/}
                                            {CoursesList && CoursesList.length > 0 ?
                                                <>
                                                    {CoursesList.map((item, index) => {

                                                        return (
                                                            obtenerMes(item.start_date) % 2 !== 0 && obtenerMes(item.start_date) >= today_month - 1 && obtenerMes(item.start_date) < today_month + 1 &&
                                                            <div key={index} className="card me-5 card-style" style={{ width: '18rem' }}>
                                                                <div className="image-container">
                                                                    <img
                                                                        src={
                                                                            item.category === "Tecnología" ? imagen[0] :
                                                                                item.category === "Diseño" ? imagen[1] :
                                                                                    item.category === "Administración" ? imagen[2] :
                                                                                        item.category === "Idiomas" ? imagen[3] :
                                                                                            item.imageUrl
                                                                        }
                                                                        className="card-img-top"
                                                                        alt="course_thumbnail"
                                                                    />
                                                                </div>

                                                                <div className="card-body p-4" style={{ backgroundColor: 'rgb(204, 204, 204)' }}>
                                                                    <h5 className="card-title">{item.name}</h5>

                                                                    <p className="card-text">Modalidad: {item.modality}</p>
                                                                    <p className="card-text">Inicio: {item.start_date}</p>
                                                                    <Link to={`/courseDetails/${item.id}`} className="btn btn-primary course_button">¡Ver mas!</Link>

                                                                </div>
                                                            </div>


                                                        )
                                                    })}
                                                </>
                                                : <></>}
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* <button className="carousel-control-prev me-3" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" onClick={() => handleCarouselButtons("left", "Septiembre")}>
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next ms-3" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" onClick={() => handleCarouselButtons("right", "Septiembre")}>
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button> */}
                        </div>
                    </div>
                    <div className="my-5">
                        <h4 className="my-4">Cursos disponibles {today_month % 2 !== 0 ? meses[today_month] : meses[today_month - 1]}</h4>
                        <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade my-4" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active mb-5">
                                    <div className="d-flex justify-content-center">
                                        <div className="my-carousel">
                                            {CoursesList && CoursesList.length > 0 ?
                                                <>
                                                    {CoursesList.map((item, index) => {

                                                        return (
                                                            obtenerMes(item.start_date) % 2 == 0 && today_month <= obtenerMes(item.start_date) && obtenerMes(item.start_date) <= today_month + 1 &&
                                                            <div key={index} className="card me-5 card-style" style={{ width: '18rem' }}>
                                                                <div className="image-container">
                                                                    <img
                                                                        src={
                                                                            item.category === "Tecnología" ? imagen[0] :
                                                                                item.category === "Diseño" ? imagen[1] :
                                                                                    item.category === "Administración" ? imagen[2] :
                                                                                        item.category === "Idiomas" ? imagen[3] :
                                                                                            item.imageUrl
                                                                        }
                                                                        className="card-img-top"
                                                                        alt="course_thumbnail"
                                                                    />
                                                                </div>

                                                                <div className="card-body p-4" style={{ backgroundColor: 'rgb(204, 204, 204)' }}>
                                                                    <h5 className="card-title">{item.name}</h5>

                                                                    <p className="card-text">Modalidad: {item.modality}</p>
                                                                    <p className="card-text">Inicio: {item.start_date}</p>
                                                                    <Link to={`/courseDetails/${item.id}`} className="btn btn-primary course_button">¡Ver mas!</Link>

                                                                </div>
                                                            </div>


                                                        )
                                                    })}
                                                </>
                                                : <></>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <button className="carousel-control-prev me-3" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" onClick={() => handleCarouselButtons("left", "Octubre")}>
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next ms-3" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" onClick={() => handleCarouselButtons("right", "Octubre")}>
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button> */}
                        </div>
                    </div>
                </article>
            </main>
        </>
    )
        :
        (
            <div className="alert alert-danger d-flex justify-content-center" role="alert">
                <i className="fa-solid fa-circle-exclamation mt-1 me-1"></i><b>Solo usuarios. No tienes permitido entrar a esta página</b>
            </div>
        )
};
