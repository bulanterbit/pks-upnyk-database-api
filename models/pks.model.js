import mongoose from "mongoose";

const pksSchema = new mongoose.Schema(
  {
    dokumen: {
      nomorInternal: {
        type: String,
        trim: true,
      },
      nomorMitra: {
        type: String,
        trim: true,
      },
      judul: {
        type: String,
        required: [true, "Judul perjanjian is required"],
        trim: true,
      },
      tanggalTtd: {
        type: Date,
      },
      tempatTtd: {
        type: String,
        trim: true,
      },
      fileUpload: {
        nama: String,
        tipe: String,
        path: String,
      },
    },

    notaKesepahaman: {
      ada: {
        type: Boolean,
        default: false,
      },
      nomorInternal: String,
      nomorMitra: String,
      tanggal: Date,
    },

    pihakKesatu: {
      nama: {
        type: String,
        required: [true, "Nama pihak kesatu is required"],
        trim: true,
      },
      institusi: {
        type: String,
        required: [true, "Institusi pihak kesatu is required"],
        trim: true,
      },
      alamat: String,
      jabatan: String,
      kontakNama: String,
      kontakEmail: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
      },
      kontakTelp: String,
    },

    pihakKedua: {
      nama: {
        type: String,
        required: [true, "Nama pihak kedua is required"],
        trim: true,
      },
      institusi: {
        type: String,
        required: [true, "Institusi pihak kedua is required"],
        trim: true,
      },
      alamat: String,
      jabatan: String,
      kontakNama: String,
      kontakEmail: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
      },
      kontakTelp: String,
      fileLogo: {
        nama: String,
        tipe: String,
        path: String,
      },
    },

    isiPerjanjian: {
      tujuan: String,
      ruangLingkup: [String],
      programStudi: [String],
      kewajibanPihakKesatu: [String],
      kewajibanPihakKedua: [String],
      hakPihakKesatu: [String],
      hakPihakKedua: [String],
      jangkaWaktu: {
        tahun: Number,
        tanggalMulai: Date,
        tanggalAkhir: Date,
      },
      hakKekayaanIntelektual: {
        ada: {
          type: Boolean,
          default: false,
        },
        keterangan: String,
      },
    },

    status: {
      aktif: {
        type: Boolean,
        default: true,
      },
      dibatalkan: {
        type: Boolean,
        default: false,
      },
      tanggalPembatalan: Date,
      alasanPembatalan: String,
    },

    catatan: String,

    dibuatOleh: String,
    diperbaraiOleh: String,
  },
  {
    timestamps: {
      createdAt: "dibuatPada",
      updatedAt: "diperbaraiPada",
    },
  }
);

const PKS = mongoose.model("PKS", pksSchema, "perjanjian-kerja-sama");

export default PKS;
