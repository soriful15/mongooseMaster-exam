import { z } from 'zod';
const userSchema = z.object({
  userId: z.number().int({ message: 'userId must be an integer' }),

  username: z.string().min(1, { message: 'username is required' }),

  password: z
    .string()
    .min(1, { message: 'password is required' })
    .max(20, { message: 'password can not be more than 20 Characters' }),

  fullName: z
    .object({
      firstName: z
        .string()
        .trim()
        .max(20, { message: 'Name can not be more than 20 Characters' })
        .refine((value) => /^[a-zA-Z]+$/.test(value), {
          message: 'First Name is not valid',
        }),

      lastName: z
        .string()
        .trim()
        .max(20, { message: 'Name can not be more than 20 Characters' })
        .refine((value) => /^[a-zA-Z]+$/.test(value), {
          message: 'Last Name is not valid',
        }),
    })
    .required(),

  age: z.number().int({ message: 'Age must be an integer' }),

  email: z.string().email({ message: 'Email is not valid' }),

  isActive: z.boolean(),

  hobbies: z.array(z.string()).min(1, { message: 'hobbies is required' }),

  address: z
    .object({
      street: z.string().min(1, { message: 'street is required' }),

      city: z.string().min(1, { message: 'city is required' }),

      country: z.string().min(1, { message: 'country is required' }),
    })
    .required(),

  orders: z
    .array(
      z.object({
        productName: z.string().min(1, { message: 'Product name is required' }),

        price: z.string().min(1, { message: 'price name is required' }),

        quantity: z.string().min(1, { message: 'quantity name is required' }),
      }),
    )
    .default([]),
});

export default userSchema;
