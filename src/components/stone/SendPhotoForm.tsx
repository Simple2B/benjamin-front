import React, { ChangeEvent } from 'react';

type ISendPhotoFormProps = {
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  isEmailValid: boolean;
};

export const SendPhotoForm = ({
  setEmail,
  setName,
  isEmailValid,
}: ISendPhotoFormProps) => {
  const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handleName = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  return (
    <div className="flex flex-col w-full px-8 mt-8 gap-4">
      <div className="flex flex-col w-full gap-2">
        <h3 className="font-semibold leading-6">NAME</h3>
        <input
          type="text"
          onChange={handleName}
          id="text"
          className="border border-gray-300 text-sm rounded-lg p-3 w-full h-[55px]"
          placeholder="Type your name"
        />
        <p className={`text-xs text-grey-20`}>Skip to stay anonymous</p>
      </div>
      <div className="flex flex-col w-full gap-2">
        <h3 className="font-semibold leading-6">
          EMAIL<span className="text-red-600">*</span>
        </h3>
        <input
          type="email"
          id="email"
          className="border border-gray-300 text-sm rounded-lg p-3 w-full h-[55px]"
          placeholder="Type your email"
          onChange={handleEmail}
          required
        />
        <p className={`text-xs text-red-600 ${isEmailValid && 'invisible'}`}>
          Please enter accurate email address
        </p>
      </div>
    </div>
  );
};
