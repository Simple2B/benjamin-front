import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import urlJoin from 'url-join';
import { PATH } from '../constants/path.constants';
import { AWS_BASE_URL } from '../constants/constants';

export type ISoldierProfileProps = {
  photoUrl?: string;
  name: string;
  uuid: string;
};

const SoldierProfile = ({ photoUrl, name, uuid }: ISoldierProfileProps) => {
  return (
    <Link href={urlJoin(PATH.soldier, uuid)}>
      <div className={`w-36 flex-shrink-0`}>
        {photoUrl ? (
          <img
            src={urlJoin(AWS_BASE_URL || '', photoUrl)}
            alt="Soldier"
            className="w-[126px] h-[123px] rounded-lg bg-grey-30 soldier-shawdow"
          />
        ) : (
          <div className="w-[126px] h-[123px] rounded-lg bg-grey-30 soldier-shawdow"></div>
        )}

        <p className="text-base text-center leading-5 mt-2">{name}</p>
      </div>
    </Link>
  );
};

export default SoldierProfile;
