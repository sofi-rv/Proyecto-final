import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { matchRoutes, useLocation } from "react-router-dom"

import "../../styles/footer.css";

export const Footer = () => {
	const { store, actions } = useContext(Context);
	const [exclude, setExclude] = useState(null)

	const noFooter = [
		{ path: "/" },
		{ path: "/register" },
		{ path: "/passwordRecover" },
		{ path: "/adminPrincipalPage" },
		{ path: "/addCourse" },
		{ path: "/maintenance" },
		{ path: "/approvalReview" },
		{ path: "/userList" },
		{ path: "/suppliers" },
		{ path: "/principalPage" },
		{ path: "/userPage" },
		{ path: "/reglament" },
		{ path: "/courseDetails" },
		{ path: "/registerCourse" },
	]

	const useCurrentPath = () => {

		const location = useLocation()
		const route = matchRoutes(noFooter, location)

		return route && route[0].pathname
	}

	const currentPath = useCurrentPath()
	console.log(currentPath)
	useEffect(() => {

		const verify = () => {
			setExclude(currentPath)
		}
		verify()
	}, [])
	return (
		!exclude || store.user ?
			< footer className="footer mt-auto py-3 text-center bg-dark" >
				<div className="d-flex justify-content-between align-items-center mx-5">
					<div className="d-flex align-items-center me-4">
						<img src="https://cdn-icons-png.flaticon.com/512/3615/3615806.png" alt="logo" height="50px" width="50px" className="me-1" />
						<h5 className="footer_link me-4 ms-2">Company</h5>
					</div>
					<div className="d-flex align-items-center me-5">
						<img src="https://www.freeiconspng.com/uploads/telephone-icon-blue-gradient-8.png" alt="logo" height="50px" width="50px" className="me-1" />
						<p className="footer_link me-4">+506 2222-2222</p>

						<img src="https://cdn-icons-png.flaticon.com/512/4853/4853171.png" alt="logo" height="50px" width="50px" className="me-1" />
						<p className="footer_link me-4">companycr@gmail.com</p>

						<img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/map-circle-blue-512.png" alt="logo" height="50px" width="50px" className="me-1" />
						<p className="footer_link me-4">San Jose, Costa rica</p>
					</div>
				</div>
			</footer >
			:
			null
	);
};
