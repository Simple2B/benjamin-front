'use client';
import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import { CategoryExample } from './CategoryExample';
import { SoldierSearchingCard } from './SoldierSearchingCard';

export const PreviewerSearch = () => {
  const [inputSoldier, setInputSoldier] = useState<string>('');

  const SOLDIERS = [
    { name: 'Charles Abraham', number: '#43758698', city: 'Cleveland, OH' },
    { name: 'Morris Abramowitz', number: '#82758698', city: 'Chicago, IL' },
    { name: 'George Anatole', number: '#99758618', city: 'West Hartford, CT' },
    { name: 'Charles Abraham', number: '#43758698', city: 'Cleveland, OH' },
    { name: 'Morris Abramowitz', number: '#82758698', city: 'Chicago, IL' },
    { name: 'George Anatole', number: '#99758618', city: 'West Hartford, CT' },
    { name: 'Charles Abraham', number: '#43758698', city: 'Cleveland, OH' },
    { name: 'Morris Abramowitz', number: '#82758698', city: 'Chicago, IL' },
    { name: 'George Anatole', number: '#99758618', city: 'West Hartford, CT' },
    { name: 'Charles Abraham', number: '#43758698', city: 'Cleveland, OH' },
    { name: 'Morris Abramowitz', number: '#82758698', city: 'Chicago, IL' },
    { name: 'George Anatole', number: '#99758618', city: 'West Hartford, CT' },
  ];

  return (
    <div>
      <div className="w-full flex flex-col items-center px-8">
        <SearchBar setInputSoldier={setInputSoldier} displaySettings={false} />
      </div>
      <CategoryExample />
      <div className="w-full flex flex-col items-center px-8 gap-3">
        {SOLDIERS.map(({ name, number, city }, index) => (
          <SoldierSearchingCard
            key={index}
            name={name}
            number={number}
            city={city}
          />
        ))}
      </div>
    </div>
  );
};
