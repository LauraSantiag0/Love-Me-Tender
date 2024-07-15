import { Router } from "express";
import logger from "./utils/logger";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "WELCOME TO LOVE ME TENDER SITE" });
});

export default router;
