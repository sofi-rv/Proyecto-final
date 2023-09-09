import React from "react";
import { Link } from "react-router-dom";

import "../../styles/principalPage.css";
export const PrincipalPage = () => {
    return (
        <>
            <article>
                <div id="carouselExampleAutoplaying" class="carousel slide carousel-fade" data-bs-ride="carousel">
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
                <div>
                    <h4 className="my-4">Cursos disponibles Septiembre</h4>
                    <div id="carouselExampleAutoplaying" class="carousel slide carousel-fade my-4" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="d-flex justify-content-center">
                                    <div class="card me-5" style={{ width: '18rem' }}>
                                        <img src="https://cdn5.f-cdn.com/contestentries/1122631/26158298/59a97e224cfb7_thumb900.jpg" className="card-img-top" alt="course_thumbnail" />
                                        <div className="card-body" style={{ backgroundColor: 'rgb(204, 204, 204)' }}>
                                            <h5 className="card-title">Nombre del curso</h5>
                                            <p className="card-text">Informacion del curso</p>
                                            <a href="#" className="btn btn-danger course_button">¡Ver mas!</a>
                                        </div>
                                    </div>
                                    <div className="card me-5" style={{ width: '18rem' }}>
                                        <img src="https://cdn5.f-cdn.com/contestentries/1122631/26158298/59a97e224cfb7_thumb900.jpg" className="card-img-top" alt="course_thumbnail" />
                                        <div className="card-body" style={{ backgroundColor: 'rgb(204, 204, 204)' }}>
                                            <h5 className="card-title">Nombre del curso</h5>
                                            <p className="card-text">Informacion del curso</p>
                                            <a href="#" className="btn btn-danger course_button">¡Ver mas!</a>
                                        </div>
                                    </div>
                                    <div className="card me-5" style={{ width: '18rem' }}>
                                        <img src="https://cdn5.f-cdn.com/contestentries/1122631/26158298/59a97e224cfb7_thumb900.jpg" className="card-img-top" alt="course_thumbnail" />
                                        <div className="card-body" style={{ backgroundColor: 'rgb(204, 204, 204)' }}>
                                            <h5 className="card-title">Nombre del curso</h5>
                                            <p className="card-text">Informacion del curso</p>
                                            <a href="#" className="btn btn-danger course_button">¡Ver mas!</a>
                                        </div>
                                    </div>
                                    <div className="card me-5" style={{ width: '18rem' }}>
                                        <img src="https://cdn5.f-cdn.com/contestentries/1122631/26158298/59a97e224cfb7_thumb900.jpg" className="card-img-top" alt="course_thumbnail" />
                                        <div className="card-body" style={{ backgroundColor: 'rgb(204, 204, 204)' }}>
                                            <h5 className="card-title">Nombre del curso</h5>
                                            <p className="card-text">Informacion del curso</p>
                                            <a href="#" className="btn btn-danger course_button">¡Ver mas!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev me-3" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next ms-3" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div>
                    <h4 className="my-4">Cursos disponibles Octubre</h4>
                    <div id="carouselExampleAutoplaying" class="carousel slide carousel-fade my-4" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="d-flex justify-content-center">
                                    <div class="card me-5" style={{ width: '18rem' }}>
                                        <img src="https://cdn5.f-cdn.com/contestentries/1122631/26158298/59a97e224cfb7_thumb900.jpg" className="card-img-top" alt="course_thumbnail" />
                                        <div className="card-body" style={{ backgroundColor: 'rgb(204, 204, 204)' }}>
                                            <h5 className="card-title">Nombre del curso</h5>
                                            <p className="card-text">Informacion del curso</p>
                                            <a href="#" className="btn btn-danger course_button">¡Ver mas!</a>
                                        </div>
                                    </div>
                                    <div className="card me-5" style={{ width: '18rem' }}>
                                        <img src="https://cdn5.f-cdn.com/contestentries/1122631/26158298/59a97e224cfb7_thumb900.jpg" className="card-img-top" alt="course_thumbnail" />
                                        <div className="card-body" style={{ backgroundColor: 'rgb(204, 204, 204)' }}>
                                            <h5 className="card-title">Nombre del curso</h5>
                                            <p className="card-text">Informacion del curso</p>
                                            <a href="#" className="btn btn-danger course_button">¡Ver mas!</a>
                                        </div>
                                    </div>
                                    <div className="card me-5" style={{ width: '18rem' }}>
                                        <img src="https://cdn5.f-cdn.com/contestentries/1122631/26158298/59a97e224cfb7_thumb900.jpg" className="card-img-top" alt="course_thumbnail" />
                                        <div className="card-body" style={{ backgroundColor: 'rgb(204, 204, 204)' }}>
                                            <h5 className="card-title">Nombre del curso</h5>
                                            <p className="card-text">Informacion del curso</p>
                                            <a href="#" className="btn btn-danger course_button">¡Ver mas!</a>
                                        </div>
                                    </div>
                                    <div className="card me-5" style={{ width: '18rem' }}>
                                        <img src="https://cdn5.f-cdn.com/contestentries/1122631/26158298/59a97e224cfb7_thumb900.jpg" className="card-img-top" alt="course_thumbnail" />
                                        <div className="card-body" style={{ backgroundColor: 'rgb(204, 204, 204)' }}>
                                            <h5 className="card-title">Nombre del curso</h5>
                                            <p className="card-text">Informacion del curso</p>
                                            <a href="#" className="btn btn-danger course_button">¡Ver mas!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev me-3" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next ms-3" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </article >
        </>
    );
};
