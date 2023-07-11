import React from 'react';
import Link from 'next/link';
import urlJoin from 'url-join';
import { PATH } from '../constants/path.constants';
import { AWS_BASE_URL } from '../constants/constants';

export type ISoldierProfileProps = {
  photoUrl?: string;
  firstName: string;
  lastName: string;
  suffix: string | undefined;
  uuid: string;
};

const SoldierProfile = ({
  photoUrl,
  firstName,
  lastName,
  suffix,
  uuid,
}: ISoldierProfileProps) => {
  return (
    <Link href={urlJoin(PATH.soldier, uuid)}>
      <div className={`w-[140px] flex-shrink-0`}>
        {photoUrl ? (
          <img
            src={urlJoin(AWS_BASE_URL || '', photoUrl)}
            alt="Soldier"
            className="w-[140px] h-[132px] rounded-lg bg-grey-30 soldier-shawdow"
          />
        ) : (
          <div className="w-[140px] h-[132px] rounded-lg bg-grey-30 soldier-shawdow"></div>
        )}

        <p className="text-base text-center leading-5 mt-2">
          {suffix} {firstName} {lastName}
        </p>
      </div>
    </Link>
  );
};

export default SoldierProfile;
