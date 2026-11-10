// import Google from "next-auth/providers/google";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { schema } from "@/db/schema";
import { db } from "@/db/drizzle";
import { Resend } from "resend";
// import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { nextCookies } from "better-auth/next-js";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.users,
    },
  }),

  plugins: [nextCookies()],
  user: {
    modelName: "users",
    additionalFields: {
      isAdmin: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      isOwner: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
    },
  },
  trustHost: true,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Clarity Lenz <info@claritylenz.com>",
        to: user.email,
        subject: "Reset your password",
        html: `Click <a href="${url}">here</a> too verify your email.`,
      });
    },
    password: {
      hash: async (password) => {
        return await bcrypt.hash(password, 12);
      },
      verify: async ({ hash, password }) => {
        return await bcrypt.compare(password, hash);
      },
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Clarity Lenz <info@claritylenz.com>",
        to: user.email,
        subject: "Verify your email address",
        html: `Click <a href="${url}">here</a> to verify your email.`,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      prompt: "consent",
      accessType: "offline",
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,

  baseURL: process.env.BETTER_API_URL,

  trustedOrigins: ["http://localhost:3000", "https://www.claritylenz.com"],

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 2 * 24 * 60 * 60,
      strategy: "jwt",
    },
  },
  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true,
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
