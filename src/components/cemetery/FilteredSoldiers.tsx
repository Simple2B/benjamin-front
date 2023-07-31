import { useEffect } from 'react';
import { PATH } from '../constants/path.constants';
import { useAppStore } from '@/lib/slices/store';
import { CemeteryOut, SoldierCard } from '@/openapi';
import Link from 'next/link';
import urlJoin from 'url-join';
import Spinner from '../Spinner';
import { AWS_BASE_URL } from '../constants/constants';

type IFilteredSoldiersProps = {
  filterResult: SoldierCard[];
  isFetched: boolean;
  filterText: string;
  cemetery: CemeteryOut;
};

export const FilteredSoldiers = ({
  filterResult,
  isFetched,
  filterText,
  cemetery,
}: IFilteredSoldiersProps) => {
  const { setCurrentCemetery } = useAppStore();

  useEffect(() => {
    setCurrentCemetery(cemetery);
  }, [cemetery]);

  const filterResultText = filterResult?.length
    ? `${filterText} (${filterResult?.length})`
    : 'No soldiers found';

  return (
    <div className={`absolute scroll-container inset-0 h-full `}>
      <div className="relative scroll-area h-[calc(100vh-230px)] w-screen  border-4 border-rose-600 bg-transparent pointer-events-none z-0"></div>
      <div
        className="relative w-screen z-50 bg-white rounded-t-xl scroll-area min-h-screen scrollable-content-cemetery"
        id="scrollable-content"
      >
        <div
          className={`w-full flex flex-col gap-[21px] bg-white rounded-t-xl px-6  z-[9]`}
          id={'cemetery-main-info'}
        >
          <div className="flex w-full justify-center">
            <div className="h-[3px] w-16 bg-grey-50 mt-2 rounded-3xl"></div>
          </div>
          <p className="text-xl leading-7 py-5">{filterResultText}</p>
        </div>

        <div>
          {isFetched ? (
            <div className="flex flex-wrap pb-6 gap-3 px-6">
              {filterResult?.map((soldier, index) => (
                <Link key={index} href={urlJoin(PATH.soldier, soldier.uuid)}>
                  <div className="w-[140px] flex flex-col gap-2">
                    <img
                      src={
                        soldier?.mainPhoto && AWS_BASE_URL
                          ? urlJoin(AWS_BASE_URL, soldier?.mainPhoto)
                          : '/images/photos/soldeirProfilePhoto.jpg'
                      }
                      alt="soldier"
                      className="w-[140px] h-[132px] rounded-lg bg-slate-400 object-cover photo-shadow"
                    />

                    <p className="leading-5 text-center">
                      {soldier?.ranks
                        .map((rank) => rank.abbreviation)
                        .join(' ')}{' '}
                      {soldier.suffix} {soldier.firstName} {soldier.lastName}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
