'use client';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import IconButton from '../IconButton';
import { formatTime } from './AudioPlayer.utils';
import { ICONS_NAME } from '../constants/iconName';
import ReactHowler from 'react-howler';
import Spinner from '../Spinner';
import { SECOND } from '../constants/constants';

type IAudioPlayerProps = {
  audioSourse: string;
};

const AudioPlayer = ({ audioSourse }: IAudioPlayerProps) => {
  const audioRef = useRef<ReactHowler>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isAudioLoaded, setAudioLoaded] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrentTime(audioRef.current?.seek() ?? 0);
      console.log('interval called');
    }, 3);
  };

  const handleStop = () => {
    if (!intervalRef.current) {
      return;
    }
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(true);
    if (audioRef.current && e.currentTarget) {
      return audioRef.current.seek(parseInt(e.currentTarget.value));
    }

    return 0;
  };

  return (
    <div className="flex items-center gap-2 justify-center h-6">
      <ReactHowler
        src={audioSourse}
        playing={isPlaying}
        onLoad={() => setAudioLoaded(true)}
        ref={audioRef}
        onEnd={handleStop}
        onPlay={handlePlay}
        onPause={handleStop}
      />

      {isAudioLoaded ? (
        <>
          <div onClick={togglePlay} className="flex items-center ">
            <IconButton
              iconName={isPlaying ? ICONS_NAME.pause : ICONS_NAME.play}
              className={'h-4 w-4'}
            />
          </div>
          <p className="text-xs text-grey-20 ml-2">
            {formatTime(audioRef.current ? audioRef.current.seek() : 0)}
          </p>
          <input
            type="range"
            min="0"
            max={audioRef.current ? audioRef.current.duration() : 0}
            value={audioRef.current ? audioRef.current.seek() : 0}
            step="0.01"
            onChange={handleSeek}
            className="h-1 w-full appearance-none thumb-blue outline-none [&::-webkit-slider-thumb]:appearance-none"
            style={{
              background: `linear-gradient(to right, #2693AB, #2693AB ${
                (currentTime /
                  (audioRef.current ? audioRef.current.duration() : 0)) *
                100
              }%, #d1d5db ${
                (currentTime /
                  (audioRef.current ? audioRef.current.duration() : 0) /
                  1000) *
                100
              }%, #d1d5db 100%)`,
            }}
          />
          <p className="text-xs text-grey-30">
            {formatTime(audioRef.current ? audioRef.current.duration() : 0)}
          </p>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default AudioPlayer;
