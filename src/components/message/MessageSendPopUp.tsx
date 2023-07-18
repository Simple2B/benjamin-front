import React from 'react';

export const MessageSendPopUp = () => {
  return (
    <div className="fixed w-full flex justify-center top-8">
      <div className=" w-[343px] h-[52px] bg-indigo-50 text-white flex items-center pl-4 rounded-lg">
        <p className="leading-6 font-semibold">Message sent</p>
      </div>
    </div>
  );
};
