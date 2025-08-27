import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin", // ✅ fixed typo
  },
  callbacks: {
    async session({ session, token }) {
      // Attach Google profile fields
      if (session.user) {
        session.user.id = token.sub;         // user ID
        session.user.image = token.picture;  // user image
        session.user.name = token.name;      // user name
        session.user.email = token.email;    // user email
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      // First login → copy Google profile to token
      if (account && profile) {
        token.picture = profile.picture;
        token.name = profile.name;
        token.email = profile.email;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
