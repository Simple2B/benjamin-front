'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar';
import { CategoryExample } from './CategoryExample';
import { SoldierSearchingCard } from './SoldierSearchingCard';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  CemeteriesService,
  CemeteryOut,
  SoldierCard,
  SoldierOut,
} from '@/openapi';
import { useAppStore } from '@/lib/slices/store';
import { PATH } from '../constants/path.constants';

export const PreviewerSearch = () => {
  const [inputSoldier, setInputSoldier] = useState<string>('');
  const router = useRouter();

  const { currentCemetery, setCurrentSoldier } = useAppStore();

  useEffect(() => {
    if (!currentCemetery) {
      router.push(PATH.location);
    }
  }, [currentCemetery, router]);

  const soldiersQuery = useQuery(
    ['soldiersQuery', inputSoldier],
    () =>
      CemeteriesService.getCemeterySoldiers(
        (currentCemetery as CemeteryOut).uuid,
        inputSoldier,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        1,
        10
      ),
    {
      enabled: !!currentCemetery,
    }
  );

  return (
    <div>
      <div className="w-full flex flex-col items-center px-8">
        <SearchBar displaySettings={false} setInputSoldier={setInputSoldier} />
      </div>
      <CategoryExample />
      <div className="w-full flex flex-col items-center px-8 gap-3 mt-2">
        {soldiersQuery.isFetched &&
          soldiersQuery.data &&
          soldiersQuery.data.items.map((soldier, index) => (
            <div key={index}>
              <SoldierSearchingCard
                name={soldier.name}
                number={soldier.serviceNumber}
                city={soldier.birthLocation}
                soldierUuid={soldier.uuid}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
