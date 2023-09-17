import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/userPage.css";

export const UserPage = () => {
    return (
        <div className="ms-5 mt-4 user_page">
            <div className="d-flex align-items-center">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user_img" height="200px" width="200px" />
                <div className="ms-3">
                    <h3 className="fw-bold">Nombre empleado</h3>
                    <h5>correoempleado@empresa.com</h5>
                </div>
            </div>

            <div className="mt-4 me-5">
                <h3 className="mb-3">Historial de capacitaciones</h3>

                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button user_page_accordion collapsed bg-warning" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Capacitaciones en curso
                                <img src="https://cdn-icons-png.flaticon.com/512/3208/3208749.png" alt="approve_icon" height="25px" width="25px" className="ms-3" />
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="user_page_accordion_item">
                                    Big Data Managment
                                </div>
                                <div className="user_page_accordion_item">
                                    Alta direccion de ciberseguridad
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button user_page_accordion collapsed bg-success" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Capacitaciones aprobadas
                                <img src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png" alt="approve_icon" height="25px" width="25px" className="ms-3" />
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="user_page_accordion_item">
                                    Big Data Managment
                                </div>
                                <div className="user_page_accordion_item">
                                    Alta direccion de ciberseguridad
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button user_page_accordion collapsed bg-danger" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Capacitaciones reprobadas
                                <img src="https://as1.ftcdn.net/v2/jpg/01/45/20/02/1000_F_145200273_450ViYipr5uU3WIwqzwjsRDHYTMcUH9P.jpg" alt="approve_icon" height="25px" width="25px" className="ms-3" />
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="user_page_accordion_item">
                                    Big Data Managment
                                </div>
                                <div className="user_page_accordion_item">
                                    Alta direccion de ciberseguridad
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
