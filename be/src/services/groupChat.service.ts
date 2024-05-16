import groupChatModel from "../models/grouChat.model";

export const getAllGroupChat = async () => {
  return await groupChatModel
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const insertGroupChat = async (payload: any) => {
  return await groupChatModel.create(payload);
};

export const getGroupChatById = async (id: string) => {
  return await groupChatModel.findOne({ group_id: id });
};

export const getGroupChatId = async (id: string) => {
  const group = await groupChatModel.findOne({ group_id: id });
  const groupId = group?.group_id;
  return groupId;
};

export const getUserId = async (id: string) => {
  const user = await groupChatModel.findOne({ user_id: id });
  const userId = user?.user_id;
  return userId;
};

export const getGroupChatAndUpdate = async (id: string, payload: any) => {
  return await groupChatModel.findOneAndUpdate(
    {
      blog_id: id,
    },
    {
      $set: payload,
    }
  );
};
