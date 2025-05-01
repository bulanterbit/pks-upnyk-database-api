// nodemailer.js
import nodemailer from "nodemailer";
import { generateEmailTemplate } from "../utils/email-template.js";
import { EMAIL_PASSWORD } from "./env.js";

// Konfigurasi email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // atau gunakan SMTP kustom
  auth: {
    user: "jaconiah111@gmail.com", // ganti dengan email LPPM yang sebenarnya
    pass: EMAIL_PASSWORD, // gunakan app password jika menggunakan gmail
  },
});

// Fungsi untuk mengirim email PKS
export const sendPksEmail = async ({
  to,
  instansi,
  link,
  subject,
  reminderNumber = 1,
}) => {
  try {
    if (!to) throw new Error("Email penerima (to) diperlukan");
    if (!instansi) throw new Error("Nama instansi diperlukan");
    if (!link) throw new Error("Link dokumen diperlukan");

    const mailOptions = {
      from: '"LPPM UPN Veteran Yogyakarta" <lppm@upnyk.ac.id>',
      to: to,
      subject:
        subject ||
        `Pengingat Dokumen Perjanjian Kerjasama - LPPM UPN Veteran Yogyakarta`,
      html: generateEmailTemplate(instansi, link, reminderNumber),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email berhasil dikirim:", info.messageId);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Gagal mengirim email:", error);
    throw new Error(`Gagal mengirim email: ${error.message}`);
  }
};

// Verifikasi koneksi email saat aplikasi dimulai
export const verifyEmailConnection = async () => {
  try {
    const verification = await transporter.verify();
    if (verification) {
      console.log("Email server siap menerima pesan");
      return true;
    }
  } catch (error) {
    console.error("Koneksi email gagal:", error);
    return false;
  }
};

export default {
  transporter,
  sendPksEmail,
  verifyEmailConnection,
};
