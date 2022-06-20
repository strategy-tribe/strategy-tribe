import React from 'react';
import { useRouter } from 'next/router';

import { GoToHomePage, GoToUserPage } from '@/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import { Menu } from './Menu';
import { ButtonInformation, ButtonStyle } from '@/components/utils/Button';

export function WorkerMenu({
  show,
  hide,
  extraButtons,
}: {
  show: boolean;
  hide: () => void;
  extraButtons?: ButtonInformation[];
}) {
  const { userId } = useAuth();

  const router = useRouter();

  const buttons = extraButtons ? [...extraButtons] : [];

  if (userId && router.pathname.includes('/app'))
    buttons.push({
      label: 'Account',
      icon: 'admin_panel_settings',
      onClick: () => router.push(GoToUserPage()),
      style: ButtonStyle.Filled,
    });

  return <Menu hide={hide} show={show} extraButtons={buttons} />;
}
