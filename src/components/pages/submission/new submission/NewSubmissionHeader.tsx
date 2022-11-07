import { GoToBountyPage } from '@/lib/utils/Routes';

import { Button, ButtonStyle } from '@/components/utils/Button';

import { useNewSubmissionContext } from './NewSubmissionContext';

export function NewSubmissionHeader() {
  const { bounty, ctaButton, backToEdit, editPhase } =
    useNewSubmissionContext();

  return (
    <header className="flex w-full justify-between py-5 border-b-2 border-surface sticky top-[3.8rem] z-50 bg-surface-dark">
      <div>
        <h2 className="title">New Submission</h2>
        <Button
          info={{
            style: ButtonStyle.TextPurple,
            removePadding: true,
            label: bounty?.title,
            isALink: GoToBountyPage(bounty?.slug as string),
          }}
        />
      </div>

      <div className="flex items-center gap-8 h-fit">
        {!editPhase && (
          <Button
            info={{
              label: 'Back to edit',
              icon: 'arrow_back',
              style: ButtonStyle.TextPurple,
              onClick: backToEdit,
            }}
          />
        )}
        {ctaButton && (
          <div className="">
            <Button info={ctaButton} />
          </div>
        )}
      </div>
    </header>
  );
}
