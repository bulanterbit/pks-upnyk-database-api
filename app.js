import express from "express";
import pksRouter from "./routes/pks.routes.js";
import connectToDatabase from "./database/mongodb.js";

import { PORT } from "./config/env.js";
import uploadRouter from "./routes/upload.routes.js";
import fileRouter from "./routes/file.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

app.use("/api/pks", pksRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/file", fileRouter);
app.use("/api/generate", generateRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the lppm archive API");
});

app.listen(PORT, async () => {
  console.log(
    `Subscription Tracker API is running on http://localhost:${PORT}`
  );

  await connectToDatabase();
});

// Add this error handling middleware to app.js
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
    errors: err.errors || {},
  });

  next();
});

export default app;
