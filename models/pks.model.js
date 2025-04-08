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
      nomorInternal: {
        type: String,
        trim: true,
      },
      nomorMitra: {
        type: String,
        trim: true,
      },
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
      alamat: {
        type: String,
        trim: true,
      },
      jabatan: {
        type: String,
        trim: true,
      },
      kontakNama: {
        type: String,
        trim: true,
      },
      kontakEmail: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
      },
      kontakTelp: {
        type: String,
        trim: true,
      },
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
      alamat: {
        type: String,
        trim: true,
      },
      jabatan: {
        type: String,
        trim: true,
      },
      kontakNama: {
        type: String,
        trim: true,
      },
      kontakEmail: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
      },
      kontakTelp: {
        type: String,
        trim: true,
      },
      fileLogo: {
        nama: String,
        tipe: String,
        path: String,
      },
    },

    isiPerjanjian: {
      tujuan: {
        type: String,
        trim: true,
      },
      ruangLingkup: [
        {
          type: String,
          trim: true,
        },
      ],
      programStudi: [
        {
          type: String,
          trim: true,
        },
      ],
      kewajibanPihakKesatu: [
        {
          type: String,
          trim: true,
        },
      ],
      kewajibanPihakKedua: [
        {
          type: String,
          trim: true,
        },
      ],
      hakPihakKesatu: [
        {
          type: String,
          trim: true,
        },
      ],
      hakPihakKedua: [
        {
          type: String,
          trim: true,
        },
      ],
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
        keterangan: {
          type: String,
          trim: true,
        },
      },
    },

    status: {
      aktif: {
        type: Boolean,
        default: false,
      },
      dibatalkan: {
        type: Boolean,
        default: false,
      },
      tanggalPembatalan: Date,
      alasanPembatalan: {
        type: String,
        trim: true,
      },
    },

    catatan: {
      type: String,
      trim: true,
    },

    dibuatOleh: {
      type: String,
      trim: true,
    },
    diperbaraiOleh: {
      type: String,
      trim: true,
    },
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
