import { TUser } from './users.interface';
import { User } from './users.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    // static method
    throw new Error('User already exists!');
  }
  const result = await User.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find().select(
    'userId username fullName age email address',
  );
  return result;
};

const getSingleUserFromDB = async (userId: number | string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error('User not found');
  }
  const result = User.findOne({ userId });
  return result;
};

// update single user from database

const updatedUserFromDB = async (userId: number | string, userData: TUser) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error('user not found');
  }
  const result = await User.findOneAndUpdate(
    { userId },

    { $set: userData },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updatedUserFromDB,
};
