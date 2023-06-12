import React from 'react';
import { UNICODE_DOT } from '../constants/unicode.constants';

type ISoldierSearchingCard = {
  name: string;
  number: string;
  city: string;
};
export const SoldierSearchingCard = ({
  name,
  number,
  city,
}: ISoldierSearchingCard) => {
  return (
    <div className="w-80 rounded-lg text-indigo-100 p-3 shadow-box m-2">
      <h2 className="font-semibold">{name}</h2>
      <div className="inline-flex gap-2 text-sm">
        <p>{number}</p>
        <p>{UNICODE_DOT}</p>
        <p>{city}</p>
      </div>
    </div>
  );
};
