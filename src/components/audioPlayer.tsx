'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import IconPlay from './icons/iconPlay';
import IconPause from './icons/iconPause';

type Props = {}

const AudioPlayer = (props: Props) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);


  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      {isPlaying ? audio.pause() : audio.play()}
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  useEffect(()=>{
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  },[])

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const seekTime = parseFloat(e.target.value);
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time: number): string => {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = Math.floor(time % 60);
    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : String(minutes);
    const formattedSeconds: string = seconds < 10 ? `0${seconds}` : String(seconds);
    return `${formattedMinutes}:${formattedSeconds}`;
  };  
  return (
    <div className="flex items-center gap-1 justify-evenly p-2 px-1.5 w-[366px]">
      <div onClick={togglePlay}>
        {isPlaying ? <IconPause /> :<IconPlay />}       
      </div>            
      <p className='text-xs text-grey-20'>{formatTime(currentTime)}</p>
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        step="0.01"
        onChange={handleSeek}
        className="h-1 w-full mx-4 appearance-none thumb-blue outline-none"
        style={{
          background: `linear-gradient(to right, #2693AB 0%, #2693AB ${(currentTime / duration) * 100}%, #d1d5db ${(currentTime / duration) * 100}%, #d1d5db 100%)`
        }}
      />
      <audio
        ref={audioRef}
        src='https://www.bensound.com/bensound-music/bensound-tenderness.mp3'
        onTimeUpdate={handleTimeUpdate}
      />
      <p className='text-xs text-grey-20'>{formatTime(duration) ?? '0:00'}</p>
    </div>
  );
};

export default AudioPlayer
