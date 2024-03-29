'use client';
import React, { ChangeEvent, use, useEffect, useState } from 'react';
import IconButton from '../../IconButton';
import { ICONS_NAME } from '../../constants/iconName';
import { useRouter } from 'next/navigation';
import { sendMessage } from '@/app/actions';
import { maxMessageLength, messageTimer } from '../../constants/constants';

import { messagePageInstruction } from './previewerMessage.constants';
import { useAppStore } from '@/lib/slices/store';

type IPreviewerSoldierProps = {
  soldierUuid: string;
};

export const PreviewerMessage = ({ soldierUuid }: IPreviewerSoldierProps) => {
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setEmailValid] = useState<boolean>(true);

  const { setCurrentSoldierScroll } = useAppStore();

  useEffect(() => {
    setCurrentSoldierScroll(true);
  }, []);

  const router = useRouter();

  const { setCurrentMessage } = useAppStore();

  const handleMessage = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(event.target.value);
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handleSend = async () => {
    setEmailValid(/\S+@\S+\.\S+/.test(email));

    if (!isEmailValid || message.length <= 8) {
      return;
    }

    await sendMessage(soldierUuid, message, email);
    setCurrentMessage({ createdAt: new Date() });
    router.back();

    setMessage('');
    setEmail('');
  };

  return (
    <>
      <div className="flex flex-col items-start text-indigo-100">
        <div className="top-0 w-full flex justify-between px-[18px] fixed bg-white py-3 pt-4">
          <div onClick={router.back}>
            <IconButton iconName={ICONS_NAME.arrow} className="w-4 h-4" />
          </div>
          <h1 className="text-sm font-medium flex-grow text-center leading-5">
            Write a message to the family
          </h1>
        </div>
        <div className="px-8 flex flex-col leading-[22px] gap-6 mt-16">
          <p>{messagePageInstruction}</p>

          <div className="flex flex-col w-full gap-2">
            <h3 className="font-semibold leading-6">EMAIL</h3>
            <input
              type="email"
              id="email"
              className="border border-gray-300 text-sm rounded-lg p-3 w-full h-[55px] outline-none"
              placeholder="Type your email"
              onChange={handleEmail}
              value={email}
              required
            />
            <p className={`text-xs text-red-600 ${isEmailValid && 'hidden'}`}>
              Please enter accurate email address
            </p>
          </div>
          <div className="flex flex-col w-full gap-2 mt-2">
            <h3 className="font-semibold leading-6">MESSAGE</h3>
            <textarea
              maxLength={500}
              rows={10}
              onChange={handleMessage}
              className=" resize-none p-3 rounded-lg border border-gray-300 w-full h-[323px] z-0 outline-none text-base"
              placeholder="Type your message"
              value={message}
            ></textarea>
            <p className="text-sm self-end text-grey-20">
              {message.length}/{maxMessageLength}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-end mt-5">
        <button
          className="w-full mx-8 bg-turquoise-100 text-white p-3 rounded-lg font-semibold mt-3 mb-11"
          onClick={handleSend}
        >
          Send message
        </button>
      </div>
    </>
  );
};
