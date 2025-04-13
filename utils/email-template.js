export const generateEmailTemplate = (
  instansi,
  link
) => `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://upnyk.ac.id/assets/img/logo-upn.png" alt="Logo UPNYK" style="max-width: 150px;">
            <h2 style="color: #00529b;">LPPM UPN "Veteran" Yogyakarta</h2>
          </div>
          
          <p>Dengan hormat,</p>
          
          <p>Berkaitan dengan perjanjian kerjasama antara ${instansi} dengan LPPM UPN "Veteran" Yogyakarta, kami mengimbau untuk segera <strong> mencetak dokumen perjanjian kerjasama yang telah dibuat.</strong></p>
          
          <p>Mohon untuk <strong>melengkapi persyaratan administrasi dengan mencantumkan tanda tangan basah dan bermaterai</strong> dalam dokumen yang telah dicetak.</p>

          <p>Kemudian scan dokumen dan upload pada tautan berikut:</p>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="${link}" style="background-color: #00529b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Akses Dokumen Perjanjian</a>
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
