import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/userList.css";

export const UserList = () => {

    // const [userCategory, setUserCategory] = useState("")
    // const [userCategoryList, setUserList] = useState([])
    const [userCategoryList, setUserList] = useState([])
    const { store, actions } = useContext(Context);
    const [savedValue, setSavedValue] = useState('');

    const handleInputChange = (event) => {
        // Update the savedValue state variable with the new value
        setSavedValue(event.target.value);
    };

    console.log(savedValue);

    useEffect(() => {
        //@TODO Estos datos deben venir de la base de datos
        const getData = async () => {
            let response = await actions.fetchPromise("/api/enrollment")

            if (response.ok) {
                let responseJson = await response.json();
                console.log(responseJson);
                setUserList(responseJson)
            } else {
                let responseJson = await response.json();
                console.log(responseJson);
            }

        }
        getData()
    }, []);

    // const selectUserList = (e) => {
    //     let category = e.target.value
    //     // if (category == "") {
    //     //     setUserCategory("")
    //     //     setUserList([])
    //     //     return
    //     // }
    //     // Esta lista se deberia obtener la base de datos
    //     // let userList = [
    //     //     { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Aprobados" },
    //     //     { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Aprobados" },
    //     //     { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Aprobados" },
    //     //     { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Aprobados" },

    //     //     { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Matriculados" },
    //     //     { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Matriculados" },
    //     //     { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Matriculados" },
    //     //     { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Matriculados" },

    //     //     { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Reprobados" },
    //     //     { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Reprobados" },
    //     //     { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Reprobados" },
    //     //     { "Nombre": "Nombre de usuario", "Cedula": "Cedula", "CodigoCurso": "Código del curso", "Categoria": "Reprobados" },
    //     // ]

    //     // let users = userList.filter((user) => { return user.Categoria == category })

    //     // if (users.length) {
    //     //     setUserCategory(category)
    //     //     setUserList(users)
    //     // } else {
    //     //     setUserCategory("No hay empleados con la condicion de: " + category)
    //     //     setUserList([])
    //     // }
    //     return category
    // }
    return (
        <div className="userList_page">
            <div className="mt-4 ms-4">
                <h3>Listado de empleados por condición</h3>
                <div className="mt-3 userList_selector">
                    <label className="me-3">Búsqueda por condición del empleado</label>
                    <select onChange={(event) => handleInputChange(event)}>
                        <option value={""}>Seleccione una condición</option>
                        <option value={"Aprobados"}>Aprobados</option>
                        <option value={"En curso"}>En curso</option>
                        <option value={"Reprobados"}>Reprobados</option>
                    </select>
                </div>
            </div>
            <div className="mx-4 mt-4">
                <h3 className="text-center">{savedValue}</h3>
                {/* {(() => {
                    return { userCategory } != "" ? <h3 className="text-center">{userCategory}</h3> : ""
                })()} */}

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
                            {userCategoryList && userCategoryList.length > 0 ?
                                <>
                                    {userCategoryList.map((item, index) => {
                                        return (
                                            item.condition == savedValue &&

                                            <tr key={index}>
                                                <td>{item.user_name}</td>
                                                <td>{item.id_number}</td>
                                                <td>{item.course_name}</td>
                                            </tr>

                                            // <ul key={index} className="list-group">
                                            //     <li className="list-group-item">

                                            //         <div>
                                            //             {item.user_name}
                                            //         </div>
                                            //         <div>
                                            //             {item.course_name}
                                            //         </div>


                                            //     </li>
                                            // </ul>
                                        )
                                    })}
                                </>
                                : <></>}

                            {/* fghdfghdfgh */}
                            {/* {userCategoryList.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.Nombre}</td>
                                        <td>{user.Cedula}</td>
                                        <td>{user.CodigoCurso}</td>
                                    </tr>
                                )
                            })} */}
                        </tbody>
                    </table>
                </div>



                {/* {(() => {
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
                })()} */}

            </div>
        </div>
    )
};
