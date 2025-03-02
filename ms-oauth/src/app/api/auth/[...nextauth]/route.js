import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { cookies } from "next/headers";
console.log(process.env.AZURE_AD_CLIENT_ID);
const authOptions = {
 
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
     clientSecret: process.env.AZURE_AD_CLIENT_SECRET ,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: { params: { scope: "openid email profile user.Read email" } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      cookies().set("idToken", session.idToken);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
