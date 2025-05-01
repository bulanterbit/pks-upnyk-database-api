import mongoose from "mongoose";
import generateDocumentNumber from "../middleware/numbering.middleware.js";

// variabel untuk menjaga format email agar benar
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// skema struktur database
const pksSchema = new mongoose.Schema({
  content: {
    nomor: {
      type: String,
      // required: [true, "Nomor is required"],
      unique: true,
      imutable: true,
    },
    judul: {
      type: String,
      required: [true, "Judul perjanjian is required"],
      trim: true,
      set: (value) => value.toUpperCase(),
    },
    tanggal: {
      type: Date,
      required: [true, "Tanggal is required"],
    },
    // Batas kadaluarsa (1 tahun setelah tanggal dokumen)
    tanggalKadaluarsa: {
      type: Date,
    },
  },

  pihakKedua: {
    instansi: {
      type: String,
      required: [true, "Instansi is required"],
      trim: true,
    },
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
      default: Date.now,
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
    // Batas waktu reminder (4 minggu setelah upload)
    reminderDate: {
      type: Date,
    },
    notificationsSent: {
      type: Number,
      default: 0, // Jumlah notifikasi yang sudah dikirim
    },
    lastNotificationDate: {
      type: Date, // Tanggal terakhir notifikasi dikirim
    },
  },

  fileUpload: {
    // untuk menyimpan path scan pdf PKS dan logo
    docName: {
      type: String,
      trim: true,
      default: "",
    },
    docPath: {
      type: String,
      trim: true,
      default: "",
    },
    logoName: {
      type: String,
      trim: true,
      default: "",
    },
    logoPath: {
      type: String,
      trim: true,
      default: "",
    },
  },
});

// Calculate reminder and expiration dates before saving
pksSchema.pre("save", function (next) {
  // Set upload date if not already set
  if (!this.properties.uploadDate) {
    this.properties.uploadDate = new Date();
  }

  // Calculate reminder date (4 weeks after upload)
  const reminderDate = new Date(this.properties.uploadDate);
  reminderDate.setDate(reminderDate.getDate() + 28); // 4 weeks = 28 days
  this.properties.reminderDate = reminderDate;

  // Calculate expiration date (1 year after document date)
  if (this.content.tanggal) {
    const expirationDate = new Date(this.content.tanggal);
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    this.content.tanggalKadaluarsa = expirationDate;
  }

  next();
});

pksSchema.pre("save", function (next) {
  // Check if docName or docPath is empty/undefined
  if (!this.fileUpload.docName || !this.fileUpload.docPath) {
    // Set status to "menunggu dokumen"
    this.properties.status = "menunggu dokumen";
  }
  next();
});

// mengambil nomor dokumen
pksSchema.pre("save", function (next) {
  if (this.isNew) {
    return generateDocumentNumber(this, next);
  }
  next();
});

const PKS = mongoose.model("PKS", pksSchema, "perjanjian-kerja-sama");

// export modelnya
export default PKS;
