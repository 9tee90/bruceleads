import { DefaultSession, NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { verify } from 'jsonwebtoken';

type Role = 'ADMIN' | 'USER' | 'DEMO';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
      image?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
    image?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: Role;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check if it's a demo user token
        const token = credentials.password;
        if (token && credentials.email === 'demo@bruceleads.com') {
          try {
            const decoded = verify(token, process.env.NEXTAUTH_SECRET || 'your-secret-key') as {
              id: string;
              email: string;
              name: string;
              role: Role;
            };

            const user: User = {
              id: decoded.id,
              email: decoded.email,
              name: decoded.name,
              role: decoded.role,
            };

            return user;
          } catch (error) {
            console.error('Demo token verification error:', error);
            return null;
          }
        }

        // Regular user authentication
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            role: true,
          },
        });

        if (!user || !user.password || !user.email || !user.name) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as Role,
        },
      };
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 