import React, { useState } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useScrollToTop } from '@/hooks/useScrollTo';
import { useAuth } from 'auth/AuthContext';

import { Bounty } from '@/lib/models/bounty';
import { GetDateInString } from '@/utils/DateHelpers';
import Icon from '@/components/utils/Icon';
import { Stat } from '../../submission/Stat';

export function Step4Details({
  showSubmissions,
  bounty,
  hidden = false,
}: {
  showSubmissions?: () => void;
  bounty: Bounty;
  hidden?: boolean;
}) {
  const { isStaff } = useAuth();
  const [fullDescription, setFullDescription] = useState(false);

  //UI
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  useScrollDirection(
    () => setIsScrollingUp(true),
    () => setIsScrollingUp(false),
    100
  );

  const scrollToTop = useScrollToTop();

  const requeriedConditions = bounty.requirements?.filter((f) => !f.optional);
  const optionalConditions = bounty.requirements.filter((f) => f.optional);

  return (
    <>
      <div className={`${hidden ? 'laptop:hidden' : ''} space-y-8 pb-16 px-2 `}>
        {/* header */}
        <div
          className={`${
            isScrollingUp ? 'top-20' : 'top-4 laptop:top-20'
          }             sticky transition-all ease-in-out duration-500  bg-black z-10 border-2 border-purpleDark text-text rounded-xl px-4 py-6 text-sm font-medium space-y-6 flex flex-col max-w-lg`}
        >
          <h1 className="text-3xl font-bold font-grotesk">{bounty?.title}</h1>
          <div className="bg-purpleDark text-white w-fit rounded-sm p-2 ">
            <span className="font-medium">{bounty.funds} ETH</span>
          </div>
          <div className="flex gap-x-4 laptop:gap-x-8 gap-y-2 flex-wrap">
            {bounty.closesAt && (
              <div className="flex space-x-1 items-center">
                <Icon icon="hourglass_full" />
                <span>
                  Closes in {GetDateInString(bounty.closesAt)} (
                  {GetDateInString(bounty.closesAt, true)})
                </span>
              </div>
            )}
            {!bounty.closesAt && (
              <div className="flex space-x-1 items-center">
                <Icon icon="hourglass_full" />
                <span>Has no time limit</span>
              </div>
            )}
          </div>

          {fullDescription && (
            <div className="flex items-center gap-x-6 gap-y-6 flex-wrap">
              {/* Buttons */}
              <div className="flex items-center gap-6">
                {/* Show less */}
                <button
                  className={`-translate-x-2 flex items-center space-x-2 bg-black text-purpleLight group  shrink-0`}
                  onClick={() => {
                    scrollToTop();
                    setTimeout(() => {
                      setFullDescription(false);
                    }, 1000);
                  }}
                >
                  <Icon icon="unfold_less" />
                  <span className="text-sm group-hover:underline">
                    Show less
                  </span>
                </button>

                {/* Go to submissions in phone */}
                <button
                  className={`-translate-x-2 flex items-center space-x-2 bg-black text-purpleLight group laptop:hidden shrink-0`}
                  onClick={() => {
                    if (showSubmissions) {
                      showSubmissions();
                    }
                  }}
                >
                  <Icon icon="keyboard_double_arrow_down" />

                  <span className="text-sm group-hover:underline text-left">
                    {isStaff && 'Submissions'}
                    {!isStaff && 'Your Submissions'}
                  </span>
                </button>

                {/* Go to submissions in desktop */}
                <button
                  className={`-translate-x-2 items-center space-x-2 bg-black text-purpleLight group hidden laptop:flex`}
                  onClick={() => {
                    scrollToTop();
                  }}
                >
                  <Icon icon="keyboard_double_arrow_up" />

                  <span className="text-sm group-hover:underline">
                    Submissions
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid laptop:grid-cols-2 gap-32 w-full">
          {/* Details */}
          <div className="space-y-8">
            <Stat title="Target" content={bounty.name} />

            <Stat title="Affiliated with" content={bounty.organizationName} />

            <Stat
              title="More details"
              content={!!bounty.description ? bounty.description : 'None'}
            />
          </div>

          {/* Requirements */}
          <div className="space-y-8">
            <Stat
              title="Requirements"
              contents={requeriedConditions.map((f) => f.title)}
              content={requeriedConditions.length ? undefined : 'None'}
            />
            <Stat
              title="Optional"
              contents={optionalConditions?.map((f) => f.title)}
              content={optionalConditions.length ? undefined : 'None'}
            />
          </div>
        </div>
      </div>
    </>
  );
}
