import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
  },

  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Messages", MessageSchema);

export default MessageModel;