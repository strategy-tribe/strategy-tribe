import { Requirement } from '@prisma/client';
import { useState } from 'react';

import { useScrollDirection } from '@/lib/hooks/useScrollDirection';
import { useScrollToTop } from '@/lib/hooks/useScrollTo';
import { FullTarget } from '@/lib/types';
import { GetDateInString } from '@/lib/utils/DateHelpers';

import Icon from '@/components/utils/Icon';
import { Stat } from '@/components/utils/Stat';

import { useAuth } from '@/auth/AuthContext';

export function Step4Details({
  showSubmissions,
  hidden = false,
  requirements,
  closesAt,
  target,
  description,
  bountyTitle,
  balance,
}: {
  showSubmissions?: () => void;
  hidden?: boolean;
  requirements: Requirement[];
  closesAt: Date;
  target: FullTarget;
  description: string;
  address: string;
  balance: number;
  bountyTitle: string;
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

  const { goToTop } = useScrollToTop();

  const requeriedConditions = requirements.filter((f) => !f.optional);
  const optionalConditions = requirements.filter((f) => f.optional);

  return (
    <>
      <div className={`${hidden ? 'laptop:hidden' : ''} space-y-8 px-2 pb-16 `}>
        {/* header */}
        <div
          className={`${
            isScrollingUp ? 'top-20' : 'top-4 laptop:top-20'
          }             sticky z-10 flex max-w-lg  flex-col space-y-6 rounded-xl border-2 border-main bg-bg px-4 py-6 text-sm font-medium text-on-surface-p1 transition-all duration-500 ease-in-out`}
        >
          <h1 className="font-grotesk text-3xl font-bold">{bountyTitle}</h1>
          <div className="w-fit rounded-sm bg-main p-2 text-on-surface-p0 ">
            <span className="font-medium">{balance} MATIC</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 laptop:gap-x-8">
            {closesAt && (
              <div className="flex items-center space-x-1">
                <Icon icon="hourglass_full" />
                <span>
                  Closes in {GetDateInString(closesAt)} (
                  {GetDateInString(closesAt, true)})
                </span>
              </div>
            )}
            {!closesAt && (
              <div className="flex items-center space-x-1">
                <Icon icon="hourglass_full" />
                <span>Has no time limit</span>
              </div>
            )}
          </div>

          {fullDescription && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-6">
              {/* Buttons */}
              <div className="flex items-center gap-6">
                {/* Show less */}
                <button
                  className="group flex shrink-0 -translate-x-2 items-center space-x-2 bg-bg  text-main-light"
                  onClick={() => {
                    goToTop();
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
                  className="group flex shrink-0 -translate-x-2 items-center space-x-2 bg-bg text-main-light laptop:hidden"
                  onClick={() => {
                    if (showSubmissions) {
                      showSubmissions();
                    }
                  }}
                >
                  <Icon icon="keyboard_double_arrow_down" />

                  <span className="text-left text-sm group-hover:underline">
                    {isStaff && 'Submissions'}
                    {!isStaff && 'Your Submissions'}
                  </span>
                </button>

                {/* Go to submissions in desktop */}
                <button
                  className="group hidden -translate-x-2 items-center space-x-2 bg-bg text-main-light laptop:flex"
                  onClick={() => {
                    goToTop();
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

        <div className="grid w-full gap-32 laptop:grid-cols-2">
          {/* Details */}
          <div className="space-y-8">
            <Stat title="Target" content={target.name} />

            <Stat title="Affiliated with" content={target.org.name} />

            <Stat
              title="More details"
              content={description ? description : 'None'}
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
