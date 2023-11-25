import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './users.interface';

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'userId is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, ' username is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    maxlength: [20, ' password can not be more than 20 Characters'],
  },

  fullName: {
    firstName: {
      type: String,
      required: [true, 'First Name is Required'],
      maxlength: [20, 'Name can not be more than 20 Characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is Required'],
      maxlength: [20, 'Name can not be more than 20 Characters'],
    },
  },

  age: { type: Number, required: [true, 'Age is required'] },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  isActive: {
    type: Boolean,
    required: [true, 'isActive is required'],
  },
  hobbies: {
    type: [String],
    required: [true, 'hobbies is required'],
  },
  address: {
    street: {
      type: String,
      required: [true, 'hobbies is required'],
    },
    city: {
      type: String,
      required: [true, 'city is required'],
    },
    country: {
      type: String,
      required: [true, 'country is required'],
    },
  },
  orders: [
    {
      productName: {
        type: String,
        required: [true, 'Product name is required'],
      },
      price: {
        type: String,
        required: [true, 'price name is required'],
      },
      quantity: {
        type: String,
        required: [true, 'quantity name is required'],
      },
    },
  ],
});

// user exist or not static method
userSchema.statics.isUserExists = async function (userId: number | string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
