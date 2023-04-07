import Loading from '@/components/utils/Loading';
import { TargetType } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { SubscriptionEntry } from '../SubscriptionEntry';

import Icon, { IconSize } from '@/components/utils/Icon';
import { ScrollableTabs } from '@/components/utils/ScrollableTabs';

import { useAuth } from '@/auth/AuthContext';
import {
  getSubscribedBounties,
  getSubscribedOrgs,
} from '@/lib/hooks/subscriptionHooks';

export function AccountWatching() {
  const { userId } = useAuth();
  const [view, setView] = useState('ORG');

  const {
    isLoading: isLoadingOrgs,
    subscribedOrgs,
    refetch: refetchSubscribedOrgs,
  } = getSubscribedOrgs(userId as string, Boolean(userId as string));

  const {
    isLoading: isLoadingBounties,
    subscribedBounties,
    refetch: refetchSubscribedBounties,
  } = getSubscribedBounties(userId as string, Boolean(userId as string));

  const isloading = isLoadingBounties || isLoadingOrgs;

  const numOfSubscriptions = subscribedOrgs?.length || 0;
  const theresMore = numOfSubscriptions > 5;

  const watchingList =
    view === 'INDIVIDUAL' ? subscribedBounties : subscribedOrgs;

  if (isloading) return <Loading small={true} />;
  return (
    <>
      {!isloading && (
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
              {!watchingList?.length && (
                <p className="label text-on-surface-disabled">
                  You are not subscribed to any notifications for{' '}
                  {view !== 'ORG' ? 'bounties' : 'organizations'}
                </p>
              )}
              <AnimatePresence>
                {watchingList?.map((subscription, i) => {
                  return (
                    <motion.div
                      key={subscription.id}
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
                      <SubscriptionEntry
                        subscription={subscription}
                        view={view}
                        refetchSubscribedBounties={() =>
                          refetchSubscribedBounties()
                        }
                        refetchSubscribedOrgs={() => refetchSubscribedOrgs()}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="label space-y-4 border-t-2 border-surface-dark pt-4">
              <div className=" flex items-center gap-2 text-on-surface-disabled">
                <Icon icon="notifications" size={IconSize.Small} />
                {`We'll notify you of changes to organizations and bounties in your
            watching list`}
              </div>
              <AnimatePresence>
                {view === 'Individual' && (
                  <motion.div
                    className=" flex items-center gap-2 text-error-light"
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
      )}
    </>
  );
}
