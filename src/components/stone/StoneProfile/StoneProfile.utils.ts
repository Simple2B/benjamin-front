import { MONTH } from '@/components/constants/constants';

export const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);

  const day = date.getDate();
  const month = MONTH[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}th, ${year}`;

  return formattedDate;
};
