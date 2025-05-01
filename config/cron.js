import cron from "node-cron";
import PKS from "../models/pks.model.js";
import { sendPksNotificationEmail } from "../utils/send-email.js";

// Fungsi untuk mengirim notifikasi mingguan
const sendWeeklyReminders = async () => {
  console.log("Running weekly reminders job...");
  try {
    // Cari PKS yang:
    // 1. Status masih "menunggu dokumen"
    // 2. Belum mencapai 4 notifikasi
    // 3. Terakhir dikirim email setidaknya 6 hari yang lalu ATAU belum pernah dikirim
    const currentDate = new Date();
    const sixDaysAgo = new Date(currentDate);
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

    const pendingDocs = await PKS.find({
      "properties.status": "menunggu dokumen",
      "properties.notificationsSent": { $lt: 4 },
      $or: [
        //{ "properties.lastNotificationDate": { $lte: sixDaysAgo } },
        //{ "properties.lastNotificationDate": { $exists: false } },

        { "properties.lastNotificationDate": { $exists: false } },
        { "properties.lastNotificationDate": { $exists: true } },
      ],
    });

    console.log(
      `Found ${pendingDocs.length} PKS documents requiring notification`
    );

    // Loop melalui dokumen dan kirim email
    for (const doc of pendingDocs) {
      try {
        // Kirim email notifikasi
        await sendPksNotificationEmail(doc._id);

        // Update jumlah notifikasi yang sudah dikirim dan waktu terakhir
        await PKS.findByIdAndUpdate(doc._id, {
          $inc: { "properties.notificationsSent": 1 },
          "properties.lastNotificationDate": new Date(),
        });

        console.log(
          `Notification sent for PKS: ${doc.content.judul} (${doc._id})`
        );
      } catch (err) {
        console.error(`Failed to send notification for PKS ${doc._id}:`, err);
      }
    }
  } catch (error) {
    console.error("Error in weekly reminder job:", error);
  }
};

// Jadwalkan cronjob untuk berjalan setiap minggu (Senin jam 9 pagi)
// '0 9 * * 1' artinya: jam 9:00 setiap hari Senin
const initCronJobs = () => {
  //cron.schedule("0 9 * * 1", sendWeeklyReminders);
  cron.schedule("*/1 * * * *", sendWeeklyReminders);
  console.log("Weekly reminder cron job scheduled");

  // Untuk testing bisa gunakan interval yang lebih pendek
  // Misalnya setiap menit: '*/1 * * * *'
};

export default initCronJobs;
