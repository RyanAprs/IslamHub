import chatModel from "../models/chat.model";

export const getAllChat = async () => {
  return await chatModel
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getChatByGroupId = async (group_id: string) => {
  return await chatModel.find({ group_id: group_id });
};

export const insertChat = async (payload: any) => {
  return await chatModel.create(payload);
};

export const getChatAndDelete = async (id: string) => {
  try {
    return await chatModel.findOneAndDelete({ chat_id: id });
  } catch (error) {
    throw error;
  }
};
