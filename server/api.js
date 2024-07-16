import { Router } from "express";
import logger from "./utils/logger";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "WELCOME TO LOVE ME TENDER SITE" });
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

	res.json({ skills });
});

router.post("/api/publish-tenders", (req, res) => {
    const formData = req.body;
    logger.debug("Received form data:", formData);

    if (!formData.title || formData.title.length < 10 || formData.title.length > 50) {
        return res.status(400).json({ error: "Tender Title must be between 10 and 50 characters." });
    }

    if (!formData.description || formData.description.length < 100 || formData.description.length > 7500) {
        return res.status(400).json({ error: "Tender Description must be between 100 and 7500 characters." });
    }

    const today = new Date().toISOString().split("T")[0];
    if (formData.closingDate < today) {
        return res.status(400).json({ error: "Tender Closing Date cannot be in the past." });
    }

    res.json({ message: "Form submitted successfully!" });
});

export default router;