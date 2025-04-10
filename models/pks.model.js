import mongoose from "mongoose";
import { generateDocumentNumber } from "../middleware/documentNumber.middleware";

// variabel untuk menjaga format email agar benar
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// skema struktur database
const pksSchema = new mongoose.Schema({
  content: {
    nomor: {
      type: String,
      required: [true, "Nomor is required"],
      unique: true,
    },
    judul: {
      type: String,
      required: [true, "Judul perjanjian is required"],
      trim: true,
    },
    tanggal: {
      type: Date,
      required: [true, "Tanggal is required"],
    },
  },

  pihakKedua: {
    nama: {
      type: String,
      required: [true, "Nama is required"],
      trim: true,
    },
    jabatan: {
      type: String,
      required: [true, "Jabatan is required"],
      trim: true,
    },
    alamat: {
      type: String,
      required: [true, "Alamat is required"],
      trim: true,
    },
    nomor: {
      // tidak wajib ada
      type: String,
      trim: true,
    },
  },

  properties: {
    uploadDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: [
        "draft",
        "menunggu dokumen",
        "menunggu review",
        "approved",
        "rejected",
      ],
      default: "draft",
    },
    comment: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      match: [emailRegex, "Format email tidak valid"],
      validate: {
        validator: function (v) {
          return emailRegex.test(v);
        },
        message: (props) => `${props.value} bukan format email yang valid!`,
      },
    },
  },

  fileUpload: {
    // untuk menyimpan path scan pdf PKS dan logo
    docName: {
      type: String,
      trim: true,
    },
    docPath: {
      type: String,
      trim: true,
    },
    logoName: {
      type: String,
      trim: true,
    },
    logoPath: {
      type: String,
      trim: true,
    },
  },
});

// mengambil nomor dokumen
pksSchema.pre("save", function (next) {
  if (this.isNew) {
    return generateDocumentNumber(this, next);
  }
  next();
});

const PKS = mongoose.model("PKS", pksSchema, "perjanjian-kerja-sama");

export default PKS;
