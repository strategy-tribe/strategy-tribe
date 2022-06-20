import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { GoToRulesPage, GoToUserPage } from '@/lib/utils/Routes';
import Link from 'next/link';
import { useBountyContext } from './BountyContext';
import { FAQuestion } from './FAQuestion';

export function FAQ() {
  const { sectionInView } = useBountyContext();
  return (
    <div
      className={`${
        sectionInView === 'FAQ' ? '' : 'laptop:hidden'
      } laptop:max-w-2xl mx-aut space-y-8 pb-32 laptop:pb-0`}
    >
      <Title title="FAQ" />
      <FAQuestion
        question="Can anyone submit information?"
        answer={
          <p>
            Yes, you can see our rules{' '}
            <Link href={GoToRulesPage()}>
              <a className="underline text-purpleLight hover:text-purpleDark">
                here
              </a>
            </Link>
            .
          </p>
        }
      />
      <FAQuestion
        question="How does the payments work?"
        height="h-16"
        answer={
          <p>
            Once your submission gets verified, all of the funds from the bounty
            wallets will be send to the wallet you signup with. You can{' '}
            <Link href={GoToUserPage()}>
              <a className="underline text-purpleLight hover:text-purpleDark">
                review your address here
              </a>
            </Link>
            .
          </p>
        }
      />
      <FAQuestion
        question="How many times I can submit my findings?"
        answer="Once per day."
      />
      <FAQuestion
        question="Where do I find example submissions?"
        answer={
          <p>
            You can see our examples{' '}
            <Link href={GoToRulesPage()}>
              <a className="underline text-purpleLight hover:text-purpleDark">
                here
              </a>
            </Link>
            .
          </p>
        }
      />
      <FAQuestion
        question="What is the maximum payout?"
        answer="There is no maximum."
      />
    </div>
  );
}
