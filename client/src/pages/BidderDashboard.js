import React from "react";
import { Link } from "react-router-dom";

const BidderDashboard = () => {
	return (
		<main>
			<h1>Bidder Dashboard</h1>
			<Link to="/list-tenders">
				<button>View Tenders</button>
			</Link>
		</main>
	);
};

export default BidderDashboard;
