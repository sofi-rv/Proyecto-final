import React, { useContext } from "react";
import { Link } from "react-router-dom";
import WithAuth from "../component/Authentication/WithAuth";
import { Context } from "../store/appContext";
import "../../styles/adminPrincipalPage.css";

export const AdminPrincipalPage = () => {
    const { store, actions } = useContext(Context)
    return store.user && store.user.role == "admin" ? (
        <div className="adminPrincipalPage_page">
            <h3 className="mt-4 text-center">¡Bienvenido Administrador!</h3>
            <div className="admin_features">
                <div className="admin_feature">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                        <p className="admin_feature_text me-4"> Agregar curso</p>
                        <Link to="/addCourse" className="admin_feature_button">Agregar</Link>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <div>
                            <p className="admin_feature_text me-4">Eliminar/<br />
                                Editar Curso
                            </p>
                        </div>
                        <Link to="/" className="admin_feature_button">Ingresar</Link>
                    </div>
                </div>
                <div className="admin_feature text-center">
                    <p> Revision de aprobación de cursos </p>
                    <Link to="/approvalReview" className="admin_feature_button">Mostrar</Link>
                </div>
                <div className="admin_feature text-center">
                    <p> Mostrar lista de empleados <br />
                        matriculados/reprobados/aprobados</p>
                    <Link to="/userList" className="admin_feature_button">Ingresar</Link>
                </div>
                <div className="admin_feature text-center">
                    <p> Registro de proveedores </p>
                    <Link to="/suppliers" className="admin_feature_button">Mostrar</Link>
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

export default WithAuth(AdminPrincipalPage);