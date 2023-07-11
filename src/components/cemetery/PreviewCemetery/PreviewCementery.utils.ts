import { filterTitle } from './PreviewCementery.constants';

export const getFilterTitle = (values: (string | null)[]) => {
  if (!values) {
    return '';
  }
  const filteredValues = values
    .filter((value) => value !== null && value !== undefined)
    .map(
      (value, index) =>
        `${filterTitle[Object.keys(filterTitle)[index]]} ${value}`
    );
  const filterName = filteredValues.join('. ');
  return filterName;
};
