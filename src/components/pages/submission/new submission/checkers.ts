import { RequirementType } from '@prisma/client';

import {
  isEmailValid,
  isNameValid,
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
    case RequirementType.Email:
      return EvaluateEmail(s);

    case RequirementType.Name:
      return EvaluateName(s);

    case RequirementType.Report:
      return EvaluateReport(s);

    case RequirementType.Domain:
      return EvaluateUrl(s);

    case RequirementType.Wallet:
      return EvaluateWallet(s);

    case RequirementType.PhoneNumber:
      return EvaluatePhoneNumber(s);

    case RequirementType.SocialMediaAccount:
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

const EvaluateName = (s: string) => {
  return {
    isValid: isNameValid(s),
    errorMsg: 'Your input must have atleast one 3 letter-word',
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
