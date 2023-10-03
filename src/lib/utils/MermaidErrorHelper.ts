// Function to find the line number with the most characters in common with the error
export function findMostRelevantLineNumber(
  errorLineText: string,
  code: string
): number {
  const codeLines = code.split('\n');
  let mostRelevantLineNumber = -1;
  let maxCommonLength = 0;

  for (const [i, line] of codeLines.entries()) {
    let commonLength = 0;
    for (let j = 0; j <= errorLineText.length; j++) {
      for (let k = j + 1; k <= errorLineText.length; k++) {
        const sub = errorLineText.slice(j, k);
        if (line.includes(sub)) {
          commonLength = Math.max(commonLength, sub.length);
        }
      }
    }
    if (commonLength > maxCommonLength) {
      maxCommonLength = commonLength;
      mostRelevantLineNumber = i + 1; // Line numbers start from 1
    }
  }
  return mostRelevantLineNumber;
}
