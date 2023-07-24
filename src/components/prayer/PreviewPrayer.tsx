'use client';
import { Tab } from '@headlessui/react';
import React, { useEffect } from 'react';
import AudioPlayer from '../audioPlayer/AudioPlayer';
import { ICONS_NAME } from '../constants/iconName';
import IconButton from '../IconButton';
import { useRouter } from 'next/navigation';
import { prayers } from './PreviewPrayer.constants';
import { useAppStore } from '@/lib/slices/store';
import { formElMalehText } from './PreviewPrayer.utils';

type IPreviewPrayerProps = { elMaleh: string | undefined };

export const PreviewPrayer = ({ elMaleh }: IPreviewPrayerProps) => {
  const router = useRouter();
  const elMalehText = formElMalehText(elMaleh);

  const { setCurrentSoldierScroll } = useAppStore();

  useEffect(() => {
    setCurrentSoldierScroll(true);
  }, []);

  return (
    <div className="flex flex-col pb-4 text-indigo-100 justify-center w-full items-center">
      <div className="top-0 w-full flex justify-between px-5 fixed bg-white py-3 pt-4">
        <div onClick={router.back}>
          <IconButton iconName={ICONS_NAME.arrow} className="w-4 h-4" />
        </div>
        <h1 className="text-sm flex-grow text-center font-medium leading-5">
          Recite a prayer
        </h1>
      </div>
      <div className=" w-full px-8 mt-16">
        <Tab.Group>
          <Tab.List className="flex w-full space-x-1 text-indigo-100 gap-3">
            {Object.keys(prayers).map((prayer) => (
              <Tab
                key={prayer}
                className={({ selected }) =>
                  `w-full rounded-lg leading-5 bg-transparent outline-none font-semibold
                 ${selected ? 'underline decoration-4' : 'text-grey-30'} `
                }
              >
                <div>{prayer}</div>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-8 w-full">
            {Object.values(prayers).map((posts, idx) => (
              <Tab.Panel key={idx}>
                <ul>
                  {posts.map((post, index) => (
                    <div key={index} className="flex flex-col gap-6">
                      <p className="text-sm p-4 bg-turquoise-100 bg-opacity-10 rounded-lg leading-[22px]">
                        {post.description}
                      </p>
                      {post.prayerSource.length > 0 && (
                        <div key={index} className="flex gap-6">
                          <p className="font-semibold leading-6">
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
                      {post.prayerText.length ? (
                        <>
                          {post.prayerText.map(
                            (
                              { prayerInNativeLanguage, translation },
                              index
                            ) => (
                              <div key={index}>
                                <p className="font-bold leading-5 font-['Arial']">
                                  {prayerInNativeLanguage}
                                </p>
                                <p className="leading-5">{translation}</p>
                              </div>
                            )
                          )}
                        </>
                      ) : (
                        <>
                          {elMalehText.map(
                            (
                              { prayerInNativeLanguage, translation },
                              index
                            ) => (
                              <div key={index}>
                                <p className="font-bold leading-5 font-['Arial'] mb-6">
                                  {prayerInNativeLanguage}
                                </p>
                                <p className="leading-5">{translation}</p>
                              </div>
                            )
                          )}
                        </>
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
