import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Logout = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<button className="btn btn-danger" onClick={() => actions.logout()}>Cerrar sesión</button>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
