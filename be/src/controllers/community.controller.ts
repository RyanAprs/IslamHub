import { Request, Response } from "express";
import {
  getAllCommunity,
  getCommuityAndUpdate,
  getCommunityAndDelete,
  getCommunityById,
  getCommunityByTitle,
  getCommunityImage,
  insertCommunity,
} from "../services/community.service";
import { v4 as uuidv4 } from "uuid";
import { uploadAsync } from "../config/upload.config";

export const getCommunities = async (req: Request, res: Response) => {
  const id = req.params.id;
  const q = req.query.query as string;

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
  } else if (q) {
    const community = await getCommunityByTitle(q);
    if (community) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "Get search community successfully",
        data: community,
      });
    } else {
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: "Data not found",
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

export const updateCommunity = async (req: Request, res: Response) => {
  try {
    await uploadAsync(req, res);

    const id = req.params.id;
    const { title, name, user_id } = req.body;
    const image = req.file ? req.file.filename : null;

    let imagePrevious;

    if (image) {
      imagePrevious = image;
    } else {
      imagePrevious = await getCommunityImage(id);
    }

    if (!title || !name || !user_id) {
      return res.status(400).send({
        status: false,
        status_code: 400,
        message: "All fields are required",
      });
    }

    const communityData = {
      user_id,
      title,
      name,
      image: imagePrevious,
    };

    const community = await getCommuityAndUpdate(id, communityData);
    if (community) {
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: "community updated successfully",
        data: communityData,
      });
    } else {
      return res.status(404).json({
        status: false,
        status_code: 404,
        message: "Data not found",
        data: {},
      });
    }
  } catch (error: any) {
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.message || "An error occurred",
      data: {},
    });
  }
};

export const deleteCommunity = async (req: Request, res: Response) => {
  const postId = req.params.id;

  try {
    const result = await getCommunityAndDelete(postId);
    if (result) {
      res.status(200).json({
        status: true,
        status_code: 200,
        message: "Delete community successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        status_code: 404,
        message: "Data not found",
        data: {},
      });
    }
  } catch (error: any) {
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.message,
    });
  }
};
