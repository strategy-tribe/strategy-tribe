import { SubmissionState } from '@prisma/client';
import { useMemo, useState } from 'react';

import { useGetSubmissions } from '@/lib/hooks/submission/useGetSubmissions';
import { Order } from '@/lib/models/Order';

import { SubmissionListEntry } from '@/components/submissions/SubmissionListEntry';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import { IconSize } from '@/components/utils/Icon';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';

import { useAuth } from '@/auth/AuthContext';

export function AccountSubmissions() {
  const { userId, userInfo } = useAuth();
  const [query, setQuery] = useState<any>({
    order: Order.Asc,
    amount: 10,
    paginate: true,
    page: 0,
  });

  const {
    submissions,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
  } = useGetSubmissions(query);

  const options = useMemo(() => {
    return [['All', 'All'], ...Object.entries(SubmissionState)].map((entry) => {
      return { label: entry[1] } as HasLabel;
    });
  }, []);

  return (
    <div className="w-full space-y-6 py-2">
      <div className="flex items-center justify-between border-b-1 border-surface pb-4">
        {!userInfo || !userId || !submissions ? (
          <span className="body-sm text-sm text-on-surface-unactive">
            Your submissions will show up here
          </span>
        ) : (
          <span className="body-sm body translate-x-0.5 text-sm  font-bold text-on-surface-unactive">
            {submissions.length}{' '}
            {submissions.length === 1 ? 'Submission' : 'Submissions'}
          </span>
        )}
        <div className="flex space-x-8">
          <Button
            info={{
              style: ButtonStyle.Text,
              label:
                query.order === Order.Asc ? 'Old ones first' : 'New ones first',
              icon: 'date_range',
              removeMinWidth: true,
              iconSize: IconSize.Small,
              removePadding: true,
              onClick: () => {
                setQuery({
                  ...query,
                  order: query.order === Order.Asc ? Order.Desc : Order.Asc,
                  page: 0,
                });
              },
            }}
          />
          <Dropdown
            defaultOptionIndex={0}
            labelClass="border-2 p-2 border-main rounded-md"
            options={options}
            onSelect={({ label: newState }) => {
              setQuery({
                ...query,
                state:
                  newState === 'All'
                    ? undefined
                    : (newState as SubmissionState),
                page: 0,
              });
            }}
          />
        </div>
      </div>
      {isLoading && <Loading small />}

      {submissions &&
        submissions?.map((s, i) => {
          return <SubmissionListEntry submission={s} key={i} />;
        })}

      {!isLoading && submissions && submissions.length > 0 && (
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
    </div>
  );
}
