// email-template.js - dengan penyesuaian untuk pengingat berkala

export const generateEmailTemplate = (instansi, link, reminderNumber = 1) => {
  // Variasi judul dan pesan berdasarkan nomor pengingat
  let title, message;

  switch (reminderNumber) {
    case 1:
      title = "Pemberitahuan Perjanjian Kerjasama";
      message = `Berkaitan dengan perjanjian kerjasama antara ${instansi} dengan LPPM UPN "Veteran" Yogyakarta, kami mengimbau untuk segera <strong>mencetak dokumen perjanjian kerjasama yang telah dibuat.</strong>`;
      break;
    case 2:
      title = "Pengingat Pertama: Perjanjian Kerjasama";
      message = `Ini adalah pengingat pertama terkait perjanjian kerjasama antara ${instansi} dengan LPPM UPN "Veteran" Yogyakarta. Kami belum menerima dokumen yang sudah ditandatangani dan bermaterai. Mohon segera <strong>mencetak dan melengkapi dokumen perjanjian</strong> yang telah dibuat.`;
      break;
    case 3:
      title = "Pengingat Kedua: Perjanjian Kerjasama";
      message = `Ini adalah pengingat kedua untuk perjanjian kerjasama antara ${instansi} dengan LPPM UPN "Veteran" Yogyakarta. Kami masih menunggu dokumen yang telah ditandatangani dan bermaterai. Mohon prioritaskan untuk <strong>segera menyelesaikan proses administrasi</strong> ini.`;
      break;
    case 4:
      title = "Pengingat Terakhir: Perjanjian Kerjasama";
      message = `Ini adalah pengingat terakhir mengenai perjanjian kerjasama antara ${instansi} dengan LPPM UPN "Veteran" Yogyakarta. Harap segera <strong>menyelesaikan proses administrasi</strong> untuk menghindari keterlambatan lebih lanjut. Jika memerlukan bantuan, silakan hubungi kami melalui kontak yang tersedia.`;
      break;
    default:
      title = "Pemberitahuan Perjanjian Kerjasama";
      message = `Berkaitan dengan perjanjian kerjasama antara ${instansi} dengan LPPM UPN "Veteran" Yogyakarta, kami mengimbau untuk segera <strong>mencetak dokumen perjanjian kerjasama yang telah dibuat.</strong>`;
  }

  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://upnyk.ac.id/assets/img/logo-upn.png" alt="Logo UPNYK" style="max-width: 150px;">
            <h2 style="color: #00529b;">LPPM UPN "Veteran" Yogyakarta</h2>
            <h3 style="color: #00529b;">${title}</h3>
          </div>
          
          <p>Dengan hormat,</p>
          
          <p>${message}</p>
          
          <p>Mohon untuk <strong>melengkapi persyaratan administrasi dengan mencantumkan tanda tangan basah dan bermaterai</strong> dalam dokumen yang telah dicetak.</p>

          <p>Kemudian scan dokumen dan upload pada tautan berikut:</p>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="${link}" style="background-color: #00529b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Submit Dokumen</a>
          </div>
          
          <p>Apabila ada pertanyaan atau kendala teknis dalam proses pencetakan atau pengunggahan dokumen, silakan menghubungi kami melalui:</p>
          <ul style="list-style-type: none; padding-left: 10px;">
            <li>Email: lppm@upnyk.ac.id</li>
            <li>Telepon: (0274) 486733</li>
            <li>WhatsApp: 0812-3456-7890</li>
          </ul>
          
          <p>Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.</p>
          
          <p>Hormat kami,<br>
          <strong>Lembaga Penelitian dan Pengabdian Masyarakat</strong><br>
          UPN "Veteran" Yogyakarta</p>
          
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          
          <div style="font-size: 12px; color: #777; text-align: center;">
            <p>Email ini dikirim secara otomatis. Mohon tidak membalas email ini.</p>
            <p>&copy; ${new Date().getFullYear()} LPPM UPN "Veteran" Yogyakarta. Hak Cipta Dilindungi.</p>
          </div>
        </div>`;
};
