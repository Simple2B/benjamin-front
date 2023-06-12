import React from 'react';
import { FilteredCategoryExample } from './FilteredCategoryExample';

type ICategoryBlockProps = {
  categoryHeader: string;
  categoryText: string[];
};

export const CategoryBlock = ({
  categoryHeader,
  categoryText,
}: ICategoryBlockProps) => {
  return (
    <div>
      <p className="font-semibold leading-6 mb-3">{categoryHeader}</p>
      <div className="flex gap-2 flex-wrap">
        {categoryText.map((text) => (
          <FilteredCategoryExample categoryText={text} key={text} />
        ))}
      </div>
    </div>
  );
};
