import AudioPlayer from '@/components/audioPlayer/AudioPlayer';
import { AWS_BASE_URL } from '@/components/constants/constants';
import React from 'react';
import urlJoin from 'url-join';

type ICemeteryAudioBoxProps = {
  audio_tours: string[];
};

export const CemeteryAudioBox = ({ audio_tours }: ICemeteryAudioBoxProps) => {
  return (
    <div className="w-full flex flex-col gap-6 bg-white px-6 z-10 py-5">
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-indigo-100">Audio Tour</p>
        {audio_tours.map((melody) => (
          <>
            {AWS_BASE_URL && (
              <AudioPlayer
                key={melody}
                audioSourse={urlJoin(AWS_BASE_URL, melody)}
              />
            )}
          </>
        ))}
      </div>
      <hr />
    </div>
  );
};
