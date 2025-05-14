// email-template.js - dengan penyesuaian untuk pengingat berkala dan prosedur dokumen

export const generateEmailTemplate = (instansi, link, reminderNumber = 1) => {
  // Variasi judul dan pesan berdasarkan nomor pengingat
  let title, message;

  switch (reminderNumber) {
    case 1:
      title = "Pemberitahuan Perjanjian Kerjasama";
      message = `Berkaitan dengan perjanjian kerjasama antara ${instansi} dengan LPPM UPN "Veteran" Yogyakarta, kami mengimbau untuk segera memproses dokumen perjanjian dengan langkah-langkah berikut:`;
      break;
    case 2:
      title = "Pengingat Pertama: Perjanjian Kerjasama";
      message = `Ini adalah pengingat pertama terkait perjanjian kerjasama antara ${instansi} dengan LPPM UPN "Veteran" Yogyakarta. Kami belum menerima dokumen yang sudah diproses sesuai ketentuan. Mohon segera lakukan langkah-langkah berikut:`;
      break;
    case 3:
      title = "Pengingat Kedua: Perjanjian Kerjasama";
      message = `Ini adalah pengingat kedua untuk perjanjian kerjasama antara ${instansi} dengan LPPM UPN "Veteran" Yogyakarta. Kami masih menunggu dokumen yang telah diproses sesuai ketentuan. Mohon prioritaskan langkah-langkah berikut:`;
      break;
    case 4:
      title = "Pengingat Terakhir: Perjanjian Kerjasama";
      message = `Ini adalah pengingat terakhir mengenai perjanjian kerjasama antara ${instansi} dengan LPPM UPN "Veteran" Yogyakarta. Harap segera selesaikan langkah-langkah berikut untuk menghindari keterlambatan:`;
      break;
    default:
      title = "Pemberitahuan Perjanjian Kerjasama";
      message = `Berkaitan dengan perjanjian kerjasama antara ${instansi} dengan LPPM UPN "Veteran" Yogyakarta, kami mengimbau untuk segera memproses dokumen perjanjian dengan langkah-langkah berikut:`;
  }

  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://kompaspedia.kompas.id/wp-content/uploads/2020/08/logo_Universitas-Pembangunan-Nasional-Veteran-Yogyakarta-thumb.png" alt="Logo UPNYK" style="max-width: 150px;">
            <h2 style="color: #00529b;">LPPM UPN "Veteran" Yogyakarta</h2>
            <h3 style="color: #00529b;">${title}</h3>
          </div>
          
          <p>Dengan hormat,</p>
          
          <p>${message}</p>
          
          <ol style="margin-left: 20px; padding-left: 0;">
            <li><strong>Cetak dokumen perjanjian kerja sama</strong> sebanyak <strong>2 (dua) eksemplar</strong>.</li>
            <li><strong>Lakukan penandatanganan</strong> pada kedua dokumen dengan ketentuan:
              <ul style="margin-top: 5px;">
                <li><strong>1 eksemplar</strong> ditandatangani <strong>di atas materai</strong> (sesuai ketentuan berlaku).</li>
                <li><strong>1 eksemplar</strong> ditandatangani <strong>tanpa materai</strong>.</li>
              </ul>
            </li>
            <li>Serahkan kedua dokumen yang telah ditandatangani kepada <strong>Bagian Tata Usaha (TU)</strong> untuk ditandatangani oleh <strong>Pihak Pertama</strong> (LPPM UPN "Veteran" Yogyakarta).</li>
            <li>Setelah penandatanganan lengkap, <strong>scan dokumen</strong> (kedua eksemplar) dalam format yang jelas.</li>
            <li><strong>Upload dokumen yang telah discan</strong> melalui tautan berikut:</li>
          </ol>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="${link}" style="background-color: #00529b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Submit Dokumen</a>
          </div>
          
          <p>Apabila ada pertanyaan atau kendala teknis dalam proses pencetakan atau pengunggahan dokumen, silakan menghubungi kami melalui:</p>
          <ul style="list-style-type: none; padding-left: 10px;">
            <li>Email: lppm@upnyk.ac.id</li>
            <li>Telepon: 0821-3867-4252</li>
            <li>WhatsApp: 0821-3867-4252</li>
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