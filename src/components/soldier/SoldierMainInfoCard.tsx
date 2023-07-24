import React from 'react';
import { IMainInfo } from './soldier.types';
import { SoldierCardBlockInfo } from '.';

type ISoldierMainInfoProps = {
  photoUrl: string | undefined;
  sufix: string | undefined;
  firstName: string;
  lastName: string;
  mainInfo: IMainInfo;
};

export const SoldierMainInfoCard = ({
  photoUrl,
  sufix,
  firstName,
  lastName,
  mainInfo,
}: ISoldierMainInfoProps) => {
  return (
    <div className="flex justify-start gap-4 w-[350px] mb-2 ">
      <img
        src={photoUrl ? photoUrl : '/images/photos/soldeirProfilePhoto.jpg'}
        alt="Soldier"
        className="w-[126px] h-[123px] rounded-2xl bg-grey-30 object-cover"
      />

      <div className="flex flex-col">
        <p className="text-xl font-semibold leading-7">
          {sufix} {firstName} {lastName}
        </p>
        <div className="-mt-1">
          <SoldierCardBlockInfo solderInfo={mainInfo} />
        </div>
      </div>
    </div>
  );
};
