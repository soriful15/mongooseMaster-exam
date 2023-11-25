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

export const UserControllers = {
  createUser,
};
