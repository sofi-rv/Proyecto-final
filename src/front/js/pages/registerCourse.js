import React from "react";
import "../../styles/registerCourse.css";

export const RegisterCourse = () => {
    return (
        <div className="registerCourse_page">
            <form method="post" className="registerCourse_form my-5">
                <h3 className="text-center py-3">Formulario de Mátricula</h3>

                <div className="my-4">
                    <p>Nombre del curso: Curso</p>
                    <p>Código del curso: xxxxxx</p>
                    <p>Precio: $100</p>
                </div>

                <div>
                    <div className="d-flex justify-content-between align-items-center pb-4">
                        <label className="me-3">Nombre completo:</label>
                        <input type="text" className="registerCourse_input" />
                    </div>
                    <div className="d-flex justify-content-between align-items-center pb-4">
                        <label className="me-3">No. Cédula:</label>
                        <input type="text" className="registerCourse_input" />
                    </div>
                    <div className="d-flex justify-content-between align-items-center pb-4">
                        <label className="me-3">Email institucional:</label>
                        <input type="email" className="registerCourse_input" />
                    </div>
                    <div className="d-flex justify-content-between align-items-center pb-4">
                        <label className="me-3">Pago de curso:</label>
                        <input type="text" className="registerCourse_input" />
                    </div>
                </div>
                <input type="submit" value="Finalizar Mátricula" className="registerCourse_button my-4" />
            </form>
        </div>
    );
};
