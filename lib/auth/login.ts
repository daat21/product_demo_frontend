"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const loginFormSchema = z.object({
  email: z.email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string | null;
      success?: boolean;
      error?: string;
    }
  | undefined;

export const login = async (prevState: LoginFormState, formData: FormData) => {
  const validatedFields = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const userData = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  const { access_token } = data;

  if (res.ok) {
    const cookieStore = await cookies();
    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 30,
      sameSite: "lax",
      path: "/",
    });

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "User logged in successfully",
    };
  } else if (res.status === 401) {
    return {
      success: false,
      error: "Incorrect email or password",
    };
  } else {
    return {
      success: false,
      error: data.detail,
    };
  }
};
