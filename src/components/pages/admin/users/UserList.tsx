import { Rol } from '@prisma/client';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import { useGetUsers } from '@/lib/hooks/userHooks';
import { Order } from '@/lib/models/Order';

import { Button, ButtonStyle } from '@/components/utils/Button';
import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import Icon, { IconSize } from '@/components/utils/Icon';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';
import { Title } from '@/components/utils/Title';

import { useAuth } from '@/auth/AuthContext';
import { FullUser, GetUsersSchemaParams } from '@/server/routes/users/getUsers';

import { UserEdit } from './UserEdit';
import { UserListItem } from './UserListItem';
import { Section } from '../../landing/Section';

export function UserList() {
  const [submissionsIncreasing, setSubmissionsIncreasing] = useState(false);
  const [acceptedIncreasing, setAcceptedIncreasing] = useState(false);
  const [users, setUsers] = useState<FullUser[]>();
  const [selectedUser, setSelectedUser] = useState<FullUser>();
  const { isAdmin, isFetchingUserInfo } = useAuth();
  const [query, setQuery] = useState<GetUsersSchemaParams>({
    amount: 10,
    paginate: true,
    page: 0,
    role: undefined,
  });
  const {
    users: usersFetch,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
    count,
  } = useGetUsers(query, isAdmin && !isFetchingUserInfo);

  const options = useMemo(() => {
    return [['All', 'All'], ...Object.entries(Rol)].map((entry) => {
      return { label: entry[1] } as HasLabel;
    });
  }, []);

  const sortBySubmissions = () => {
    const increasingOrder = !submissionsIncreasing;
    setUsers(
      users?.sort(
        (a, b) => (a.submissions - b.submissions) * (increasingOrder ? 1 : -1)
      )
    );
    setSubmissionsIncreasing(increasingOrder);
  };

  const sortByAccepetedSubmissions = () => {
    const increasingOrder = !acceptedIncreasing;
    setUsers(
      users?.sort(
        (a, b) =>
          (a.acceptedSubmissions - b.acceptedSubmissions) *
          (increasingOrder ? 1 : -1)
      )
    );
    setAcceptedIncreasing(increasingOrder);
  };

  const clearFilters = () =>
    setQuery({
      amount: 10,
      paginate: true,
      page: 0,
      role: undefined,
    });

  const onUpdate = () => {
    setSelectedUser(undefined);
    setQuery({ ...query, amount: query.amount ? query.amount + 1 : 10 });
  };

  useEffect(() => {
    setUsers(usersFetch);
  }, [isLoading, query]);

  return (
    <section className="w-full space-y-4">
      {selectedUser && (
        <div className="mb-4 w-full border-b-2 border-main">
          <UserEdit
            user={selectedUser}
            setUser={setSelectedUser}
            onUpdate={onUpdate}
          />
        </div>
      )}

      <div className="flex items-center justify-between border-b-1 border-main pb-4">
        {!users ? (
          <Title title="Users will show up here" useBorder={false} big={true} />
        ) : (
          <Title
            title={`Users (${users.length}/${count})`}
            useBorder={false}
            big={true}
          />
        )}
        <div className="flex items-center space-x-4">
          <UsersSearchbar query={query} setQuery={setQuery} />
          <Dropdown
            defaultOptionIndex={0}
            labelClass="border-2 p-2 border-main rounded-md"
            label={query.role ?? 'All'}
            options={options}
            onSelect={({ label: newState }) => {
              setQuery({
                ...query,
                role: newState === 'All' ? undefined : (newState as Rol),
                page: 0,
              });
            }}
          />
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
          <button
            className="label-sm w-fit rounded-md border border-bg bg-surface p-2 text-center text-on-color hover:bg-main"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="grid-cols- gap-8 tablet:grid">
        <div className="grid gap-x-4 gap-y-2 border-b-1 border-surface pb-4 align-baseline tablet:w-full tablet:grid-cols-6">
          <div className="flex flex-col items-start pl-4 text-base font-bold tablet:col-span-1">
            User Id
          </div>
          <div className="place-self-start text-base font-bold tablet:col-span-1 tablet:place-self-center">
            Address
          </div>
          <div className="title col-span-1 block place-self-center text-base font-bold">
            Role
          </div>
          <div className="title col-span-1 block place-self-center text-base font-bold">
            Username
          </div>
          <div
            onClick={sortBySubmissions}
            className="title col-span-1 block place-self-center text-base font-bold underline hover:cursor-pointer"
          >
            Total Submissions
          </div>
          <div
            onClick={sortByAccepetedSubmissions}
            className="title col-span-1 block place-self-center text-base font-bold underline hover:cursor-pointer"
          >
            Accepted Submissions
          </div>
        </div>
        {!isLoading &&
          users &&
          users.length > 0 &&
          users?.map((user) => {
            return (
              <UserListItem
                key={user.address}
                user={user}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            );
          })}
        {!isLoading && users && users.length === 0 && (
          <Section className="grid place-items-center space-y-2">
            <p className="label text-center">No User</p>
            <Button
              info={{
                label: 'Try resetting the filters',
                style: ButtonStyle.TextPurple,
                removePadding: true,
                onClick: clearFilters,
              }}
            />
          </Section>
        )}
      </div>
      {isLoading && <Loading small />}

      {!isLoading && users && users.length > 0 && (
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

export function UsersSearchbar({
  query,
  setQuery,
}: {
  query: GetUsersSchemaParams;
  setQuery: Dispatch<SetStateAction<GetUsersSchemaParams>>;
}) {
  const [userId, setUserId] = useState<string>();
  const [address, setAddress] = useState<string>();

  function hitSearch() {
    setUserId(undefined);
    setAddress(undefined);
    setQuery({ ...query, userId, address });
  }

  function clearUserId() {
    setUserId(undefined);
    setQuery({ ...query, userId: undefined });
  }

  function clearAddress() {
    setAddress(undefined);
    setQuery({ ...query, address: undefined });
  }

  return (
    <div className="grow-[10]">
      <div className="flex space-x-4">
        {query.userId && (
          <button
            className="group flex items-center gap-2 rounded-full border px-4 py-2"
            onClick={() => clearUserId()}
          >
            <Icon
              icon="close"
              size={IconSize.Small}
              className="group-hover:text-error-light"
            />
            <div className="body-sm flex items-center gap-1">
              <span className="text-left ">User ID:</span>

              <span className="group-hover:text-error-light">
                {query.userId}
              </span>
            </div>
          </button>
        )}

        {query.address && (
          <button
            className="group flex items-center gap-2 rounded-full border px-4 py-2"
            onClick={() => clearAddress()}
          >
            <Icon
              icon="close"
              size={IconSize.Small}
              className="group-hover:text-error-light"
            />
            <div className="body-sm flex items-center gap-1">
              <span className="text-left ">Title</span>

              <span className="group-hover:text-error-light">
                {query.address}
              </span>
            </div>
          </button>
        )}
      </div>

      {!query.userId && !query.address && (
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="body-sm w-full border-0 border-b bg-bg font-medium focus:border-main focus:ring-0"
            placeholder="Enter User Id"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                hitSearch();
              }
            }}
          />
          <input
            type="text"
            className="body-sm ml-2 w-full border-0 border-b bg-bg font-medium focus:border-main focus:ring-0"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
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
    </div>
  );
}
