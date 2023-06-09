'use client';

import { CemeteryOut } from '@/openapi';
import Link from 'next/link';
import { useState } from 'react';
import urlJoin from 'url-join';
import NavigationButton from '../NavigationButton';
import SelectingCemetery from '../SelectingCementery';
import { ICONS_NAME } from '../constants/iconName';
import { PATH } from '../constants/path.constants';

interface ICemeteriesBox {
  cemeteries: Array<CemeteryOut>;
}

const CemeteriesBox = ({ cemeteries }: ICemeteriesBox) => {
  const [selectedCemetery, setSelectedCemetery] = useState<
    CemeteryOut | undefined
  >(undefined);

  return (
    <div className="bg-gradient-to-r from-indigo-20 to-indigo-30 w-screen flex flex-col justify-start gap-8 px-8 items-center all-height">
      <h1
        className={`font-rajdhaniSemiBold text-2xl leading-8 text-white text-center mt-40 font-semibold`}
      >
        Which American military cemetery would you like to explore?
      </h1>
      <SelectingCemetery
        selectedCemetery={selectedCemetery}
        onSelect={setSelectedCemetery}
        cemeteries={cemeteries}
      />
      <div className="flex justify-end h-full items-end self-end mb-8">
        <Link
          href={
            !!selectedCemetery?.name
              ? urlJoin(PATH.cemetery, selectedCemetery.uuid)
              : PATH.location
          }
        >
          <NavigationButton
            icon={ICONS_NAME.arrowRigth}
            action="Visit soldiers"
            className={`${
              !!selectedCemetery?.name
                ? 'bg-turquoise-100 text-white'
                : 'bg-indigo-10 text-grey-20'
            } w-44 `}
            iconClassName={!!selectedCemetery?.name ? '' : 'opacity-25'}
            isButtonEnabled={!!selectedCemetery?.name}
            onClick={() => {}}
          />
        </Link>
      </div>
    </div>
  );
};

export default CemeteriesBox;
