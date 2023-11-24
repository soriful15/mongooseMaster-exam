import { Schema, model } from 'mongoose';
import { TUser } from './users.interface';
import validator from 'validator';

const userSchema = new Schema<TUser>({
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
      trim: true,
      maxlength: [20, 'Name can not be more than 20 Characters'],
      validate: {
        validator: {
          validator: (value: string) => validator.isAlpha(value),
          message: '{VALUE} is not a valid',
        },
      },
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is Required'],
      trim: true,
      maxlength: [20, 'Name can not be more than 20 Characters'],
      validate: {
        validator: (value: string) => validator.isAlpha(value),
        message: '{VALUE} is not a valid',
      },
    },
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: {
    type: String,
    required: [true, 'email is required'],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid',
    },
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

export const User = model<TUser>('User', userSchema);
