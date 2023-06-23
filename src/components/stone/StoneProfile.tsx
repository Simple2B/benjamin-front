import React from 'react';
import { formatDate } from './stoneHorizontalGallery/StoneHorizontalGallery.constants';

type IStoneProfileProps = {
  date: string | undefined;
  sender: string | undefined;
  photoSrc: string | undefined;
};

//src={urlJoin(AWS_BASE_URL || '', photo)}

export const StoneProfile = ({
  date,
  sender,
  photoSrc,
}: IStoneProfileProps) => {
  return (
    <div className={`w-[148px] flex-shrink-0`}>
      {photoSrc ? (
        <img
          src={photoSrc}
          alt="stone"
          className="w-[148px] h-[144px] rounded-lg bg-grey-30 soldier-shawdow"
        />
      ) : (
        <div className="w-[148px] h-[144px] rounded-lg bg-grey-30 soldier-shawdow"></div>
      )}

      <p className="text-xs text-center leading-6 mt-[6px]">
        {date ? formatDate(date) : ''}
      </p>
      <p className="text-xs text-center leading-6">
        {sender ? sender : 'Anonymous'}
      </p>
    </div>
  );
};
