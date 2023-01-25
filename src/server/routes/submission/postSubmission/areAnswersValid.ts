import { PrismaClient, Requirement, RequirementType } from '@prisma/client';

import {
  isEmailValid,
  isNameValid,
  isPhoneNumberValid,
  isReportValid,
  isSocialMediaValid,
  isUrlValid,
  isWalletValid,
} from '@/lib/utils/regexChecks';

type AnswerData = {
  input: string | string[];
  requirement: Requirement;
};

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
      case RequirementType.Email:
        if (!isEmailValid(input)) invalidAnswers.push(a);
        break;
      case RequirementType.Name:
        if (!isNameValid(input)) invalidAnswers.push(a);
        break;
      case RequirementType.Domain:
        if (!isUrlValid(input)) invalidAnswers.push(a);
        break;
      case RequirementType.PhoneNumber:
        if (!isPhoneNumberValid(input)) invalidAnswers.push(a);
        break;
      case RequirementType.Wallet:
        if (!isWalletValid(input)) invalidAnswers.push(a);
        break;
      case RequirementType.Report:
        if (!isReportValid(input)) invalidAnswers.push(a);
        break;
      case RequirementType.SocialMediaAccount:
        if (!isSocialMediaValid(input)) invalidAnswers.push(a);
        break;
      case RequirementType.Image:
      default:
        break;
    }
  }

  return invalidAnswers.length === 0;
};
