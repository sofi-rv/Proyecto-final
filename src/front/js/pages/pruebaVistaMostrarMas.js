//Esta vista es solo una prueba para mostrar los detalles de curso, luego este código se pasará a la vista final
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const PruebaMostrarMas = () => {

    const { store, actions } = useContext(Context);
    const [moreDetails, setMoreDetails] = useState({});
    const { id } = useParams();
    console.log(id)

    useEffect(() => {
        const getData = async () => {
            let response = await actions.fetchPromise(`/api/addCourse/${id}`)

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setMoreDetails(responseJson)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        getData()
    }, [])


    return (

        <div className="container">
            <div>
                {moreDetails && <p>{moreDetails.name}</p>}
            </div>
        </div>
    )

}

