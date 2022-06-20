import { useRouter } from 'next/router';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSaveSubmission } from '@/hooks/submissionHooks';
import { useAuth } from 'auth/AuthContext';
import { GoToBountyPage, GoToSubmissionPage } from '@/utils/Routes';
import Navbar from '@/components/navbar/Navbar';
import { useNotification } from '@/components/notifications/NotificationContext';
import { Check } from '@/components/utils/BountyRequirementsShowcase';
import {
  Button,
  ButtonInformation,
  ButtonStyle,
} from '@/components/utils/Button';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layouts/AppLayout';
import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import Link from 'next/link';
import { Requirement, RequirementType } from '@/lib/models/requirement';
import { useGetBounty } from '@/hooks/bountyHooks';
import { EditSubmission } from '@/components/pages/submission/EditSubmission';
import { ReviewSubmission } from '@/components/pages/submission/ReviewSubmission';

//!Context
export type UserInput = {
  requirement: Requirement;
  input: string | File[];
};

interface iSubmissionContext {
  bountyId: string;
  userAnswers: UserInput[];
  setUserAnswers: (s: UserInput[]) => void;
  answerChanged: (req: Requirement, passed: boolean) => void;
  backToEdit: () => void;
  requirementsFullfiled: boolean;
}

const NewSubmissionContext = createContext<iSubmissionContext>({
  bountyId: '',
  userAnswers: [],
  setUserAnswers: () => {},
  answerChanged: () => {},
  backToEdit: () => {},
  requirementsFullfiled: false,
});

export const useNewSubmissionContext = () => useContext(NewSubmissionContext);

//!--------------------------------------------------------------------------------------------------

const NewSubmission: NextPageWithLayout = () => {
  //*Router
  const router = useRouter();
  const { id: bountyId } = router.query;
  const { userId: user } = useAuth();

  //*UI State
  const [editPhase, setEditPhase] = useState(true);

  //*Submission State
  const [userAnswers, setUserAnswers] = useState<UserInput[]>([]);
  const [checks, setChecks] = useState<Check[]>([]);

  const requirementsFullfiled = useMemo(() => {
    return (
      checks.filter((c) => !c.passed && !c.requirement.optional).length === 0
    );
  }, [userAnswers, checks]);

  const { bounty } = useGetBounty(bountyId as string);

  useEffect(() => {
    if (bounty && userAnswers.length === 0) {
      setUserAnswers(
        bounty.requirements.map((req) => {
          return {
            requirement: req,
            input: req.type === RequirementType.Image ? [] : '',
          };
        })
      );

      const newChecks = bounty.requirements.map((req) => {
        return { passed: false, requirement: req };
      });
      setChecks(newChecks);
    }
  }, []);

  const ctaButton: ButtonInformation | undefined = useMemo(() => {
    if (editPhase) {
      return {
        icon: 'arrow_forward',
        label: 'Next',
        onClick: () => setEditPhase(false),
        style: ButtonStyle.Filled,
        disabled: !requirementsFullfiled,
      };
    } else
      return {
        icon: 'publish',
        label: 'Submit',
        onClick: () => ManageSubmission(),
        style: ButtonStyle.Filled,
        disabled: !requirementsFullfiled,
      };
  }, [requirementsFullfiled, editPhase]);

  //*Effects
  useEffect(() => {
    if (!user) router.back();
  }, [user]);

  //*Mutations
  const { Save } = useSaveSubmission(
    user as string,
    userAnswers,
    bountyId as string,
    () => {
      notify(
        {
          title: 'Your Submission is being uploaded',
          content: 'Please do not close this window',
          icon: 'warning',
        },
        {
          delayTime: 0,
          delayType: DelayType.Condition,
          condition: false,
          type: NotificationType.Banner,
        }
      );
    },
    (newSubmissionId) => {
      notify(
        {
          style: NotificationStyle.success,
          title: 'Your Submission was uploaded successfully',
          content: (
            <Link
              href={GoToSubmissionPage(
                bountyId as string,
                newSubmissionId as string
              )}
            >
              <a className="underline text-white font-medium" onClick={hide}>
                You can see it here
              </a>
            </Link>
          ),
          icon: 'done_all',
        },
        {
          delayTime: 7,
          delayType: DelayType.Time,
          condition: false,
          type: NotificationType.Banner,
        }
      );
    },
    (e) => {
      notify(
        {
          title: 'There was an error submitting your findings',
          content: e.message as string,
          icon: 'error',
          style: NotificationStyle.error,
        },
        {
          delayTime: 10,
          delayType: DelayType.Time,
          condition: false,
          type: NotificationType.Banner,
        }
      );
    }
  );

  //*Notifications
  const { notify: notify, hide } = useNotification();

  //*Methods
  function ManageSubmission() {
    Save();
    router.push(GoToBountyPage(bountyId as string));
  }

  function answerChanged(requirement: Requirement, passed: boolean) {
    const newChecks = checks.filter((c) => c.requirement !== requirement);
    newChecks.push({ requirement, passed });
    setChecks(newChecks);
  }

  return (
    <>
      <Head>
        <title>ST | New Submission</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        className="px-2 text-text space-y-6 mx-auto max-w-5xl mb-52 laptop:mb-96"
        setUp={{
          useBackArrow: true,
          useBackArrowOnDesktop: true,
          useNavigation: false,
          leftLabel: editPhase ? 'New Submission' : 'Back to edit',
          useOverflowMenu: false,
          rightButtonInfo: ctaButton ? [ctaButton] : undefined,

          goBack: editPhase ? () => router.back() : () => setEditPhase(true),
        }}
      >
        <NewSubmissionContext.Provider
          value={{
            userAnswers,
            setUserAnswers,
            bountyId: bountyId as string,
            answerChanged,
            backToEdit: () => setEditPhase(true),
            requirementsFullfiled,
          }}
        >
          {editPhase && <EditSubmission />}
          {!editPhase && <ReviewSubmission />}
        </NewSubmissionContext.Provider>

        <div className="laptop:hidden">
          <Button info={ctaButton} />
        </div>
      </Navbar>
    </>
  );
};

export default NewSubmission;
NewSubmission.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
