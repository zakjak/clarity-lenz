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
      },
      headers: await headers(),
    });
  } catch (error) {
    if (isAPIError(error)) {
      console.log(error.message, error.status);
    }
  }
};

export const signUp = async () => {
  try {
    await auth.api.signUpEmail({
      body: {
        email: "zak111@gmail.com",
        password: "asdfafdsgretyrtyret",
        name: "ZakJak YakZak",
      },
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
