import { TargetType } from '@prisma/client';
import { useAuth } from 'auth/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import {
  useIsSubscribeToAll,
  useSubscribeToAll,
} from '@/lib/hooks/subscriptionHooks';

import Icon, { IconSize } from '@/components/utils/Icon';
import Loading from '@/components/utils/Loading';
import { ScrollableTabs } from '@/components/utils/ScrollableTabs';

export function AccountWatching() {
  const { userId, userInfo } = useAuth();
  const [view, setView] = useState<TargetType>('ORG');
  const { isSubscribedToAll } = useIsSubscribeToAll(
    userId as string,
    Boolean(userId as string)
  );

  const { subscribeToAll, unsubscribeFromAll, isLoading, isLoadingUnsub } =
    useSubscribeToAll(userId as string, {}, {});

  if (!userInfo) return <Loading small={false} />;

  const numOfSubscriptions = userInfo?.watching?.length || 0;
  const theresMore = numOfSubscriptions > 5;
  const subsToShow = userInfo.watching?.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // const watchingList = userInfo.watching?.filter((x) => x.type === view);

  if (!userInfo || !userId) return <></>;

  return (
    <div className="w-full space-y-8">
      <ScrollableTabs
        options={{
          Organizations: 'ORG',
          Bounties: 'INDIVIDUAL',
        }}
        isActive={(curr) => curr === view}
        setView={(s) => setView(s as TargetType)}
      />

      <div className="space-y-6">
        <div className="min-h-[15rem]">
          {/* {!watchingList?.length && (
            <p className="text-on-surface-disabled label">
              You are not subscribed to any notifications for{' '}
              {view === TargetType.Individual ? 'bounties' : 'organizations'}
            </p>
          )} */}

          {/* <AnimatePresence>
            {watchingList?.map((subscription, i) => {
              return (
                <motion.div
                  key={subscription.name}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      ease: 'easeOut',
                      duration: 0.075,
                    },
                  }}
                  exit={{
                    x: 100,
                    opacity: 0,
                    transition: {
                      ease: 'easeOut',
                      duration: 0.075,
                    },
                  }}
                >
                  <SubscriptionEntry subscription={subscription} />
                </motion.div>
              );
            })}
          </AnimatePresence> */}
        </div>

        <div className="pt-4 border-t-2 border-surface-dark label space-y-4">
          <div className=" text-on-surface-disabled flex gap-2 items-center">
            <Icon icon="notifications" size={IconSize.Small} />
            {`We'll notify you of changes to organizations and bounties in your
            watching list`}
          </div>
          <AnimatePresence>
            {view === 'INDIVIDUAL' && (
              <motion.div
                className=" text-error-light flex gap-2 items-center"
                initial={{ y: 5, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    ease: 'easeIn',
                    duration: 0.3,
                    delay: 0.075,
                  },
                }}
                exit={{
                  y: 5,
                  opacity: 0,
                  transition: {
                    ease: 'easeIn',
                    duration: 0.3,
                    delay: 0.075,
                  },
                }}
              >
                <Icon icon="report" size={IconSize.Small} />
                Subscriptions to bounties is in development
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
