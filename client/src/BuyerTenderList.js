import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, post } from "./TenderClient";

const BuyerTenderList = () => {
	const { pageNumber } = useParams();
	const currentPage = pageNumber ? parseInt(pageNumber, 10) : 1;
	const [tenders, setTenders] = useState([]);
	const [editStatusId, setEditStatusId] = useState(null);
	const [newStatus, setNewStatus] = useState("");
	const [errorMsg, setErrorMsg] = useState(null);
	const [statusError, setStatusError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [expandedTenderId, setExpandedTenderId] = useState(null);
	const [pagination, setPagination] = useState({
		itemsPerPage: 5,
		currentPage: currentPage,
		totalPages: 1,
	});
	const navigate = useNavigate();

	const fetchTenders = async (page) => {
		setLoading(true);
		try {
			const data = await get(`/api/buyer-tender?page=${page}`);
			setTenders(data.results);
			setPagination(data.pagination);
			setErrorMsg(null);
		} catch (error) {
			setErrorMsg("Error fetching tenders");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTenders(currentPage);
	}, [currentPage]);

	const handleStatusChange = async (tenderId, status) => {
		try {
			await post(`/api/tender/${tenderId}/status`, { status });
			setEditStatusId(null);
			setNewStatus("");
			fetchTenders(currentPage);
		} catch (error) {
			setStatusError("An error occurred while updating tender status!");
		}
	};

	const handleEditStatusClick = (tenderId, currentStatus) => {
		if (currentStatus === "Awarded" || currentStatus === "Cancelled") {
			alert("No changes allowed for Awarded or Cancelled tenders.");
			return;
		}
		setEditStatusId(tenderId);
		setNewStatus("");
	};

	const handleStatusSelect = (e) => {
		setNewStatus(e.target.value);
	};

	const handleSaveStatus = (tenderId) => {
		if (!newStatus) {
			alert("Please select a status.");
			return;
		}
		handleStatusChange(tenderId, newStatus);
	};

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

	useEffect(() => {
		const timer = setTimeout(() => {
			setErrorMsg(null);
			setStatusError(null);
		}, 10000);
		return () => clearTimeout(timer);
	}, [errorMsg, statusError]);

	if (errorMsg !== null) {
		return <div>{errorMsg}</div>;
	}

	if (loading) {
		return <div>Loading!!</div>;
	}

	if (statusError) {
		return <div className="msg">{statusError}</div>;
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
				{tenders.length === 0 ? (
					<div className="msg">You do not have any tenders!</div>
				) : (
					tenders.map((tender) => (
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
							{tender.status !== "Awarded" && tender.status !== "Cancelled" && (
								<>
									{editStatusId === tender.id ? (
										<div className="status-edit">
											<select value={newStatus} onChange={handleStatusSelect}>
												<option value="">Select Status</option>
												{tender.status === "Active" ? (
													<>
														<option value="In Review">In Review</option>
														<option value="Cancelled">Cancel</option>
													</>
												) : tender.status === "In Review" ? (
													<option value="Cancelled">Cancel</option>
												) : null}
											</select>
											<button
												className="btn"
												onClick={() => handleSaveStatus(tender.id)}
											>
												Save
											</button>
											<button
												className="btn"
												onClick={() => setEditStatusId(null)}
											>
												Cancel
											</button>
										</div>
									) : (
										<button
											className="btn"
											onClick={() =>
												handleEditStatusClick(tender.id, tender.status)
											}
										>
											Edit Status
										</button>
									)}
								</>
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
