import Navbar from '@/components/navbar/Navbar';
import { SubscriptionsList } from '@/components/pages/user/SubscriptionsList';
import React from 'react';

export default function subscriptions() {
  return (
    <Navbar
      className="mx-auto max-w-5xl min-h-screen"
      setUp={{
        background: true,
        useBackArrow: false,
        useOverflowMenu: true,
        useMobileNavigation: true,
      }}
    >
      <SubscriptionsList showAll={true} />
    </Navbar>
  );
}
