import mongoose, { Schema } from "mongoose";

const AccessIdSchema = new mongoose.Schema({
  permissionLevel: Number,
  type: String,
});

module.exports = mongoose.models.AccessId || mongoose.model("AccessId", AccessIdSchema);