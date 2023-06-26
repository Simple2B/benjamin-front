import React, { useEffect, useState } from 'react';
import IconButton from '../../IconButton';
import { ICONS_NAME } from '../../constants/iconName';
import { formatDate } from './StoneProfile.utils';
import { IStone } from '../PreviewerStone';
import { useAppStore } from '@/lib/slices/store';
import { stoneTimer } from '@/components/constants/constants';
import moment from 'moment';

type IStoneProfileProps = {
  item: IStone;
  handleDelete: (arg: string) => void;
};

export const StoneProfile = ({ item, handleDelete }: IStoneProfileProps) => {
  const { date, photoSrc, sender } = item;
  const [isRemovable, setRemovable] = useState<boolean>(false);

  useEffect(() => {
    const timeNow = moment();
    const itemCreatingFormatedTime = moment(date, 'YYYY-MM-DD HH:mm:ss');

    const timeDifferenceMinutes = timeNow.diff(
      itemCreatingFormatedTime,
      'milliseconds'
    );

    if (timeDifferenceMinutes < stoneTimer) {
      setRemovable(true);

      const timer = setTimeout(() => {
        setRemovable(false);
      }, stoneTimer - timeDifferenceMinutes);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [item.photoSrc]);

  return (
    <div className={`w-[148px] flex-shrink-0`}>
      <div className="w-full flex flex-col items-end">
        {isRemovable ? (
          <div
            className={`flex justify-center w-8 h-8 bg-indigo-100 items-center sticky top-4 -mr-2 rounded-full `}
            onClick={() => handleDelete(photoSrc)}
          >
            <IconButton
              iconName={ICONS_NAME.cross}
              className="w-4 h-4 negative"
            />
          </div>
        ) : (
          <div className="flex justify-center w-8 h-8 items-center sticky top-4 -mr-2 rounded-full"></div>
        )}
        {photoSrc ? (
          <img
            src={photoSrc}
            alt="stone"
            className="w-[148px] h-[144px] rounded-lg bg-grey-30 soldier-shawdow"
          />
        ) : (
          <div className="w-[148px] h-[144px] rounded-lg bg-grey-30 soldier-shawdow"></div>
        )}
      </div>

      <p className="text-xs text-center leading-6 mt-[6px]">
        {date ? formatDate(date) : ''}
      </p>
      <p className="text-xs text-center leading-6">
        {sender ? sender : 'Anonymous'}
      </p>
    </div>
  );
};
