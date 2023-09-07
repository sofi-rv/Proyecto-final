import React from "react";
import "../../styles/addCourse.css";

export const AddCourse = () => {
    return (
        <>
            <div className="addCourse_page">
                <form className="addCourse_form my-5" id="addCourse_form">
                    <h3 className="addCourse_title py-3">Agregar curso</h3>
                    <div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Código</label>
                            <input type="text" className="addCourse_input" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Nombre de curso</label>
                            <input type="text" className="addCourse_input" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Categoria</label>
                            <select placeholder="Eliga una categoria" className="addCourse_input" >
                            </select>
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Proveedor</label>
                            <input type="text" className="addCourse_input" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Costo</label>
                            <input type="number" min="0" className="addCourse_input" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Descripción</label>
                            <textarea rows={6} form="addCourse_form" className="addCourse_textarea" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Fecha de inicio</label>
                            <input type="text" className="addCourse_input" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Modalidad</label>
                            <input type="text" className="addCourse_input" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Duración</label>
                            <input type="text" className="addCourse_input" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center pb-4">
                            <label className="me-3">Contenidos</label>
                            <input type="text" className="addCourse_input" />
                        </div>
                    </div>
                    <input type="submit" value="Agregar" className="addCourse_button my-4" />
                </form>
            </div>
        </>
    );
};
