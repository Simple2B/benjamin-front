'use client';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import * as solid from '@heroicons/react/20/solid';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';

type ISelectingCementerProps = {
  setState: React.Dispatch<React.SetStateAction<string>>;
}

interface ICementeryInfo {
  id: number;
  name: string;
  value: string
}

const SelectingCementery = ({setState}: ISelectingCementerProps) => {
  const [cementeries, setCementeries] = useState<ICementeryInfo[]>([]);
  const [selected, setSelected] = useState<ICementeryInfo | undefined>();
  useEffect(() => {
    fetch('#')
      .then(res => res.json())
      .then((res: ICementeryInfo[]) => {
        setCementeries([...res]);    
        setSelected(res[0]);
      })
      .catch(error => console.log(error));
  }, []);
  

  const handleChange = (e: ICementeryInfo)=>{
    setState(e.value);
    setSelected(e);
  };

  return (
    <div className="w-80">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full h-10 cursor-default rounded-3xl bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <IconButton iconName={ICONS_NAME.selectingArrow} className='h-4 w-4 m-1'/>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {cementeries.map((cementery, cementeryIdx) => (
                <Listbox.Option
                  key={cementeryIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={cementery}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {cementery.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <solid.CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectingCementery;