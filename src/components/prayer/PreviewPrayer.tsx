'use client';
import { Tab } from '@headlessui/react';
import React, { useState } from 'react';
import AudioPlayer from '../audioPlayer/AudioPlayer';
import { ICONS_NAME } from '../constants/iconName';
import IconButton from '../IconButton';
import { useRouter } from 'next/navigation';

export const PreviewPrayer = () => {
  const router = useRouter();

  const prayers = {
    PSALMS: [
      {
        description:
          'The Mourner’s Kaddish, the Jewish Prayer for the dead written in Aramaic, is recited at all of the daily prayers and always in the presence of a Minyan.  A tradition spanning almost 2,000 years, the prayer speaks of the presence of God in our lives and ultimately the knowledge of the one God that will spread throughout the world.  ',
        audioUrl:
          'https://www.bensound.com/bensound-music/bensound-tenderness.mp3',
        prayerText: `Exalted and hallowed be God’s great name (Congregation: Amen)        
          speedily, imminently, To which we say: Amen. (Congregation: Amen)        
          Blessed be God’s great name to all eternity.   
          Blessed and praised, glorified and exalted, extolled and honored, adored and lauded be the name of the Holy One, blessed be He. (Congregation: Blessed be He)
          Beyond all the blessings and hymns, praises and consolations that are ever spoken in the world; and say, Amen. (Congregation: Amen)
          May there be abundant peace from heaven, and life, for us and for all Israel; and say, Amen. (Congregation: Amen)  
          He who creates peace in His celestial heights,
          may He create peace for us and for all Israel;
          and say, Amen. (Congregation: Amen)`,
      },
    ],
    KADDISH: [
      {
        description: 'description',
        audioUrl:
          'https://www.bensound.com/bensound-music/bensound-tenderness.mp37',
        prayerText: 'prayerText',
      },
    ],
    'EL MALEH RAHAMIM': [
      {
        description: 'description',
        audioUrl:
          'https://www.bensound.com/bensound-music/bensound-tenderness.mp3',
        prayerText: 'prayerText',
      },
    ],
  };

  return (
    <div className="flex flex-col items-start py-6 px-3 text-indigo-100 justify-between w-full">
      <div className="w-full flex justify-between">
        <div onClick={router.back}>
          <IconButton iconName={ICONS_NAME.arrow} className="w-4 h-4" />
        </div>
        <h1 className="text-sm font-medium flex-grow text-center font-medium">
          Recite a prayer
        </h1>
      </div>

      <div className="px-3 w-full">
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
                {prayer}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2 w-full">
            {Object.values(prayers).map((posts, idx) => (
              <Tab.Panel key={idx}>
                <ul>
                  {posts.map((post) => (
                    <div key={post.prayerText} className="flex flex-col gap-5">
                      <p className="text-sm p-3 bg-turquoise-100 bg-opacity-10 rounded-lg">
                        {post.description}
                      </p>
                      <div className="shadow-lg p-3 rounded-lg border-gray-100 border">
                        <AudioPlayer audioSourse={post.audioUrl} />
                      </div>
                      <p>{post.prayerText}</p>
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
