import { DocNumber } from "../models/docNumber.model.js";

const generateDocumentNumber = async (doc, next) => {
  try {
    const docNumber = await DocNumber.findByIdAndUpdate(
      { _id: "documentId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const year = new Date().getFullYear();
    doc.documentNumber = `(${docNumber.seq}/un62.21/ks.00.00/${year})`;
    next();
  } catch (err) {
    next(err);
  }
};

export default generateDocumentNumber;
