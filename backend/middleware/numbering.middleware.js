import DocNumber from "../models/numbering.model.js";

const generateDocumentNumber = async (doc, next) => {
  try {
    const docNumber = await DocNumber.findByIdAndUpdate(
      { _id: "documentId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const year = new Date().getFullYear();
    doc.content.nomor = `${docNumber.seq}/UN62.21/KS.00.00/${year}`;
    next();
  } catch (err) {
    next(err);
  }
};

export default generateDocumentNumber;
