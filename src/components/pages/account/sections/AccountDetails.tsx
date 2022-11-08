import { GetDateInString } from '@/lib/utils/DateHelpers';

import { useAuth } from '@/auth/AuthContext';

import { Stat } from '../../../utils/Stat';

export function AccountDetails() {
  const { userId, userInfo, isStaff } = useAuth();

  if (!userInfo || !userId) return <></>;

  return (
    <div className="w-full space-y-6">
      {isStaff && (
        <div className="label text-on-surface-disabled">Staff account</div>
      )}

      <Stat title="User ID" content={userId as string} copyable={true} />

      <Stat
        title="Wallet"
        content={userInfo.mainWallet as string}
        copyable={true}
      />

      <Stat
        title="Joined"
        content={`${GetDateInString(userInfo.joined)} ago`}
        copyable={false}
      />
    </div>
  );
}
