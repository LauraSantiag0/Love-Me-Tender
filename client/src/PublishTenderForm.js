import React, { useState } from "react";
import "./styles.css";

const PublishTenderForm = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [closingDate, setClosingDate] = useState("");
	const [announcementDate, setAnnouncementDate] = useState("");
	const [deadlineDate, setDeadlineDate] = useState("");
	const [skills, setSkills] = useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (title.length < 10 || title.length > 50) {
			alert("Tender Title must be between 10 and 50 characters.");
			return;
		}

		if (description.length < 100 || description.length > 7500) {
			alert("Tender Description must be between 100 and 7500 characters.");
			return;
		}

		const today = new Date().toISOString().split("T")[0];
		if (closingDate < today) {
			alert("Tender Closing Date cannot be in the past.");
			return;
		}

		if (announcementDate < closingDate) {
			alert("Tender Announcement Date cannot be before the Closing Date.");
			return;
		}

		if (deadlineDate < announcementDate) {
			alert(
				"Tender Project Deadline Date cannot be before the Announcement Date."
			);
			return;
		}

		if (skills.length === 0) {
			alert("Please select at least one skill.");
			return;
		}

		console.log({
			title,
			description,
			closingDate,
			announcementDate,
			deadlineDate,
			skills,
		});

		alert("Tender published successfully!");
		
		setTitle("");
		setDescription("");
		setClosingDate("");
		setAnnouncementDate("");
		setDeadlineDate("");
		setSkills([]);
	};

	const handleSkillsChange = (event) => {
		const options = event.target.options;
		const selectedSkills = [];
		for (const option of options) {
			if (option.selected) {
				selectedSkills.push(option.value);
			}
		}
		setSkills(selectedSkills);
	};

	return (
		<div className="container">
			<h1>Publish Tender</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title">Tender Title:</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						maxLength="50"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="description">Tender Description:</label>
					<textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						maxLength="7500"
						required
					></textarea>
				</div>
				<div className="form-group">
					<label htmlFor="closingDate">Tender Closing Date:</label>
					<input
						type="date"
						id="closingDate"
						value={closingDate}
						onChange={(e) => setClosingDate(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="announcementDate">Tender Announcement Date:</label>
					<input
						type="date"
						id="announcementDate"
						value={announcementDate}
						onChange={(e) => setAnnouncementDate(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="deadlineDate">Tender Project Deadline Date:</label>
					<input
						type="date"
						id="deadlineDate"
						value={deadlineDate}
						onChange={(e) => setDeadlineDate(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="skills">Skills Required:</label>
					<select
						id="skills"
						multiple
						value={skills}
						onChange={handleSkillsChange}
						required
					>
						<option value="Website">Website</option>
						<option value="Android">Android</option>
						<option value="iOS">iOS</option>
						<option value="Backend">Backend</option>
						<option value="Frontend">Frontend</option>
						<option value="Full-stack">Full-stack</option>
					</select>
				</div>
				<button type="submit">Publish Tender</button>
			</form>
		</div>
	);
};

export default PublishTenderForm;