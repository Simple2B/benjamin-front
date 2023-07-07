import { MONTH } from '@/components/constants/constants';

export const formatDate = (date: string | undefined) => {
  if (!date) {
    return;
  }
  const [year, mouth, day] = date.split('-');
  const mounthNumber = parseInt(mouth) - 1;
  return `${MONTH[mounthNumber]} ${day}th, ${year}`;
};
