import React from "react";
import { Link } from "react-router-dom";

export function BuyerDashboard() {
	return (
		<main role="main">
			<div>
				<h1>Buyer Dashboard</h1>
				<Link to="/publish-tender">
					<button>Publish Tender</button>
				</Link>
				<Link to="/list-tenders">
					<button>View Tenders</button>
				</Link>
			</div>
		</main>
	);
}

export default BuyerDashboard;
