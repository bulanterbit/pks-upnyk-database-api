import PKS from "../models/pks.model.js";
import fs from "fs";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  TableBorders,
  WidthType,
} from "docx";

import terbilang from "terbilang";

export const generateDocument = async (req, res, next) => {
  const data = await PKS.findById(req.params.id);

  try {
    const data = await PKS.findById(req.params.id);

    if (!data) {
      const error = new Error("PKS not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }

  // Content
  const content = data.content;
  const tanggal = content.tanggal;

  // Pihak Kedua
  const pihakKedua = data.pihakKedua;

  const capitalizeEachWord = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const namaHari = capitalizeEachWord(
    tanggal.toLocaleDateString("id-ID", { weekday: "long" })
  );
  const namaBulan = capitalizeEachWord(
    tanggal.toLocaleDateString("id-ID", { month: "long" })
  );
  const tanggalHuruf = capitalizeEachWord(terbilang(tanggal.getDate()));
  const tahunHuruf = capitalizeEachWord(terbilang(tanggal.getFullYear()));
  // Format (08-04-2025)
  const formatAngka = `${tanggal.getDate().toString().padStart(2, "0")}-${(
    tanggal.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${tanggal.getFullYear()}`;
  // Gabungkan kalimat lengkap
  const kalimatTanggal = `${namaHari}, tanggal ${tanggalHuruf} bulan ${namaBulan} tahun ${tahunHuruf} (${formatAngka})`;

  // Load gambar (logo kiri)
  //const logoLeft = fs.readFileSync("logo/upn.png");

  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: "Normal",
          name: "Normal",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,

          paragraph: {
            spacing: {
              before: 0,
              after: 0,
              line: 276, // 1.15 line spacing
              lineRule: "auto",
            },
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 4 * 567, // 2.5 cm → 1417.5 twips
              bottom: 3 * 567,
              left: 2.54 * 567, // 3 cm → 1701 twips
              right: 2.54 * 567,
            },
          },
        },
        children: [
          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({
                text: "PERJANJIAN KERJASAMA",
                bold: true,
                size: 24,
              }),
              new TextRun({ break: 1 }),
              new TextRun({ text: " ANTARA", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({
                text: `LEMBAGA PENELITIAN DAN PENGABDIAN KEPADA MASYARAKAT`,
                bold: true,
                size: 24,
              }),
              new TextRun({ break: 1 }),
              new TextRun({
                text: `UNIVERSITAS PEMBANGUNAN NASIONAL "VETERAN" YOGYAKARTA`,
                bold: true,
                size: 24,
              }),
              new TextRun({ break: 1 }),
              new TextRun({ text: `DAN`, bold: true, size: 24 }),
              new TextRun({ break: 1 }),
              new TextRun({
                text: `${pihakKedua.instansi}`,
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Table({
            columnWidths: [3500, 500, 6000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "Nomor", size: 24, bold: true }),
                        ],
                        alignment: AlignmentType.RIGHT,
                      }),
                    ],
                    width: { size: 35, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: ":", size: 24, bold: true }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: `${content.nomor}`,
                            size: 24,
                            bold: true,
                          }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    width: { size: 60, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "Nomor", size: 24, bold: true }),
                        ],
                        alignment: AlignmentType.RIGHT,
                      }),
                    ],
                    width: { size: 35, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: ":", size: 24, bold: true }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: `${pihakKedua.nomor}`,
                            size: 24,
                            bold: true,
                          }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    width: { size: 60, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
            borders: TableBorders.NONE,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Paragraph({
            style: "Normal",
            children: [new TextRun({ text: "TENTANG", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({ text: `${content.judul}`, bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          // Bagian isi perjanjian
          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({
                text: `${kalimatTanggal}, yang bertanda tangan di bawah ini : `,
                bold: false,
                size: 24,
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          // PIHAK KESATU
          new Table({
            columnWidths: [500, 3000, 500, 6000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "I.", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "Nama", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: ":", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: `Dr. Dyah Sugandini, SE, M.Si`,
                            bold: true,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 60, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [new TextRun({ text: "", bold: false })],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "Jabatan",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: ":", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: `Kepala Lembaga Penelitian dan Pengabdian Kepada Masyarakat Universitas Pembangunan Nasional “Veteran” Yogyakarta`,
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 60, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [new TextRun({ text: "", bold: false })],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "SK. Jabatan",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: ":", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: `Surat Keputusan Rektor Universitas pembangunan Nasional “Veteran” Yogyakarta Nomor 1569/UN62/KP/2024 tanggal 20 Maret 2024 dalam jabatan tersebut bertindak untuk dan atas nama Universitas Pembangunan Nasional “Veteran” Yogyakarta`,
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 60, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [new TextRun({ text: " ", bold: false })],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "Alamat Kantor",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: ":", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: `Jl. Pajajaran 104 (Lingkar Utara) Condongcatur, Depok, Sleman, Yogyakarta 55283`,
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 60, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
            borders: TableBorders.NONE,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({
                text: "Selanjutnya yang disebut sebagai",
                bold: false,
                size: 24,
              }),
              new TextRun({ text: " PIHAK PERTAMA.", bold: true, size: 24 }),
            ],
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          // PIHAK KESATU
          new Table({
            columnWidths: [500, 3000, 500, 6000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "II.", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "Nama", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: ":", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: `${pihakKedua.nama}`,
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 60, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "Jabatan",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: ":", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: `${pihakKedua.jabatan}`,
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 60, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "Alamat Kantor",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.LEFT,
                      }),
                    ],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: ":", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: `${pihakKedua.alamat}`,
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 60, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
            borders: TableBorders.NONE,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({
                text: "Selanjutnya yang disebut sebagai",
                bold: false,
                size: 24,
              }),
              new TextRun({ text: " PIHAK KEDUA.", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({
                text: "PIHAK PERTAMA dan PIHAK KEDUA secara sendiri-sendiri disebut PIHAK dan secara bersama-sama disebut PARA PIHAK. PARA PIHAK menyatakan sepakat dan setuju mengadakan kerjasama untuk saling menunjang pelaksanaan tugas masing-masing dengan ketentuan sebagai berikut : ",
                bold: false,
                size: 24,
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 1                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({ text: "Pasal 1", bold: true, size: 24 }),
              new TextRun({ break: 1 }), // ← Enter / baris baru
              new TextRun({ text: "TUJUAN KERJASAMA", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({
                text: `Dengan tetap mengindahkan ketentuan dan peraturan perundang-undangan yang berlaku bagi PARA PIHAK, Perjanjian Kerjasama ini dibuat dalam rangka menunjang Pelaksanaan Tri Darma Perguruan Tinggi serta membina hubungan kelembagaan antara PARA PIHAK untuk bekerjasama dan saling membantu dalam pelaksanaan Pengabdian Masyarakat dengan judul ${content.judul}. yang selanjutnya akan disebut program kerjasama.`,
                bold: false,
                size: 24,
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 2                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({ text: "Pasal 2", bold: true, size: 24 }),
              new TextRun({ break: 1 }), // ← Enter / baris baru
              new TextRun({
                text: "RUANG LINGKUP KERJASAMA",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Table({
            columnWidths: [500, 500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "Ruang lingkup perjanjian Kerjasama ini meliputi :",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    columnSpan: 3,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "a.", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "Menunjang pelaksanaan Tri Darma Perguruan Tinggi",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 90, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "b.", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: `Kegiatan pengabdian dalam rangka ${content.judul}.`,
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 90, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "c.", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "Kegiatan- kegiatan lain yang dianggap perlu.",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 90, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
            borders: TableBorders.NONE,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 3                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({ text: "Pasal 3", bold: true, size: 24 }),
              new TextRun({ break: 1 }), // ← Enter / baris baru
              new TextRun({ text: "PELAKSANAAN", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({
                text: `Pelaksanaan kerjasama secara rinci dalam bidang-bidang tertentu akan disusun dan dituangkan dalam naskah Perjanjian kerjasama yang disetujui oleh PARA PIHAK dan merupakan bagian yang tidak terpisahkan dari naskah perjanjian kerjasama ini.`,
                bold: false,
                size: 24,
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 4                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({ text: "Pasal 4", bold: true, size: 24 }),
              new TextRun({ break: 1 }), // ← Enter / baris baru
              new TextRun({ text: "PELAKSANAAN", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Table({
            columnWidths: [500, 9500], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "1.", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "Kegiatan-kegiatan yang akan dilaksanakan berdasarkan Perjanjian Kerjasama ini akan dibiayai dari dana yang relevan dari PARA PIHAK.",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 95, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "2.", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "Pembiayaan untuk kegiatan yang disepakati tersebut akan diatur dalam Perjanjian Kerjasama tersendiri.",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 95, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
            borders: TableBorders.NONE,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 5                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({ text: "Pasal 5", bold: true, size: 24 }),
              new TextRun({ break: 1 }), // ← Enter / baris baru
              new TextRun({ text: "HAK DAN KEWAJIBAN", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({
                text: `Hak dan kewajiban PARA PIHAK akan dimusyawarahkan bersama sesuai dengan bentuk dan jenis kegiatan yang dilaksanakan.`,
                bold: false,
                size: 24,
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 6                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({ text: "Pasal 6", bold: true, size: 24 }),
              new TextRun({ break: 1 }), // ← Enter / baris baru
              new TextRun({ text: "JANGKA WAKTU", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({
                text: `Perjanjian Kerjasama ini berlaku untuk jangka waktu 1 (satu) bulan terhitung sejak tanggal penandatanganan dan apabila masa berlakunya sudah berakhir dapat diperpanjang atau diakhiri atas persetujuan PARA PIHAK paling lambat 30 (tiga puluh) hari kalender sebelum masa berlaku Perjanjian Kerjasama ini berakhir.`,
                bold: false,
                size: 24,
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 7                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({ text: "Pasal 7", bold: true, size: 24 }),
              new TextRun({ break: 1 }), // ← Enter / baris baru
              new TextRun({
                text: "PENYELESAIAN PERSELISIHAN",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({
                text: `Perselisihan timbul sebagai akibat dari pelaksanaan kerjasama ini akan diselesaikan oleh PARA PIHAK secara musyawarah dan mufakat.`,
                bold: false,
                size: 24,
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 8                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({
            style: "Normal",
            children: [
              new TextRun({ text: "Pasal 8", bold: true, size: 24 }),
              new TextRun({ break: 1 }), // ← Enter / baris baru
              new TextRun({ text: "PENUTUPAN", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan

          new Table({
            columnWidths: [500, 9500], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "1.", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "Hal-hal yang bersifat melengkapi dan belum diatur dalam Perjanjian Kerjasama ini akan ditentukan kemudian atas dasar persetujuan PARA PIHAK dan akan dibuat “addendum” tersendiri yang merupakan bagian yang tidak terpisahkan dari Perjanjian Kerjasama ini.",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 95, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({ text: "2.", bold: false, size: 24 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "Perjanjian Kerjasama ini dibuat dalam rangkap 2 (dua) asli, masing-masing bermaterai cukup dan keduanya mempunyai kekuatan hukum yang sama, ditanda tangani dan dibubuhi cap lembaga masing-masing serta diberikan kepada PARA PIHAK pada saat perjanjian ditanda tangani.",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 95, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
            borders: TableBorders.NONE,
          }),

          new Paragraph({ text: "" }), // Spasi tambahan
          new Paragraph({ text: "" }), // Spasi tambahan

          new Table({
            columnWidths: [5000, 5000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "PIHAK PERTAMA,",
                            bold: false,
                            size: 24,
                          }),
                          new TextRun({ break: 1 }),
                          new TextRun({ break: 1 }),
                          new TextRun({ break: 1 }),
                          new TextRun({ break: 1 }),
                          new TextRun({ break: 1 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "PIHAK KEDUA",
                            bold: false,
                            size: 24,
                          }),
                          new TextRun({ break: 1 }),
                          new TextRun({ break: 1 }),
                          new TextRun({ break: 1 }),
                          new TextRun({ break: 1 }),
                          new TextRun({ break: 1 }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "Dr. Dyah Sugandini, SE, M.Si",
                            underline: true,
                            bold: true,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: `${pihakKedua.nama}`,
                            underline: true,
                            bold: true,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: "NIP 19710617 202121 2 001",
                            bold: true,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        style: "Normal",
                        children: [
                          new TextRun({
                            text: `${pihakKedua.jabatan}`,
                            bold: true,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
            borders: TableBorders.NONE,
          }),

          // bagian paling bawah
        ],
      },
    ],
  });

  Packer.toBuffer(doc)
  .then((buffer) => {
    const id = req.params.id;
    const filePath = `/tmp/pks-${id}.docx`;

    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error("Failed to write file:", err);
        return res.status(500).send("Failed to generate document");
      }

      res.download(filePath, (err) => {
        if (err) {
          console.error("Failed to download file:", err);
          return res.status(500).send("Failed to download document");
        }
        fs.unlink(filePath, (err) => {
          if (err) console.error("Failed to delete file:", err);
        });
      });
    });
  })
  .catch((err) => {
    console.error("Document generation error:", err);
    res.status(500).send("Error generating document");
  });
};
