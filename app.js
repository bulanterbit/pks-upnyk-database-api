import express from "express";
import cors from "cors"; // <-- Tambah ini
import pksRouter from "./routes/pks.routes.js";
import connectToDatabase from "./database/mongodb.js";

import { PORT } from "./config/env.js";
import uploadRouter from "./routes/upload.routes.js";
import fileRouter from "./routes/file.routes.js";
import documentRouter from "./routes/document.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import initCronJobs from "./config/cron.js";

import { DB_URI } from "./config/env.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static & Routes
app.use(express.static("public"));
app.use("/api/pks", pksRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/file", fileRouter);
app.use("/api/document", documentRouter);
app.use("/api/notifications", notificationRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the lppm archive API");
});

app.listen(PORT, async () => {
  console.log(`API is running on http://localhost:${PORT}`);
  console.log(DB_URI);
  await connectToDatabase();

  initCronJobs();
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
