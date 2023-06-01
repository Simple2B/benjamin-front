'use client';
import React, { useState } from 'react';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';
import Link from 'next/link';
import { PATH } from './constants/path.constants';

type ISearchBarProps = {
  setInputSoldier: (value: string) => void;
};

const SearchBar = ({ setInputSoldier }: ISearchBarProps) => {
  const [userInput, setUserInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setInputSoldier(e.target.value);
  };

  return (
    <div className="rounded-lg bg-white relative flex items-center h-12 justify-between px-1.5 mt-10 w-[350px]">
      <div className="pl-3 flex justify-center items-center">
        <IconButton
          iconName={ICONS_NAME.magnifyingGlass}
          className={'h-4 w-4'}
        />
      </div>
      <input
        type="text"
        placeholder="Seach for the soldier"
        onChange={handleChange}
        value={userInput}
      />
      <IconButton iconName={ICONS_NAME.camera} className={'h-6 w-6'} />
      <Link href={PATH.settings}>
        <IconButton
          iconName={ICONS_NAME.settings}
          className={
            'inline-flex items-center justify-center h-9 w-9 bg-turquoise-100 rounded p-2.5'
          }
        />
      </Link>
    </div>
  );
};

export default SearchBar;
