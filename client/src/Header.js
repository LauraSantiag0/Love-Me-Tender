import Logo from "./assets/images/CTY-logo-rectangle.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { post } from "./TenderClient";

import "./Header.css";

const Header = () => {
	const [role, setRole] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const userType = localStorage.getItem("userType");
		setRole(userType);
	}, []);

	const handleLogout = async () => {
		try {
			const response = await post("/logout");

			if (response.ok) {
				localStorage.removeItem("token");
				localStorage.removeItem("userType");
				navigate("/");
			} else {
				console.error("Logout failed");
			}
		} catch (error) {
			console.error("Error during logout:");
		}
	};

	return (
		<header className="header">
			<img className="logo" src={Logo} alt="Code Your Future logo" />
			<nav className="nav-list">
				{role === "admin" && (
					<>
						<NavLink
							exact
							to="/list-tenders"
							className="nav-link"
							activeClassName="active"
						>
							All Tenders
						</NavLink>
						<NavLink
							exact
							to="/signup"
							className="nav-link"
							activeClassName="active"
						>
							Grant Access
						</NavLink>
						<NavLink
							exact
							to="/logout"
							className="nav-link"
							activeClassName="active"
							onClick={handleLogout}
						>
							Logout
						</NavLink>
					</>
				)}

				{role === "buyer" && (
					<>
						<NavLink
							exact
							to="/list-tenders"
							className="nav-link"
							activeClassName="active"
						>
							All Tenders
						</NavLink>
						<NavLink
							exact
							to="/BuyerTenderList"
							className="nav-link"
							activeClassName="active"
						>
							My Tenders
						</NavLink>
						<NavLink
							exact
							to="/publish-tender"
							className="nav-link"
							activeClassName="active"
						>
							Publish Tenders
						</NavLink>
						<NavLink
							exact
							to="/logout"
							className="nav-link"
							activeClassName="active"
							onClick={handleLogout}
						>
							Logout
						</NavLink>
					</>
				)}

				{role === "bidder" && (
					<>
						<NavLink
							exact
							to="/list-tenders"
							className="nav-link"
							activeClassName="active"
						>
							All Tenders
						</NavLink>
						<NavLink
							exact
							to="/BidderBiddingList"
							className="nav-link"
							activeClassName="active"
						>
							My bids
						</NavLink>
						<NavLink
							exact
							to="/logout"
							className="nav-link"
							activeClassName="active"
							onClick={handleLogout}
						>
							Logout
						</NavLink>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;
