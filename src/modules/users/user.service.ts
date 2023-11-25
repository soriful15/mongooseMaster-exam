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

// delete single user from database

const deleteUserFromDB = async (userId: number | string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error('user not found');
  }

  const result = await User.findOneAndDelete({ userId });
  return result;
};

// insert a order to specific user collection
const insertOrderToUserCollection = async (
  userId: number | string,
  orderData: {
    productName: string;
    price: number;
    quantity: number;
  },
) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error('User not found');
  }
  const { productName, price, quantity } = orderData;
  const result = await User.findOneAndUpdate(
    { userId, orders: { $exists: true } },
    { $push: { orders: { productName, price, quantity } } },
    { upsert: true, new: true },
  );
  return result;
};

// get a user all orders

const getAllOrderToUserCollection = async (userId: number | string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error('User not found ');
  }
  const result = await User.findOne({ userId }).select('orders');
  return result;
};

const calculateAllOrderToUserCollection = async (userId: number | string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error('User not found ');
  }
  const result = await User.findOne({ userId }).select('orders');

  const totalPrice = (result?.orders || []).reduce(
    (total: number, order: { price?: number; quantity: number }) => {
      return total + (order.price || 0) * (order.quantity || 0);
    },
    0,
  );
  return totalPrice;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updatedUserFromDB,
  deleteUserFromDB,
  insertOrderToUserCollection,
  getAllOrderToUserCollection,
  calculateAllOrderToUserCollection,
};
