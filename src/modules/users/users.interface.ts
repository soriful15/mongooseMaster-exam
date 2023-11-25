import { Model } from 'mongoose';

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: Array<string>;
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: Array<{
    productName: string;
    price: number;
    quantity: number;
  }>;
};

// creating static
export interface UserModel extends Model<TUser> {
  isUserExists(userId: number | string): Promise<TUser> | null;
}
