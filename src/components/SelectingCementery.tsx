'use client';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';
import { Cemeteries, CemeteryOut } from '@/openapi';

type ISelectingCemeteriesProps = {
  selectedCemetery: CemeteryOut;
  setCemetery: React.Dispatch<React.SetStateAction<CemeteryOut>>;
  cemeteries: Array<CemeteryOut>;
};

interface ICemeteryInfo {
  id: number;
  name: string;
  value: string;
}

const SelectingCemetery = ({
  selectedCemetery,
  setCemetery,
  cemeteries,
}: ISelectingCemeteriesProps) => {
  const handleChange = (e: CemeteryOut) => {
    setCemetery(e);
    // setSelected(e);
  };

  return (
    <div className="w-10/12">
      <Listbox value={selected} onChange={handleChange}>    
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full h-10 cursor-default rounded-3xl bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">
                  {selectedCemetery.name
                    ? selectedCemetery.name
                    : 'Select cemetery'}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <IconButton
                    iconName={ICONS_NAME.selectingArrow}
                    className={`h-4 w-4 m-1 ${open && 'rotate-90'}`}
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  placeholder="Select cemetery"
                  className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {cemeteries.map((cementery) => (
                    <Listbox.Option
                      key={cementery.uuid}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
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
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default SelectingCemetery;
