import {
  DelayType,
  NotificationType,
  NotificationStyle,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import { Check } from '@/components/utils/BountyRequirementsShowcase';
import { ButtonInformation, ButtonStyle } from '@/components/utils/Button';
import { useGetBounty } from '@/lib/hooks/bountyHooks';
import { useSaveSubmission } from '@/lib/hooks/submissionHooks';
import { Bounty } from '@/lib/models';
import { Requirement, RequirementType } from '@/lib/models/requirement';
import { GoToSubmissionPage } from '@/lib/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import Link from 'next/link';
import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import { UserInput } from './UserInput';

interface iNewSubmissionContext {
  bountyId: string;
  userAnswers: UserInput[];
  setUserAnswers: (s: UserInput[]) => void;
  answerChanged: (req: Requirement, passed: boolean) => void;
  editPhase: boolean;
  backToEdit: () => void;
  requirementsFullfiled: boolean;
  ctaButton: ButtonInformation | undefined;
  bounty: Bounty | undefined;
}

//@ts-ignore
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

  const { bounty } = useGetBounty(bountyId as string, true, {
    addAttachment: true,
  });

  useEffect(() => {
    if (bounty && userAnswers.length === 0) {
      setUserAnswers(
        bounty.requirements.map((req) => {
          const userInput: UserInput = {
            requirement: req,
            input: req.type === RequirementType.Image ? [] : '',
          };
          return userInput;
        })
      );

      const newChecks = bounty.requirements.map((req) => {
        return { passed: false, requirement: req };
      });
      setChecks(newChecks);
    }
  }, [bounty]);

  //*Mutations
  const { Save } = useSaveSubmission(
    user as string,
    userAnswers,
    bountyId as string,
    () => {
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
    (newSubmissionId) => {
      notify(
        {
          style: NotificationStyle.success,
          title: 'Your Submission was uploaded successfully',
          content: (
            <Link href={GoToSubmissionPage(newSubmissionId as string)}>
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
        onClick: Save,
        style: ButtonStyle.Filled,
        disabled: !requirementsFullfiled,
      };
  }, [requirementsFullfiled, editPhase]);

  return (
    <NewSubmissionContext.Provider
      value={{
        userAnswers,
        setUserAnswers,
        bountyId: bountyId as string,
        answerChanged,
        editPhase,
        backToEdit: () => setEditPhase(true),
        requirementsFullfiled,
        ctaButton,
        bounty,
      }}
    >
      {children}
    </NewSubmissionContext.Provider>
  );
};

export const useNewSubmissionContext = () => useContext(NewSubmissionContext);
