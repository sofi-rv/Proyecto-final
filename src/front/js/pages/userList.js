import React, { useState } from "react";
import "../../styles/userList.css";

export const UserList = () => {

    const [userCategory, setUserCategory] = useState("")
    const [userCategoryList, setUserList] = useState([])

    const selectUserList = (e) => {
        let category = e.target.value
        if (category == "") {
            setUserCategory("")
            setUserList([])
            return
        }
        // Esta lista se deberia obtener la base de datos
        let userList = [
            { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Aprobados" },
            { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Aprobados" },
            { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Aprobados" },
            { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Aprobados" },

            { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Matriculados" },
            { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Matriculados" },
            { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Matriculados" },
            { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Matriculados" },

            { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Reprobados" },
            { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Reprobados" },
            { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Reprobados" },
            { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Reprobados" },
        ]

        let users = userList.filter((user) => { return user.Categoria == category })

        if (users.length) {
            setUserCategory(category)
            setUserList(users)
        } else {
            setUserCategory("No hay empleados con la condicion de: " + category)
            setUserList([])
        }
    }

    return (
        <div className="userList_page">
            <div className="mt-4 ms-4">
                <h3>Listado de empleados por condición</h3>
                <div className="mt-3 userList_selector">
                    <label className="me-3">Búsqueda por condición del empleado</label>
                    <select onChange={(e) => selectUserList(e)}>
                        <option value={""}>Seleccione una condición</option>
                        <option value={"Aprobados"}>Aprobados</option>
                        <option value={"Matriculados"}>Matriculados</option>
                        <option value={"Reprobados"}>Reprobados</option>
                    </select>
                </div>
            </div>
            <div className="mx-4 mt-4">

                {(() => {
                    return { userCategory } != "" ? <h3 className="text-center">{userCategory}</h3> : ""
                })()}

                {(() => {
                    if (userCategory.length) {
                        return (
                            <div className="userList_users mt-4">
                                <table className="table table-bordered userList_usersInfo">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Cédula</th>
                                            <th scope="col">Código del curso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userCategoryList.map((user, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{user.Nombre}</td>
                                                    <td>{user.Cedula}</td>
                                                    <td>{user.CodigoCurso}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                })()}

            </div>
        </div>
    )
};
