import React from 'react';
import { PROJECT_INFO_TO_DISPLAY } from './projectInfo/projectInfo.constants';

type ICurrentPointerProps = {
  currentInfoIndex: number;
};

export const CurrentPointer = ({ currentInfoIndex }: ICurrentPointerProps) => {
  return (
    <div className="flex w-12 justify-between mb-14">
      {PROJECT_INFO_TO_DISPLAY.map((item, index) => {
        return (
          <div
            key={item.heading}
            className={`h-3 w-3 ${
              index == currentInfoIndex ? 'bg-indigo-200' : 'bg-grey-40 '
            } rounded-lg`}
          ></div>
        );
      })}
    </div>
  );
};
