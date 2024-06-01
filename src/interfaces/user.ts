import { z } from "zod";

export interface IUser {
  roles?: string;
  email?: string;
  password?: string;
  user_name?: string;
  display_name?: string;
  avatar_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserAtom {
  id: string;
  roles: string;
  user_name: string;
  display_name: string;
  avatar_url: string;
}

export const userLoginSchema = z.object({
  email_or_username: z
    .string()
    .min(1, { message: "Email/Username is required" })
    .refine(
      async (email_or_username) => {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/api/v1/user/email_or_username`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email_or_username,
            }),
          }
        );

        if (!response.ok) return false;
        return true;
      },
      {
        message: "Email/Username does not exists.",
      }
    ),
  password: z.string().min(1, { message: "Password is required" }),
});

export const userSignupSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .refine(
      async (email) => {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/api/v1/user/email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          }
        );

        if (!response.ok) return false;
        return true;
      },
      {
        message: "Email already exists.",
      }
    ),
  user_name: z
    .string()
    .min(1, { message: "Username is required" })
    .max(24, { message: "Max length 24." })
    .refine(
      async (user_name) => {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/api/v1/user/username`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_name,
            }),
          }
        );

        if (!response.ok) return false;
        return true;
      },
      {
        message: "Username already exists.",
      }
    ),
  password: z.string().min(8, { message: "Must be 8 or more." }),
});
