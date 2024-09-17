import dayjs from 'dayjs';

/**
 * Returns the initials of a given name.
 * If the name has only one word, it returns the first two letters of that word.
 * @param name - The name to get the initials from.
 * @returns The initials of the given name.
 */
export function getInitials(name: string = ''): string {
  const splitName = name?.split(' ');

  if (splitName?.length < 2) return name.slice(0, 2).toUpperCase();

  const firstInitial = splitName?.[0]?.charAt(0);
  const secondInitial = splitName?.[1]?.charAt(0);

  return firstInitial + secondInitial;
}

/**
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalizes each word in a given string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalizeEachWord(str: string) {
  return str.split(' ').map(capitalize).join(' ');
}

/**
 * Parses a string input and returns a formatted date string.
 * @param input - The string input to be parsed.
 * @returns A formatted date string.
 */
export function specialParseDateFormat(input: string) {
  const noDash = input.replace(/[-/\s]/g, '');
  const matches = noDash.match(/(\D+)(\d+)/);
  if (matches && matches.length === 3) {
    const text = matches[1].trim();
    const number = matches[2].trim();
    const isNumberYear = number.length === 4;
    const otherNumber = input.replace(number, '').replace(text, '').trim();
    if (!isNumberYear) {
      return `${number} ${text} ${otherNumber}`;
    }
    return `${otherNumber} ${text} ${number}`;
  }
  return input;
}

/**
 * Parses a string input into a Date object using dayjs library.
 * @param input - The string input to be parsed into a Date object.
 * @returns A Date object parsed from the input string.
 */
export function dateParser(input: string) {
  return dayjs(capitalizeEachWord(specialParseDateFormat(input)), [
    'DDMMYYYY',
    'DDMMMMYYYY',
    'DD MMMM YYYY',
    'DD MM YYYY',
    'DD-MM-YYYY',
    'DD-MMMM-YYYY',
    'DD/MM/YYYY',
    'DD/MMMM/YYYY',
  ]).toDate();
}

export function breakLongString(inputString: string, maxLineLength: number) {
  const words = inputString.split(' ');
  let currentLine = '';
  let result = '';

  words.forEach((word) => {
    if (currentLine.length + word.length <= maxLineLength) {
      currentLine += ` ${word}`;
    } else {
      result += `${currentLine.trim()}\n`;
      currentLine = word;
    }
  });

  result += currentLine.trim();

  return result;
}

export function includesAll(arr: any[], target: any[]) {
  return target.every((v) => arr.includes(v));
}

export function includesAny(arr: any[], target: any[]) {
  return target.some((v) => arr.includes(v));
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
