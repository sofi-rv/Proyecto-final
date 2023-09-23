import React from "react";
import { Link } from "react-router-dom";

import "../../styles/footer.css";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center bg-dark">
		<div className="d-flex justify-content-center align-items-center">
			<div className="footer_link">Contactos</div>
			<div className="row">
				<div className="col-4 footer_link">+506 2222-2222</div>
				<div className="col-4 footer_link">companycr@gmail.com</div>
				<div className="col-4 footer_link">San Jose, Costa rica</div>
			</div>
		</div>
	</footer>
);
