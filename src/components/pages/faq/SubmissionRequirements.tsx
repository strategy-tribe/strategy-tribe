export function SubmissionRequirements() {
  return (
    <div className="">
      <h2 className="mt-8 mb-2">
        <span className="">
          We can accept a submission if the following applies:
        </span>
      </h2>
      <ul className="ml-6 list-disc space-y-2">
        <li className="space-y-2">
          <span className="">
            The information you’ve submitted is, without question, related to
            the same target the bounty is for. There should be demonstrable
            proof to show this. A weak match will not be accepted; e.g. if the
            only proof you can provide is that the target shares a name with the
            person whose information you’re submitting.
          </span>
        </li>
        <li className="space-y-2">
          <span className="">
            You have included annotated screenshots or images of relevant data,
            URLs of web pages, social media accounts, or other sources to add to
            your submission.
          </span>
        </li>
        <li className="space-y-2">
          <span className="">
            You have stated a clear hypothesis, outlined the steps taken to
            gather or analyse the evidence, presented the evidence in a clear,
            structured way, and connected the dots for us to understand the
            association between the evidence provided and the conclusion you
            drew.
          </span>
        </li>
        <li className="space-y-2">
          <span className="">
            {`Each step is replicable from start to finish. There is no such thing as too much detail in your submission. While reviewing submissions, the admin must be able to find exactly the same information you are presenting easily,  e.g., Google search “John” <screenshot, URL>, the article comes up on page 3 from website Domain.com <screenshot>, webpage on Domain.com shows information  XYZ <screenshot>, etc.`}
          </span>
        </li>
      </ul>

      <h3 className="mt-8 mb-2 text-center">
        <span className="">Specific bounties/targets</span>
      </h3>
      <ul className="ml-6 list-disc space-y-2">
        <li className="space-y-2">
          <span className="">
            If you are submitting email data regarding company bounties, we
            cannot accept any generic domain email addresses, only named email
            addresses, i.e., “John@domain.com” will be accepted but
            “info@domain.com” will not.
          </span>
        </li>
        <li className="space-y-2">
          <span className="">
            If you are submitting email data regarding individual bounties, we
            cannot accept any domain email addresses, only personal email
            addresses, i.e., “John@gmail.com” will be accepted but
            John@domain.com will not.
          </span>
        </li>
        <li className="space-y-2">
          <span className="">
            If you are submitting phone number data regarding company bounties,
            we cannot accept generic company phone numbers e.g. phone numbers
            listed on company’s websites or “Contact Us” pages. Only personal
            phone numbers belonging to individuals with a demonstrable
            association to the company will be accepted.
          </span>
        </li>
        <li className="space-y-2">
          <span className="">
            When submitting against a bounty for company shareholders or
            directors, we cannot accept data provided for individuals who are
            already on our bounty list.
          </span>
        </li>
      </ul>

      <h3 className="mt-8 mb-2 text-center">
        <span className="">General Rules</span>
      </h3>
      <ul className="ml-6 list-disc space-y-2">
        <li className="space-y-2">
          <span className="">
            All the information in the findings you submit must be valid and
            correct.
          </span>
        </li>
        <li className="space-y-2">
          <span className="">
            You must fill in all the required fields of your submission.
            Bounties have required and optional fields. These fields vary
            depending on the bounty, but the chances of your findings being
            approved increase with the more evidence you provide in your
            submission.
          </span>
        </li>
        <li className="space-y-2">
          <span className="">
            The admins will judge your submission based on the evidence you have
            provided.
          </span>
        </li>
        <li className="space-y-2">
          <span className="">
            Transaction analysis websites labelling wallets as responsible for a
            hack doesn’t necessarily count as enough proof.
          </span>
        </li>
        <li className="space-y-2">
          <span className="">
            Guess-work or assumptions in submissions cannot be accepted.
          </span>
        </li>
        <li className="space-y-2">
          <span className="">
            StrategyTribe does not guarantee all submissions will be reviewed.
            Bounties and their rewards are awarded only to accepted submissions.
            Submissions with more information and better evidence will be
            considered over others.
          </span>
        </li>
        <li className="space-y-2">
          <span className="">
            When submitting your findings, you agree to our terms of service.
          </span>
        </li>
      </ul>
    </div>
  );
}
