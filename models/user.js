import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    accessId: { type: Schema.Types.ObjectId, ref: "AccessId" },
    name: String,
    email: String,
    email_verified: Boolean,
    image: String,
    password: String,
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);