import React from 'react';
import { FilteredCategoryExample } from './FilteredCategoryExample';
import Link from 'next/link';
import { PATH } from '../constants/path.constants';
import { useAppStore } from '@/lib/slices/store';
import urlJoin from 'url-join';

type ICategoryBlockProps = {
  categoryHeader: string;
  categoryText: string[];
};

export const CategoryBlock = ({
  categoryHeader,
  categoryText,
}: ICategoryBlockProps) => {
  const { currentCemetery } = useAppStore();
  return (
    <div>
      <p className="font-semibold leading-6 mb-3">{categoryHeader}</p>
      <div className="flex gap-2 flex-wrap">
        {categoryText.map((text, index) => (
          <Link
            href={
              currentCemetery
                ? urlJoin(PATH.cemetery, currentCemetery.uuid)
                : PATH.location
            }
            key={index}
          >
            <FilteredCategoryExample categoryText={text} key={text} />
          </Link>
        ))}
      </div>
    </div>
  );
};
