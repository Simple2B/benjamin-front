'use client';

import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import NavigationButton from './NavigationButton';
import SelectingCemetery from './SelectingCementery';
import { ICONS_NAME } from './constants/iconName';
import { PATH } from './constants/path.constants';
import { Cemeteries, CemeteryOut } from '@/openapi';
import urlJoin from 'url-join';

interface ICemeteriesBox {
  cemeteries: Cemeteries;
}

const CemeteriesBox = ({ cemeteries }: ICemeteriesBox) => {
  console.log(cemeteries);
  const [selectedCemetery, setSelectedCemetery] = useState<CemeteryOut | null>(
    null
  );
  return (
    <>
      <SelectingCemetery
        setCemetery={setSelectedCemetery}
        cemeteries={cemeteries}
      />
      <div className="flex justify-end h-3/6 items-end self-end">
        <Link
          href={
            !!selectedCemetery
              ? urlJoin(PATH.cemetery, selectedCemetery.uuid)
              : PATH.location
          }
        >
          <NavigationButton
            icon={ICONS_NAME.arrowRigth}
            action="Visit soldiers"
            className={
              !!selectedCemetery
                ? 'bg-turquoise-100'
                : '&:disabled bg-indigo-10 opacity-60'
            }
            isButtonEnabled={true}
            onClick={() => {}}
          />
        </Link>
      </div>
    </>
  );
};

export default CemeteriesBox;
