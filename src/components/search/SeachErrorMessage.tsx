import React from 'react';

export const SeachErrorMessage = () => {
  return (
    <div className="w-[350px]">
      <p className="text-black font-semibold leading-6">No soldiers found</p>
      <p className="text-black leading-6">
        (Our database only has soldiers buried under a Star of David for now.)
      </p>
    </div>
  );
};
