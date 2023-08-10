import { SubmissionState } from '@prisma/client';
import { useMemo, useState } from 'react';

import { useGetSubmissions } from '@/lib/hooks/submission/useGetSubmissions';
import { Order } from '@/lib/models/Order';

import { SubmissionListEntry } from '@/components/submissions/SubmissionListEntry';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import Icon, { IconSize } from '@/components/utils/Icon';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';

import { useAuth } from '@/auth/AuthContext';

export function AccountSubmissions() {
  const { userId, userInfo } = useAuth();
  const [title, setTitle] = useState('');
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
    count,
  } = useGetSubmissions(query);

  const options = useMemo(() => {
    return [['All', 'All'], ...Object.entries(SubmissionState)].map((entry) => {
      return { label: entry[1] } as HasLabel;
    });
  }, []);

  function hitSearch() {
    setTitle('');
    setQuery({ ...query, title });
  }

  function clearTitle() {
    setTitle('');
    setQuery({ ...query, title: undefined });
  }

  return (
    <div className="w-full space-y-6 py-2">
      <div className="items-center justify-between space-y-2 border-b-1 border-surface pb-4 bt:flex">
        {!userInfo || !userId || !submissions ? (
          <span className="body-sm text-sm text-on-surface-unactive">
            Your submissions will show up here
          </span>
        ) : (
          <span className="body-sm body translate-x-0.5 text-sm  font-bold text-on-surface-unactive">
            {`Submissions (${submissions.length}/${count})`}
          </span>
        )}
        <div className="space-x-8 space-y-4 bt:flex">
          {query.title && (
            <button
              className="group flex items-center gap-2 rounded-full border px-4 py-2"
              onClick={() => clearTitle()}
            >
              <Icon
                icon="close"
                size={IconSize.Small}
                className="group-hover:text-error-light"
              />
              <div className="body-sm flex items-center gap-1">
                <span className="text-left ">Title</span>

                <span className="group-hover:text-error-light">
                  {query.title}
                </span>
              </div>
            </button>
          )}
          {!query.title && (
            <div className="flex items-center gap-4">
              <input
                type="text"
                className="body-sm ml-2 w-full border-0 border-b bg-bg font-medium focus:border-main focus:ring-0 tablet:min-w-[15rem]"
                placeholder="Enter title or target name"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    hitSearch();
                  }
                }}
              />
              <button
                className="label-sm shrink-0 grow rounded-full border border-bg bg-main px-8 py-2 text-center text-on-color"
                onClick={() => hitSearch()}
              >
                Search
              </button>
            </div>
          )}
          <div className="flex justify-between space-x-2">
            <Button
              info={{
                style: ButtonStyle.Text,
                label:
                  query.order === Order.Asc
                    ? 'Old ones first'
                    : 'New ones first',
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
