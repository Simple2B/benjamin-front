import React from 'react';
import IconButton from './IconButton';

type INavigationButtonProps = {
  icon: string;
  action: string;
  className: string;
  isButtonEnabled: boolean;
  onClick?: React.MouseEventHandler;
  iconClassName: string;
};

const NavigationButton = ({
  icon,
  action,
  className,
  isButtonEnabled,
  iconClassName,
  onClick,
}: INavigationButtonProps) => {
  return (
    <button
      disabled={!isButtonEnabled}
      onClick={onClick}
      className={`inline-flex items-center gap-x-1 p-3 rounded-lg justify-evenly  font-semibold ${className} `}
    >
      <p className={`leading-6 font-semibold font-noto`}>{action}</p>
      <IconButton iconName={icon} className={`${iconClassName} h-4 w-4`} />
    </button>
  );
};

export default NavigationButton;
