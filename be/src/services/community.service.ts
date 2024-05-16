import communityModel from "../models/community.model";

export const getAllCommunity = async () => {
  return await communityModel
    .find()
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

export const getCommuityAndUpdate = async (id: string, payload: any) => {
  return await communityModel.findOneAndUpdate(
    {
      blog_id: id,
    },
    {
      $set: payload,
    }
  );
};
