import mongoose from "mongoose";

const groupChatSchema = new mongoose.Schema(
  {
    group_id: {
      type: String,
      unique: true,
    },
    admin_id: {
      type: String,
    },
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    admin_name: {
      type: String,
    },
  },
  { timestamps: true, _id: true }
);

const groupChatModel = mongoose.model("groupChats", groupChatSchema);

export default groupChatModel;
