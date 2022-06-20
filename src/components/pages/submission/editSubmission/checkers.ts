import { RequirementType } from '@/lib/models/requirement';
import { GetWordCount } from '@/utils/StringHelpers';

const CheckInput = (
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
  const mailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return {
    isValid: mailRegex.test(s),
    errorMsg: 'Your input must contain an email address.',
  };
};

const EvaluateReport = (s: string) => {
  const wordCount = GetWordCount(s as string);
  return {
    isValid: wordCount > 200,
    errorMsg: 'Your input must be longer than 200 words',
  };
};

const EvaluateUrl = (s: string) => {
  const urlRegex =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  return {
    isValid: urlRegex.test(s),
    errorMsg: 'Your input must be a valid URL.',
  };
};

const EvaluatePhoneNumber = (s: string) => {
  const phoneRegex = new RegExp(
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g
  );

  return {
    isValid: phoneRegex.test(s),
    errorMsg: 'Your input must a phone number.',
  };
};

const EvaluateWallet = (s: string) => {
  return {
    isValid: s.length > 26,
    errorMsg: 'Your input must contain only wallet address',
  };
};

const EvaluateSocialMediaAccount = (s: string) => {
  return {
    isValid: s.length > 3,
    errorMsg: 'Your input must be longer than 3 characters',
  };
};

export default CheckInput;
