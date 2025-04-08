import PKS from "../models/pks.model"


export const generateDocument = async (req, res) => {
    try {
        const users = await PKS.findById(req.params.id);
    
        if (!users) {
          const error = new Error("PKS not found");
          error.statusCode = 404;
          throw error;
        }
    
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        next(error);
      }

          // Dokumen
    const nomorInternal = data.dokumen.nomorInternal;
    const nomorMitra = data.dokumen.nomorMitra;
    const judul = data.dokumen.judul;
    const tanggalTtd = data.dokumen.tanggalTtd;
    const tempatTtd = data.dokumen.tempatTtd;
    const fileUpload = data.dokumen.fileUpload;

    // Nota Kesepahaman
    const adaNota = data.notaKesepahaman.ada;
    const notaNomorInternal = data.notaKesepahaman.nomorInternal;
    const notaNomorMitra = data.notaKesepahaman.nomorMitra;
    const notaTanggal = data.notaKesepahaman.tanggal;

    // Pihak Kesatu
    const pihakKesatu = data.pihakKesatu;
    const namaKesatu = pihakKesatu.nama;
    const institusiKesatu = pihakKesatu.institusi;

    // Pihak Kedua
    const pihakKedua = data.pihakKedua;
    const namaKedua = pihakKedua.nama;
    const institusiKedua = pihakKedua.institusi;
    const fileLogo = pihakKedua.fileLogo;

    // Isi Perjanjian
    const isi = data.isiPerjanjian;
    const tujuan = isi.tujuan;
    const ruangLingkup = isi.ruangLingkup;
    const jangkaWaktu = isi.jangkaWaktu;

    // Status
    const statusAktif = data.status.aktif;
    const dibatalkan = data.status.dibatalkan;

    // Catatan & audit
    const catatan = data.catatan;
    const dibuatOleh = data.dibuatOleh;

    
}