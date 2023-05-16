'use client';
import NavigationButton from '@/components/NavigationButton';
import SelectingCementery from '@/components/SelectingCementery';
import { ICONS_NAME } from '@/components/constants/iconName';
import { PATH } from '@/components/constants/path.constants';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Page() {
  const [selectedCementery, setSelectedCementery] = useState<string>('');

  return (
    <div className='bg-gradient-to-r from-indigo-20 to-indigo-30 w-screen h-screen flex flex-col justify-start gap-10 p-4 items-end' >
      <h1 className='text-xl leading-none text-white text-center mt-28'>Which American military cemetery would you like to explore?</h1>
      <SelectingCementery setState={setSelectedCementery} />
      <div className="flex justify-end h-3/6 items-end">
        {!!(selectedCementery) ? (  
          <Link href={PATH.cementery}>       
            <NavigationButton icon={ICONS_NAME.arrowRigth} action='Visit soldiers'  className='bg-turquoise-100' />
          </Link>
        ):(
          <NavigationButton icon={ICONS_NAME.arrowRigth} action='Visit soldiers'  className='&:disabled bg-indigo-10 opacity-60'/>
        )
        }
      </div>
    </div>
  );
}