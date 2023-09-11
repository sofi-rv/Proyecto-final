import React from "react";

import "../../styles/suppliers.css";


export const Suppliers = () => {
    return (
        <div className="suppliers_page mx-4">
            <h3 className="my-4">Proveedores</h3>
            <div className="suppliers_list">
                <div>
                    <p>Instituto Nacional de aprendizaje</p>
                    <hr />
                </div>
                <div>
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
                </div>
            </div>
        </div>
    );
};
