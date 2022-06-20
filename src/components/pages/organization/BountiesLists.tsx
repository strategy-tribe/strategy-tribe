import { Bounty } from '@/lib/models/bounty';
import { BountyState } from '@/lib/models/status';
import { useAuth } from 'auth/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { BountyEntry } from '@/components/utils/BountyEntry';
import Icon from '@/components/utils/Icon';
import Loading from '@/components/utils/Loading';

export function BountiesLists({
  bounties,
  isLoading,
  searchFilter = '',
}: {
  isLoading: boolean | undefined;
  bounties: Bounty[];
  searchFilter?: string;
}) {
  const openBounties = useMemo(() => {
    const searchTerm = searchFilter.toLocaleLowerCase();
    return bounties?.filter(
      (p) =>
        p.state === BountyState.Open &&
        (p.title.toLocaleLowerCase().includes(searchTerm) ||
          p.name.toLowerCase().includes(searchTerm) ||
          p.description?.includes(searchTerm) ||
          p.organizationName.toLocaleLowerCase().includes(searchTerm))
    );
  }, [bounties, searchFilter]);
  const closedBounties = useMemo(() => {
    const searchTerm = searchFilter.toLocaleLowerCase();
    return bounties?.filter(
      (p) =>
        p.state === BountyState.Closed &&
        (p.title.toLocaleLowerCase().includes(searchTerm) ||
          p.name.toLowerCase().includes(searchTerm) ||
          p.description?.includes(searchTerm) ||
          p.organizationName.toLocaleLowerCase().includes(searchTerm))
    );
  }, [bounties, searchFilter]);
  const commingSoonBounties = useMemo(() => {
    const searchTerm = searchFilter.toLocaleLowerCase();
    return bounties?.filter(
      (p) =>
        p.state === BountyState.WaitingForFunds &&
        (p.title.toLocaleLowerCase().includes(searchTerm) ||
          p.name.toLowerCase().includes(searchTerm) ||
          p.description?.includes(searchTerm) ||
          p.organizationName.toLocaleLowerCase().includes(searchTerm))
    );
  }, [bounties, searchFilter]);
  const paymentNeededBounties = useMemo(() => {
    const searchTerm = searchFilter.toLocaleLowerCase();
    return bounties?.filter(
      (p) =>
        p.state === BountyState.PaymentNeeded &&
        (p.title.toLocaleLowerCase().includes(searchTerm) ||
          p.name.toLowerCase().includes(searchTerm) ||
          p.description?.includes(searchTerm) ||
          p.organizationName.toLocaleLowerCase().includes(searchTerm))
    );
  }, [bounties, searchFilter]);
  const { isStaff } = useAuth();

  return (
    <div className="max-w-xl space-y-4">
      {isLoading && (
        <div className="col-span-2 w-full grid place-items-center">
          <Loading fullScreen={false} />
        </div>
      )}

      {!isLoading && (
        <div className="space-y-8 col-span-2 w-full max-w-xl">
          {/* Comming soon */}
          {isStaff && (
            <List
              bounties={commingSoonBounties}
              title="Coming soon"
              _expanded={true}
            />
          )}

          {/* Open */}
          <List
            bounties={openBounties}
            title={isStaff ? 'Open' : undefined}
            _expanded={!isStaff}
          />

          {/* Pay  */}
          {isStaff && (
            <List bounties={paymentNeededBounties} title="Payment needed" />
          )}

          {/* Closed */}
          {isStaff && <List bounties={closedBounties} title="Closed" />}
          {isLoading && <Loading fullScreen={false} />}
        </div>
      )}
    </div>
  );
}

function List({
  title,
  bounties,
  _expanded = false,
}: {
  _expanded?: boolean;
  title?: string;
  bounties: Bounty[];
}) {
  const atLeast1 = bounties.length > 0;
  const [expanded, setExpanded] = useState(atLeast1 ? _expanded : false);

  return (
    <div>
      {title && (
        <button
          className={`group font-grotesk label-lg text-unactive flex items-center gap-4 ${
            atLeast1 && 'hover:text-white'
          }`}
          onClick={() => setExpanded(!expanded)}
          disabled={bounties.length < 1}
        >
          <span>
            {title} ({bounties.length})
          </span>
          {!expanded && atLeast1 && <Icon icon="unfold_more" />}
          {expanded && <Icon icon="unfold_less" />}
        </button>
      )}

      {/* List */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, y: -5, transition: { duration: 0.1 } }}
          >
            <div className="mt-4 space-y-8">
              {bounties &&
                atLeast1 &&
                bounties.map((obj, i) => {
                  return <BountyEntry key={i} bounty={obj} />;
                })}
            </div>

            {/* No bounties */}
            {bounties.length < 1 && (
              <span className="text-unactive label">
                No bounties match this category at this moment.
                <br />
                You can subscribe to receive notifications of new bounties.
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
