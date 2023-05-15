import React from 'react';
import { PROJECT_INFO_TO_DISPLAY } from './projectInfo.constants';

const ProjectInfo = () => {
  return (
    <>
      {PROJECT_INFO_TO_DISPLAY.map(({heading, text})=>{
        return (
          <div className='flex flex-col p-4 gap-2 text-indigo-100' key='heading'>
            <h1 className='text-2xl font-extrabold leading-none tracking-tight'>{heading}</h1>
            <p>{text}</p>
          </div>
        );
      })}</>
  );
};

export default ProjectInfo;
