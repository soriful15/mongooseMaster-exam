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

// const getSingleUserDB = async (userId: string | number) => {

// };

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  // getSingleUserDB,
};
