import mongoose from "mongoose";

const docNumberSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
docNumberSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const DocNumber = mongoose.model("DocNumber", docNumberSchema, "DocNumber");

export default DocNumber;
