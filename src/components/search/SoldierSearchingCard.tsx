import React from 'react';
import { UNICODE_DOT } from '../constants/unicode.constants';
import Link from 'next/link';
import urlJoin from 'url-join';
import { PATH } from '../constants/path.constants';

type ISoldierSearchingCard = {
  firstName: string;
  lastName: string;
  suffix?: string;
  number: string;
  city?: string;
  soldierUuid: string;
  rank?: string;
};
export const SoldierSearchingCard = ({
  firstName,
  lastName,
  suffix,
  number,
  city,
  soldierUuid,
  rank,
}: ISoldierSearchingCard) => {
  return (
    <Link href={urlJoin(PATH.soldier, soldierUuid)}>
      <div className="w-[350px] rounded-lg text-indigo-100 p-3 shadow-box">
        <h2 className="font-semibold">
          {rank} {firstName} {lastName} {suffix}
        </h2>
        <div className="inline-flex gap-2 text-sm">
          <p>#{number}</p>
          <p>{UNICODE_DOT}</p>
          <p>{city}</p>
        </div>
      </div>
    </Link>
  );
};
