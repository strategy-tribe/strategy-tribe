export function GetWordCount(text: string): number {
  if (!text || text.length < 1) return 0;
  return Math.round(text.trim().split(' ').length);
}

export function GetReadTimeInMinutes(text: string, speed = 200): number {
  if (!text || text.length < 1) return 0;
  const textLength = GetWordCount(text);
  return textLength / speed;
}

export function GetReadTimeInSeconds(text: string, speed = 200) {
  if (!text || text.length < 1) return 0;
  const textLength = GetWordCount(text);
  return Math.round((textLength / speed) * 60);
}

export function ParagrapIsTooLong(s: string, paragraphLenght = 30): string {
  const breaker = '.\n\n';

  let finalP = '';

  const sentences = s.split('.').map((s) => s.trim());

  let paragraph: string[] = [];
  for (const sentence of sentences) {
    const fitsAnotherOne = GetWordCount(paragraph.join()) < paragraphLenght;
    if (fitsAnotherOne) {
      paragraph.push(sentence);
    } else {
      finalP = finalP + paragraph.join('. ').trim() + breaker;
      paragraph = [sentence];
    }
  }

  if (paragraph.length) {
    finalP = finalP + paragraph.join('. ').trim();
    paragraph = [];
  }

  return finalP;
}

export function CapitalizeFirstLetter(s: string, eachWord = true): string {
  if (eachWord) return toTitleCase(s);
  else return capitalizeWord(s);
}

const capitalizeWord = (word: string) => {
  const result = word.charAt(0).toUpperCase() + word.slice(1);
  return result;
};

export const toTitleCase = (phrase: string) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map((word) => capitalizeSentence(word))
    .join(' ')
    .trim();
};

export function isString(object: unknown): object is string {
  return typeof object === 'string' && object.length > 0;
}

const capitalizeSentence = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export function cutWallet(address: string) {
  const firstPart = address
    .split('')
    .filter((_, i) => i < 8)
    .join()
    .replaceAll(',', '');

  const secondPart = address
    .split('')
    .filter((_, i) => i > address.split('').length - 8)
    .join()
    .replaceAll(',', '');

  const wallet = `${firstPart} ... ${secondPart}`;

  return wallet;
}
