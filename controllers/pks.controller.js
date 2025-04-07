import PKS from "../models/pks.model.js";

// memunculkan semua PKS
export const getAllPKS = async (req, res, next) => {
  try {
    const users = await PKS.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// memunculkan satu PKS
export const getSinglePKS = async (req, res, next) => {
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
};

// insert/memasukkan PKS ke database (database lokal tidak support session)
export const insertPKS = async (req, res, next) => {
  try {
    // Extract PKS data from request body
    const pksData = req.body;

    // Create new PKS document without using a session
    const newPKS = await PKS.create(pksData);

    res.status(201).json({
      success: true,
      message: "PKS created successfully",
      data: newPKS,
    });
  } catch (error) {
    next(error);
  }
};

// Update PKS based on ID
export const updatePKS = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Add who updated the document
    if (req.user) {
      updateData.diperbaraiOleh = req.user.name || req.user.id || req.user;
    }

    const updatedPKS = await PKS.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPKS) {
      const error = new Error("PKS not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "PKS updated successfully",
      data: updatedPKS,
    });
  } catch (error) {
    next(error);
  }
};

// Delete PKS based on ID
export const deletePKS = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedPKS = await PKS.findByIdAndDelete(id);

    if (!deletedPKS) {
      const error = new Error("PKS not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "PKS deleted successfully",
      data: deletedPKS,
    });
  } catch (error) {
    next(error);
  }
};
