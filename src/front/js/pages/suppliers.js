import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/suppliers.css";
import { useNavigate } from "react-router-dom";


export const Suppliers = () => {
    const { store, actions } = useContext(Context);
    const [suppliersList, setSuppliersList] = useState([]);

    //Traer informacion de los proveedores
    useEffect(() => {
        const cargaData = async() => {
            let response = await actions.fetchPromise("/api/addCourse")

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
    },[])

    return (
        <div className="suppliers_page mx-4">
            <h3 className="my-4">Proveedores</h3>
            <div className="suppliers_list">
                <div>
                    {suppliersList && suppliersList.length>0 ?
                    <>
                        {suppliersList.map((item, index)=>{return(<h1>{item.provider}</h1>)})}
                    </>
                    :<></>}
                </div>
                {/* <div>
                    <p>Universidad Latina de Costa Rica</p>
                    <hr />
                </div>
                <div>
                    <p>Universidad de Costa Rica</p>
                    <hr />
                </div>
                <div>
                    <p>Universidad Técnica Nacional</p>
                    <hr />
                </div>
                <div>
                    <p>Instituto Tecnológico de Costa Rica</p>
                </div> */}
            </div>
        </div>
    );
};
