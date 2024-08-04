import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { post } from "./TenderClient";

const SubmitBidForm = () => {
	const { tenderId } = useParams();
	const [coverLetter, setCoverLetter] = useState("");
	const [proposedDuration, setProposedDuration] = useState("");
	const [proposedBudget, setProposedBudget] = useState("");
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();

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
		const newErrors = [];

		if (coverLetter.length > 1000) {
			newErrors.push("Cover Letter must be up to 1,000 characters.");
		}

		const duration = parseInt(proposedDuration);
		if (isNaN(duration) || duration < 1 || duration > 1000) {
			newErrors.push(
				"Proposed Project Duration must be between 1 and 1,000 days."
			);
		}

		const budget = parseFloat(proposedBudget);
		if (isNaN(budget) || budget <= 0) {
			newErrors.push("Proposed Project Budget must be a positive number.");
		}

		if (newErrors.length > 0) {
			setErrors(newErrors);
		} else {
			try {
				const bidData = {
					tenderId,
					bidding_amount: budget,
					cover_letter: coverLetter,
					suggested_duration_days: duration,
				};

				await post("/api/bid", bidData);

				setErrors([]);
				alert("Bid submitted successfully!");
				navigate("/dashboard");
			} catch (error) {
				setErrors([error.message]);
			}
		}
	};

	return (
		<div className="submit-bid-form-container">
			<h2>Submit Bid</h2>
			{errors.length > 0 && (
				<div className="error-message">
					<ul>
						{errors.map((error, index) => (
							<li key={index}>{error}</li>
						))}
					</ul>
				</div>
			)}
			<form onSubmit={handleSubmit} className="submit-bid-form">
				<div className="form-group">
					<label htmlFor="coverLetter">Cover Letter:</label>
					<textarea
						id="coverLetter"
						value={coverLetter}
						onChange={handleCoverLetterChange}
						maxLength="1000"
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
						min="1"
						max="1000"
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
						min="0.01"
						step="0.01"
						required
					/>
				</div>
				<button type="submit">Submit Bid</button>
			</form>
		</div>
	);
};

export default SubmitBidForm;
