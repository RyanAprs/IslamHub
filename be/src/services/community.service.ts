import chatModel from "../models/chat.model";
import communityModel from "../models/community.model";

export const getAllCommunity = async () => {
  return await communityModel
    .find()
    .sort({ createdAt: -1 })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const insertCommunity = async (payload: any) => {
  return await communityModel.create(payload);
};

export const getCommunityById = async (id: string) => {
  return await communityModel.findOne({ community_id: id });
};

export const getIdCommunity = async (id: string) => {
  const community = await communityModel.findOne({ community_id: id });
  const communityId = community?.community_id;
  return communityId;
};

export const getUserId = async (id: string) => {
  const user = await communityModel.findOne({ user_id: id });
  const userId = user?.user_id;
  return userId;
};

export const getCommunityAndDelete = async (id: string) => {
  try {
    const community = await communityModel.findOne({ community_id: id });

    if (!community) {
      throw new Error("Community not found");
    }

    const deleteCommunityResult = await communityModel.findOneAndDelete({
      community_id: id,
    });

    const deleteChatResult = await chatModel.deleteMany({ community_id: id });

    return { deleteCommunityResult, deleteChatResult };
  } catch (error) {
    throw error;
  }
};

export const getCommunityImage = async (id: string) => {
  const community = await communityModel.findOne({ id });
  const communityImage = community?.image;
  return communityImage;
};

export const getCommuityAndUpdate = async (id: string, payload: any) => {
  return await communityModel.findOneAndUpdate(
    {
      community_id: id,
    },
    {
      $set: payload,
    }
  );
};
