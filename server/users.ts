"use server";

import { auth } from "@/lib/auth";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
        callbackURL: "/",
      },
      headers: await headers(),
    });
  } catch (error) {
    if (isAPIError(error)) {
      console.log(error.message, error.status);
    }
  }
};

export const signUp = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    await auth.api.signUpEmail({
      body: { email, password, name, callbackURL: "/sign-in" },
    });
  } catch (error) {
    if (isAPIError(error)) {
      console.log(error.message, error.status);
    }
  }
};

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
};
