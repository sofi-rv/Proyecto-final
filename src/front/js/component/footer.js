import React from "react";
import { Link } from "react-router-dom";

import "../../styles/footer.css";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center bg-dark">
		<div className="d-flex justify-content-center align-items-center">
			<p>
				<Link to="#" className="footer_link me-4">Contactenos</Link>
			</p>
			<p>
				<Link to="/reglament" className="footer_link">Normativa</Link>
			</p>
		</div>
	</footer>
);
