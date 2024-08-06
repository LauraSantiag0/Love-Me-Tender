import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, post } from "./TenderClient";
import "./SubmitBidForm.css";

const SubmitBidForm = () => {
	const { tenderId } = useParams();
	const [coverLetter, setCoverLetter] = useState("");
	const [proposedDuration, setProposedDuration] = useState("");
	const [proposedBudget, setProposedBudget] = useState("");
	const [registerStatus, setRegisterStatus] = useState("");
	const [validationErrors, setValidationErrors] = useState([]);
	const [tender, setTender] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTender = async () => {
			try {
				const response = await get(`/api/tenders/${tenderId}`);
				setTender(response.resource);
			} catch (error) {
				setValidationErrors([
					"An error occurred while fetching tender details.",
				]);
			}
		};

		fetchTender();
	}, [tenderId]);

	const handleCoverLetterChange = (e) => {
		setCoverLetter(e.target.value);
	};

	const handleProposedDurationChange = (e) => {
		setProposedDuration(e.target.value);
	};

	const handleProposedBudgetChange = (e) => {
		setProposedBudget(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const duration = parseInt(proposedDuration);
		const budget = parseFloat(proposedBudget);
		try {
			const bidData = {
				tenderId,
				bidding_amount: budget,
				cover_letter: coverLetter,
				suggested_duration_days: duration,
				bidding_date: new Date(),
			};

			await post("/api/bid", bidData);

			alert("Bid submitted successfully!");
			navigate("/dashboard");
		} catch (error) {
			const { status, data } = error.response;
			if (status === 400) {
				setRegisterStatus("Validation error");
				setValidationErrors(data.errors);
			} else {
				setRegisterStatus("A server error occurred. Please try again later.");
				setValidationErrors(data.errors);
			}
		}
	};

	return (
		<div className="main submit-bid-form-container">
			{tender ? (
				<div className="tender-info">
					<h3>Tender Information</h3>
					<p>
						<strong>Title:</strong> {tender.title}
					</p>
					<p>
						<strong>Description:</strong> {tender.description}
					</p>
					<p>
						<strong>Creation Date:</strong>{" "}
						{new Date(tender.creation_date).toLocaleDateString()}
					</p>
					<p>
						<strong>Closing Date:</strong>{" "}
						{new Date(tender.closing_date).toLocaleDateString()}
					</p>
					<p>
						<strong>Announcement Date:</strong>{" "}
						{new Date(tender.announcement_date).toLocaleDateString()}
					</p>
					<p>
						<strong>Deadline:</strong>{" "}
						{new Date(tender.deadline).toLocaleDateString()}
					</p>
					<p>
						<strong>Status:</strong> {tender.status}
					</p>
				</div>
			) : (
				<p>Loading tender details...</p>
			)}
			<h2>Submit Bid</h2>
			<form onSubmit={handleSubmit} className="submit-bid-form">
				<div className="form-group">
					<label htmlFor="coverLetter">Cover Letter:</label>
					<textarea
						id="coverLetter"
						value={coverLetter}
						onChange={handleCoverLetterChange}
					></textarea>
				</div>
				<div className="form-group">
					<label htmlFor="proposedDuration">
						Proposed Project Duration (Days):
					</label>
					<input
						type="number"
						id="proposedDuration"
						value={proposedDuration}
						onChange={handleProposedDurationChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="proposedBudget">Proposed Project Budget (£):</label>
					<input
						type="number"
						id="proposedBudget"
						value={proposedBudget}
						onChange={handleProposedBudgetChange}
						required
					/>
				</div>
				<button type="submit">Submit Bid</button>
			</form>
			{registerStatus && (
				<div className="message">
					<p>{registerStatus}</p>
					<ul className="error-list">
						{validationErrors.map((error, index) => (
							<li key={index}>{error}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default SubmitBidForm;
