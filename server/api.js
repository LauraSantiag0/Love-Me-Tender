import { Router } from "express";
import db from "./db";

const router = Router();
const itemsPerPage = 25;

router.get("/", (_, res) => {
	res.status(200).json({ message: "WELCOME TO LOVE ME TENDER SITE" });
});

router.get("/skills", (req, res) => {
	const skills = [
		"Website",
		"Android",
		"iOS",
		"Backend",
		"Frontend",
		"Full-stack",
	];

	skills.sort();

	res.status(200).json({ skills });
});

router.post("/publish-tenders", (req, res) => {
	const formData = req.body;

	const newErrors = [];

	if (
		!formData.title ||
		formData.title.length < 10 ||
		formData.title.length > 50
	) {
		newErrors.push("Tender Title must be between 10 and 50 characters.");
	}

	if (
		!formData.description ||
		formData.description.length < 100 ||
		formData.description.length > 7500
	) {
		newErrors.push(
			"Tender Description must be between 100 and 7500 characters."
		);
	}

	const today = new Date().toISOString().split("T")[0];
	if (formData.closingDate < today) {
		newErrors.push("Tender Closing Date cannot be in the past.");
	}

	if (formData.announcementDate > formData.closingDate) {
		newErrors.push("Tender Announcement Date must be before the Closing Date.");
	}

	if (formData.deadlineDate < formData.announcementDate) {
		newErrors.push(
			"Tender Project Deadline Date must be after the Announcement Date."
		);
	}

	if (formData.selectedSkills.length === 0) {
		newErrors.push("Please select at least one skill.");
	}

	if (newErrors.length > 0) {
		return res.status(400).json({ errors: newErrors });
	}

	res.status(200).json({ message: "Form submitted successfully!" });
});

router.get("/skills", (req, res) => {
	const skills = [
		"Website",
		"Android",
		"iOS",
		"Backend",
		"Frontend",
		"Full-stack",
	];

	skills.sort();

	res.status(200).json({ skills });
});

router.post("/publish-tenders", (req, res) => {
	const formData = req.body;

	const newErrors = [];

	if (
		!formData.title ||
		formData.title.length < 10 ||
		formData.title.length > 50
	) {
		newErrors.push("Tender Title must be between 10 and 50 characters.");
	}

	if (
		!formData.description ||
		formData.description.length < 100 ||
		formData.description.length > 7500
	) {
		newErrors.push(
			"Tender Description must be between 100 and 7500 characters."
		);
	}

	const today = new Date().toISOString().split("T")[0];
	if (formData.closingDate < today) {
		newErrors.push("Tender Closing Date cannot be in the past.");
	}

	if (formData.announcementDate > formData.closingDate) {
		newErrors.push("Tender Announcement Date must be before the Closing Date.");
	}

	if (formData.deadlineDate < formData.announcementDate) {
		newErrors.push(
			"Tender Project Deadline Date must be after the Announcement Date."
		);
	}

	if (formData.selectedSkills.length === 0) {
		newErrors.push("Please select at least one skill.");
	}

	if (newErrors.length > 0) {
		return res.status(400).json({ errors: newErrors });
	}

	res.status(200).json({ message: "Form submitted successfully!" });
});

router.get("/buyer-tender", async (req, res) => {
	const buyerId = 1;
	let page = parseInt(req.query.page) || 1;
	const offset = (page - 1) * itemsPerPage;
	const totalBuyerTenders = await db.query("SELECT COUNT(buyer_id) FROM bid WHERE buyer_id = $1", [buyerId]);
	const totalPages = Math.ceil(totalBuyerTenders.rows[0].count / itemsPerPage);
	const result = await db.query("SELECT * FROM tender WHERE buyer_id = $1 LIMIT $2 OFFSET $3", [buyerId, itemsPerPage, offset]);

	result
		? res.send({
			"results": result.rows, "pagination": {
				"itemsPerPage": itemsPerPage,
				"currentPage": page,
				"totalPages": totalPages,
			},
		})
		:
		res.status(500)
			.send({ code: "SERVER_ERROR" });
	
});

router.get("/bidder-bid", async (req, res) => {
	let page = parseInt(req.query.page) || 1;
	const bidderId = 1;
	const totalBiddings = await db.query("SELECT COUNT(bidder_id) FROM bid WHERE bidder_id = $1", [bidderId]);
	const totalPages = Math.ceil(totalBiddings.rows[0].count / itemsPerPage);
	const offset = (page - 1) * itemsPerPage;

	const result = await db.query("SELECT * FROM bid WHERE bidder_id = $1 LIMIT $2 OFFSET $3", [bidderId, itemsPerPage, offset]);
	result
		? res.send({
			"results": result.rows, "pagination": {
				"itemsPerPage": itemsPerPage,
				"currentPage": page,
				"totalPages": totalPages,
			},
		})
		:
		res.status(500)
			.send({ code: "SERVER_ERROR" });
});

export default router;
