import { Rol } from '@prisma/client';
import 'next-auth';
import 'next-auth/jwt';

interface CustomUser {
  id: string;
  address: string;
  externalId: string;
  signature: string;
  rol: Rol;
  joined: Date;
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: CustomUser;
  }
}

declare module 'next-auth' {
  /**
   *
   * Custom Session. Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context. Extends basic interface from next-auth
   */
  interface Session {
    user: CustomUser;
  }
  /**
   *
   * Custom user, extends the basic interface from next-auth */
  interface User extends CustomUser {
    id: string; //if not, ts complains
  }
}
