import React, { useState, useEffect, useContext } from "react";
import "../../styles/registerCourse.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export const RegisterCourse = () => {
    const { store, actions } = useContext(Context);
    const [userDetails, setUserDetails] = useState({});
    const [courseDetails, setCourseDetails] = useState({});
    const [currency, setCurrency] = useState({});
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
        getCurrency()

        //Cargar informacion del usuario
        const getUser = async () => {
            let response = await actions.fetchPromise(`/api/user/${user_id}`)

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setUserDetails(responseJson)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        getUser()

    }, [])

    //Enviar matricula
    const enroll = async () => {
        //Sección para enviar la data al backend
        let obj = {
            user_id: user_id,
            course_id: id,
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
                text: "¡Ya se encuentra matriculado!",
                /* footer: '<a href="">Why do I have this issue?</a>' */
                timer: 3500,
            });
        }
        return;
    };



    return store.user && store.user.role == "user" ? (
        <div className="registerCourse_page" style={{ color: "white" }}>
            <form method="post" className="registerCourse_form my-5">
                {/* popover */}
                <div class="help-tip">

                    {currency && <p>Compra: ₡{currency.compra} Venta: ₡{currency.venta}</p>}

                </div>

                <h3 className="text-center py-3">Registro de Matrícula</h3>

                <div className="my-4">
                    {courseDetails && <p className="mb-1">Curso: {courseDetails.name}</p>}
                    {courseDetails && <p className="mb-1">Código del curso: {courseDetails.code}</p>}
                    {courseDetails && <p className="mb-1">Precio: ${courseDetails.cost}</p>}
                </div>

                <div>
                    <div className="mb-5">
                        {userDetails && <p className="mb-1">Nombre: {userDetails.name} {userDetails.lastname}</p>}
                        {userDetails && <p className="mb-1">Email institucional: {userDetails.email}</p>}
                    </div>
                </div>
                <input type="button" value="Finalizar Mátricula" className="registerCourse_button my-4" onClick={enroll} />
            </form>
        </div>
    )
        :
        (
            <div className="alert alert-danger d-flex justify-content-center" role="alert">
                <i className="fa-solid fa-circle-exclamation mt-1 me-1"></i><b>Solo usuarios. No tienes permitido entrar a esta página</b>
            </div>
        )
};
