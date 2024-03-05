import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { v4 as uuidv4 } from 'uuid';

import { useSubmitApiUser } from '@/lib/hooks/apiUserHooks';
import { GoToApiUsersPage } from '@/lib/utils/Routes';

import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import { Title } from '@/components/utils/Title';

import { PostApiUserParams } from '@/server/routes/apiUsers/postApiUser';

import { FilterColumn } from '../explore/filters/utils/FilterColumnHeader';
import { FilterSearchBox } from '../explore/filters/utils/SearchBox';
import { SearchResultType } from '../explore/filters/utils/types';

export function ApiUserEdit({
  apiUser,
  setApiUser,
}: {
  apiUser: PostApiUserParams;
  setApiUser: Dispatch<SetStateAction<PostApiUserParams>>;
}) {
  const { notify: notify } = useNotification();

  const router = useRouter();

  const { SubmitApiUser } = useSubmitApiUser({
    onMutate: () => {
      notify(
        {
          title: 'Saving ApiUser ...',
          content: 'Please do not close this window',
          icon: 'warning',
        },
        {
          delayTime: 0,
          delayType: DelayType.Condition,
          condition: false,
          type: NotificationType.Banner,
        }
      );
    },
    onSuccess: (apiUserId) => {
      router.push(GoToApiUsersPage());
      notify(
        {
          title: 'ApiUser Saved',
          style: NotificationStyle.success,
        },
        {
          condition: false,
          delayTime: 5,
          delayType: DelayType.Time,
          type: NotificationType.Pill,
        }
      );
    },
    onError: (error) => {
      notify(
        {
          title: 'There was an issue saving the apiUser',
          content: error.message,
          icon: 'warning',
          style: NotificationStyle.error,
        },
        {
          condition: false,
          delayTime: 10,
          delayType: DelayType.Time,
          type: NotificationType.Banner,
        }
      );
    },
  });

  return (
    <div className="max-w-8xl mx-2 flex min-h-screen flex-col items-center space-y-8 p-4">
      <div className="sticky top-[5rem] z-20 flex w-full justify-center border-b-2 border-surface bg-bg py-4">
        <Title
          title={apiUser.id ? 'Edit ApiUser' : 'Add new apiUser'}
          useBorder={true}
          big={true}
        />
      </div>

      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          SubmitApiUser({
            ...apiUser,
          });
        }}
      >
        <div className="flex grid grid-cols-5 items-baseline">
          <label className="col-span-2 justify-self-end px-2 font-bold">
            External party name:
          </label>
          <input
            type="text"
            placeholder="Target name as in ST"
            required
            value={apiUser.name}
            onChange={(e) => setApiUser({ ...apiUser, name: e.target.value })}
            className="col-span-2 mx-2 mt-2 min-w-[24rem] justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
          />
        </div>
        <div className="flex grid grid-cols-5 items-baseline">
          <label className="col-span-2 justify-self-end px-2 font-bold">
            Token:
          </label>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Target name as in ST"
              required
              readOnly
              value={apiUser.token}
              onClick={() => {
                navigator.clipboard.writeText(apiUser.token);
                notify(
                  { title: 'Copied', content: apiUser.token },
                  {
                    condition: false,
                    delayTime: 2,
                    delayType: DelayType.Time,
                    type: NotificationType.Pill,
                  }
                );
              }}
              className="mx-2 mt-2 min-w-[24rem] justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive hover:cursor-pointer focus:border-main-light"
            />
            <button
              className="label mx-4 rounded bg-main py-2 px-2 hover:bg-open-bounty"
              type="button"
              onClick={() => setApiUser({ ...apiUser, token: uuidv4() })}
            >
              Change Token
            </button>
          </div>
        </div>

        <div className="flex grid grid-cols-5 items-center">
          <label className="col-span-2 justify-self-end px-2 font-bold">
            Status:
          </label>
          <button
            className={`${
              apiUser.isActive
                ? 'border-main-light text-main-light'
                : 'border-on-surface-disabled text-on-surface-disabled'
            } 
        label-sm mx-2 h-fit w-fit whitespace-nowrap rounded-full border-2 py-2 px-4 first-letter:capitalize`}
            type="button"
            onClick={() =>
              setApiUser({ ...apiUser, isActive: !apiUser.isActive })
            }
          >
            <div className="text-sm">
              {apiUser.isActive ? 'Active' : 'Inactive'}
            </div>
            <div className="text-xs">Click to toggle</div>
          </button>
        </div>

        <div className="flex grid  grid-cols-5 items-start">
          <label className="col-span-2 mt-8 justify-self-end px-2 font-bold">
            Tags:
          </label>
          <div className="col-span-3 w-[24rem]">
            <ReactTextareaAutosize
              placeholder={`Add exact tag name in new lines.\n(Ideal use to paste multiple tags together)`}
              className=" m-2 min-w-[24rem] justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
              onChange={(e) =>
                setApiUser({
                  ...apiUser,
                  tags: e.target.value
                    .toLowerCase()
                    .split('\n')
                    .map((tag) => tag.trim()),
                })
              }
              value={apiUser.tags.join('\n')}
              minRows={2}
            />
            <div className="pl-2 pb-4 text-xs">
              Will have access to bounties with these tags. <br /> Add no tags
              to grand access to all submissions
            </div>
            <TagsFilter apiUser={apiUser} setApiUser={setApiUser} />
          </div>
        </div>

        <div className="align-center flex justify-around">
          <button
            type="button"
            onClick={() => router.push(GoToApiUsersPage())}
            className="label rounded border-2 border-main py-2 px-5 text-sm hover:bg-open-bounty"
          >
            Go back
          </button>

          <button
            type="submit"
            className="label rounded bg-main py-2 px-5 text-sm hover:bg-open-bounty"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

function TagsFilter({
  apiUser,
  setApiUser,
}: {
  apiUser: PostApiUserParams;
  setApiUser: Dispatch<SetStateAction<PostApiUserParams>>;
}) {
  return (
    <>
      <FilterColumn
        name="Find Tags"
        tooltip="Use this to find Tags (Only select Tag icons)"
      >
        <FilterSearchBox
          selectedResults={apiUser.tags.map((tag) => ({
            type: SearchResultType.Tag,
            name: tag,
          }))}
          setSelected={(newResults) => {
            setApiUser({
              ...apiUser,
              tags: newResults
                .filter((r) => r.type === SearchResultType.Tag)
                .map((r) => r.name),
            });
          }}
          remove={(name) => {
            setApiUser({
              ...apiUser,
              tags: apiUser.tags.filter((tag) => tag !== name),
            });
          }}
        />
      </FilterColumn>
    </>
  );
}
