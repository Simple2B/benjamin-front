'use client';
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import NavigationButton from '../NavigationButton';
import SelectingCemetery from '../SelectingCementery';
import { ICONS_NAME } from '../constants/iconName';
import { PATH } from '../constants/path.constants';
import { Cemeteries, CemeteryOut } from '@/openapi';
import urlJoin from 'url-join';

interface ICemeteriesBox {
  cemeteries: Cemeteries;
}

const CemeteriesBox = ({ cemeteries }: ICemeteriesBox) => {
  const [selectedCemetery, setSelectedCemetery] = useState<CemeteryOut>({
    name: '',
    location: '',
    uuid: '',
  });

  return (
    <div className="bg-gradient-to-r from-indigo-20 to-indigo-30 w-screen flex flex-col justify-start gap-8 px-8 items-center all-height">
      <h1
        className={`font-rajdhani text-2xl leading-8 text-white text-center mt-40 font-semibold`}
      >
        Which American military cemetery would you like to explore?
      </h1>
      <SelectingCemetery
        selectedCemetery={selectedCemetery}
        setCemetery={setSelectedCemetery}
        cemeteries={cemeteries.items}
        isRedirecting={false}
      />
      <div className="flex justify-end h-full items-end self-end mb-8">
        <Link
          href={
            !!selectedCemetery.name
              ? urlJoin(PATH.cemetery, selectedCemetery.uuid)
              : PATH.location
          }
        >
          <NavigationButton
            icon={ICONS_NAME.arrowRigth}
            action="Visit soldiers"
            className="w-44"
            isButtonEnabled={!!selectedCemetery.name}
            onClick={() => {}}
          />
        </Link>
      </div>
    </div>
  );
};

export default CemeteriesBox;
