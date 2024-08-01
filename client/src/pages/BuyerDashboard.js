import React from "react";
import TendersList from "../TenderList";
import { Link } from "react-router-dom";

export function BuyerDashboard() {
	return (
		<main role="main">
			<div>
				<h1>Buyer Dashboard</h1>
				<Link to="/publish-tender">
					<button>Publish Tender</button>
				</Link>
				<TendersList />
			</div>
		</main>
	);
}

export default BuyerDashboard;
