import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, sessions, users } from "@/lib/db/schema";
import { db } from "..";
import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      image?: string | null;
      isAdmin: boolean;
      isOwner: boolean;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Resend({ from: "Clarity Lenz <info@claritylenz.com>" }),

    Credentials({
      credentials: {
        name: { label: "Name", type: "text" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
        mode: { label: "Mode", type: "text" },
      },

      async authorize(credentials) {
        const { name, email, password, mode } = credentials as {
          name: string;
          email: string;
          password: string;
          mode: string;
        };

        if (!email || !password) return null;

        if (mode === "signup") {
          if (!name) return null;

          const existing = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

          if (existing.length > 0) throw new Error("Email already in use");

          const hash = await bcrypt.hash(password, 12);

          const [user] = await db
            .insert(users)
            .values({ name, email, password: hash, isCredentials: true })
            .returning({
              id: users.id,
              name: users.name,
              image: users.image,
              email: users.email,
              isCredentials: users.isCredentials,
            });

          return user;
        }

        // SIGN IN

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user || !user.password) return null;

        if (!user.isCredentials) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return null;

        if (!user) throw new Error("No account found with that email, sign up");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Runs first when user signs in
      if (user) token.id = user.id;

      if (account && profile) {
        token.id = profile.sub; // Google user ID
        token.picture = profile.picture; // Google profile image
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.id, token.id as string))
          .limit(1);

        if (user) {
          session.user.id = user.id;
          session.user.image = user.image;
          session.user.name = user.name;
          session.user.email = user.email || "";
          session.user.isAdmin = user.isAdmin as boolean;
          session.user.isOwner = user.isOwner as boolean;
        }
      }

      return session;
    },
  },
});
