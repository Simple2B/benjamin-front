import React, { useEffect, useState } from 'react';
import Toggle from 'react-styled-toggle';

export const IntroAnimationSwitcher = () => {
  const [isAnimationEnabled, setAnimationEnabled] = useState<boolean>(false);

  useEffect(() => {
    setAnimationEnabled(
      window.localStorage.getItem('isAnimationEnabled') == 'true' ? true : false
    );
  }, []);

  const handleSwitch = () => {
    localStorage.setItem(
      'isAnimationEnabled',
      JSON.stringify(!isAnimationEnabled)
    );

    setAnimationEnabled(!isAnimationEnabled);
  };

  return (
    <div className="w-[350px] flex gap-9">
      <div>
        <p className="leading-6 font-semibold">View intro animations</p>
        <p className="leading-5 text-sm text-[#999999]">
          If enabled, onboarding animations will be shown each time the app is
          open
        </p>
      </div>
      <Toggle
        onChange={handleSwitch}
        checked={isAnimationEnabled}
        disabled={false}
        name={''}
        value={''}
        labelRight={''}
        labelLeft={''}
        backgroundColorChecked={'#2693AB'}
        backgroundColorUnchecked={'#E4E5E7'}
      />
    </div>
  );
};
