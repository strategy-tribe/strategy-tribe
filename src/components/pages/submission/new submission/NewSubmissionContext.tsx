import { Requirement, RequirementType } from '@prisma/client';
import Link from 'next/link';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useGetBounty } from '@/lib/hooks/bountyHooks';
import { useSaveSubmission } from '@/lib/hooks/submission';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { GoToSubmissionPage } from '@/lib/utils/Routes';

import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import { Check } from '@/components/utils/BountyRequirementsShowcase';
import { ButtonInformation, ButtonStyle } from '@/components/utils/Button';

import { useAuth } from '@/auth/AuthContext';
import { FullBounty } from '@/server/routes/bounties/getBounty';

import { UserInput } from '../../../../server/routes/submission/postSubmission/UserInput';

interface iNewSubmissionContext {
  bountyId: string;
  userAnswers: UserInput[];
  setUserAnswers: (s: UserInput[]) => void;
  answerChanged: (req: Requirement, passed: boolean) => void;
  editPhase: boolean;
  backToEdit: () => void;
  requirementsFullfiled: boolean;
  ctaButton: ButtonInformation | undefined;
  bounty: FullBounty | undefined | null;
  cleanSubmissionFromStorage: () => void;
  attachments: File[];
  setAttachments: (s: File[]) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore`;
const NewSubmissionContext = createContext<iNewSubmissionContext>();

export const NewSubmissionContextProvider = ({
  children,
  bountyId,
  redirectToBounty,
}: {
  bountyId: string;
  redirectToBounty: () => void;
  children: ReactNode;
}) => {
  const { userId } = useAuth();

  //*UI State
  const [editPhase, setEditPhase] = useState(true);

  //*Submission State
  const bounty = useGetBounty(bountyId as string, true).bounty as FullBounty;
  const [userAnswers, setUserAnswers, clean] = useLocalStorage<UserInput[]>(
    `${userId} - ${bountyId} `,
    []
  );

  const [attachments, setAttachments] = useState<File[]>([]);

  const [checks, setChecks] = useState<Check[]>([]);

  function ManageChangesToForm(userInput: UserInput[]) {
    setUserAnswers(userInput);
  }

  const requirementsFullfiled = useMemo(() => {
    return (
      checks.filter((c) => !c.passed && !c.requirement.optional).length === 0
    );
  }, [checks]);

  useEffect(() => {
    if (bounty && userAnswers.length === 0) {
      const requirements = bounty.requirements;

      const inputs = requirements?.map((req) => {
        const userInput: UserInput = {
          requirement: req,
          input: req.type === RequirementType.Image ? [] : '',
        };
        return userInput;
      });

      setUserAnswers(inputs ?? []);

      const newChecks = bounty.requirements?.map((req) => {
        return { passed: false, requirement: req };
      });
      setChecks(newChecks ?? []);
    }
  }, [bounty, userAnswers, setUserAnswers]);

  //*Mutations
  const { Save } = useSaveSubmission({
    onMutate: () => {
      redirectToBounty();
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
    onSuccess: (newSubmissionId) => {
      clean();
      notify(
        {
          style: NotificationStyle.success,
          title: 'Your Submission was uploaded successfully',
          content: () => (
            <Link href={GoToSubmissionPage(newSubmissionId as string)}>
              <span
                className="font-medium text-on-surface-p0 underline"
                onClick={hide}
              >
                You can see it here
              </span>
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
    onError: (e) => {
      console.error('here', e);
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
    },
  });

  //*Notifications
  const { notify, hide } = useNotification();

  function answerChanged(requirement: Requirement, passed: boolean) {
    const newChecks = checks.filter((c) => c.requirement !== requirement);
    newChecks.push({ requirement, passed });
    setChecks(newChecks);
  }

  const ctaButton: ButtonInformation | undefined = useMemo(() => {
    if (editPhase) {
      return {
        icon: 'arrow_forward',
        label: 'Review',
        onClick: () => setEditPhase(false),
        style: ButtonStyle.Filled,
        disabled: !requirementsFullfiled,
      };
    } else
      return {
        icon: 'publish',
        label: 'Submit',
        onClick: () => {
          Save({
            answers: userAnswers,
            slug: bounty.slug,
          });
        },
        style: ButtonStyle.Filled,
        disabled: !requirementsFullfiled,
      };
  }, [requirementsFullfiled, editPhase, Save, bounty, userAnswers]);

  return (
    <NewSubmissionContext.Provider
      value={{
        userAnswers,
        setUserAnswers: ManageChangesToForm,
        bountyId: bountyId as string,
        answerChanged,
        editPhase,
        backToEdit: () => setEditPhase(true),
        requirementsFullfiled,
        ctaButton,
        bounty,
        cleanSubmissionFromStorage: clean,
        attachments,
        setAttachments,
      }}
    >
      {children}
    </NewSubmissionContext.Provider>
  );
};

export const useNewSubmissionContext = () => useContext(NewSubmissionContext);
