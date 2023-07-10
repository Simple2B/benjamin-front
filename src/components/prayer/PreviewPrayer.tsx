'use client';
import { Tab } from '@headlessui/react';
import React from 'react';
import AudioPlayer from '../audioPlayer/AudioPlayer';
import { ICONS_NAME } from '../constants/iconName';
import IconButton from '../IconButton';
import { useRouter } from 'next/navigation';
import { prayers } from './PreviewPrayer.constants';

type IPreviewPrayerProps = { elMaleh: string | undefined };

export const PreviewPrayer = ({ elMaleh }: IPreviewPrayerProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col py-6 text-indigo-100 justify-center w-full items-center px-5">
      <div className="w-full flex justify-between">
        <div onClick={router.back}>
          <IconButton iconName={ICONS_NAME.arrow} className="w-4 h-4" />
        </div>
        <h1 className="text-sm flex-grow text-center font-medium leading-5">
          Recite a prayer
        </h1>
      </div>
      <div className="w-[350px] mt-8">
        <Tab.Group>
          <Tab.List className="flex w-full space-x-1 text-indigo-100">
            {Object.keys(prayers).map((prayer) => (
              <Tab
                key={prayer}
                className={({ selected }) =>
                  `w-full rounded-lg leading-5
                 ${selected ? 'font-semibold underline' : 'text-grey-30'}`
                }
              >
                {prayer === 'EL MALEH'
                  ? `EL MALEH ${elMaleh?.toUpperCase()}`
                  : prayer}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2 w-full">
            {Object.values(prayers).map((posts, idx) => (
              <Tab.Panel key={idx}>
                <ul>
                  {posts.map((post, index) => (
                    <div key={index} className="flex flex-col gap-6">
                      <p className="text-sm p-3 bg-turquoise-100 bg-opacity-10 rounded-lg leading-[22px]">
                        {post.description}
                      </p>
                      {post.prayerSource.length > 0 && (
                        <div key={index} className="flex gap-6">
                          <p className="font-semibold leading-6 text-xl">
                            {post.prayerSource[0]}
                          </p>
                          <p className="font-bold leading-6 text-xl font-['Arial']">
                            {post.prayerSource[1]}
                          </p>
                        </div>
                      )}
                      <div className="photo-shadow p-3 rounded-lg border-gray-100 border">
                        <AudioPlayer audioSourse={post.audioUrl} />
                      </div>
                      {post.prayerText.map(
                        ({ prayerInNativeLanguage, translation }, index) => (
                          <div key={index}>
                            <p className="font-bold leading-5 font-['Arial']">
                              {prayerInNativeLanguage}
                            </p>
                            <p className="leading-5">{translation}</p>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
