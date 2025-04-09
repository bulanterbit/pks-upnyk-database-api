import PKS from "../models/pks.model";
import { createDocument } from "./createDocumentFunction";

export const generateDocument = async (req, res, next) => {
  try {
    const data = await PKS.findById(req.params.id);

    if (!data) {
      const error = new Error("PKS not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: data });
    await createDocument(data); // Panggilan fungsi setelah didefinisikan
  } catch (error) {
    next(error);
  }
};
