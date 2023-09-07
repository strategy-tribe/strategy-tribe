import { BountyState, Organization, Tag, WalletControl } from '@prisma/client';
import { useEffect, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import {
  useDeleteBounty,
  useEditBounty,
  useGetFullBounty,
} from '@/lib/hooks/bountyHooks';

import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Loading from '@/components/utils/Loading';
import { Title } from '@/components/utils/Title';

import {
  FullBounty,
  GetFullBountyParams,
} from '@/server/routes/bounties/getFullBounty';

export function EditBounty({
  config,
  cancel,
}: {
  config: GetFullBountyParams;
  cancel: () => void;
}) {
  const { bounties, isLoading } = useGetFullBounty(config);
  const [bounty, setBounty] = useState<FullBounty>();
  const [bountyTags, setBountyTags] = useState('');
  const [orgTags, setOrgTags] = useState('');
  const [countries, setCountries] = useState('');

  const { notify } = useNotification();
  const { Edit, isLoading: isUpdating } = useEditBounty({
    onMutate: () => {
      notify(
        {
          title: 'Updating Bounty',
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
    onSuccess: (data) => {
      notify(
        {
          title: 'Bounty Updated',
          style: NotificationStyle.success,
        },
        {
          condition: false,
          delayTime: 5,
          delayType: DelayType.Time,
          type: NotificationType.Banner,
        }
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (error) => {
      notify(
        {
          title: 'Updation Failed',
          content: `${error.message}`,
          icon: 'warning',
          style: NotificationStyle.error,
        },
        {
          condition: false,
          delayTime: 5,
          delayType: DelayType.Condition,
          type: NotificationType.Banner,
        }
      );
      cancel();
    },
  });

  const { Delete } = useDeleteBounty({
    onMutate: () => {
      notify(
        {
          title: 'Deleteing Bounty',
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
    onSuccess: () => {
      notify(
        {
          title: 'Bounty Deleted',
          style: NotificationStyle.success,
        },
        {
          condition: false,
          delayTime: 5,
          delayType: DelayType.Time,
          type: NotificationType.Banner,
        }
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (error) => {
      notify(
        {
          title: 'Deletion Failed',
          content: `${error.message}`,
          icon: 'warning',
          style: NotificationStyle.error,
        },
        {
          condition: false,
          delayTime: 5,
          delayType: DelayType.Condition,
          type: NotificationType.Banner,
        }
      );
    },
  });

  const editBounty = async () => {
    if (bounty) {
      Edit({
        ...bounty,
        tags: {
          new: bountyTags
            .toLowerCase()
            .split('\n')
            .map((name) => ({
              id: '',
              name,
              updatedAt: new Date(),
              createdAt: new Date(),
            })),
          old: bounties[0].tags,
        },
        target: {
          ...bounty.target,
          org: {
            ...(bounty.target.org as Organization),
            tags: {
              new: orgTags
                .toLowerCase()
                .split('\n')
                .map((name) => ({
                  id: '',
                  name,
                  updatedAt: new Date(),
                  createdAt: new Date(),
                })),
              old: bounties[0].target.org?.tags as Tag[],
            },
            countries: {
              new: countries.split('\n').map((name) => ({
                id: '',
                name: name,
                code: '',
                updatedAt: new Date(),
                createdAt: new Date(),
              })),
              old: bounties[0].target.org?.countries as Tag[],
            },
          },
        },
      });
    }
  };

  const setData = () => {
    setBounty({ ...bounties[0] });
    setBountyTags(bounties[0].tags.map((tag) => tag.name).join('\n'));
    setOrgTags(
      bounties[0].target.org?.tags.map((tag) => tag.name).join('\n') as string
    );
    setCountries(
      bounties[0].target.org?.countries.map((c) => c.name).join('\n') as string
    );
  };

  useEffect(() => {
    if (!bounty && bounties.length === 1) {
      setData();
    }
  }, [bounties]);

  return (
    <div>
      <Title title="Selected bounty" />
      {isLoading && <Loading small />}
      {!isLoading && bounties.length === 0 && <div>Found no bounties</div>}
      {bounties.length > 1 && (
        <div>Found more than one bounty, please change the filters</div>
      )}
      {bounty && (
        <div className="space-y-2">
          <div className="items-center space-y-4 border-2 border-surface p-4">
            <label className="flex justify-center px-2 font-bold text-main">
              Bounty Data
            </label>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Bounty title:
              </label>
              <input
                type="text"
                placeholder="Search"
                value={bounty.title}
                onChange={(e) =>
                  setBounty({ ...bounty, title: e.target.value })
                }
                className="col-span-4 mt-2 w-full justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
              />
            </div>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Description:
              </label>
              <ReactTextareaAutosize
                placeholder="No desciption added yet"
                className="col-span-4 mt-2 w-full justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                onChange={(e) =>
                  setBounty({ ...bounty, description: e.target.value })
                }
                value={bounty.description}
                minRows={1}
              />
            </div>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Closes At:
              </label>
              <input
                type="date"
                placeholder="Search"
                value={bounty.closesAt.toISOString().split('T')[0]}
                onChange={(e) => {
                  setBounty({ ...bounty, closesAt: new Date(e.target.value) });
                }}
                className="col-span-4 mt-2 justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
              />
            </div>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Tags:
              </label>
              <ReactTextareaAutosize
                placeholder="No desciption added yet"
                className="col-span-4 mt-2 w-full justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                onChange={(e) => setBountyTags(e.target.value)}
                value={bountyTags}
                minRows={1}
              />
            </div>
          </div>
          <div className="items-center space-y-4 border-2 border-surface p-4">
            <label className="flex justify-center px-2 font-bold text-main">
              Target Data
            </label>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Target Name:
              </label>
              <input
                type="text"
                placeholder="Search"
                value={bounty.target.name}
                onChange={(e) =>
                  setBounty({
                    ...bounty,
                    target: { ...bounty.target, name: e.target.value },
                  })
                }
                className="col-span-4 mt-2 w-full justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
              />
            </div>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Also Known As:
              </label>
              <ReactTextareaAutosize
                placeholder="No alias available"
                className="col-span-4 mt-2 w-full justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                onChange={(e) =>
                  setBounty({
                    ...bounty,
                    target: {
                      ...bounty.target,
                      alsoKnownAs: e.target.value.split('\n'),
                    },
                  })
                }
                value={bounty.target.alsoKnownAs.join('\n')}
                minRows={1}
              />
            </div>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Bio:
              </label>
              <ReactTextareaAutosize
                placeholder="No bio available"
                className="col-span-4 mt-2 w-full justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                onChange={(e) =>
                  setBounty({
                    ...bounty,
                    target: { ...bounty.target, bio: e.target.value },
                  })
                }
                value={bounty.target.bio as string}
                minRows={1}
              />
            </div>
          </div>
          <div className="items-center space-y-4 border-2 border-surface p-4">
            <label className="flex justify-center px-2 font-bold text-main">
              Organization Data
            </label>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Organization Name:
              </label>
              <input
                type="text"
                placeholder="Search"
                value={bounty.target.org?.name}
                onChange={(e) =>
                  setBounty({
                    ...bounty,
                    target: {
                      ...bounty.target,
                      org: { ...bounty.target.org!, name: e.target.value },
                    },
                  })
                }
                className="col-span-4 mt-2 w-full justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
              />
            </div>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Also Known As:
              </label>
              <ReactTextareaAutosize
                placeholder="No alias available"
                className="col-span-4 mt-2 w-full justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                onChange={(e) =>
                  setBounty({
                    ...bounty,
                    target: {
                      ...bounty.target,
                      org: {
                        ...bounty.target.org!,
                        alsoKnownAs: e.target.value.split('\n'),
                      },
                    },
                  })
                }
                value={bounty.target.org?.alsoKnownAs.join('\n')}
                minRows={1}
              />
            </div>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Bio:
              </label>
              <ReactTextareaAutosize
                placeholder="No bio added yet"
                className="col-span-4 mt-2 w-full justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                onChange={(e) =>
                  setBounty({
                    ...bounty,
                    target: {
                      ...bounty.target,
                      org: { ...bounty.target.org!, bio: e.target.value },
                    },
                  })
                }
                value={bounty.target.org?.bio as string}
                minRows={1}
              />
            </div>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Why:
              </label>
              <ReactTextareaAutosize
                placeholder="No reason(why) added yet"
                className="col-span-4 mt-2 w-full justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                onChange={(e) =>
                  setBounty({
                    ...bounty,
                    target: {
                      ...bounty.target,
                      org: { ...bounty.target.org!, why: e.target.value },
                    },
                  })
                }
                value={bounty.target.org?.why as string}
                minRows={1}
              />
            </div>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Links:
              </label>
              <ReactTextareaAutosize
                placeholder="No links available"
                className="col-span-4 mt-2 w-full justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                onChange={(e) =>
                  setBounty({
                    ...bounty,
                    target: {
                      ...bounty.target,
                      org: {
                        ...bounty.target.org!,
                        links: e.target.value.split('\n'),
                      },
                    },
                  })
                }
                value={bounty.target.org?.links.join('\n')}
                minRows={1}
              />
            </div>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Tags:
              </label>
              <ReactTextareaAutosize
                placeholder="No desciption added yet"
                className="col-span-4 mt-2 w-full justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                onChange={(e) => setOrgTags(e.target.value)}
                value={orgTags}
                minRows={1}
              />
            </div>
            <div className="grid grid-cols-5 items-baseline justify-center">
              <label className="col-span-1 justify-self-end px-2 font-bold">
                Countries:
              </label>
              <ReactTextareaAutosize
                placeholder="No desciption added yet"
                className="col-span-4 mt-2 w-full justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                onChange={(e) => setCountries(e.target.value)}
                value={countries}
                minRows={1}
              />
            </div>
          </div>

          {bounty.wallet.walletControl && (
            <div className="flex flex-wrap items-center justify-between space-y-4 border-2 border-surface p-4">
              <label className="flex w-full justify-center px-2 font-bold text-main">
                Wallet Config
              </label>
              <div className="items-baseline justify-center px-12">
                <label className="col-span-1 justify-self-end px-2 font-bold">
                  Current Bounty:
                </label>
                <input
                  type="number"
                  placeholder="0.0"
                  value={bounty.wallet.balance}
                  min={0}
                  onChange={(e) =>
                    setBounty({
                      ...bounty,
                      wallet: {
                        ...bounty.wallet,
                        balance: parseFloat(e.target.value),
                      },
                    })
                  }
                  className="col-span-4 mt-2 justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                />
              </div>
              <div className="items-baseline justify-center px-12">
                <label className="col-span-1 justify-self-end px-2 font-bold">
                  Initial Amount:
                </label>
                <input
                  type="number"
                  placeholder="0.0"
                  value={bounty.wallet.walletControl.initial}
                  min={0}
                  onChange={(e) =>
                    setBounty({
                      ...bounty,
                      wallet: {
                        ...bounty.wallet,
                        walletControl: {
                          ...bounty.wallet.walletControl,
                          initial: parseFloat(e.target.value),
                        } as WalletControl,
                      },
                    })
                  }
                  className="col-span-4 mt-2 justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                />
              </div>
              <div className="items-baseline justify-center px-16">
                <label className="col-span-1 justify-self-end px-2 font-bold">
                  Increment By:
                </label>
                <input
                  type="number"
                  placeholder="0.0"
                  value={bounty.wallet.walletControl.incrementBy}
                  min={0}
                  onChange={(e) =>
                    setBounty({
                      ...bounty,
                      wallet: {
                        ...bounty.wallet,
                        walletControl: {
                          ...bounty.wallet.walletControl,
                          incrementBy: parseFloat(e.target.value),
                        } as WalletControl,
                      },
                    })
                  }
                  className="col-span-4 mt-2 justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                />
              </div>
              <div className="items-baseline justify-center px-12">
                <label className="col-span-1 justify-self-end px-2 font-bold">
                  Days to increment again:
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={bounty.wallet.walletControl.incrementInDays}
                  min={0}
                  onChange={(e) =>
                    setBounty({
                      ...bounty,
                      wallet: {
                        ...bounty.wallet,
                        walletControl: {
                          ...bounty.wallet.walletControl,
                          incrementInDays: parseInt(e.target.value),
                        } as WalletControl,
                      },
                    })
                  }
                  className="col-span-4 mt-2 justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                />
              </div>
              <div className="items-baseline justify-center px-12">
                <label className="col-span-1 justify-self-end px-2 font-bold">
                  Next increment on:
                </label>
                <input
                  type="date"
                  placeholder="date"
                  value={
                    bounty.wallet.walletControl.nextIncrementOn
                      .toISOString()
                      .split('T')[0]
                  }
                  onChange={(e) =>
                    setBounty({
                      ...bounty,
                      wallet: {
                        ...bounty.wallet,
                        walletControl: {
                          ...bounty.wallet.walletControl,
                          nextIncrementOn: new Date(e.target.value),
                        } as WalletControl,
                      },
                    })
                  }
                  className="col-span-4 mt-2 justify-self-start rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between py-4">
            <Button
              info={{
                style: ButtonStyle.Hollow,
                onClick: setData,
                disabled: false,
                label: 'Reset Data',
              }}
            />
            <Button
              info={{
                style: ButtonStyle.Filled,
                onClick: () => {
                  const confirmed = window.confirm('Edit this bounty?');
                  if (confirmed) editBounty();
                },
                disabled: false,
                label: 'Update Bounty',
              }}
            />
            {bounty.status !== BountyState.Closed && (
              <Button
                info={{
                  style: ButtonStyle.HollowDark,
                  onClick: () => {
                    const confirmed = window.confirm('DELETE? \nAre you sure?');
                    if (confirmed) Delete({ slug: bounty.slug });
                  },
                  disabled: false,
                  label: 'Delete Bounty',
                  className: 'bg-error hover:bg-error-light',
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
