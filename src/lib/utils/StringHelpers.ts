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

export function CapitalizeFirstLetter(s: string, eachWord = true): string {
  if (eachWord) return toTitleCase(s);
  else return capitalizeSentence(s);
}

const capitalizeSentence = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const toTitleCase = (phrase: string) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map((word) => capitalizeSentence(word))
    .join(' ');
};
