import { SectionContent } from '@/components/reading/utils';
import Icon, { IconSize } from '@/components/utils/Icon';

export default function RulesContent() {
  return (
    <>
      <SectionContent
        content={`When submitting your findings, you agree to our terms of service.
              
                All the information in the findings you submit must be valid and
                correct. To successfully submit your findings, you must fill in
                all the required fields.
                
                Bounties have required and optional fields. These fields vary
                depending on the bounty, but the chances of your findings being
                approved increase the more evidence you provide in your
                submission.
                
                The judging criteria for bounties are the same regardless of the
                type of bounty you have chosen to pursue. When reflecting on
                whether your submission meets the minimum standard required to be
                accepted:`}
      />

      <ul className="py-2 space-y-4 max-w-xl">
        <ol className="flex flex-col gap-1">
          <div className="label-lg text-error-light flex items-center gap-2">
            <Icon icon="report" size={IconSize.Small} />
            Are you submitting enough information?
          </div>
          You should submit at least one piece of information that matches the
          bounty description. For example, at least one email or wallet address.
        </ol>

        <ol className="flex flex-col gap-1 max-w-xl">
          <div className="label-lg text-error-light flex items-center gap-2">
            <Icon icon="report" size={IconSize.Small} />
            <span>Can the staff replicate your process?</span>
          </div>
          <span>
            The connection between the bounty and your submission must be solid
            and clear.
            <br />
            In order to ensure your information is trustworthy, our staff must
            be able to reach the same conclusion following the same steps as
            you. You can submit screenshots of your process as attachments or a
            step-by-step guide.
          </span>
        </ol>
      </ul>

      <SectionContent
        content={`The staff will judge your submission based on the evidence you
                  have provided.
                  
                  StrategyTribe does not guarantee all submissions will be reviewed.
                  Bounties and their rewards are awarded on a “first come, first
                  served” basis; someone might have submitted their findings before
                  you.`}
      />
    </>
  );
}
