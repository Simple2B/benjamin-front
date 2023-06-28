import React, { useEffect, useState } from 'react';
import IconButton from '../../IconButton';
import { ICONS_NAME } from '../../constants/iconName';
import { formatDate } from './StoneProfile.utils';
import { IStone } from '../PreviewerStone';
import { stoneTimer } from '@/components/constants/constants';
import { useAppStore } from '@/lib/slices/store';

type IStoneProfileProps = {
  item: IStone;
  handleDelete: (arg: string) => void;
};

export const StoneProfile = ({ item, handleDelete }: IStoneProfileProps) => {
  const { created_at, photoUrl, senderName, uuid } = item;
  const [isRemovable, setRemovable] = useState<boolean>(false);

  useEffect(() => {
    setRemovable(false);
    const timeNow = new Date();
    const timeStarted = new Date(created_at);
    const timeDifference = timeNow.getTime() - timeStarted.getTime();
    const timeDifferenceMilliSeconds = Math.floor(timeDifference);

    if (timeDifferenceMilliSeconds < stoneTimer) {
      setRemovable(true);

      const timer = setTimeout(() => {
        setRemovable(false);
      }, stoneTimer - timeDifferenceMilliSeconds);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [item.photoUrl]);

  return (
    <div className={`w-[148px] flex-shrink-0`}>
      <div className="w-full flex flex-col items-end">
        {isRemovable ? (
          <div
            className={`flex justify-center w-8 h-8 bg-indigo-100 items-center sticky top-4 -mr-2 rounded-full `}
            onClick={() => handleDelete(uuid)}
          >
            <IconButton
              iconName={ICONS_NAME.cross}
              className="w-4 h-4 negative"
            />
          </div>
        ) : (
          <div className="flex justify-center w-8 h-8 items-center sticky top-4 -mr-2 rounded-full"></div>
        )}
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="stone"
            className="w-[148px] h-[144px] rounded-lg bg-grey-30 soldier-shawdow"
          />
        ) : (
          <div className="w-[148px] h-[144px] rounded-lg bg-grey-30 soldier-shawdow"></div>
        )}
      </div>

      <p className="text-xs text-center leading-6 mt-[6px]">
        {created_at ? formatDate(created_at) : ''}
      </p>
      <p className="text-xs text-center leading-6">
        {senderName ? senderName : 'Anonymous'}
      </p>
    </div>
  );
};
