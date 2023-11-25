import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userZodSchema from './users.Zodvalidation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // zod validation data
    const zodParseData = userZodSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Users is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User create failed!',
      error: {
        code: 500,
        description: 'User create failed!',
        error: error,
      },
    });
  }
};

// get all users
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
// get Single User
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
};
