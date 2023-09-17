import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/suppliers.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export const Suppliers = () => {
    const { store, actions } = useContext(Context);
    const [suppliersList, setSuppliersList] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [legal_id, setLegalId] = useState("");

    //Ingresar informacion de proveedores
    const addData = async () => {
        //Sección de verificación
        if (name == "" || phone == "" || email == "" || legal_id == "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Por favor llene todos los campos!",
                /* footer: '<a href="">Why do I have this issue?</a>' */
                timer: 3500,
            });
            return;
        }
        //Sección para enviar la data al backend
        let obj = {
            name: name,
            phone: phone,
            email: email,
            legal_id: legal_id
        };
        let response = await actions.fetchPromise("/api/suppliers", "POST", obj);
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
        } else {
            let responseJson = await response.json();
            console.log(responseJson);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡Error al registrar!",
                /* footer: '<a href="">Why do I have this issue?</a>' */
                timer: 3500,
            });
        }
        return;
    };

    //Traer informacion de los proveedores
    useEffect(() => {
        const cargaData = async () => {
            let response = await actions.fetchPromise("/api/suppliers")

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setSuppliersList(responseJson)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        cargaData()
    }, [])

    return (
        <div className="suppliers_page mx-4">
            <h3 className="my-4">Proveedores</h3>
            {/* Button trigger modal */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalLong">
                Agregar proveedor
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Agregar proveedor</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body bg-light">
                            <div className="d-flex justify-content-between align-items-center pb-4">
                                <label className="me-3">Nombre</label>
                                <input
                                    type="text"
                                    className="addCourse_input"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center pb-4">
                                <label className="me-3">Número de teléfono</label>
                                <input
                                    type="text"
                                    className="addCourse_input"
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center pb-4">
                                <label className="me-3">Email</label>
                                <input
                                    type="text"
                                    className="addCourse_input"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center pb-4">
                                <label className="me-3">Cédula Jurídica</label>
                                <input
                                    type="text"
                                    className="addCourse_input"
                                    onChange={(e) => {
                                        setLegalId(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                addData();
                                location.reload()
                            }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="suppliers_list row">
                {suppliersList && suppliersList.length > 0 ?
                    <>
                        {suppliersList.map((item, index) => {
                            return (
                                <ul key={index} className="list-group">
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-6">
                                                <h3>{item.name}</h3>
                                                Teléfono: {item.phone} <br></br>
                                                Email: {item.email} <br></br>
                                                Cédula jurídica: {item.legal_id}
                                            </div>
                                            <div className="col-6">
                                                {item.courses}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            )
                        })}
                    </>
                    : <></>}
            </div>
        </div>
    );
};
