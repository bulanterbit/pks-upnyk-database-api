// send-email.js
import { sendPksEmail } from "../config/nodemailer.js";
import PKS from "../models/pks.model.js";
import process from "process";

export const sendPksNotificationEmail = async (pksId) => {
  try {
    // Ambil data PKS dari database
    const pksData = await PKS.findById(pksId);

    if (!pksData) {
      throw new Error("PKS tidak ditemukan");
    }

    // Menyiapkan data untuk email
    const emailData = {
      to: pksData.properties.email,
      instansi: pksData.pihakKedua.nama,
      // URL untuk mengakses dokumen PKS
      link: `${
        process.env.BASE_URL ||
        "https://project-upn.uc.r.appspot.com/detailuser.html?id="
      }${pksId}`,
      subject: `Pengingat: Dokumen Perjanjian Kerjasama - ${pksData.content.judul}`,
    };

    // Tambahkan informasi pengingat ke-berapa
    const reminderNumber = (pksData.properties.notificationsSent || 0) + 1;
    if (reminderNumber > 1) {
      emailData.subject = `Pengingat #${reminderNumber}: Dokumen Perjanjian Kerjasama - ${pksData.content.judul}`;
    }

    // Kirim email
    const result = await sendPksEmail(emailData);

    return result;
  } catch (error) {
    console.error("Error saat mengirim email notifikasi PKS:", error);
    throw error;
  }
};

// Fungsi untuk mengirim ulang email jika diperlukan
export const resendPksEmail = async (pksId) => {
  try {
    return await sendPksNotificationEmail(pksId);
  } catch (error) {
    console.error("Gagal mengirim ulang email:", error);
    throw error;
  }
};

export default {
  sendPksNotificationEmail,
  resendPksEmail,
};
