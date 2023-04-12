import Moralis from 'moralis';
import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { LogUser } from '@/server/auth/logUser';

export default NextAuth({
  pages: {
    newUser: '/',
    error: '/500',
    signIn: '/',
    signOut: '/',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'MoralisAuth',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials) {
        try {
          // "message" and "signature" are needed for authorization
          // we described them in "credentials" above
          const signature = credentials?.signature;
          const message = credentials?.message;

          if (!message || !signature) {
            throw new Error('No message or signature');
          }

          const apiKey = process.env.MORALIS_API_KEY as string;
          await Moralis.start({ apiKey });

          const { address, profileId } = (
            await Moralis.Auth.verify({ message, signature, network: 'evm' })
          ).raw;

          const u = await LogUser({
            address,
            externalId: profileId,
            signature,
          });

          if (!u) {
            throw new Error('Error signing you up');
          }

          const user: User = {
            address,
            id: u.id,
            externalId: profileId,
            signature,
            rol: u.rol,
            joined: u.createdAt,
          };
          // returning the user object and creating a session
          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  // adding user info to the user session object
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.user = user;
        }
        return token;
      } catch (error) {
        console.error(
          `Error in JWT callback. Reason:\n ${JSON.stringify(error, null, 2)}`
        );
        return token;
      }
    },
    async session({ session, token }) {
      try {
        if (token.user) {
          session.user = token.user;
        }
        return session;
      } catch (error) {
        console.error(
          `Error in SESSION callback. Reason:\n ${JSON.stringify(
            error,
            null,
            2
          )}`
        );
        return session;
      }
    },
  },
});
