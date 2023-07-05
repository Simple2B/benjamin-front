'use client';
import React, { ChangeEvent, useEffect, useState, useTransition } from 'react';
import IconButton from '../IconButton';
import { ICONS_NAME } from '../constants/iconName';
import { useRouter } from 'next/navigation';
import { sendMessage } from '@/app/actions';
import { maxMessageLength, messageTimer } from '../constants/constants';

type IPreviewerSoldierProps = {
  soldierUuid: string;
};

export const PreviewerMessage = ({ soldierUuid }: IPreviewerSoldierProps) => {
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setEmailValid] = useState<boolean>(true);
  const [isSent, setSent] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (isSent) {
      const timer = setTimeout(() => {
        setSent(false);
      }, messageTimer);
      return () => clearTimeout(timer);
    }
  }, [isSent]);

  const handleMessage = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(event.target.value);
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handleSend = async () => {
    setEmailValid(/\S+@\S+\.\S+/.test(email));
    if (isEmailValid || message.length >= 8) {
      await sendMessage(soldierUuid, message, email).then(() => {
        setSent(true);
        setMessage('');
        setEmail('');
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-start py-4 text-indigo-100 gap-6">
        {isSent && (
          <div className="fixed w-full flex justify-center top-10">
            <div className=" w-[343px] h-[52px] bg-indigo-50 text-white flex items-center pl-4 rounded-lg">
              <p className="leading-6 font-semibold">Message sent</p>
            </div>
          </div>
        )}

        <div className="w-full flex justify-between px-[18px]">
          <div onClick={router.back}>
            <IconButton iconName={ICONS_NAME.arrow} className="w-4 h-4" />
          </div>
          <h1 className="text-sm font-medium flex-grow text-center leading-5">
            Write a message to the family
          </h1>
        </div>
        <div className="px-8 flex flex-col gap-6 leading-[22px]">
          <p>
            It is very meaningful for families to have the service and sacrifice
            of their family members acknowledged. In some cases, soldiers’
            families have been identified and, in others, families have yet to
            be contacted. All messages will be sent to Operation Benjamin, and
            our team will forward the message to the family at the earliest
            opportunity.
          </p>

          <div className="flex flex-col w-full">
            <h3 className="font-semibold leading-6">EMAIL</h3>
            <input
              type="email"
              id="email"
              className="border border-gray-300 text-sm rounded-lg p-3 w-full h-[55px]"
              placeholder="Type your email"
              onChange={handleEmail}
              value={email}
              required
            />
            <p
              className={`text-xs text-red-600 ${isEmailValid && 'invisible'}`}
            >
              Please enter accurate email address
            </p>
          </div>
          <div className="flex flex-col w-full mb-24">
            <h3 className="font-semibold leading-6">MESSAGE</h3>
            <textarea
              maxLength={500}
              rows={10}
              onChange={handleMessage}
              className=" resize-none p-3 text-sm rounded-lg border border-gray-300 w-full h-[323px]"
              placeholder="Type your message"
              value={message}
            ></textarea>
            <p className="text-sm self-end text-grey-20">
              {message.length}/{maxMessageLength}
            </p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 h-40 bg-gradient-to-t from-white to-transparent w-full flex justify-center items-end">
        <button
          className="w-[350px] bg-turquoise-100 text-white p-3 rounded-lg font-semibold m-3 mb-11"
          onClick={handleSend}
        >
          Send message
        </button>
      </div>
    </>
  );
};
