
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }

  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
    };
  }

  interface JWT {
    role?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }
}
