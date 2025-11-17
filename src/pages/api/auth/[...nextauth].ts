/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import AzureADProvider from "next-auth/providers/azure-ad";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.events.readonly",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    // AzureADProvider({
    //   clientId: process.env.MICROSOFT_CLIENT_ID!,
    //   clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    //   tenantId: process.env.MICROSOFT_TENANT_ID ?? "common",
    //   authorization: {
    //     params: {
    //       scope: "openid profile offline_access Calendars.Read",
    //     },
    //   },
    // }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // first login
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at
          ? account.expires_at * 1000
          : // eslint-disable-next-line no-constant-binary-expression
            Date.now() + (Number(account.expires_in) ?? 3600) * 1000;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = session.user || {};
      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;
      (session as any).provider = token.provider;
      return session;
    },
  },
});
