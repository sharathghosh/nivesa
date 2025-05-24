import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

// Admin credentials - in a real app, these would be in a secure database
// The password below is 'Sandeepa1' hashed with bcrypt
const ADMIN_USER = {
  id: '1',
  name: 'Admin',
  email: 'admin',
  password: '$2b$12$2XsCFBWI/ALicBcU12Kh4uVEslAlk57P0WvsSFqYnBqVMPTDGeXu.' // Sandeepa1
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (credentials.email === ADMIN_USER.email) {
          const isValid = await compare(credentials.password, ADMIN_USER.password);
          
          if (isValid) {
            return {
              id: ADMIN_USER.id,
              name: ADMIN_USER.name,
              email: ADMIN_USER.email
            };
          }
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "nivesa-default-secret-key",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
