export const SECOND = 1000;
export const AWS_BASE_URL = process.env.NEXT_PUBLIC_AWS_BASE_URL;

export const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const stoneTimer = 100000;

export const maxMessageLength: number = 500;
export const messageTimer = 5000;

export const messageSender = {
  1: 'Family',
  2: 'Operation Bengamin',
  3: 'unsigned',
};

export const MONTHS: { [key: string]: number } = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export const MONTHS_BY_NUMBER: { [key: number]: string } = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const categoryFilterNames = {
  birthLocation: 'Born in',
  birthMonth: 'Born in',
  birthDay: 'Born on',
  birthYear: 'Born in',
  deathMonth: 'Died in',
  deathDay: 'Died on',
  deathYear: 'Died in',
};

export const MAP_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN;
