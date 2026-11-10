"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await auth.api.signInEmail({
    body: {
      email: email,
      password: password,
    },
  });
};

export const signUp = async () => {
  await auth.api.signUpEmail({
    body: {
      email: "zak111@gmail.com",
      password: "asdfafdsgretyrtyret",
      name: "ZakJak YakZak",
    },
  });
};

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
};
