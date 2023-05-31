import React, { useState } from 'react';
import SearchBar from '../SearchBar';

const PreviewerSearch = () => {
  const [inputSoldier, setInputSoldier] = useState<string>('');
  return (
    <div>
      <SearchBar setInputSoldier={setInputSoldier} />
    </div>
  );
};
