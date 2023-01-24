import { GetWordCount } from './StringHelpers';

/**
 * Both, server and client, use these checks
 */

const URL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

const PHONE_REGEX = new RegExp(
  /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g
);

const MAIL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const NAME_REGEX =
  // eslint-disable-next-line no-useless-escape
  /[a-zA-Z]{3}/;

export function isEmailValid(s: string) {
  return MAIL_REGEX.test(s);
}

export function isWalletValid(s: string) {
  const ethRegex = new RegExp('^0x[a-fA-F0-9]{40}$');
  const btcRegex = new RegExp('^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$');

  const isEth = ethRegex.test(s);
  const isBtc = btcRegex.test(s);

  return isBtc || isEth;
}

export function isNameValid(s: string) {
  return NAME_REGEX.test(s);
}

export function isReportValid(s: string) {
  const wordCount = GetWordCount(s as string);
  return wordCount > 10;
}

export function isSocialMediaValid(s: string) {
  const wordCount = GetWordCount(s as string);
  return wordCount > 3;
}

export function isUrlValid(s: string) {
  return URL_REGEX.test(s);
}

export function isPhoneNumberValid(s: string) {
  return PHONE_REGEX.test(s);
}
