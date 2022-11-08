import { RequirementType } from '@prisma/client';

import {
  isEmailValid,
  isPhoneNumberValid,
  isReportValid,
  isUrlValid,
  isWalletValid,
} from '@/lib/utils/regexChecks';

export const CheckInput = (
  s: string,
  type: RequirementType
): { isValid: boolean; errorMsg: string } => {
  switch (type) {
    case RequirementType.EMAIL:
      return EvaluateEmail(s);

    case RequirementType.REPORT:
      return EvaluateReport(s);

    case RequirementType.DOMAIN:
      return EvaluateUrl(s);

    case RequirementType.WALLET:
      return EvaluateWallet(s);

    case RequirementType.PHONE_NUMBER:
      return EvaluatePhoneNumber(s);

    case RequirementType.SOCIAL_MEDIA_ACCOUNT:
      return EvaluateSocialMediaAccount(s);
    default:
      throw 'Unknown type ';
  }
};

const EvaluateEmail = (s: string) => {
  return {
    isValid: isEmailValid(s),
    errorMsg: 'Your input must contain an email address.',
  };
};

const EvaluateReport = (s: string) => {
  return {
    isValid: isReportValid(s),
    errorMsg: 'Your input must be longer than 10 words',
  };
};

const EvaluateUrl = (s: string) => {
  return {
    isValid: isUrlValid(s),
    errorMsg: 'Your input must be a valid URL.',
  };
};

const EvaluatePhoneNumber = (s: string) => {
  return {
    isValid: isPhoneNumberValid(s),
    errorMsg: 'Your input must a phone number.',
  };
};

const EvaluateWallet = (s: string) => {
  return {
    isValid: isWalletValid(s),
    errorMsg: 'Wallet addresses are longer than that',
  };
};

const EvaluateSocialMediaAccount = (s: string) => {
  return {
    isValid: isPhoneNumberValid(s),
    errorMsg: 'Your input must be longer than 3 characters',
  };
};
