// import Google from "next-auth/providers/google";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { schema } from "@/db/schema";
import { db } from "@/db/drizzle";
// import Resend from "next-auth/providers/resend";
// import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { oAuthProxy } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

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
  },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
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
  // providers: [
  //   Google({
  //     clientId: process.env.AUTH_GOOGLE_ID as string,
  //     clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
  //     authorization: {
  //       params: {
  //         prompt: "consent",
  //         access_type: "offline",
  //         response_type: "code",
  //       },
  //     },
  //   }),
  //   Resend({ from: "Clarity Lenz <info@claritylenz.com>" }),

  //   Credentials({
  //     credentials: {
  //       name: { label: "Name", type: "text" },
  //       email: {
  //         label: "Email",
  //         type: "email",
  //         placeholder: "johndoe@gmail.com",
  //       },
  //       password: {
  //         label: "Password",
  //         type: "password",
  //         placeholder: "******",
  //       },
  //       mode: { label: "Mode", type: "text" },
  //     },

  //     async authorize(credentials) {
  //       const { name, email, password, mode } = credentials as {
  //         name: string;
  //         email: string;
  //         password: string;
  //         mode: string;
  //       };

  //       if (!email || !password) return null;

  //       if (mode === "signup") {
  //         if (!name) return null;

  //         const existing = await db
  //           .select()
  //           .from(users)
  //           .where(eq(users.email, email));

  //         if (existing.length > 0) throw new Error("Email already in use");

  //         const hash = await bcrypt.hash(password, 12);

  //         const [user] = await db
  //           .insert(users)
  //           .values({ name, email, password: hash, isCredentials: true })
  //           .returning({
  //             id: users.id,
  //             name: users.name,
  //             image: users.image,
  //             email: users.email,
  //             isCredentials: users.isCredentials,
  //           });

  //         return user;
  //       }

  //       const [user] = await db
  //         .select()
  //         .from(users)
  //         .where(eq(users.email, email))
  //         .limit(1);

  //       if (!user || !user.password) return null;

  //       if (!user.isCredentials) return null;

  //       const passwordMatch = await bcrypt.compare(password, user.password);

  //       if (!passwordMatch) return null;

  //       if (!user) throw new Error("No account found with that email, sign up");

  //       return {
  //         id: user.id,
  //         name: user.name,
  //         email: user.email,
  //         image: user.image,
  //       };
  //     },
  //   }),
  // ],
  // callbacks: {
  //   async jwt({ token, account, profile, user }) {
  //     if (user) {
  //       token.id = user.id;
  //     }

  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (token) {
  //       const [user] = await db
  //         .select()
  //         .from(users)
  //         .where(eq(users.id, token.id as string))
  //         .limit(1);

  //       if (user) {
  //         session.user.id = user.id;
  //         session.user.image = user.image;
  //         session.user.name = user.name;
  //         session.user.email = user.email || "";
  //         session.user.isAdmin = user.isAdmin as boolean;
  //         session.user.isOwner = user.isOwner as boolean;
  //       }
  //     }

  //     return session;
  //   },
  // },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
