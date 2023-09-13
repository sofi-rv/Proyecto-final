import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/principalPage.css";

export const PrincipalPage = () => {
    const { store, actions } = useContext(Context);
    const [septemberCourses, setSeptemberCourses] = useState([])
    const [octoberCourses, setOctoberCourses] = useState([])
    const [CoursesList, setCoursesList] = useState([]);

    useEffect(() => {
        //@TODO Estos datos deben venir de la base de datos
        const getData = async () => {
            let response = await actions.fetchPromise("/api/addCourse")

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
        let courseList = [
            { "Imagen": "https://domf5oio6qrcr.cloudfront.net/medialibrary/11537/4a78f148-d427-4209-8173-f33d04c44106.jpg", "Nombre": "Prueba1", "Informacion": "Este es el mejor curso de cocina del mundo", "Mes": "Septiembre" },
            { "Imagen": "https://domf5oio6qrcr.cloudfront.net/medialibrary/11537/4a78f148-d427-4209-8173-f33d04c44106.jpg", "Nombre": "Prueba2", "Informacion": "Este es el mejor curso de cocina del mundo", "Mes": "Septiembre" },
            { "Imagen": "https://domf5oio6qrcr.cloudfront.net/medialibrary/11537/4a78f148-d427-4209-8173-f33d04c44106.jpg", "Nombre": "Prueba3", "Informacion": "Este es el mejor curso de cocina del mundo", "Mes": "Septiembre" },
            { "Imagen": "https://domf5oio6qrcr.cloudfront.net/medialibrary/11537/4a78f148-d427-4209-8173-f33d04c44106.jpg", "Nombre": "Prueba4", "Informacion": "Este es el mejor curso de cocina del mundo", "Mes": "Septiembre" },
            { "Imagen": "https://domf5oio6qrcr.cloudfront.net/medialibrary/11537/4a78f148-d427-4209-8173-f33d04c44106.jpg", "Nombre": "Prueba5", "Informacion": "Este es el mejor curso de cocina del mundo", "Mes": "Septiembre" },
            { "Imagen": "https://domf5oio6qrcr.cloudfront.net/medialibrary/11537/4a78f148-d427-4209-8173-f33d04c44106.jpg", "Nombre": "Prueba6", "Informacion": "Este es el mejor curso de cocina del mundo", "Mes": "Septiembre" },
            { "Imagen": "https://domf5oio6qrcr.cloudfront.net/medialibrary/11537/4a78f148-d427-4209-8173-f33d04c44106.jpg", "Nombre": "Prueba1", "Informacion": "Este es el mejor curso de cocina del mundo", "Mes": "Octubre" },
            { "Imagen": "https://domf5oio6qrcr.cloudfront.net/medialibrary/11537/4a78f148-d427-4209-8173-f33d04c44106.jpg", "Nombre": "Prueba2", "Informacion": "Este es el mejor curso de cocina del mundo", "Mes": "Octubre" },
            { "Imagen": "https://domf5oio6qrcr.cloudfront.net/medialibrary/11537/4a78f148-d427-4209-8173-f33d04c44106.jpg", "Nombre": "Prueba3", "Informacion": "Este es el mejor curso de cocina del mundo", "Mes": "Octubre" },
            { "Imagen": "https://domf5oio6qrcr.cloudfront.net/medialibrary/11537/4a78f148-d427-4209-8173-f33d04c44106.jpg", "Nombre": "Prueba4", "Informacion": "Este es el mejor curso de cocina del mundo", "Mes": "Octubre" },
            { "Imagen": "https://domf5oio6qrcr.cloudfront.net/medialibrary/11537/4a78f148-d427-4209-8173-f33d04c44106.jpg", "Nombre": "Prueba5", "Informacion": "Este es el mejor curso de cocina del mundo", "Mes": "Octubre" },
            { "Imagen": "https://domf5oio6qrcr.cloudfront.net/medialibrary/11537/4a78f148-d427-4209-8173-f33d04c44106.jpg", "Nombre": "Prueba6", "Informacion": "Este es el mejor curso de cocina del mundo", "Mes": "Octubre" }
        ]

        // Esto almacena en dos arreglos diferentes dependiendo del mes del curso
        let septemberCoursesList = courseList.filter((element) => { return element.Mes == "Septiembre" })
        let octoberCoursesList = courseList.filter((element) => { return element.Mes == "Octubre" })
        setSeptemberCourses(septemberCoursesList)
        setOctoberCourses(octoberCoursesList)
    }, []);


    const handleCarouselButtons = (direction, month) => {
        // Esto sirve para dar el efecto en el carousel de que se mueven las cartas de una en una
        if (month == "Septiembre" && septemberCourses.length) {
            let list = direction == "left" ? moveCarouselListLeft(septemberCourses) : moveCarouselListRight(septemberCourses)
            setSeptemberCourses(list)
        } else if (month == "Octubre" && septemberCourses.length) {
            let list = direction == "left" ? moveCarouselListLeft(octoberCourses) : moveCarouselListRight(octoberCourses)
            setOctoberCourses(list)
        }
    }

    const moveCarouselListLeft = (list) => {
        // Esto lo que hace es eliminar la primera carta del carousel y ponerla al final, para dar el efecto de que el carousel se movio a la izquierda
        let tempElement = list[0]
        list.splice(0, 1)
        list.push(tempElement)

        let listModified = list.map((element) => { return element })
        return listModified
    }


    const moveCarouselListRight = (list) => {
        // Esto lo que hace es eliminar la ultima carta del carousel y ponerla al inicio, para dar el efecto de que el carousel se movio a la derecha
        let tempElement = list[list.length - 1]
        list.splice(list.length - 1, 1)
        list.unshift(tempElement)

        let listModified = list.map((element) => { return element })
        return listModified
    }

    return (
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
                    <h3>¡Bienvenido a la agenda de capacitaciones V Bimestre 2023!</h3>
                    <p>En un mundo en constante evolución, la adquisición de nuevos conocimientos y habilidades se ha convertido en un pilar fundamental para el éxito tanto en el ámbito personal como profesional. En [Nombre de tu Empresa o Plataforma], estamos comprometidos con la excelencia en la educación y el desarrollo continuo de las personas.</p>
                    <div className="my-4">
                        <h4 className="my-4">Cursos disponibles Septiembre</h4>
                        <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade my-4" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="d-flex justify-content-center">
                                        <div>
                                            {CoursesList && CoursesList.length > 0 ?
                                                <>
                                                    {CoursesList.map((item, index) => {
                                                        return (<div className="card me-5" style={{ width: '18rem' }}>
                                                            <img src={"https://domf5oio6qrcr.cloudfront.net/medialibrary/11537/4a78f148-d427-4209-8173-f33d04c44106.jpg"} className="card-img-top" alt="course_thumbnail" />
                                                            <div className="card-body" style={{ backgroundColor: 'rgb(204, 204, 204)' }}>
                                                                <h5 className="card-title">{item.name}</h5>
                                                                <p className="card-text">{item.modality}</p>
                                                                <p className="card-text">{item.start_date}</p>
                                                                <Link to="/" className="btn btn-danger course_button">¡Ver mas!</Link>
                                                            </div>
                                                        </div>)
                                                    })}
                                                </>
                                                : <></>}
                                        </div>
                                        {/* {(() => {
                                            // Este codigo sirve para desplegar 4 cartas de cursos en la vista principal
                                            const arr = [];
                                            for (let i = 0; i <septemberCourses.length; i++) {
                                                // Cuando se hayan desplegado como maximo cuatro cartas en la vista principal se dejan de desplegar mas
                                                if (i == 4) {
                                                    break
                                                }
                                                let element = septemberCourses[i]
                                                arr.push(
                                                    <div className="card me-5" style={{ width: '18rem' }} key={i}>
                                                        <img src={element.Imagen} className="card-img-top" alt="course_thumbnail" />
                                                        <div className="card-body" style={{ backgroundColor: 'rgb(204, 204, 204)' }}>
                                                            <h5 className="card-title">{element.Nombre}</h5>
                                                            <p className="card-text">{element.Informacion}</p>
                                                            <Link to="/" className="btn btn-danger course_button">¡Ver mas!</Link>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return arr;
                                        })()} */}

                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev me-3" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" onClick={() => handleCarouselButtons("left", "Septiembre")}>
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next ms-3" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" onClick={() => handleCarouselButtons("right", "Septiembre")}>
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="my-5">
                        <h4 className="my-4">Cursos disponibles Octubre</h4>
                        <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade my-4" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active mb-5">
                                    <div className="d-flex justify-content-center">
                                        {(() => {
                                            // Este codigo sirve para desplegar 4 cartas de cursos en la vista principal
                                            const arr = [];
                                            for (let i = 0; i < octoberCourses.length; i++) {
                                                // Cuando se hayan desplegado como maximo cuatro cartas en la vista principal se dejan de desplegar mas
                                                if (i == 4) {
                                                    break
                                                }
                                                let element = octoberCourses[i]
                                                arr.push(
                                                    <div className="card me-5" style={{ width: '18rem' }} key={i}>
                                                        <img src={element.Imagen} className="card-img-top" alt="course_thumbnail" />
                                                        <div className="card-body" style={{ backgroundColor: 'rgb(204, 204, 204)' }}>
                                                            <h5 className="card-title">{element.Nombre}</h5>
                                                            <p className="card-text">{element.Informacion}</p>
                                                            <Link to="/" className="btn btn-danger course_button">¡Ver mas!</Link>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return arr;
                                        })()}
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev me-3" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" onClick={() => handleCarouselButtons("left", "Octubre")}>
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next ms-3" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" onClick={() => handleCarouselButtons("right", "Octubre")}>
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </article>
            </main>
        </>
    );
};
