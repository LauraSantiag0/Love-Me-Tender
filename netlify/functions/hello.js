import { Router } from "express";
import serverless from "serverless-http";

const app = Router();

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

api.use("/api/", Router);

export const handler = serverless(app);

