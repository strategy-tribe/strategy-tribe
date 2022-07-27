import { useAuth } from 'auth/AuthContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Requirement, RequirementType } from '@/lib/models/requirement';
import { TargetType } from '@/lib/models/targetType';

import AppLayout from '@/components/layouts/AppLayout';
import { Review } from '@/components/pages/bounty/new bounty/Review';
import { SetBountyTitle } from '@/components/pages/bounty/new bounty/SetBountyTitle';
import { SetRequirements } from '@/components/pages/bounty/new bounty/SetRequirements';
import { SetTargetInfo } from '@/components/pages/bounty/new bounty/SetTargetInfo';
import { SetTimeLimit } from '@/components/pages/bounty/new bounty/SetTimeLimit';

import { NextPageWithLayout } from '@/pages/_app';
import { GoToBountiesPage } from '@/utils/Routes';

const NewBounty: NextPageWithLayout = () => {
  const [step] = useState<number>(1);
  const router = useRouter();
  const { isStaff, userId } = useAuth();
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

  useEffect(() => {
    if (!isStaff) {
      router.push(GoToBountiesPage());
    }
  }, [isStaff, userId, router]);

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

      <div className="px-2 space-y-8 text-on-surface-p1 mx-auto max-w-5xl pb-40">
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
