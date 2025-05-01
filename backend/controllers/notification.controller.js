// controllers/notification.controller.js
// Buat controller untuk monitoring notifikasi email

import PKS from "../models/pks.model.js";

// Get all PKS with notification status
export const getNotificationStatus = async (req, res, next) => {
  try {
    // Gunakan projection untuk mendapatkan hanya field yang diperlukan
    const notifications = await PKS.find(
      { "properties.status": "menunggu dokumen" },
      {
        "content.judul": 1,
        "content.nomor": 1,
        "pihakKedua.instansi": 1,
        "pihakKedua.nama": 1,
        "properties.email": 1,
        "properties.uploadDate": 1,
        "properties.notificationsSent": 1,
        "properties.lastNotificationDate": 1,
      }
    ).sort({ "properties.lastNotificationDate": -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

// Force send reminder for specific PKS
export const sendManualReminder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pks = await PKS.findById(id);

    if (!pks) {
      const error = new Error("PKS tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    // Cek apakah sudah mencapai 4 notifikasi
    if (pks.properties.notificationsSent >= 4) {
      const error = new Error(
        "Sudah mencapai batas maksimal pengiriman notifikasi (4)"
      );
      error.statusCode = 400;
      throw error;
    }

    // Kirim email melalui fungsi yang sudah ada
    const { sendPksNotificationEmail } = await import("../utils/send-email.js");
    const emailResult = await sendPksNotificationEmail(id);

    // Update jumlah notifikasi yang sudah dikirim
    await PKS.findByIdAndUpdate(id, {
      $inc: { "properties.notificationsSent": 1 },
      "properties.lastNotificationDate": new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Pengingat berhasil dikirim secara manual",
      data: {
        pksId: id,
        email: pks.properties.email,
        notificationNumber: (pks.properties.notificationsSent || 0) + 1,
        emailResult,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Reset notification count for specific PKS
export const resetNotificationCount = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pks = await PKS.findById(id);

    if (!pks) {
      const error = new Error("PKS tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    // Reset jumlah notifikasi
    await PKS.findByIdAndUpdate(id, {
      "properties.notificationsSent": 0,
      "properties.lastNotificationDate": null,
    });

    res.status(200).json({
      success: true,
      message: "Jumlah notifikasi berhasil di-reset",
      data: {
        pksId: id,
        email: pks.properties.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
