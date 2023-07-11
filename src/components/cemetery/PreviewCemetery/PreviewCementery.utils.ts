import { filterTitle } from './PreviewCementery.constants';

export const getFilterTitle = (values: (string | null)[]) => {
  if (!values) {
    return '';
  }

  const filteredValues = values.reduce((acc: string[], value, index) => {
    if (value) {
      if (value === 'True') {
        acc.push(`${filterTitle[Object.keys(filterTitle)[index]]}`);
      } else {
        acc.push(`${filterTitle[Object.keys(filterTitle)[index]]} ${value}`);
      }
    }
    return acc;
  }, []);

  const filterName = filteredValues.join('. ');
  return filterName;
};
