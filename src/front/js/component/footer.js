import React from "react";
import { Link } from "react-router-dom";

import "../../styles/footer.css";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center bg-dark">
		<div className="d-flex justify-content-center align-items-center">
			<p className="footer_link me-4">Contactos</p>
			<p className="footer_link me-4">+506 2222-2222</p>
			<p className="footer_link me-4">companycr@gmail.com</p>
			<p className="footer_link me-4">San Jose, Costa rica</p>
		</div>
	</footer>
);
