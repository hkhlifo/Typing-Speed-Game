import { z } from "zod";
import prisma from "../lib/prisma";
import { hashPassword, verifyPassword } from "../auth/password";
import { createToken } from "../auth/jwt";

const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters"),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export async function registerUser(input: unknown) {
  const data = registerSchema.parse(input);

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: data.email },
        { username: data.username },
      ],
    },
  });

  if (existingUser) {
    if (existingUser.email === data.email) {
      throw new Error("An account with this email already exists");
    }

    throw new Error("This username is already taken");
  }

  const passwordHash = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      passwordHash,
    },
  });

  const token = await createToken(user.id);

  return {
    user,
    token,
  };
}

export async function loginUser(input: unknown) {
  const data = loginSchema.parse(input);

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordValid = await verifyPassword(
    data.password,
    user.passwordHash,
  );

  if (!passwordValid) {
    throw new Error("Invalid email or password");
  }

  const token = await createToken(user.id);

  return {
    user,
    token,
  };
}