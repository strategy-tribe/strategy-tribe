import { Button, ButtonStyle } from '@/components/utils/Button';
import { GoToBeforeNewSubmissionPage } from '@/lib/utils/Routes';
import router from 'next/router';
import React from 'react';
import { useBountyContext } from './BountyContext';
export function StartSubmissionButton() {
  const { bounty } = useBountyContext();

  return (
    <Button
      info={{
        className: 'laptop:hidden',
        icon: 'publish',
        label: 'Submit findings',
        onClick: () =>
          router.push(GoToBeforeNewSubmissionPage(bounty.id as string)),
        style: ButtonStyle.Filled,
      }}
    />
  );
}
