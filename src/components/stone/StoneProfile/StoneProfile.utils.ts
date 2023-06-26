import { MONTH } from '@/components/constants/constants';

export const formatDate = (dateTime: string) => {
  const [date, time] = dateTime.split(' ');
  const [year, mount, day] = date.split('-');
  return `${MONTH[parseInt(mount) - 1]} ${day}th, ${year}`;
};
