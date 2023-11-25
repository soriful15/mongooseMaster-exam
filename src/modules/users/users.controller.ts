import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userZodSchema from './users.Zodvalidation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
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

// updated user

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await UserServices.updatedUserFromDB(userId, userData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
        error: error,
      },
    });
  }
};

// delete single user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
        error: error,
      },
    });
  }
};

// insert a order
const insertOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    const result = await UserServices.insertOrderToUserCollection(
      userId,
      order,
    );
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
        error: error,
      },
    });
  }
};

const getUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getAllOrderToUserCollection(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
        error: error,
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  insertOrder,
  getUserOrder,
};
