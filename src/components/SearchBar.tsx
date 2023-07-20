'use client';
import React, { useState } from 'react';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';
import Link from 'next/link';
import { PATH } from './constants/path.constants';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/slices/store';
import urlJoin from 'url-join';

type ISearchBarProps = {
  displaySettings: boolean;
  setInputSoldier: (value: string) => void;
};

const SearchBar = ({ setInputSoldier, displaySettings }: ISearchBarProps) => {
  const [userInput, setUserInput] = useState<string>('');
  const router = useRouter();

  const { currentCemetery } = useAppStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setInputSoldier(e.target.value);
  };

  return (
    <div className="mt-10">
      <div
        className={`rounded-lg bg-white relative flex items-center h-12  pl-1.5 shadow-lg gap-3 w-[350px] `}
        style={{
          boxShadow: '0 2px 24px 0 rgba(0, 0, 0, 0.2)',
        }}
      >
        {displaySettings ? (
          <div className="pl-4 flex justify-center items-center">
            <IconButton
              iconName={ICONS_NAME.magnifyingGlass}
              className={'h-4 w-4'}
            />
          </div>
        ) : (
          <Link
            className="pl-4 flex justify-center items-center"
            href={
              currentCemetery?.uuid
                ? urlJoin(PATH.cemetery, currentCemetery?.uuid)
                : PATH.location
            }
          >
            <IconButton
              iconName={ICONS_NAME.navigateBack}
              className="w-4 h-4 rotate-180"
            />
          </Link>
        )}
        {displaySettings ? (
          <Link href={PATH.search}>
            <input
              type="text"
              placeholder="Search for a soldier"
              className="flex-shrink w-[210px] outline-none"
              defaultValue={userInput}
            />
          </Link>
        ) : (
          <input
            className="flex-shrink w-[210px] outline-none"
            type="text"
            placeholder="Search for a soldier"
            onChange={handleChange}
            defaultValue={userInput}
          />
        )}
        <div className="flex justify-center items-center">
          <IconButton iconName={ICONS_NAME.camera} className={'h-6 w-6'} />
        </div>
        {displaySettings ? (
          <Link href={PATH.settings}>
            <IconButton
              iconName={ICONS_NAME.settings}
              className={
                'inline-flex items-center justify-center h-9 w-9 bg-turquoise-100 rounded p-2.5 mr-[6px]'
              }
            />
          </Link>
        ) : (
          <Link
            href={
              currentCemetery?.uuid
                ? urlJoin(PATH.category, currentCemetery?.uuid)
                : PATH.location
            }
          >
            <IconButton
              iconName={ICONS_NAME.filter}
              className={
                'inline-flex items-center justify-center h-9 w-9 bg-[#EDF8FB] rounded p-1.5 mr-[6px]'
              }
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
