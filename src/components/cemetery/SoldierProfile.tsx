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
  rank?: string;
};

const SoldierProfile = ({
  photoUrl,
  firstName,
  lastName,
  suffix,
  uuid,
  rank,
}: ISoldierProfileProps) => {
  const soldierFullName = `${rank} ${firstName} ${lastName} ${suffix}`;
  return (
    <Link href={urlJoin(PATH.soldier, uuid)}>
      <div className={`w-[140px] flex-shrink-0`}>
        <img
          src={
            photoUrl
              ? urlJoin(AWS_BASE_URL || '', photoUrl)
              : '/images/photos/soldeirProfilePhoto.jpg'
          }
          alt="Soldier"
          className="w-[140px] h-[132px] rounded-lg bg-grey-30 soldier-shawdow object-cover"
        />

        <p className="text-base text-center leading-5 mt-2">
          {soldierFullName}
        </p>
      </div>
    </Link>
  );
};

export default SoldierProfile;
