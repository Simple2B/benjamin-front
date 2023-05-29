'use client';
import React, { ChangeEvent, useState } from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { useRouter } from 'next/navigation';

export const PreviewerMessage = () => {
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setEmailValid] = useState<boolean>(true);
  const router = useRouter();

  const maxLength: number = 500;

  const handleMessage = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(event.target.value);
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handleSend = () => {
    setEmailValid(/\S+@\S+\.\S+/.test(email));
    if (isEmailValid || message.length >= 8) {
      console.log('sending');
    }
  };

  return (
    <div className="h-[calc(100dvh)] flex flex-col items-start p-6 text-indigo-100 justify-between gap-3">
      <div className="w-full flex justify-between">
        <div onClick={router.back}>
          <IconButton iconName={ICONS_NAME.arrow} className="w-4 h-4" />
        </div>
        <h1 className="text-sm font-medium flex-grow text-center">
          Write a message to the family
        </h1>
      </div>
      <div className="flex flex-col items-start gap-3">
        <p>
          It is very meaningful for families to have the service and sacrifice
          of their family members acknowledged. In some cases, soldiers’
          families have been identified and, in others, families have yet to be
          contacted.
        </p>
        <p>
          All messages will be sent to Operation Benjamin, and our team will
          forward the message to the family at the earliest opportunity.
        </p>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="font-semibold">EMAIL</h3>
        <input
          type="email"
          id="email"
          className="border border-gray-300 text-sm rounded-lg p-3"
          placeholder="Type your email"
          onChange={handleEmail}
          required
        />
        <p className={`text-xs text-red-600 ${isEmailValid && 'invisible'}`}>
          Please enter accurate email address
        </p>
      </div>

      <div className="flex flex-col w-full">
        <h3 className="font-semibold">MESSAGE</h3>
        <textarea
          maxLength={500}
          rows={10}
          value={message}
          onChange={handleMessage}
          className="resize-none p-3 text-sm w-full rounded-lg border border-gray-300"
          placeholder="Type your message"
        ></textarea>
        <p className="text-sm self-end text-grey-20">
          {message.length}/{maxLength}
        </p>
      </div>

      <button
        className="bg-turquoise-100 w-full text-white p-3 rounded-lg font-semibold"
        onClick={handleSend}
      >
        Send message
      </button>
    </div>
  );
};
