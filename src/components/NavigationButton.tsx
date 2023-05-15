import React from 'react';
import IconButton from './IconButton';

type INavigationButtonProps = {
  icon: string,
	action: string,
}


const NavigationButton = ({icon, action}: INavigationButtonProps) => {
  return (
    <div>
      <div className='inline-flex items-center gap-x-1 p-3 rounded-lg bg-turquoise-100 w-28 justify-evenly m-3'>      
        <p className='text-white'>{action}</p> 
        <IconButton iconName={icon} className={'h-3 w-3'}/> 	
      </div>
    </div>
  );
};

export default NavigationButton;