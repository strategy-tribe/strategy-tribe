import { useMemo, useState } from 'react';

import { useGetReferrals } from '@/lib/hooks/userHooks';

import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';

import { useAuth } from '@/auth/AuthContext';
import { Referral } from '@/server/routes/referrals/getReferrals';

export function AccountReferrals() {
  const { userId } = useAuth();
  const [query, setQuery] = useState<any>({
    amount: 10,
    paginate: true,
    page: 0,
  });

  const {
    referrals,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
  } = useGetReferrals(query, !!userId);

  const options = useMemo(() => {
    return ['All', 'Paid', 'In progress'].map((entry) => {
      return { label: entry } as HasLabel;
    });
  }, []);

  const getStatus = (newState: string) => {
    switch (newState) {
      case 'All':
        return undefined;
      case 'In progress':
        return false;
      case 'Paid':
        return true;
      default:
        break;
    }
  };

  return (
    <section className="w-full space-y-4">
      <div className="breakWord flex items-center justify-between border-b-1 border-surface pb-4">
        {!userId || !referrals ? (
          <span className="body-sm text-sm text-on-surface-unactive">
            Your referrals will show up here
          </span>
        ) : (
          <span className="body-sm text-sm  font-bold text-on-surface-unactive">
            {referrals?.length}{' '}
            {referrals?.length === 1 ? 'Referral' : 'Referrals'}
          </span>
        )}
        <Dropdown
          defaultOptionIndex={0}
          labelClass="border-2 p-2 border-main rounded-md"
          options={options}
          onSelect={({ label: newState }) => {
            setQuery({
              ...query,
              status: getStatus(newState),
            });
          }}
        />
      </div>

      <div className="space-y-10">
        <div className="flex w-full grid-cols-10 flex-wrap place-items-center gap-2 border-b-2 border-surface pb-2 tablet:grid tablet:gap-x-4">
          <h5 className="title-sm col-span-3">Referral Id</h5>
          <h5 className="title-sm col-span-1">Status</h5>
          <h5 className="title-sm breakWord col-span-3">New User</h5>
          <h5 className="title-sm breakWord col-span-3">Transaction</h5>
        </div>
        {referrals &&
          referrals?.map((referral) => {
            return <ReferralListEntry referral={referral} key={referral.id} />;
          })}
      </div>
      {isLoading && <Loading small />}

      {!isLoading && referrals && referrals.length > 0 && (
        <PageControls
          config={{
            query,
            setQuery,
            numOfPages,
            currPage,
            hasNextPage,
            hasPreviousPage,
            isLoading,
          }}
        />
      )}
    </section>
  );
}

function ReferralStatusShower({ status }: { status: boolean | undefined }) {
  const { isAdmin, isStaff } = useAuth();

  const color = () => {
    switch (status) {
      case true:
        return 'border-success text-success';
      default:
        return 'border-waiting text-waiting';
    }
  };

  const label = () => {
    switch (status) {
      case false:
        return isAdmin || isStaff ? 'Unpaid' : 'In progress';
      case true:
        return 'Paid';
      default:
        break;
    }
  };

  return (
    <div
      className={`${color()} label-sm w-fit whitespace-nowrap rounded-full border-2 py-2 px-6 first-letter:capitalize`}
    >
      {label()}
    </div>
  );
}

export function ReferralListEntry({ referral }: { referral: Referral }) {
  const { isAdmin } = useAuth();

  return (
    <div className="flex w-full grid-cols-10 flex-wrap place-items-center gap-2 tablet:grid tablet:gap-x-4">
      <h5 className="title-sm col-span-3">{referral.id}</h5>

      <ReferralStatusShower status={referral.referralPaid} />

      <h5 className="title-sm breakWord col-span-3">
        {referral.newUser?.address ?? 'Unavailable'}
      </h5>
      <h5 className="title-sm breakWord col-span-3">
        {referral.txnHash ?? 'Pending'}
      </h5>
    </div>
  );
}
