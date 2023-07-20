import React from 'react';

type IProjectInfoProps = {
  heading: string;
  text: string;
};

const ProjectInfo = ({ heading, text }: IProjectInfoProps) => {
  return (
    <div className="flex flex-col px-8 pt-8 gap-4 text-indigo-100">
      <h1 className={`text-[22px] font-semibold leading-none tracking-tight`}>
        {heading}
      </h1>
      <p className="h-[100px]">{text}</p>
    </div>
  );
};

export default ProjectInfo;
