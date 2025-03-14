import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      image?: string;
      subscription?: any;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    image?: string;
    subscription?: any;
  }
}
