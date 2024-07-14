// netlify/functions/hello.js

import { Router } from "express";
import serverless from "serverless-http";

const app = Router();

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

export const handler = serverless(app);
