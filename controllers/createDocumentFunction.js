import {
  Document,
  Packer,
  Paragraph,
  ImageRun,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  TableBorders,
  WidthType,
  VerticalAlign,
  BorderStyle,
  MergeType,
  Footer,
  PageNumber,
} from "docx";

export const createDocument = async (data) => {
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
  const alamatKesatu = pihakKesatu.alamat;
  const jabatanKesatu = pihakKesatu.jabatan;
  const kontakNamaKesatu = pihakKesatu.kontakNama;
  const kontakEmailKesatu = pihakKesatu.kontakEmail;
  const kontakTelpKesatu = pihakKesatu.kontakTelp;

  // Pihak Kedua
  const pihakKedua = data.pihakKedua;
  const namaKedua = pihakKedua.nama;
  const institusiKedua = pihakKedua.institusi;
  const alamatKedua = pihakKedua.alamat;
  const jabatanKedua = pihakKedua.jabatan;
  const kontakNamaKedua = pihakKedua.kontakNama;
  const kontakEmailKedua = pihakKedua.kontakEmail;
  const kontakTelpKedua = pihakKedua.kontakTelp;
  const fileLogo = pihakKedua.fileLogo;

  // Isi Perjanjian
  const isi = data.isiPerjanjian;
  const tujuan = isi.tujuan;
  const ruangLingkup = isi.ruangLingkup;
  const programStudi = isi.programStudi;
  const kewajibanPihakKesatu = isi.kewajibanPihakKesatu;
  const kewajibanPihakKedua = isi.kewajibanPihakKedua;
  const hakPihakKesatu = isi.hakPihakKesatu;
  const hakPihakKedua = isi.hakPihakKedua;
  const jangkaWaktu = isi.jangkaWaktu;
  const hkiAda = isi.hakKekayaanIntelektual.ada;
  const hkiKeterangan = isi.hakKekayaanIntelektual.keterangan;

  // Status
  const statusAktif = data.status.aktif;
  const dibatalkan = data.status.dibatalkan;
  const tanggalPembatalan = data.status.tanggalPembatalan;
  const alasanPembatalan = data.status.alasanPembatalan;

  // Catatan & audit
  const catatan = data.catatan;
  const dibuatOleh = data.dibuatOleh;
  const diperbaraiOleh = data.diperbaraiOleh;
  const dibuatPada = data.dibuatPada;
  const diperbaraiPada = data.diperbaraiPada;

  // Tambahkan proses generate dokumen jika ada
  const doc = new Document({
    sections: [
      {
        properties: {},

        // footer,  dan nomor halaman
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT, // Posisi di kanan bawah
                children: [
                  new TextRun(
                    "Paraf : PIHAK KESATU : .........; PIHAK KEDUA : .........  "
                  ),
                  new TextRun({
                    children: [PageNumber.CURRENT], // Nomor halaman otomatis
                  }),
                ],
              }),
            ],
          }),
        },

        children: [
          // TABEL HEADER (Logo & Teks Judul)

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  // Logo Kiri
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new ImageRun({
                            data: logoLeft,
                            transformation: { width: 80, height: 80 },
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),

                  // Judul Dokumen
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "PERJANJIAN KERJA SAMA",
                            bold: true,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "(MEMORANDUM OF AGREEMENT)",
                            bold: true,
                            size: 24, // Jika ingin 12, ubah ke 12
                          }),
                        ],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),

                  // Logo Mitra
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun("Logo Mitra")],
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 1 },
                      bottom: { style: BorderStyle.SINGLE, size: 1 },
                      left: { style: BorderStyle.SINGLE, size: 1 },
                      right: { style: BorderStyle.SINGLE, size: 1 },
                    },
                  }),
                ],
              }),
            ],
            borders: TableBorders.NONE,
          }),

          new Paragraph({
            children: [new TextRun({ text: "ANTARA", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: ".................", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({
            children: [new TextRun({ text: "DAN", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "NAMA MITRA", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Paragraph({
            children: [new TextRun({ text: "TENTANG", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "....................................................",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          // Nomor Perjanjian
          new Paragraph({
            children: [
              new TextRun({
                text: "Nomor : ...............................................",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Nomor : ...... /UN62/............ /20xx",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          // Garis hitam pemisah
          new Paragraph({
            children: [
              new TextRun({
                text: "───────────────────────────────────",
                bold: true,
                break: 1,
                size: 36,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          // Bagian isi perjanjian
          new Paragraph({
            children: [
              new TextRun({
                text: "Pada hari ini .........,  tanggal ................ bulan ......... tahun dua ribu dua ….….. (....-...-20xx, bertempat di ......, yang bertanda tangan di bawah ini ",
                bold: false,
                size: 24,
              }),
              new TextRun({ text: "", break: 1 }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),

          new Table({
            columnWidths: [3500, 500, 7000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              // Pihak Kesatu
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "(Nama pihak kesatu)",
                            bold: false,
                            size: 24,
                          }),
                        ],
                      }),
                    ],
                    width: { size: 45, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph(":")],
                    width: {
                      size: 5,
                      type: WidthType.PERCENTAGE,
                      alignment: AlignmentType.CENTER,
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "................ ini sebagai apa...........………, dalam hal ini bertindak untuk dan atas nama ................................., yang berkedudukan di ...................................................................., dan selanjutnya disebut sebagai",
                            size: 24,
                          }),
                          new TextRun({
                            text: " PIHAK KESATU.",
                            bold: true,
                            size: 24,
                          }),
                          new TextRun({ break: 1 }),
                          new TextRun({ break: 1 }), // Tambahkan spasi sebelum teks bold
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              // Pihak Kedua (Mitra)
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "(Nama Mitra)",
                            bold: false,
                            size: 24,
                          }),
                        ],
                      }),
                    ],
                    width: { size: 45, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph(":")],
                    width: {
                      size: 5,
                      type: WidthType.PERCENTAGE,
                      alignment: AlignmentType.CENTER,
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "......................, dalam ",
                            size: 24,
                          }),
                          new TextRun({ text: "hal", size: 24 }),
                          new TextRun({ text: " ini ", size: 24 }),
                          new TextRun({ text: "bertindak untuk", size: 24 }),
                          new TextRun({
                            text: " dan atas nama ...................................., yang ",
                            size: 24,
                          }),
                          new TextRun({ text: "berkedudukan" }),
                          new TextRun({
                            text: " di ................................................,",
                            size: 24,
                          }),
                          new TextRun({ text: " dan ", size: 24 }),
                          new TextRun({
                            text: "selanjutnya disebut",
                            size: 24,
                          }),
                          new TextRun({ text: " sebagai ", size: 24 }),
                          new TextRun({
                            text: "PIHAK KEDUA.",
                            bold: true,
                            size: 24,
                          }),
                          new TextRun({ break: 1 }),
                          new TextRun({ break: 1 }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
            borders: TableBorders.NONE,
          }),

          // Bagian isi perjanjian
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan
          new Paragraph({
            children: [
              new TextRun({ text: "PIHAK KESATU", bold: true, size: 24 }),
              new TextRun({ text: " dan ", size: 24 }),
              new TextRun({ text: "PIHAK KEDUA", bold: true, size: 24 }),
              new TextRun({
                text: " selanjutnya secara sendiri-sendiri disebut",
                size: 24,
              }),
              new TextRun({ text: ' "PIHAK"', bold: true, size: 24 }),
              new TextRun({
                text: " dan secara bersama - sama disebut",
                size: 24,
              }),
              new TextRun({ text: ' "PARA PIHAK."', bold: true, size: 24 }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),

          // ********************************************************************************************************************************************
          // *                                                       HALAMAN KEDUA                                                                      *
          // ********************************************************************************************************************************************

          new Paragraph({ text: "", pageBreakBefore: true }),

          new Table({
            columnWidths: [500, 500, 9000],
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              // Baris pertama (pasti ada)
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "1.", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Bahwa", size: 24 }),
                          new TextRun({
                            text: " PARA PIHAK",
                            bold: true,
                            size: 24,
                          }),
                          new TextRun({
                            text: " bermaksud untuk memanfaatkan ilmu pengetahuan dan teknologi dalam penyelenggaraan Tridharma Perguruan Tinggi;",
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

              // Tambahkan baris ke-2 hanya jika isMoU = true
              ...(isMoU
                ? [
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: " ",
                                  bold: false,
                                  size: 24,
                                }),
                              ],
                            }),
                          ],
                          width: { size: 5, type: WidthType.PERCENTAGE },
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: "2. ",
                                  bold: false,
                                  size: 24,
                                }),
                              ],
                            }),
                          ],
                          width: { size: 5, type: WidthType.PERCENTAGE },
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: "Bahwa Perjanjian Kerja Sama ini merupakan tindak lanjut Nota Kesepahaman Bersama antara (nama mitra) dan Universitas Pembangunan Nasional Veteran Yogyakarta",
                                  size: 24,
                                }),
                                new TextRun({
                                  text: " Nomor : .........................",
                                  size: 24,
                                }),
                                new TextRun({ text: " dan", size: 24 }),
                                new TextRun({
                                  text: " Nomor : .........................",
                                  size: 24,
                                }),
                                new TextRun({
                                  text: " tentang ........................",
                                  size: 24,
                                }),
                                new TextRun({
                                  text: " tanggal .........................",
                                  size: 24,
                                }),
                                new TextRun({
                                  text: " (jika ada Nota Kesepahaman Bersama)",
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
                  ]
                : []),
            ],
            borders: TableBorders.NONE,
          }),

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Paragraph({
            children: [
              new TextRun({ text: "PARA PIHAK", bold: true, size: 24 }),
              new TextRun({
                text: " PIHAK dengan ini sepakat secara bersama-sama dengan kedudukan dan kewenangan masing-masing untuk mengadakan Perjanjian Kerja Sama dalam ..................................................................... yang selanjutnya disebut",
                size: 24,
              }),
              new TextRun({
                text: " “Perjanjian Kerja Sama”",
                bold: true,
                size: 24,
              }),
              new TextRun({
                text: " dengan berpedoman kepada ketentuan-ketentuan yang diuraikan sebagai berikut:",
                size: 24,
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),

          // ********************************************************************************************************************************************
          // *                                                           PASAL 1                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan
          new Paragraph({
            children: [new TextRun({ text: "Pasal 1", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [new TextRun({ text: "TUJUAN", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan
          new Paragraph({
            children: [
              new TextRun({
                text: "Tujuan dilakukan perjanjian ini adalah sebagai landasan bagi PARA PIHAK dalam melakukan kegiatan dukungan PIHAK KEDUA dalam rangka penyelenggaraan Tri Dharma Perguruan Tinggi melalui kegiatan ..................",
                size: 24,
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),

          // ********************************************************************************************************************************************
          // *                                                           PASAL 2                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan
          new Paragraph({
            children: [new TextRun({ text: "Pasal 2", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "RUANG LINGKUP", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan
          new Paragraph({
            children: [
              new TextRun({
                text: "Ruang lingkup Perjanjian ini meliputi:",
                size: 24,
              }),
            ],
          }),
          new Table({
            columnWidths: [500, 500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "1.", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "2. ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "3.", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;dan",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "4.", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................",
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

          // ********************************************************************************************************************************************
          // *                                                           PASAL 3                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan
          new Paragraph({
            children: [new TextRun({ text: "Pasal 3", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "PELAKSANAAN KERJASAMA",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(1)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Dalam pelaksanaan Perjanjian Kerja Sama ini PIHAK PERTAMA melibatkan program studi:",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    columnSpan: 2,
                    width: { size: 95, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "a. ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "b. ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "c. ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "d. ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................",
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

          // ********************************************************************************************************************************************
          // *                                                           PASAL 4                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({ text: "", pageBreakBefore: true }),

          new Paragraph({
            children: [new TextRun({ text: "Pasal 4", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "PEMBIAYAAN", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(1)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Biaya untuk pelaksanaan kerja sama akan diatur dalam Rancangan Pelaksanaan Kegiatan Kerjasama (IA)  yang menjadi bagian tidak terpisahkan dari Perjanjian Kerja sama ini;",
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
                        children: [
                          new TextRun({ text: "(2)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Segala biaya yang timbul sebagai akibat dari pelaksanaan Perjanjian ini menjadi beban PARA PIHAK sesuai dengan proporsi tanggung jawab masing-masing;",
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
                        children: [
                          new TextRun({ text: "(3)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Sumber biaya selain sebagaimana dimaksud pada ayat (2), dapat berasal dari pihak lain yang sifatnya sah dan tidak mengikat sesuai peraturan perundang-undangan.",
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

          // ********************************************************************************************************************************************
          // *                                                           PASAL 5                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan
          new Paragraph({
            children: [new TextRun({ text: "Pasal 5", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "KEWAJIBAN PARA PIHAK",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(1)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Kewajiban ",
                            bold: false,
                            size: 24,
                          }),
                          new TextRun({
                            text: "PIHAK KESATU: ",
                            bold: true,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    columnSpan: 2,
                    width: { size: 95, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(a)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(b)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(c)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;dan",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(d)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................",
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

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(1)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Kewajiban ",
                            bold: false,
                            size: 24,
                          }),
                          new TextRun({
                            text: "PIHAK  KEDUA: ",
                            bold: true,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    columnSpan: 2,
                    width: { size: 95, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(a)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(b)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(c)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;dan",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(d)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................",
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

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 6                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({
            children: [new TextRun({ text: "Pasal 6", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "HAK PARA PIHAK", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(1)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Hak ", bold: false, size: 24 }),
                          new TextRun({
                            text: "PIHAK KESATU: ",
                            bold: true,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    columnSpan: 2,
                    width: { size: 95, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(a)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(b)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(c)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;dan",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(d)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................",
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

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(1)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Hak ", bold: false, size: 24 }),
                          new TextRun({
                            text: "PIHAK  KEDUA: ",
                            bold: true,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    columnSpan: 2,
                    width: { size: 95, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(a)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(b)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(c)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;dan",
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
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(d)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................",
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

          //new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 7                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({ text: "", pageBreakBefore: true }),

          new Paragraph({
            children: [new TextRun({ text: "Pasal 7", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "JANGKA WAKTU", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(1)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Perjanjian ini berlaku untuk jangka waktu ... (....) tahun, terhitung sejak tanggal ditandatanganinya Perjanjian ini dan dapat diperpanjang berdasarkan kesepakatan PARA PIHAK;",
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

          new Table({
            columnWidths: [500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(2)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Perjanjian ini dapat diakhiri sebelum masa berlakunya berakhir dengan ketentuan pihak yang ingin mengakhiri Perjanjian ini harus memberitahukan secara tertulis kepada pihak lainnya paling lambat 3 (tiga) bulan sebelumnya.",
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

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 8                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({
            children: [new TextRun({ text: "Pasal 8", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "JHAK KEKAYAAN INTELEKTUAL",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "(jika ada)", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(1)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Setiap HKI yang dibawa oleh para pihak (HKI bawaan) dalam melaksanakan kegiatan menurut perjanjian ini tetap milik pihak yang bersangkutan.  Namun demikian, pihak tersebut harus memastikan bahwa HKI bawaan dimaksud tidak melanggar HKI orang lain.  Berkenaan dengan itu, pihak yang membawa HKI bawaan harus bertanggung jawab terhadap setiap klaim dari pihak ketiga menyangkut pelaksanaan HKI bawaan dimaksud.",
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
                        children: [
                          new TextRun({ text: "(2)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Setiap hasil penelitian, baik berupa HKI, data dan informasi yang dihasilkan dari kegiatan menurut perjanjian ini dimiliki secara bersama-sama oleh kedua belah pihak.  Setiap pemanfaatan Hak Kekayaan Intelektual tersebut, baik itu untuk kepentingan komersial maupun nonkomersial, akan diatur secara tersendiri.",
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
                        children: [
                          new TextRun({ text: "(3)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Setiap publikasi data dan informasi hasil kegiatan menurut perjanjian ini harus dilaksanakan bersama-sama atau dengan mekanisme lain yang diatur tersendiri yang merupakan bagian tidak terpisahkan dari perjanjian ini.  Publikasi yang dilakukan oleh salah satu pihak wajib mencantumkan pihak lainnya sebagai ungkapan penghargaan.",
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
                        children: [
                          new TextRun({ text: "(4)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Jika salah satu pihak bermaksud mengungkapkan data dan/atau informasi rahasia yang dihasilkan dari kegiatan menurut perjanjian ini kepada pihak ketiga atau bermaksud melakukan kerjasama dengan pihak ketiga, maka pihak tersebut harus terlebih dahulu mendapatkan persetujuan pihak lainnya.",
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
                        children: [
                          new TextRun({ text: "(5)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Penghentian pelaksanaan kegiatan menurut perjanjian ini tidak serta merta menghentikan segala hak dan/atau kewajiban para pihak yang diatur dalam pasal ini.",
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

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 9                                                                        *
          // ********************************************************************************************************************************************

          new Paragraph({
            children: [new TextRun({ text: "Pasal 9", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "JHAK KEKAYAAN INTELEKTUAL",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "(jika ada)", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(1)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Masing-masing pihak dibebaskan dari tanggung jawab atas keterlambatan atau kegagalan dalam memenuhi kewajiban yang tercantum dalam Perjanjian ini, yang disebabkan atau diakibatkan oleh kejadian di luar kekuasaan masing-masing pihak yang digolongkan sebagai",
                            size: 24,
                          }),
                          new TextRun({
                            text: " Force Majeure.",
                            size: 24,
                            italics: true,
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
                        children: [
                          new TextRun({ text: "(2)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Peristiwa yang dapat digolongkan",
                            size: 24,
                          }),
                          new TextRun({
                            text: " Force Majeure",
                            size: 24,
                            italics: true,
                          }),
                          new TextRun({
                            text: " adalah: adanya bencana alam seperti gempa bumi, taufan, banjir atau hujan terus menerus, wabah penyakit, adanya perang, peledakan, sabotase, revolusi, pemberontakan, huru hara, adanya tindakan pemerintahan dalam bidang ekonomi dan moneter yang secara nyata berpengaruh terhadap pelaksanaan Perjanjian ini.",
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
                        children: [
                          new TextRun({ text: "(3)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Apabila terjadi", size: 24 }),
                          new TextRun({
                            text: " Force Majeure",
                            size: 24,
                            italics: true,
                          }),
                          new TextRun({
                            text: " maka pihak yang lebih dahulu mengetahui wajib memberitahukan kepada pihak lainnya selambat-lambatnya dalam waktu 14 (empat belas hari) setelah terjadinya",
                            size: 24,
                          }),
                          new TextRun({
                            text: " Force Majeure.",
                            size: 24,
                            italics: true,
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
                        children: [
                          new TextRun({ text: "(4)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Keadaan Kahar/", size: 24 }),
                          new TextRun({
                            text: "Force Majeure",
                            size: 24,
                            italics: true,
                          }),
                          new TextRun({
                            text: " sebagaimana dimaksud Ayat (2) perjanjian ini tidak menghapuskan atau mengakhiri perjanjian ini. Setelah keadaan Kahar/",
                            size: 24,
                          }),
                          new TextRun({
                            text: "Force Majeure",
                            size: 24,
                            italics: true,
                          }),
                          new TextRun({
                            text: " berakhir dan kondisinya  masih memungkinkan kegiatan dapat dilaksanakan oleh PIHAK PERTAMA maka PARA PIHAK akan melanjutkan pelaksanaan perjanjian ini sesuai dengan ketentuan-ketentuan yang diatur dalam perjanjian ini",
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

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 10                                                                       *
          // ********************************************************************************************************************************************

          new Paragraph({
            children: [new TextRun({ text: "Pasal 10", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "PENYELESAIAN PERSELISIHAN",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(1)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Apabila dalam pelaksanaan perjanjian ini diantara kedua belah pihak terdapat perselisihan atau ketidaksesuaian pendapat, akan diselesaikan dengan musyawarah untuk mencapai mufakat.",
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

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 11                                                                       *
          // ********************************************************************************************************************************************

          new Paragraph({
            children: [new TextRun({ text: "Pasal 11", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "PEMBATALAN PERJANJIAN",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(1)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Atas permohonan salah satu pihak sebagai pemohon",
                            size: 24,
                          }),
                          new TextRun({
                            text: " (PIHAK KESATU",
                            size: 24,
                            bold: true,
                          }),
                          new TextRun({ text: " atau", size: 24 }),
                          new TextRun({
                            text: " PIHAK KEDUA)",
                            size: 24,
                            bold: true,
                          }),
                          new TextRun({
                            text: " dan berdasarkan persetujuan kedua belah pihak,  perjanjian ini dapat dibatalkan sebelum berakhirnya jangka waktu perjanjian sebagaimana tersebut pada Pasal 7 perjanjian ini.",
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
                        children: [
                          new TextRun({ text: "(2)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Permohonan pembatalan perjanjian sebagaimana dimaksud pada Ayat (1) pasal ini harus disampaikan oleh pemohon kepada pihak lainnya secara tertulis disertai alasan-alasan yang mendasarinya paling lambat 30 (tiga puluh) hari sebelum tanggal pembatalan perjanjian.",
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

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 12                                                                       *
          // ********************************************************************************************************************************************

          new Paragraph({
            children: [new TextRun({ text: "Pasal 12", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "KORESPONDENSI", bold: true, size: 24 }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(1)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Koordinasi, komunikasi, dokumen, dan/atau pemberitahuan yang berhubungan dengan Perjanjian Kerjasama ini disampaikan secara langsung dan/atau melalui pos tercatat serta cara-cara lain yang memungkinkan.",
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
                        children: [
                          new TextRun({ text: "(2)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Alamat", size: 24 }),
                          new TextRun({
                            text: " PARA PIHAK",
                            size: 24,
                            bold: true,
                          }),
                          new TextRun({
                            text: " yang akan dipakai untuk komunikasi guna keperluan sebagaimana dimaksud pada ayat (1) adalah sebagai berikut:",
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

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 500, 500, 8500], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "PIHAK KESATU ",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    columnSpan: 3,
                    width: { size: 95, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "(NAMA PIHAK PERTAMA) ",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    columnSpan: 3,
                    width: { size: 95, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Alamat",
                            bold: false,
                            size: 24,
                          }),
                        ],
                      }),
                    ],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: ":", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 75, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Email", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: ":", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 75, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Telephone",
                            bold: false,
                            size: 24,
                          }),
                        ],
                      }),
                    ],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: ":", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 75, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
            borders: TableBorders.NONE,
          }),

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 500, 500, 8500], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "PIHAK KEDUA ",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    columnSpan: 3,
                    width: { size: 95, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "(NAMA PIHAK KEDUA) ",
                            bold: false,
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    columnSpan: 3,
                    width: { size: 95, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Alamat",
                            bold: false,
                            size: 24,
                          }),
                        ],
                      }),
                    ],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: ":", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 75, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Email", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: ":", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 75, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " ", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Telephone",
                            bold: false,
                            size: 24,
                          }),
                        ],
                      }),
                    ],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: ":", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: ".........................;",
                            size: 24,
                          }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: { size: 75, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
            ],
            borders: TableBorders.NONE,
          }),

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(3)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Bila terjadi perubahan terhadap alamat dari salah satu pihak, pihak yang berubah alamatnya wajib memberitahukan kepada pihak lainnya dalam waktu 14 (empat belas) hari setelah perubahan dilakukan.",
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
                        children: [
                          new TextRun({ text: "(2)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Alamat", size: 24 }),
                          new TextRun({
                            text: " PARA PIHAK",
                            size: 24,
                            bold: true,
                          }),
                          new TextRun({
                            text: " yang akan dipakai untuk komunikasi guna keperluan sebagaimana dimaksud pada ayat (1) adalah sebagai berikut:",
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

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          // ********************************************************************************************************************************************
          // *                                                           PASAL 13                                                                       *
          // ********************************************************************************************************************************************

          new Paragraph({
            children: [new TextRun({ text: "Pasal 13", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [new TextRun({ text: "PENUTUP", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [500, 9000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "(1)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Perubahan terhadap Perjanjian Kerja Sama ini akan ditetapkan dalam addendum yang disepakati oleh PARA PIHAK dan merupakan bagian yang tidak terpisahkan dari Perjanjian Kerja Sama ini.",
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
                        children: [
                          new TextRun({ text: "(2)", bold: false, size: 24 }),
                        ],
                      }),
                    ],
                    width: { size: 5, type: WidthType.PERCENTAGE },
                  }),

                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Perjanjian Kerja Sama ini dibuat dan ditandatangani oleh PARA PIHAK pada hari dan tanggal tersebut pada bagian awal Kesepakatan Bersama ini, dibuat dalam rangkap 2 (dua) yang bermeterai cukup dan mempunyai kekuatan hukum yang sama, untuk masing-masing pihak dan dipergunakan sebagaimana mestinya.",
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

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Paragraph({
            children: [
              new TextRun({
                text: "Demikian Perjanjian Kerja Sama ini dibuat oleh",
                size: 24,
              }),
              new TextRun({ text: " PARA PIHAK", size: 24, bold: true }),
              new TextRun({
                text: " dengan itikad baik, untuk dapat dipatuhi dan dilaksanakan oleh",
                size: 24,
              }),
              new TextRun({ text: " PARA PIHAK.", size: 24, bold: true }),
            ],
            alignment: AlignmentType.JUSTIFIED,
          }),

          new Paragraph({ text: "", spacing: { after: 200 } }), // Spasi tambahan

          new Table({
            columnWidths: [5000, 5000], // Menyesuaikan ukuran kolom
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "PIHAK KESATU",
                            bold: true,
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
                        children: [
                          new TextRun({
                            text: "PIHAK KEDUA",
                            bold: true,
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
                        children: [
                          new TextRun({
                            text: "....................................................",
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
                        children: [
                          new TextRun({
                            text: "....................................................",
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
                        children: [
                          new TextRun({
                            text: "Jabatan",
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
                        children: [
                          new TextRun({
                            text: "Jabatan",
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
  // misalnya generate PDF, atau template dokumen Word di sini
};
