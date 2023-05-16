import React from 'react';

type IRememberSoldierProps = {
    name: string
}

const REMEMBERING = [
  {
    image: '#',
    text:'Recite a prayer'
  },
  {
    image: '#',
    text:'Lay a stone'
  },
  {
    image: '#',
    text:'Write a message'
  }
];

const RememberSoldier = ({name}: IRememberSoldierProps) => {
  return (
    <div className='w-full p-4 bg-indigo-100 text-center'>
      <h2 className='text-white font-semibold my-2'> REMEMBER {name.toLocaleUpperCase()}</h2>
      <div className='flex justify-evenly'> 
        {REMEMBERING.map(({image, text})=>{
          return (
            <div key='text' className='w-1/4'>
              <img src={image} alt='remember soldier' className='w-24 bg-grey-30'/>
              <p className='text-white text-xs'>{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RememberSoldier;
