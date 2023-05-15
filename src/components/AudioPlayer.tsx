'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import IconButton from './IconButton';
import { ICONS_NAME } from './IconButton.constants';
import { formatTime } from './AudioPlayer.utils';

type IAudioPlayerProps = {
	audioSourse: string
}

const AudioPlayer = ({audioSourse}: IAudioPlayerProps) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);


  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio){
      return;
    };
    {isPlaying ? audio.pause() : audio.play();}
    setIsPlaying(!isPlaying);
    
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio){
      return;
    };
    setCurrentTime(audio.currentTime);

  };

  useEffect(()=>{
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  },[]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio){
      return;
    };
    const seekTime = parseFloat(e.target.value);
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);			
		
  };


  return (
    <div className="flex items-center gap-1 justify-evenly p-2 px-1.5 w-96">
      <div onClick={togglePlay}>
        {isPlaying ? 
          <IconButton iconName={ICONS_NAME.pause} className={'h-6 w-6'}/> 
          : 
          <IconButton iconName={ICONS_NAME.play} className={'h-6 w-6'}/>}       
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
        src={audioSourse}
        onTimeUpdate={handleTimeUpdate}
      />
      <p className='text-xs text-grey-20'>{formatTime(duration)}</p>
    </div>
  );
};

export default AudioPlayer;
