import { PrismaClient } from '@prisma/client';

import {
  isEmailValid,
  isPhoneNumberValid,
  isReportValid,
  isSocialMediaValid,
  isUrlValid,
  isWalletValid,
} from '@/lib/utils/regexChecks';

import { UserInput } from '@/server/common/submission/UserInput';

type AnswerData = UserInput;

export const areAnswersValid = async (
  bountySlug: string,
  answers: AnswerData[],
  prisma: PrismaClient
): Promise<boolean> => {
  const bounty = await prisma.bounty.findUnique({
    where: { slug: bountySlug },
    include: { requirements: true },
  });

  if (!bounty) return false;

  //Doing this way so we in theory return exactly which answers are not valid to the client
  const invalidAnswers: AnswerData[] = [];

  for (const a of answers) {
    if (typeof a.input !== 'string') {
      throw new Error('File support has not been implemented');
    }

    const input = a.input.trim().toLowerCase();
    const requirement = bounty.requirements.find(
      (r) => r.id === a.requirement.id
    );
    if (!requirement) return false;
    switch (requirement.type) {
      case 'EMAIL':
        if (!isEmailValid(input)) invalidAnswers.push(a);
        break;
      case 'DOMAIN':
        if (!isUrlValid(input)) invalidAnswers.push(a);
        break;
      case 'PHONE_NUMBER':
        if (!isPhoneNumberValid(input)) invalidAnswers.push(a);
        break;
      case 'WALLET':
        if (!isWalletValid(input)) invalidAnswers.push(a);
        break;
      case 'REPORT':
        if (!isReportValid(input)) invalidAnswers.push(a);
        break;
      case 'SOCIAL_MEDIA_ACCOUNT':
        if (!isSocialMediaValid(input)) invalidAnswers.push(a);
        break;
      case 'IMAGE':
      default:
        break;
    }
  }

  return invalidAnswers.length === 0;
};
