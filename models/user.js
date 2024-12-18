import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    accessId: Number,
    name: String,
    email: String,
    email_verified: Boolean,
    image: String,
    password: String,
    resetToken:String,
    resetTokenExpires: Date,
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);