import React from 'react';

type IProjectInfoProps = {
  heading: string;
  text: string;
};

const ProjectInfo = ({ heading, text }: IProjectInfoProps) => {
  return (
    <div className="flex flex-col p-6 gap-2 text-indigo-100 h-52">
      <h1 className="text-2xl font-extrabold leading-none tracking-tight">
        {heading}
      </h1>
      <p>{text}</p>
    </div>
  );
};

export default ProjectInfo;
