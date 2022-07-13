import { Button, ButtonStyle } from '@/components/utils/Button';
import { GoToBountyPage } from '@/lib/utils/Routes';
import { useNewSubmissionContext } from './NewSubmissionContext';

export function NewSubmissionHeader() {
  const { bounty, ctaButton, backToEdit, editPhase } =
    useNewSubmissionContext();

  return (
    <header className="flex w-full justify-between pb-5 border-b-2 border-dark">
      <div>
        <h2 className="title">New Submission</h2>
        <Button
          info={{
            style: ButtonStyle.TextPurple,
            removePadding: true,
            label: bounty?.title,
            isALink: GoToBountyPage(bounty?.id as string),
          }}
        />
      </div>

      <div className="flex h-fit gap-8 items-center">
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
