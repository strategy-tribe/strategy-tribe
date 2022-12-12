import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    newUser: '/',
    error: '/500',
    signIn: '/',
    signOut: '/',
  },
  callbacks: {
    authorized: ({ req, token }) => {
      const adminToken = process.env.ADMIN_TOKEN as string;
      try {
        const hasPermissions =
          token?.user.rol === 'ADMIN' ||
          token?.user.rol === 'STAFF' ||
          req.headers.get('TOKEN') === adminToken;

        const requestingAdminAccess = req.url.includes('admin');

        console.log('Middleware req:', JSON.stringify(req, null, 2));
        console.log('Middleware token:', JSON.stringify(token, null, 2));
        console.log(
          JSON.stringify({ requestingAdminAccess, hasPermissions }, null, 2)
        );
        if (requestingAdminAccess && !hasPermissions) {
          return false;
        }
        return true;
      } catch (error) {
        console.error(
          `Error in middleware. Reason:\n${JSON.stringify(error, null, 2)}`
        );
        return false;
      }
    },
  },
});
export const config = {
  matcher: ['/api/:endpoint*', '/:path+'],
};
