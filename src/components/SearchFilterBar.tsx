'use client';
import React, { use } from 'react';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/slices/store';
import urlJoin from 'url-join';
import { PATH } from './constants/path.constants';

type ISearchBarProps = {
  filterText: string;
  setFilter: (value: boolean) => void;
};

const SearchFilterBar = ({ filterText, setFilter }: ISearchBarProps) => {
  const router = useRouter();
  const { currentCemetery } = useAppStore();

  return (
    <div className="mt-10">
      <div
        className={`rounded-lg bg-white relative flex items-center h-12 justify-between px-4 w-[350px] shadow-lg gap-3 `}
        style={{
          boxShadow: '0 2px 24px 0 rgba(0, 0, 0, 0.2)',
        }}
      >
        <p className="leading-6">{filterText} </p>
        <Link
          href={
            currentCemetery?.uuid
              ? urlJoin(PATH.cemetery, currentCemetery?.uuid)
              : PATH.location
          }
        >
          <div
            className="flex justify-center items-center"
            onClick={() => setFilter(false)}
          >
            <IconButton
              iconName={ICONS_NAME.cross}
              className="w-4 h-4 rotate-180"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SearchFilterBar;
