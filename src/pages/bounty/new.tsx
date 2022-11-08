import { Requirement, RequirementType, TargetType } from '@prisma/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { GoToBountiesPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { SetBountyTitle } from '@/components/pages/bounty/new bounty/SetBountyTitle';
import { SetRequirements } from '@/components/pages/bounty/new bounty/SetRequirements';
import { SetTargetInfo } from '@/components/pages/bounty/new bounty/SetTargetInfo';
import { SetTimeLimit } from '@/components/pages/bounty/new bounty/SetTimeLimit';

import { useAuth } from '@/auth/AuthContext';
import { NextPageWithLayout } from '@/pages/_app';

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
    TargetType.INDIVIDUAL
  );
  //requirements
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      title: '',
      type: RequirementType.WALLET,
      optional: false,
      bountyId: '',
      id: '',
    },
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

      <div className="mx-auto max-w-5xl space-y-8 px-2 pb-40 text-on-surface-p1">
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
          {/* {step === 5 && (
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
          )} */}
        </div>
      </div>
    </>
  );
};

export default NewBounty;
NewBounty.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
