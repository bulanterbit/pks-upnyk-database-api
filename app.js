import express from "express";
import cors from "cors"; // <-- Tambah ini
import pksRouter from "./routes/pks.routes.js";
import connectToDatabase from "./database/mongodb.js";

import { PORT } from "./config/env.js";
import uploadRouter from "./routes/upload.routes.js";
import fileRouter from "./routes/file.routes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Ganti sesuai asal frontend kamu
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static & Routes
app.use(express.static("public"));
app.use("/api/pks", pksRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/file", fileRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the lppm archive API");
});

app.listen(PORT, async () => {
  console.log(`API is running on http://localhost:${PORT}`);
  await connectToDatabase();
});

// Error handling
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
