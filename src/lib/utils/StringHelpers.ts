export function GetWordCount(text: string): number {
  if (!text || text.length < 1) return 0;
  return Math.round(text.trim().split(' ').length);
}

export function GetReadTimeInMinutes(text: string, speed = 200): number {
  if (!text || text.length < 1) return 0;
  let textLength = GetWordCount(text);
  return textLength / speed;
}

export function GetReadTimeInSeconds(text: string, speed = 200) {
  if (!text || text.length < 1) return 0;
  let textLength = GetWordCount(text);
  return Math.round((textLength / speed) * 60);
}
