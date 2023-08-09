export function GetDateInString(date: Date, forceDays = false) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const today = new Date();

  const diff = Math.abs(today.getTime() - date.getTime());

  const minutes = 1000 * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  const diffOfMinutes = diff / minutes;
  const diffOfHours = diff / hours;
  const diffOfDays = diff / (hours * 24);
  const diffOfWeeks = diff / (days * 7);
  const diffOfMonnths = diff / (days * 31);

  if (forceDays) {
    const x = Math.round(diffOfDays);
    return x + (x === 1 ? ' day' : ' days');
  }

  let dataLabel: string;
  if (diffOfMonnths >= 1) {
    const x = Math.round(diffOfMonnths);
    dataLabel = x + (x === 1 ? ' month' : ' months');
  } else if (diffOfWeeks >= 2) {
    const x = Math.round(diffOfWeeks);
    dataLabel = x + (x === 1 ? ' week' : ' weeks');
  } else if (diffOfDays >= 1) {
    const x = Math.round(diffOfDays);
    dataLabel = x + (x === 1 ? ' day' : ' days');
  } else if (diffOfHours >= 1) {
    const x = Math.round(diffOfHours);
    dataLabel = x + (x === 1 ? ' hour' : ' hours');
  } else if (diffOfMinutes >= 1) {
    const x = Math.round(diffOfMinutes);
    dataLabel = x + (x === 1 ? ' minute' : ' minutes');
  } else {
    dataLabel = 'a few seconds';
  }

  return dataLabel;
}
