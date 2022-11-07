import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    newUser: '/',
    error: '/500',
    signIn: '/',
    signOut: '/',
  },
  callbacks: {
    authorized: () => {
      return true;
      // if (req.url.includes('api/admin') && token?.user.rol !== 'ADMIN') {
      //   return false;
      // } else if (req.url.includes('/static')) {
      //   return true;
      // }
      // return !!token;
    },
  },
});
export const config = {
  matcher: ['/api/:endpoint*', '/:path+'],
};
