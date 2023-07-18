'use client';
import { Tab } from '@headlessui/react';
import React from 'react';
import AudioPlayer from '../audioPlayer/AudioPlayer';
import { ICONS_NAME } from '../constants/iconName';
import IconButton from '../IconButton';
import { useRouter } from 'next/navigation';
import { prayers } from './PreviewPrayer.constants';

type IPreviewPrayerProps = { elMaleh: string | undefined };

export const formElMalehText = (elMalehName: string | undefined) => {
  const firstPartPrayer =
    'אֵל מָלֵא רַחֲמִים, שׁוֹכֵן בַּמְּרוֹמִים, הַמְצֵא מְנוּחָה נְכוֹנָה עַל כַּנְפֵי הַשְּׁכִינָה, בְּמַעֲלות קְדוֹשִׁים וּטְהוֹרִים כְּזֹהַר הָרָקִיעַ מַזְהִירִים, אֶת נִשְׁמַת';
  const secondPartPrayer =
    'שֶׁהָלַךְ לְעוֹלָמוֹ, בַּעֲבוּר שֶׁבְּלִי נֶדֶר אֶתֵּן צְדָקָה בְּעַד הַזְכַּרַת נִשְׁמָתוֹ, בְּגַן עֵדֶן תְּהֵא מְנוּחָתוֹ, לָכֵן בַּעַל הָרַחֲמִים יַסְתִּירֵהוּ בְּסֵתֶר כְּנָפָיו לְעוֹלָמִים, וְיִצְרוֹר בִּצְרוֹר הַחַיִּים אֶת נִשְׁמָתוֹ, יְיָ הוּא נַחֲלָתוֹ, וְיָנוּחַ עַל מִשְׁכָּבוֹ בְּשָׁלוֹם. וְנֹאמַר אָמֵן.';
  const formatedText = [
    {
      prayerInNativeLanguage: `${firstPartPrayer} ${elMalehName} ${secondPartPrayer}`,
      translation: `God, full of mercy, who dwells on high, grant proper rest upon the wings of the Divine Presence, on the levels of the holy 
    and pure who shine like the splendor of heaven, for the soul of ${elMalehName} who went to his eternal world, as I will give charity for
     the memory of his soul; let his rest be in the Garden of Eden. Hence, Master of mercy, shelter him in the cover of His wings forever and 
     bind his soul with the binding of everlasting life. God is his inheritance and let him rest in peace. And let us say Amen. `,
    },
  ];
  return formatedText;
};

export const PreviewPrayer = ({ elMaleh }: IPreviewPrayerProps) => {
  const router = useRouter();
  const elMalehText = formElMalehText(elMaleh);

  return (
    <div className="flex flex-col py-6 text-indigo-100 justify-center w-full items-center">
      <div className="w-full flex justify-between px-5">
        <div onClick={router.back}>
          <IconButton iconName={ICONS_NAME.arrow} className="w-4 h-4" />
        </div>
        <h1 className="text-sm flex-grow text-center font-medium leading-5">
          Recite a prayer
        </h1>
      </div>
      <div className=" mt-8 w-full px-8">
        <Tab.Group>
          <Tab.List className="flex w-full space-x-1 text-indigo-100 gap-3">
            {Object.keys(prayers).map((prayer) => (
              <Tab
                key={prayer}
                className={({ selected }) =>
                  `w-full rounded-lg leading-5 bg-transparent outline-none font-semibold
                 ${selected ? 'underline decoration-4' : 'text-grey-30'} 
                 ${prayer == 'EL MALEH' ? 'flex-shrink-[0.6]' : ''}`
                }
              >
                <div>
                  {prayer === 'EL MALEH'
                    ? `EL MALEH ${elMaleh?.toUpperCase()}`
                    : prayer}
                </div>
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
