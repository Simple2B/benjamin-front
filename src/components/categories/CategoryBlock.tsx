import React from 'react';
import { FilteredCategoryExample } from './FilteredCategoryExample';
import Link from 'next/link';
import { PATH } from '../constants/path.constants';
import urlJoin from 'url-join';
import { MONTHS_BY_NUMBER } from '../constants/constants';

type ICategoryBlockProps = {
  categoryHeader: string;
  categoryText: number[] | string[];
  queryParam: string;
  cemeteryUuid: string;
};

export const CategoryBlock = ({
  categoryHeader,
  categoryText,
  queryParam,
  cemeteryUuid,
}: ICategoryBlockProps) => {
  return (
    <div>
      <p className="font-semibold leading-6 mb-3">{categoryHeader}</p>
      <div className="flex gap-2 flex-wrap">
        {categoryText.map((text, index) => (
          <Link
            href={{
              pathname: urlJoin(PATH.cemetery, cemeteryUuid),
              query: { [queryParam]: text },
            }}
            key={index}
          >
            {queryParam == 'deathMonth' || queryParam == 'birthMonth' ? (
              <FilteredCategoryExample
                categoryText={MONTHS_BY_NUMBER[text as number]}
                key={text}
              />
            ) : (
              <FilteredCategoryExample categoryText={text} key={text} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
