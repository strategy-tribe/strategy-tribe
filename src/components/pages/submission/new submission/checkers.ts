import { RequirementType } from '@/lib/models/requirement';
import { GetWordCount } from '@/utils/StringHelpers';
import { MAIL_REGEX, PHONE_REGEX, URL_REGEX } from './regexs';

export const CheckInput = (
  s: string,
  type: RequirementType
): { isValid: boolean; errorMsg: string } => {
  switch (type) {
    case RequirementType.Email:
      return EvaluateEmail(s);

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
    isValid: MAIL_REGEX.test(s),
    errorMsg: 'Your input must contain an email address.',
  };
};

const EvaluateReport = (s: string) => {
  const wordCount = GetWordCount(s as string);
  return {
    isValid: wordCount > 10,
    errorMsg: 'Your input must be longer than 10 words',
  };
};

const EvaluateUrl = (s: string) => {
  return {
    isValid: URL_REGEX.test(s),
    errorMsg: 'Your input must be a valid URL.',
  };
};

const EvaluatePhoneNumber = (s: string) => {
  return {
    isValid: PHONE_REGEX.test(s),
    errorMsg: 'Your input must a phone number.',
  };
};

const EvaluateWallet = (s: string) => {
  return {
    isValid: s.length > 20,
    errorMsg: 'Wallet addresses are longer than that',
  };
};

const EvaluateSocialMediaAccount = (s: string) => {
  return {
    isValid: s.length > 3,
    errorMsg: 'Your input must be longer than 3 characters',
  };
};
