import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { SubmissionEntry } from '@/components/utils/SubmissionEntry';

import { useGetUserSubmissions } from '@/hooks/submissionHooks';
import { GetDateInString } from '@/utils/DateHelpers';
import { motion } from 'framer-motion';
import { useAuth } from 'auth/AuthContext';
import { SubscriptionsList } from './SubscriptionsList';
import { Stat } from '../submission/Stat';

export function UserDetails() {
  const { userId, userInfo } = useAuth();
  const { submissions } = useGetUserSubmissions(
    userId as string,
    Boolean(userId as string)
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="mx-auto max-w-5xl px-2 space-y-12 laptop:mt-6"
    >
      {/* User info */}

      {userInfo && (
        <div className="space-y-4">
          <Title title="Account information" />
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
      )}

      {/* User subscriptions */}
      <SubscriptionsList />

      {/* User submissions */}
      <div className="space-y-4 pb-16 max-w-3xl">
        <Title title="Account Submissions" />
        {submissions &&
          submissions
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((s, i) => {
              return <SubmissionEntry key={i} submission={s} />;
            })}
        {submissions?.length === 0 && (
          <p className="text-disabled label">You have not submitted findings</p>
        )}
      </div>
    </motion.div>
  );
}
