import React, { useEffect, useState } from 'react';
import IconButton from '../../IconButton';
import { ICONS_NAME } from '../../constants/iconName';
import { formatDate } from './StoneProfile.utils';
import { IStone } from '../PreviewerStone';
import { useAppStore } from '@/lib/slices/store';

type IStoneProfileProps = {
  item: IStone;
  handleDelete: (arg: string) => void;
};

export const StoneProfile = ({ item, handleDelete }: IStoneProfileProps) => {
  const { created_at, photoUrl, senderName, uuid } = item;
  const [isRemovable, setRemovable] = useState<boolean>(false);
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const { currentStones } = useAppStore();

  useEffect(() => {
    const isUploadedRecently = currentStones?.some(
      (stone) => stone.uuid === uuid
    );

    if (isUploadedRecently) {
      setRemovable(true);
    } else {
      setRemovable(false);
    }
  }, [item.uuid]);

  const handleComfirmDeletePhoto = () => {
    handleDelete(uuid);
    setDeleting(false);
  };

  return (
    <div className={`w-[148px] flex-shrink-0`}>
      <div className="w-full flex flex-col items-end">
        {isRemovable ? (
          <div
            className={`flex justify-center w-8 h-8 bg-indigo-100 items-center sticky top-4 -mr-2 rounded-full `}
            onClick={() => setDeleting(true)}
          >
            <IconButton iconName={ICONS_NAME.crossWhite} className="w-4 h-4" />
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
      {isDeleting && <div className="filter-indigo" />}
      {isDeleting && (
        <div className="w-full fixed h-52 bg-white bottom-0 left-0 z-50 rounded-t-xl flex flex-col items-center">
          <p className="mt-8 leading-5 font-medium px-10">
            Are you sure you want to delete this photo?
          </p>
          <div className="flex gap-8 text-white font-semibold leading-6 mt-10">
            <button
              className="h-12 w-[158px] bg-turquoise-100 rounded-lg"
              onClick={handleComfirmDeletePhoto}
            >
              Yes
            </button>
            <button
              className="bg-grey-20 h-12 w-[158px] rounded-lg"
              onClick={() => setDeleting(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
