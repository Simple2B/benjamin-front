'use client';

import { CemeteryOut } from '@/openapi';
import Link from 'next/link';
import { useState } from 'react';
import urlJoin from 'url-join';
import NavigationButton from '../NavigationButton';
import SelectingCemetery from '../SelectingCementery';
import { ICONS_NAME } from '../constants/iconName';
import { PATH } from '../constants/path.constants';
import { useAppStore } from '@/lib/slices/store';

interface ICemeteriesBox {
  cemeteries: Array<CemeteryOut>;
}

const CemeteriesBox = ({ cemeteries }: ICemeteriesBox) => {
  const [selectedCemetery, setSelectedCemetery] = useState<
    CemeteryOut | undefined
  >(undefined);
  const [isSelectingOpen, setSelectingOpen] = useState<boolean>(false);

  const { setCurrentCemetery } = useAppStore();

  const handleSelect = (cemetery: CemeteryOut) => {
    setCurrentCemetery(cemetery);
    setSelectedCemetery(cemetery);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-20 to-indigo-30 w-screen flex flex-col justify-start gap-8 px-8 items-center all-height">
      <h1
        className={`text-xl leading-[30px] text-white text-center mt-40 font-semibold`}
      >
        Which cemetery would you like to explore?
      </h1>
      <SelectingCemetery
        selectedCemetery={selectedCemetery}
        onSelect={handleSelect}
        cemeteries={cemeteries}
        setSelectingOpen={setSelectingOpen}
        boxWidth={`w-[302px]`}
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
