'use client';
import React, { useState } from 'react';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';
import Link from 'next/link';
import { PATH } from './constants/path.constants';
import { useRouter } from 'next/navigation';

type ISearchBarProps = {
  displaySettings: boolean;
  setInputSoldier: (value: string) => void;
};

const SearchBar = ({ setInputSoldier, displaySettings }: ISearchBarProps) => {
  const [userInput, setUserInput] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setInputSoldier(e.target.value);
  };

  return (
    <div className="mt-10">
      <div
        className={`rounded-lg bg-white relative flex items-center h-12  px-1.5 w-[350px] shadow-lg gap-3 ${
          !displaySettings && 'pr-4'
        }`}
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
          <div
            className="pl-4 flex justify-center items-center"
            onClick={router.back}
          >
            <IconButton
              iconName={ICONS_NAME.selectingArrow}
              className="w-4 h-4 rotate-180"
            />
          </div>
        )}
        {displaySettings ? (
          <Link href={PATH.search}>
            <input
              type="text"
              placeholder="Search for the soldier"
              className="flex-shrink w-[210px]"
              value={userInput}
            />
          </Link>
        ) : (
          <input
            className="flex-shrink w-[250px] "
            type="text"
            placeholder="Search for the soldier"
            onChange={handleChange}
            value={userInput}
          />
        )}
        <div className="flex justify-center items-center">
          <IconButton iconName={ICONS_NAME.camera} className={'h-6 w-6'} />
        </div>
        {displaySettings && (
          <Link href={PATH.settings}>
            <IconButton
              iconName={ICONS_NAME.settings}
              className={
                'inline-flex items-center justify-center h-9 w-9 bg-turquoise-100 rounded p-2.5 mr-[6px]'
              }
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
