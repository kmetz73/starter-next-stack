'use server';

import { PrismaClient } from '@prisma/client';
import { PAGE_SIZE } from '../constants';
import { revalidatePath } from 'next/cache';
import { formatErrors } from '../utils';
import { updateUserSchema, createUserSchema } from '../validations';
import { z } from 'zod';

// Get user by the Id
export async function getUserById(userId: string) {
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!user) throw new Error('User not found');
  return user;
}

// Get all users
export async function getAllUsers({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const prisma = new PrismaClient();
  const data = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalUsers = await prisma.user.count();
  const totalPages = Math.ceil(totalUsers / limit);
  return { data, totalPages };
}

// Delete user
export async function deleteUser(id: string) {
  const prisma = new PrismaClient();
  try {
    await prisma.user.delete({ where: { id } });

    revalidatePath('/users');

    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    return { success: false, message: formatErrors(error) };
  }
}

// Update  a User
export async function updateUser(user: z.infer<typeof updateUserSchema>) {
  const prisma = new PrismaClient();
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        rank: user.rank,
        firstName: user.firstName,
        lastName: user.lastName,
        callSign: user.callSign,
        email: user.email,
      },
    });

    revalidatePath('/users');

    return { success: true, message: 'User updated successfully' };
  } catch (error) {
    return { success: false, message: formatErrors(error) };
  }
}

// Create a User
export async function createUser(user: z.infer<typeof createUserSchema>) {
  const prisma = new PrismaClient();
  try {
    await prisma.user.create({
      data: {
        rank: user.rank,
        firstName: user.firstName,
        lastName: user.lastName,
        callSign: user.callSign,
        email: user.email,
      },
    });

    revalidatePath('/users');

    return { success: true, message: 'User created successfully' };
  } catch (error) {
    return { success: false, message: formatErrors(error) };
  }
}
