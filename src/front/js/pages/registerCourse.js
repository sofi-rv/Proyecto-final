import React, { useState, useEffect, useContext } from "react";
import "../../styles/registerCourse.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const RegisterCourse = () => {
    const { store, actions } = useContext(Context);
    const [courseDetails, setCourseDetails] = useState({});
    const [currency, setCurrency] = useState({});
    const [id_number, setIdNumber] = useState("");
    const { id } = useParams();
    let user_id = store.user.id;
    console.log(user_id);

    useEffect(() => {
        //Cargar informacion de curso
        const getData = async () => {
            let response = await actions.fetchPromise(`/api/addCourse/${id}`)

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setCourseDetails(responseJson)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        getData()

        //Cargar tipo de cambio
        const getCurrency = async () => {
            let response = await actions.fetchGenerico("https://apis.gometa.org/tdc/tdc.json?fbclid=IwAR0mI3_X97fIgrSdbaJJ8f4_Lpv6dCo2hjgYy7eI_ud0B54KdEliOCCkv9s")

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setCurrency(responseJson)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }
        }

    }, [])

    //Enviar matricula
    const enroll = async () => {
        //Sección de verificación
        if (id_number == "") {
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
            user_id: user_id,
            course_id: id,
            id_number: id_number,
            condition: "En curso",
            approval_doc: ""
        };
        let response = await actions.fetchPromise("/api/enrollment", "POST", obj);
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
            navigate("/"); // history.push("/")
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



    return (
        <div className="registerCourse_page">
            <form method="post" className="registerCourse_form my-5">
                <h3 className="text-center py-3">Formulario de Matrícula</h3>

                <div className="my-4">
                    {courseDetails && <p className="mb-1">Nombre del curso: {courseDetails.name}</p>}
                    {courseDetails && <p className="mb-1">Código del curso: {courseDetails.code}</p>}
                    {courseDetails && <p className="mb-1">Precio: ${courseDetails.cost}</p>}
                </div>

                <div>
                    <div className="d-flex justify-content-between align-items-center pb-4">
                        <label className="me-3">Nombre completo:</label>
                        <input type="text" className="registerCourse_input" />
                    </div>
                    <div className="d-flex justify-content-between align-items-center pb-4">
                        <label className="me-3">No. Cédula:</label>
                        <input type="text" className="registerCourse_input" onChange={(e) => {
                            setIdNumber(e.target.value);
                        }} />
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
                <input type="button" value="Finalizar Mátricula" className="registerCourse_button my-4" onClick={enroll} />
            </form>
        </div>
    );
};
