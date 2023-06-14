'use client';
import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import { CategoryExample } from './CategoryExample';
import { SoldierSearchingCard } from './SoldierSearchingCard';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { CemeteriesService, CemeteryOut, SoldierOut } from '@/openapi';
import { useAppStore } from '@/lib/slices/store';
import { PATH } from '../constants/path.constants';

export const PreviewerSearch = () => {
  const [inputSoldier, setInputSoldier] = useState<string>('');
  const router = useRouter();

  const { currentCemetery, setCurrentSoldier } = useAppStore();

  if (!currentCemetery) {
    router.push(PATH.location);
  }

  const soldiersQuery = useQuery(
    ['soldiersQuery', inputSoldier],
    () =>
      CemeteriesService.getSoldiersApiCemeteryCemeteryUuidSoldierGet(
        (currentCemetery as CemeteryOut).uuid,
        inputSoldier,
        1,
        10
      ),
    {
      enabled: !!currentCemetery,
    }
  );

  const handleSoldierClick = (soldier: SoldierOut) => {
    setCurrentSoldier(soldier);
  };

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
            <div
              onClick={() => {
                handleSoldierClick(soldier);
              }}
              key={index}
            >
              <SoldierSearchingCard
                name={soldier.firstName}
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
