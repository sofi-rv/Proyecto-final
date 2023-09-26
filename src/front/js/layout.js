import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { PasswordRecover } from "./pages/passwordRecover";
import { Register } from "./pages/register";
import { PrincipalPage } from "./pages/principalPage";
import { AdminPrincipalPage } from "./pages/adminPrincipalPage";
import { AddCourse } from "./pages/addCourse";
import { UserPage } from "./pages/userPage";
import { Suppliers } from "./pages/suppliers";
import { Reglament } from "./pages/reglament";
import { CourseDetails } from "./pages/courseDetails";
import { RegisterCourse } from "./pages/registerCourse";
import { UserList } from "./pages/userList";
import { ApprovalReview } from "./pages/approvalReview";
import { Maintenance } from "./pages/maintenance";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { UpdateCourse } from "./pages/updateCourse";

import { PruebaEditar } from "./pages/pruebaEditar"; //eliminar despues
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
          <Routes>
            <Route element={<Home />} path="/home" />
            <Route element={<Login />} path="/" /> {/* resolver para que no salga navbar ni footer*/}
            <Route element={<PasswordRecover />} path="/passwordRecover" />
            <Route element={<Register />} path="/register" />
            <Route element={<PruebaEditar />} path="/pruebaEditar" />
            <Route element={<><Navbar /><PrincipalPage /><Footer /></>} path="/principalPage" />
            <Route element={<><Navbar /><AdminPrincipalPage /><Footer /></>} path="/adminPrincipalPage" />
            <Route element={<><Navbar /><AddCourse /><Footer /></>} path="/addCourse" />
            <Route element={<><Navbar /><Maintenance /><Footer /></>} path="/maintenance" />
            <Route element={<><Navbar /><UpdateCourse /><Footer /></>} path="/updateCourse" />
            <Route element={<><Navbar /><Reglament /><Footer /></>} path="/reglament" />
            <Route element={<><Navbar /><UserPage /><Footer /></>} path="/userPage/:id" />
            <Route element={<><Navbar /><Suppliers /><Footer /></>} path="/suppliers" />
            <Route element={<><Navbar /><CourseDetails /><Footer /></>} path="/courseDetails/:id" />
            <Route element={<><Navbar /><RegisterCourse /><Footer /></>} path="/registerCourse/:id" />
            <Route element={<><Navbar /><UserList /><Footer /></>} path="/userList" />
            <Route element={<><Navbar /><ApprovalReview /><Footer /></>} path="/approvalReview" />
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
