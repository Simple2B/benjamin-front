import { ICONS_NAME } from '@/components/constants/iconName';
import { QUERY_PARAMS } from '@/components/constants/queryParams';

export const filterExamples = [
  {
    iconName: ICONS_NAME.locationPin,
    iconDescription: 'Born in New York',
    queryParam: QUERY_PARAMS.birthLocation,
    value: 'New York',
  },
  {
    iconName: ICONS_NAME.davidStar,
    iconDescription: 'Headstone Change',
    queryParam: QUERY_PARAMS.isHeadstoneChanged,
    value: 'True',
  },
  {
    iconName: ICONS_NAME.calendar,
    iconDescription: 'Born in April',
    queryParam: QUERY_PARAMS.birthMonth,
    value: 'April',
  },
];
