import { Request, Response } from "express";
import {
  getAllCommunity,
  getCommunityById,
  insertCommunity,
} from "../services/community.service";
import { v4 as uuidv4 } from "uuid";

export const getCommunities = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (id) {
    const community = await getCommunityById(id);
    if (community) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get detail data community successfully",
        data: community,
      });
    } else {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "No community posted",
        data: {},
      });
    }
  } else {
    try {
      const communities = await getAllCommunity();
      if (Array.isArray(communities) && communities.length > 0) {
        return res.status(200).send({
          status: true,
          status_code: 200,
          message: "Get data community success",
          data: communities,
        });
      } else {
        return res.status(200).send({
          status: true,
          status_code: 200,
          message: "No community posted",
          data: {},
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        status_code: 500,
        message: "Internal Server Error",
        data: {},
      });
    }
  }
};

export const createCommunity = async (req: Request, res: Response) => {
  const community_id = uuidv4();
  const { user_id, title, name } = req.body;
  const image = null;

  if (!title || !name) {
    return res.status(400).send({
      status: false,
      status_code: 400,
      message: "Community name field are required",
    });
  }

  const communityData = {
    community_id,
    user_id,
    title,
    image,
    name,
  };

  try {
    await insertCommunity(communityData);
    return res.status(200).json({
      status: true,
      status_code: 200,
      message: "created chat successfully",
      data: communityData,
    });
  } catch (error: any) {
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.message,
    });
  }
};
