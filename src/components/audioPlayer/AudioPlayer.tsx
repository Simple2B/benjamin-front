'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import IconButton from '../IconButton';
import { formatTime } from './AudioPlayer.utils';
import { ICONS_NAME } from '../constants/iconName';


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
    if (!audio) {
      return;
    }
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    return () => {
      audio.removeEventListener('loadedmetadata', () => {});
    };
  }, []);

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
    <div className="flex items-center gap-1 justify-evenly px-1.5">
      <div onClick={togglePlay}>
        {isPlaying ? 
          <IconButton iconName={ICONS_NAME.pause} className={'h-4 w-4'}/> 
          : 
          <IconButton iconName={ICONS_NAME.play} className={'h-4 w-4'}/>}       
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
