import { MONTH } from '@/components/constants/constants';

export const formatDate = (date: string) => {
  const [year, mount, day] = date.split('-');
  return `${MONTH[parseInt(mount) - 1]} ${day}th, ${year}`;
};
