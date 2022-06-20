import { Title } from '@/components/utils/Title';
('@/components/utils/Title');

import { ButtonStyle } from '@/components/utils/Button';
import { ImportantMessage, MessageStyle } from '@/components/utils/Warning';
import { useGetSubmissionsFromBounty } from '@/hooks/submissionHooks';
import { useIsSubscribeToAll } from '@/hooks/subscriptionHooks';
import { SubmissionState } from '@/lib/models/status';
import { useAuth } from 'auth/AuthContext';
import { motion } from 'framer-motion';
import { AppearVariants } from '@/lib/framer/Variants';
import { SubscribedToAllButton } from '../../subscriptions/SubscribedToAllButton';
import { SubmissionEntry } from '@/components/utils/SubmissionEntry';

export default function UserPrompts() {
  //*Auth
  const { userId, isStaff, LogIn } = useAuth();

  //*Subscriptions
  const { isSubscribedToAll } = useIsSubscribeToAll(userId as string, !!userId);

  //*Submissions
  const { submissions } = useGetSubmissionsFromBounty(
    userId,
    'VcnsHnOrlFeLcuSMiLtHGuyN',
    !!userId
  );

  //!Returns

  if (isStaff)
    return (
      <ImportantMessage message="You've logged in as staff." icon="info" />
    );

  return (
    <>
      <motion.div
        variants={AppearVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {!userId && (
          <ImportantMessage
            message="Join the hunt and start earning rewards"
            icon="info"
            content={
              <button onClick={LogIn} className="mt-4 label underline">
                <span>Sign in</span>
              </button>
            }
          />
        )}
        {userId && (!submissions || !submissions.length) && (
          <ImportantMessage
            message="Start submitting your findings to earn money"
            icon="info"
          />
        )}

        {userId && !isSubscribedToAll && (
          <ImportantMessage
            message="Want to get notified of all new bounties?"
            icon="info"
            content={
              <div className="mt-4 space-y-4">
                <SubscribedToAllButton
                  info={{
                    label: 'Subscribe to all',
                    style: ButtonStyle.Hollow,
                    className: 'w-full',
                  }}
                />

                <p className="label-sm text-text">
                  You can change this in your account section
                </p>
              </div>
            }
            style={MessageStyle.p3}
          />
        )}

        {!!submissions?.length && (
          <div className="space-y-4">
            <Title
              title="Waiting for review"
              extraInfo="Your submissions that are waiting to be reviewed by staff."
            />
            <div className="space-y-8">
              {submissions &&
                submissions
                  .filter((s) => s.state === SubmissionState.WaitingForReview)
                  .map((p, i) => {
                    return (
                      <SubmissionEntry
                        submission={p}
                        key={i}
                        fullSize={false}
                      />
                    );
                  })}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
