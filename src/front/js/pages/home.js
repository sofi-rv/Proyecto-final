import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {

	return (
		<>
			<Link to="/login" className="btn btn-primary">Iniciar Sesion</Link>
		</>
	);
};