'use client';
import React, { useState } from 'react';
import SearchBar from '../SearchBar';

export const PreviewerSearch = () => {
  const [inputSoldier, setInputSoldier] = useState<string>('');
  return (
    <div className="w-full flex flex-col items-center">
      <SearchBar setInputSoldier={setInputSoldier} displaySettings={false} />
      <p>The next/image</p>
    </div>
  );
};
