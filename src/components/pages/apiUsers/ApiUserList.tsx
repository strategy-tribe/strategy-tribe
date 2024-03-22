import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

import { useGetApiUsers } from '@/lib/hooks/apiUserHooks';
import { GoToNewApiUserPage } from '@/lib/utils/Routes';

import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import Icon, { IconSize } from '@/components/utils/Icon';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';
import { Title } from '@/components/utils/Title';

import { GetApiUsersParams } from '@/server/routes/apiUsers/getApiUsers';

import { ApiUserListItem } from './ApiUserListItem';

export function ApiUserList() {
  const router = useRouter();
  const [query, setQuery] = useState<any>({
    amount: 10,
    paginate: true,
    page: 0,
  });

  const {
    apiUsers,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
    count,
  } = useGetApiUsers(query);

  const options = useMemo(() => {
    return ['All', 'Active', 'Inactive'].map((entry) => {
      return { label: entry } as HasLabel;
    });
  }, []);

  const getStatus = (newState: string) => {
    switch (newState) {
      case 'All':
        return undefined;
      case 'Active':
        return true;
      case 'Inactive':
        return false;
      default:
        break;
    }
  };

  return (
    <section className="w-full space-y-4">
      <div className="flex items-center justify-between border-b-1 border-main pb-4">
        <div className="flex items-center gap-4">
          {!apiUsers ? (
            <Title
              title="ApiUsers will show up here"
              useBorder={false}
              big={true}
            />
          ) : (
            <Title
              title={`ApiUsers (${apiUsers.length}/${count})`}
              useBorder={false}
              big={true}
            />
          )}
          <button
            onClick={() => router.push(GoToNewApiUserPage())}
            className="label rounded bg-surface py-2 px-5 hover:bg-main"
          >
            Add New
          </button>
        </div>

        <div className="flex space-x-8">
          <ApiUsersSearchBar query={query} setQuery={setQuery} />
          <Dropdown
            defaultOptionIndex={0}
            labelClass="border-2 p-2 border-main rounded-md"
            options={options}
            onSelect={({ label: newState }) => {
              setQuery({
                ...query,
                isActive: getStatus(newState),
              });
            }}
          />
        </div>
      </div>

      <div className="grid-cols- gap-8 tablet:grid">
        <div className="grid gap-x-4 gap-y-2 border-b-1 border-surface pb-4 align-baseline tablet:w-full tablet:grid-cols-6">
          <div className="flex flex-col items-start pl-4 text-base font-bold tablet:col-span-1">
            Name
          </div>
          <div className="place-self-start text-base font-bold tablet:col-span-1 tablet:place-self-center">
            Status
          </div>
          <div className="title col-span-1 block place-self-center text-base font-bold">
            Token
          </div>
          <div className="title col-span-3 block place-self-center text-base font-bold">
            Tags
          </div>
        </div>
        {apiUsers &&
          apiUsers?.map((apiUser) => {
            return <ApiUserListItem key={apiUser.token} apiUser={apiUser} />;
          })}
      </div>
      {isLoading && <Loading small />}

      {!isLoading && apiUsers && apiUsers.length > 0 && (
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

export function ApiUsersSearchBar({
  query,
  setQuery,
}: {
  query: GetApiUsersParams;
  setQuery: Dispatch<SetStateAction<GetApiUsersParams>>;
}) {
  const [tags, setTags] = useState('');
  const [name, setName] = useState('');

  function hitSearch() {
    setTags('');
    setName('');
    const searchTags =
      tags === '' ? undefined : tags.split(',').map((tag) => tag.trim());
    setQuery({
      ...query,
      tags: searchTags,
      name: name === '' ? undefined : name,
    });
  }

  function clearTag(tagRemove: string) {
    const tags = query.tags?.filter((tag) => tag !== tagRemove);
    setQuery({ ...query, tags: tags?.length === 0 ? undefined : tags });
  }

  function clearName() {
    setName('');
    setQuery({ ...query, name: undefined });
  }

  return (
    <div className="grow-[10]">
      <div className="flex space-x-4">
        {query.tags &&
          query.tags.at(0) &&
          query.tags.map((tag) => (
            <button
              key={tag}
              className="group flex items-center gap-2 rounded-full border px-4 py-2"
              onClick={() => clearTag(tag)}
            >
              <Icon
                icon="close"
                size={IconSize.Small}
                className="group-hover:text-error-light"
              />
              <div className="body-sm flex items-center gap-1">
                <span className="group-hover:text-error-light">{tag}</span>
              </div>
            </button>
          ))}

        {query.name && (
          <button
            className="group flex items-center gap-2 rounded-full border px-4 py-2"
            onClick={() => clearName()}
          >
            <Icon
              icon="close"
              size={IconSize.Small}
              className="group-hover:text-error-light"
            />
            <div className="body-sm flex items-center gap-1">
              <span className="text-left ">Name</span>

              <span className="group-hover:text-error-light">{query.name}</span>
            </div>
          </button>
        )}
      </div>

      {(!query.tags || !query?.tags?.at(0)) && !query.name && (
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="body-sm ml-2  w-full min-w-[12rem] border-0 border-b bg-bg font-medium focus:border-main focus:ring-0"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                hitSearch();
              }
            }}
          />
          <input
            type="text"
            className="body-sm w-full min-w-[20rem] border-0 border-b bg-bg font-medium focus:border-main focus:ring-0"
            placeholder="Enter tags with comma"
            value={tags}
            onChange={(e) => {
              setTags(e.target.value.toLowerCase());
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
