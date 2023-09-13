import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { AdminLogin } from "./pages/adminLogin";
import { PasswordRecover } from "./pages/passwordRecover";
import { Register } from "./pages/register";
import { PrincipalPage } from "./pages/principalPage";
import { AdminPrincipalPage } from "./pages/adminPrincipalPage";
import { AddCourse } from "./pages/addCourse";
import { UserPage } from "./pages/userPage";
import { Suppliers } from "./pages/suppliers";
import { Reglament } from "./pages/reglament";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { PruebaEditar } from "./pages/pruebaEditar"; //eliminar despues
import { EditCourse } from "./pages/editCourseForm"; //formulario para editar curso
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  //if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          {/*<Navbar />*/}
          <Routes>
            <Route element={<Home />} path="/home" />
            <Route element={<Login />} path="/" />
            <Route element={<AdminLogin />} path="/adminLogin" />
            <Route element={<PasswordRecover />} path="/passwordRecover" />
            <Route element={<Register />} path="/register" />
            <Route element={<PruebaEditar />} path="/pruebaEditar" />
            <Route element={<EditCourse />} path="/editCourseForm/:id" />
            <Route element={
              <>
                <Navbar links={
                  [
                    { "name": "Mi perfil", "path": "/" },
                    { "name": "Cerrar Sesion", "path": "/" }
                  ]
                } />
                <PrincipalPage />
                <Footer />
              </>
            }
              path="/principalPage"
            />
            <Route element={<AdminPrincipalPage />} path="/adminPrincipalPage" />
            <Route element={<AddCourse />} path="/addCourse" />
            <Route element={
              <>
                <Navbar links={
                  [
                    { "name": "Mi perfil", "path": "/" },
                    { "name": "Cerrar Sesion", "path": "/" }
                  ]
                } />
                <Reglament />
                <Footer />
              </>
            }
              path="/reglament"
            />
            <Route element={
              <>
                <Navbar links={
                  [
                    { "name": "Mi perfil", "path": "/" },
                    { "name": "Cerrar Sesion", "path": "/" }
                  ]
                } />
                <UserPage />
                <Footer />
              </>
            }
              path="/userPage"
            />
            <Route element={
              <>
                <Navbar links={
                  [
                    { "name": "Mi perfil", "path": "/" },
                    { "name": "Cerrar Sesion", "path": "/" }
                  ]
                } />
                <Suppliers />
                <Footer />
              </>
            }
              path="/suppliers"
            />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
