import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, sessions, users } from "@/lib/db/schema";
import { db } from "..";

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
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Runs first when user signs in
      if (account && profile) {
        token.id = profile.sub; // Google user ID
        token.picture = profile.picture; // Google profile image
      }
      return token;
    },
    async session({ session, token }) {
      // Attach custom fields to session
      if (token) {
        session.user.id = token.id as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
});
