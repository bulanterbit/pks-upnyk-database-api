import { Router } from "express";
import {
  getNotificationStatus,
  sendManualReminder,
  resetNotificationCount,
} from "../controllers/notification.controller.js";

const notificationRouter = Router();

// GET all notification status
notificationRouter.get("/", getNotificationStatus);

// POST send manual reminder
notificationRouter.post("/:id/send", sendManualReminder);

// POST reset notification count
notificationRouter.post("/:id/reset", resetNotificationCount);

export default notificationRouter;

// Frontend untuk Monitoring (contoh kode)
/*

*/
