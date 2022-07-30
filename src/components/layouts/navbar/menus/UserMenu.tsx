import { useAuth } from 'auth/AuthContext';

import { AdminUserMenu } from './user menu/AdminUserMenu';
import { RegularUserMenu } from './user menu/RegularUserMenu';

export function UserMenu({
  shouldShow,
  show,
  hide,
}: {
  shouldShow: boolean;
  show: () => void;
  hide: () => void;
}) {
  const { isAdmin, isStaff } = useAuth();

  if (!isStaff && !isAdmin)
    return <RegularUserMenu shouldShow={shouldShow} show={show} hide={hide} />;
  else return <AdminUserMenu shouldShow={shouldShow} show={show} hide={hide} />;
}
