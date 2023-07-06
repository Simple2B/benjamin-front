import React, { useEffect, useState } from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { useRouter } from 'next/navigation';
import { PATH } from '../constants/path.constants';
import Link from 'next/link';
import urlJoin from 'url-join';
import { useAppStore } from '@/lib/slices/store';
import { CemeteriesService, CemeteryOut } from '@/openapi';
import { useQuery } from '@tanstack/react-query';

export const CategoryExample = () => {
  const [birthMonth, setBirthMonth] = useState<number | undefined>(undefined);
  const [birthDay, setBirthDay] = useState<number | undefined>(undefined);
  const [birthYear, setBirthYear] = useState<number | undefined>(undefined);
  const [deathMonth, setDeathMonth] = useState<number | undefined>(undefined);
  const [deathDay, setDeathDay] = useState<number | undefined>(undefined);
  const [deathYear, setDeathYear] = useState<number | undefined>(undefined);
  const [birthLocation, setBirthLocation] = useState<string | undefined>(
    undefined
  );

  const router = useRouter();
  const { currentCemetery, setCurrentFilteredSoldiers, setCurrentFilterTitle } =
    useAppStore();

  useEffect(() => {
    setCurrentFilteredSoldiers([]);
    setCurrentFilterTitle('');
  }, []);

  const filterExamples = [
    {
      iconName: ICONS_NAME.locationPin,
      iconDescription: 'Born in New York',
      propertie: 'bitrhLocation',
      value: 'New York',
    },
    {
      iconName: ICONS_NAME.calendar,
      iconDescription: 'Born in April',
      propertie: 'birthMouth',
      value: '4',
    },
    {
      iconName: ICONS_NAME.calendar,
      iconDescription: 'Born in 2023',
      propertie: 'birthYear',
      value: '2023',
    },
    {
      iconName: ICONS_NAME.locationPin,
      iconDescription: 'Born in LA',
      propertie: 'bitrhLocation',
      value: 'LA',
    },
    {
      iconName: ICONS_NAME.calendar,
      iconDescription: 'Born in July',
      propertie: 'birthMouth',
      value: '7',
    },
  ];

  const soldiersQuery = useQuery(
    [
      birthLocation,
      birthMonth,
      birthDay,
      birthYear,
      deathMonth,
      deathDay,
      deathYear,
    ],
    () =>
      CemeteriesService.getCemeterySoldiers(
        (currentCemetery as CemeteryOut).uuid,
        undefined,
        birthYear,
        birthMonth,
        birthDay,
        deathYear,
        deathMonth,
        deathDay,
        birthLocation,
        1,
        10
      ),
    {
      enabled: !!currentCemetery,
    }
  );

  const handleClick = (propertie: string, value: any) => {
    if (propertie == 'birthMouth') {
      setBirthMonth(value);
    }
    if (propertie == 'birthDay') {
      setBirthDay(value);
    }
    if (propertie == 'birthYear') {
      setBirthYear(value);
    }
    if (propertie == 'deathMouth') {
      setDeathMonth(value);
    }
    if (propertie == 'deathDay') {
      setDeathDay(value);
    }
    if (propertie == 'deathYear') {
      setDeathYear(value);
    }
    if (propertie == 'bitrhLocation') {
      setBirthLocation(value);
    }
    setCurrentFilterTitle(`${propertie} ${value}`);
  };

  const handleSearch = () => {
    if (soldiersQuery.isFetched) {
      if (soldiersQuery.data && currentCemetery) {
        console.log('soldiersQuery.data', soldiersQuery.data);
        setCurrentFilteredSoldiers(soldiersQuery.data.items);

        router.push(urlJoin(PATH.cemetery, currentCemetery?.uuid));
      }
    }
  };

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-4  text-indigo-100 mt-5">
        {filterExamples.map(
          ({ iconName, iconDescription, propertie, value }, index) => (
            <div key={index} onClick={() => handleClick(propertie, value)}>
              <div
                className={`bg-opacity-20  bg-turquoise-50 h-8 pl-[10px] pr-3 flex gap-3 justify-center items-center rounded-2xl whitespace-nowrap flex-shrink-0 overflow-hidden ${
                  index == 0 ? 'ml-[calc((100vw-350px)/2)]' : ''
                }`}
              >
                <IconButton iconName={iconName} className="h-3 w-3" />
                <p className="text-sm leading-5">{iconDescription}</p>
              </div>
            </div>
          )
        )}
        <Link href={PATH.category}>
          <div className="bg-opacity-20  bg-turquoise-50 h-8 pl-[10px] pr-3 flex gap-3 justify-center items-center rounded-2xl whitespace-nowrap flex-shrink-0 overflow-hidden mr-[calc((100vw-350px)/2)]">
            <IconButton iconName={ICONS_NAME.ellipsis} className="h-3 w-3" />
            <p className="text-sm leading-5">More</p>
          </div>
        </Link>
      </div>
      <p className="w-full text-center" onClick={handleSearch}>
        Search
      </p>
    </>
  );
};
