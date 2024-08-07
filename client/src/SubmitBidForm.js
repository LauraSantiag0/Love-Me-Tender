import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, post } from "./TenderClient";
import "./SubmitBidForm.css";

const SubmitBidForm = () => {
	const { tenderId } = useParams();
	const [coverLetter, setCoverLetter] = useState("");
	const [duration, setDuration] = useState("");
	const [budget, setBudget] = useState("");
	const [errors, setErrors] = useState([]);
	const [tender, setTender] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTender = async () => {
			try {
				const data = await get(`/api/tenders/${tenderId}`);
				setTender(data.resource);
				setErrors([]);
			} catch (error) {
				setErrors(["An error occurred while fetching tender details."]);
			}
		};

		fetchTender();
	}, [tenderId]);

	const handleCoverLetterChange = (e) => {
		setCoverLetter(e.target.value);
	};

	const handleDurationChange = (e) => {
		setDuration(e.target.value);
	};

	const handleBudgetChange = (e) => {
		setBudget(e.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = [];

		if (coverLetter.length > 1000) {
			newErrors.push("Maximum length is upto 1,000 characters");
		}

		if (isNaN(duration) || duration < 1 || duration > 1000) {
			newErrors.push("put a valid duration");
		}

		if (isNaN(budget) || budget <= 0) {
			newErrors.push("Input a valid bidding amount");
		}

		if (newErrors.length === 0) {
			try {
				const bidData = {
					tenderId,
					bidding_amount: parseFloat(budget),
					suggested_duration_days: parseInt(duration, 10),
					cover_letter: coverLetter,
					bidding_date: new Date(),
				};

				await post("api/bid", bidData);

				setCoverLetter("");
				setDuration("");
				setBudget("");
				setErrors([]);
				alert("Bid submitted successfully!");
				navigate("/dashboard");
			} catch (error) {
				setErrors([error.message]);
			}
		} else {
			setErrors(newErrors);
		}
	};

	return (
		<div className="submit-bid-form-container">
			{errors.length > 0 && (
				<div className="error-message">
					<ul>
						{errors.map((error, index) => (
							<li key={index}>{error}</li>
						))}
					</ul>
				</div>
			)}
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
						value={duration}
						onChange={handleDurationChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="proposedBudget">Proposed Project Budget (£):</label>
					<input
						type="number"
						id="proposedBudget"
						value={budget}
						onChange={handleBudgetChange}
						required
					/>
				</div>
				<button className="form-btn" type="submit">
					Submit Bid
				</button>
			</form>
		</div>
	);
};

export default SubmitBidForm;
