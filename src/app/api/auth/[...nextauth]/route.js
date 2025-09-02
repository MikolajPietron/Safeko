import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        // 2. If no user or no password, fail
        if (!user || !user.password) return null;

        // 3. Compare password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        // 4. Return user object (NextAuth will include it in JWT/session)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      // Keep your existing logic
      if (session.user) {
        session.user.id = token?.sub ?? null;
        session.user.name = token?.name ?? session.user.name;
        session.user.email = token?.email ?? session.user.email;
        session.user.image = token?.picture ?? session.user.image ?? "./Default_User_Icon.svg";
      }
      return session;
    },
    async jwt({ token, account, profile, user }) {
      // Keep your existing logic
      if (account && profile) {
        token.sub = token.sub ?? profile.sub ?? null;
        token.name = profile.name ?? null;
        token.email = profile.email ?? null;
        token.picture = profile.picture ?? null;
      }

      // If logging in with credentials, attach user.id
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
