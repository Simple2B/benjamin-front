import React from 'react';

type IFilteredCategoryExampleProps = {
  categoryText: string;
};
export const FilteredCategoryExample = ({
  categoryText,
}: IFilteredCategoryExampleProps) => {
  return (
    <div className="flex items-center justify-center shadow-custom h-10">
      <p className="rounded-lg px-3 leading-6 text-sm">{categoryText}</p>
    </div>
  );
};
