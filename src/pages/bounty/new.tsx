import { GoToBountiesPage } from '@/utils/Routes';
import { useAuth } from 'auth/AuthContext';

import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { ButtonInformation, ButtonStyle } from '@/components/utils/Button';
import Head from 'next/head';
import { Requirement, RequirementType } from '@/lib/models/requirement';
import { TargetType } from '@/lib/models/targetType';
import AppLayout from '@/components/layouts/AppLayout';
import { NextPageWithLayout } from '@/pages/_app';
import { SetBountyTitle } from '@/components/pages/newSubmission/SetBountyTitle';
import { SetRequirements } from '@/components/pages/newSubmission/SetRequirements';
import { SetTargetInfo } from '@/components/pages/newSubmission/SetTargetInfo';
import { SetTimeLimit } from '@/components/pages/newSubmission/SetTimeLimit';
import { Review } from '@/components/pages/newSubmission/Review';
import { useSaveBounty } from '@/lib/hooks/bountyHooks';

const NewBounty: NextPageWithLayout = () => {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const { isStaff, isAuthenticated, userId } = useAuth();
  //title
  const [title, setTitle] = useState('');
  //Target
  const [targetName, setTargetName] = useState('');
  const [targetAffiliation, setTargetAffiliation] = useState('');
  const [targetDescription, setDescription] = useState('');
  const [targetType, setTargetType] = useState<TargetType>(
    TargetType.Individual
  );
  //requirements
  const [requirements, setRequirements] = useState<Requirement[]>([
    { title: '', type: RequirementType.Wallet, optional: false },
  ]);
  //deadline
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hasDeadline, setHaveDeadline] = useState(true);

  const moveToNext = () => {
    if (step === 5) {
      router.push(GoToBountiesPage());
    } else setStep(step + 1);
  };

  const moveToPrev = () => {
    if (step === 1) {
      router.back();
    } else setStep(step - 1);
  };

  const canMoveNext: boolean = useMemo(() => {
    switch (step) {
      case 1:
        return !!title;
      case 2:
        return !!targetName && !!targetAffiliation;
      case 3:
        return requirements.length > 0 && !!requirements[0].title;
      case 4:
        return hasDeadline
          ? !!date && date?.getTime() > new Date().getTime()
          : true;
      case 5:
        return !!title && !!targetName && !!targetAffiliation;
      default:
        return false;
    }
  }, [
    title,
    targetDescription,
    step,
    targetAffiliation,
    targetName,
    requirements,
    date,
    hasDeadline,
  ]);

  useEffect(() => {
    if (!isStaff) {
      router.push(GoToBountiesPage());
    }
  }, [isStaff, userId]);

  const { Save, isLoading } = useSaveBounty(
    title,
    {
      name: targetName,
      description: targetDescription,
      type: targetType,
      organizationName: targetAffiliation,
    },
    requirements,
    userId as string,
    hasDeadline ? date : undefined
  );

  const ctaButton: ButtonInformation | undefined = useMemo(() => {
    if (step < 5)
      return {
        icon: 'arrow_forward',
        label: `Step ${step} of 5`,
        onClick: () => moveToNext(),
        style: ButtonStyle.Filled,
        disabled: !canMoveNext,
      };
    else if (isLoading) {
      return {
        icon: 'sync',
        iconClasses: ' animate-spin ',
        label: `Uploading...`,
        onClick: () => {},
        style: ButtonStyle.Filled,
        disabled: true,
      };
    } else {
      return {
        icon: 'publish',
        label: `Publish`,
        onClick: () => Save(),
        style: ButtonStyle.Filled,
        disabled: !canMoveNext,
      };
    }
  }, [isAuthenticated, userId, step, canMoveNext, isLoading]);

  return (
    <>
      <Head>
        <title>ST | New bounty</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-2 space-y-8 text-text mx-auto max-w-5xl pb-40">
        <div className="px-2">
          {step === 1 && <SetBountyTitle setTitle={setTitle} title={title} />}
          {step === 2 && (
            <SetTargetInfo
              content={targetDescription}
              setContent={setDescription}
              name={targetName}
              setName={setTargetName}
              organization={targetAffiliation}
              setOrganization={setTargetAffiliation}
              targetType={targetType}
              setTargetType={setTargetType}
            />
          )}
          {step === 3 && (
            <SetRequirements
              requirements={requirements}
              setRequirements={setRequirements}
            />
          )}
          {step === 4 && (
            <SetTimeLimit
              setDate={setDate}
              date={date}
              hasDeadline={hasDeadline}
              setHasDeadline={setHaveDeadline}
            />
          )}
          {step === 5 && (
            <Review
              title={title}
              target={{
                name: targetName,
                organizationName: targetAffiliation,
                description: targetDescription,
                type: targetType,
              }}
              requirements={requirements}
              date={hasDeadline ? date : undefined}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default NewBounty;
NewBounty.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
