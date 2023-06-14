import { MONTH } from '@/components/constants/constants';

export const formatDate = (date: string | undefined) => {
  if (!date) {
    return;
  }
  const [year, mouth, day] = date.split('-');
  const mounthNumber = parseInt(mouth);
  return `${MONTH[mounthNumber]} ${day}th, ${year}`;
};
