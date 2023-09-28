import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Login } from "./login";
import AdminPrincipalPage from "./adminPrincipalPage";
import { PrincipalPage } from "./principalPage";

export const Home = () => {
  const { store, actions } = useContext(Context)
  return <>
    {!store.user ?
      <Login />
      :
      store.user?.role == "admin" ?
        <AdminPrincipalPage />
        :
        <PrincipalPage />
    }
  </>;
};
