import React from 'react';
import IconButton from './IconButton';

type INavigationButtonProps = {
  icon: string;
  action: string;
  className: string;
  isButtonEnabled: boolean;
  onClick?: React.MouseEventHandler;
};

const NavigationButton = ({
  icon,
  action,
  className,
  isButtonEnabled,
  onClick,
}: INavigationButtonProps) => {
  return (
    <button
      disabled={!isButtonEnabled}
      onClick={onClick}
      className={`inline-flex items-center gap-x-1 p-3 rounded-lg justify-evenly text-white  font-semibold ${className} ${
        isButtonEnabled ? 'bg-turquoise-100' : 'bg-grey-30'
      }`}
    >
      <p className={`leading-6 font-semibold font-noto`}>{action}</p>
      <IconButton iconName={icon} className={'h-4 w-4'} />
    </button>
  );
};

export default NavigationButton;
