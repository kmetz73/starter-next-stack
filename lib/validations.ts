import { z } from 'zod';

// Schema for creating users
export const createUserSchema = z.object({
  rank: z.string(),
  firstName: z.string().min(3, 'Name must be at least 3 characters long'),
  lastName: z.string().min(3, 'Name must be at least 3 characters long'),
  callSign: z.string(),
  email: z.string().min(3, 'Please enter a valid email address'),
});

// Schema for updating users
export const updateUserSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  rank: z.string().optional(),
  firstName: z.string().min(3, 'Name must be at least 3 characters long'),
  lastName: z.string().min(3, 'Name must be at least 3 characters long'),
  callSign: z.string().optional(),
  email: z.string().min(3, 'Please enter a valid email address'),
  isActive: z.boolean(),
});
