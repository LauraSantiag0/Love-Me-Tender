import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, post } from "./TenderClient";

const BuyerTenderList = () => {
	const { pageNumber } = useParams();
	const currentPage = pageNumber ? parseInt(pageNumber, 10) : 1;
	const [buyerTenders, setBuyerTenders] = useState([]);
	const [errorMsg, setErrorMsg] = useState(null);
	const [loading, setLoading] = useState(true);
	const [statusToUpdate, setStatusToUpdate] = useState(null);
	const [selectedTenderId, setSelectedTenderId] = useState(null);
	const [expandedTenderId, setExpandedTenderId] = useState(null);
	const [pagination, setPagination] = useState({
		itemsPerPage: 5,
		currentPage: currentPage,
		totalPages: 1,
	});
	const navigate = useNavigate();

	const getToken = () => localStorage.getItem("authToken");

	const fetchTenders = useCallback(async (page) => {
		setLoading(true);
		try {
			const data = await get(`/api/buyer-tender?page=${page}`, {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});
			setBuyerTenders(data.results);
			setPagination(data.pagination);
			setErrorMsg(null);
		} catch (error) {
			setErrorMsg("Error fetching tenders");
		} finally {
			setLoading(false);
		}
	}, []);

	const updateTenderStatus = useCallback(
		async (tenderId, newStatus) => {
			const currentTender = buyerTenders.find(
				(tender) => tender.id === tenderId
			);
			if (!currentTender) {
				setErrorMsg("Tender not found");
				return;
			}

			const validStatuses = {
				Active: ["In Review", "Closed"],
				"In Review": ["Closed"],
				Closed: [],
			};

			if (!validStatuses[currentTender.status].includes(newStatus)) {
				setErrorMsg("Invalid status transition");
				//  console.log("Invalid status transition detected");
				return;
			}
			try {
				// console.log("Updating tender status:", { tenderId, newStatus });

				const response = await post(`/api/tender/${tenderId}/status`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getToken()}`,
					},
					body: JSON.stringify({ status: newStatus }),
				});

				// console.log("API response status:", response.status);

				if (response.ok) {
					fetchTenders(currentPage);
					setStatusToUpdate(null);
					setSelectedTenderId(null);
				} else {
					const errorData = await response.json();
					// console.error(`API error: ${errorData.code}`);
					setErrorMsg(`Error: ${errorData.code}`);
				}
			} catch (error) {
				// console.error("Error updating status:", error);
				setErrorMsg("Error updating status");
			}
		},
		[buyerTenders, fetchTenders, currentPage]
	);

	useEffect(() => {
		fetchTenders(currentPage);
	}, [fetchTenders, currentPage]);

	useEffect(() => {
		if (statusToUpdate && selectedTenderId) {
			updateTenderStatus(selectedTenderId, statusToUpdate);
		}
	}, [statusToUpdate, selectedTenderId, updateTenderStatus]);

	const loadNextPage = () => {
		if (pagination.currentPage < pagination.totalPages && !loading) {
			navigate(`/buyer-tender/page/${pagination.currentPage + 1}`);
		}
	};

	const loadPreviousPage = () => {
		if (pagination.currentPage > 1 && !loading) {
			navigate(`/buyer-tender/page/${pagination.currentPage - 1}`);
		}
	};

	if (errorMsg !== null) {
		return <div>{errorMsg}</div>;
	}

	if (loading) {
		return <div>Loading!!</div>;
	}

	const truncateText = (text, limit) => {
		if (text.length <= limit) {
			return text;
		}
		return text.substring(0, limit) + "...";
	};

	const handleTenderClick = (id) => {
		setExpandedTenderId((prevId) => (prevId === id ? null : id));
	};

	return (
		<main>
			<h2 className="msg">My Tenders List</h2>
			<div className="container">
				{errorMsg && <p className="error-message">{errorMsg}</p>}
				{buyerTenders.length === 0 ? (
					<div className="msg">You do not have any tenders!</div>
				) : (
					buyerTenders.map((tender) => (
						<div className="card" key={tender.tender_id}>
							<p className="posted-on">
								ID: <span className="posted-on-date">{tender.id}</span>
								<span data-status={tender.status} className="bid-status">
									{tender.status}
								</span>
							</p>
							<h2 className="title">
								<a className="tender-id" href={`./bidding/${tender.id}`}>
									{tender.title}
								</a>
							</h2>
							<div className="details">
								<p>
									<strong>Creation Date: </strong>
									{new Date(tender.creation_date).toLocaleDateString()}
								</p>
								<p>
									<strong>Announcement Date: </strong>
									{new Date(tender.announcement_date).toLocaleDateString()}
								</p>
								<p>
									<strong>Deadline Date: </strong>
									{new Date(tender.deadline).toLocaleDateString()}
								</p>
								<p>
									<strong>Closing Date: </strong>
									{new Date(tender.closing_date).toLocaleDateString()}
								</p>
							</div>
							<h4>Description: </h4>
							<p className="cover-letter">
								{expandedTenderId === tender.id ? (
									<p>
										{tender.description || "No description available"}
										<button
											className="toggle-text"
											onClick={() => handleTenderClick(tender.id)}
											aria-expanded={expandedTenderId === tender.id}
											aria-controls={`description-${tender.id}`}
										>
											Read less
										</button>
									</p>
								) : (
									<p>
										{truncateText(
											tender.description || "No description available",
											150
										)}
										{(tender.description || "").length > 30 && (
											<button
												className="toggle-text"
												onClick={() => handleTenderClick(tender.id)}
												aria-expanded={expandedTenderId === tender.id}
												aria-controls={`description-${tender.id}`}
											>
												Read More
											</button>
										)}
									</p>
								)}
							</p>
							<p>
								<strong>Cost: </strong>£{tender.cost}{" "}
								<span>
									<strong>No. Of Bids Received: </strong>
									{tender.no_of_bids_received}
								</span>
							</p>
							{tender.status === "Active" && (
								<div>
									<button
										onClick={() => updateTenderStatus(tender.id, "In Review")}
									>
										In Review
									</button>
									<button
										onClick={() => updateTenderStatus(tender.id, "Closed")}
									>
										Close Tender
									</button>
								</div>
							)}
							{tender.status === "In Review" && (
								<div>
									<button
										onClick={() => updateTenderStatus(tender.id, "Closed")}
									>
										Close Tender
									</button>
								</div>
							)}
						</div>
					))
				)}

				{loading && <p>Loading...</p>}
				<div className="pagination-buttons">
					{pagination.currentPage > 1 && (
						<button
							className="btn"
							onClick={loadPreviousPage}
							disabled={loading}
						>
							Previous Page
						</button>
					)}
					{pagination.currentPage < pagination.totalPages && (
						<button className="btn" onClick={loadNextPage} disabled={loading}>
							Next Page
						</button>
					)}
				</div>
			</div>
		</main>
	);
};

export default BuyerTenderList;
