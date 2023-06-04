'use client';
import React from 'react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import IconButton from './IconButton';
import { ICONS_NAME } from './constants/iconName';
import { CemeteryOut } from '@/openapi';

type ISelectingCemeteriesProps = {
  selectedCemetery?: CemeteryOut;
  onSelect: (arg: CemeteryOut) => void;
  cemeteries: Array<CemeteryOut>;
};

const SelectingCemetery = ({
  selectedCemetery,
  onSelect,
  cemeteries,
}: ISelectingCemeteriesProps) => {
  return (
    <div className="w-[302px] h-10">
      <Listbox value={selectedCemetery} onChange={onSelect}>
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button
                className={`relative w-full h-10 cursor-default text-sm leading-6 ${
                  open ? 'rounded-t-3xl' : 'rounded-3xl'
                } bg-white py-2 text-left shadow-md focus:outline-nonesm:text-sm border-b border-solid border-grey-40 font-noto`}
              >
                <span className={`block truncate pl-4 font-noto w-[235px]`}>
                  {selectedCemetery?.name
                    ? selectedCemetery.name
                    : 'Select cemetery'}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
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
                  className="absolute max-h-60 w-full overflow-auto rounded-b-3xl bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {cemeteries.map((cementery) => (
                    <>
                      {cementery.uuid !== selectedCemetery?.uuid && (
                        <Listbox.Option
                          key={cementery.uuid}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-4 text-sm leading-6 border-b border-solid border-grey-40`
                          }
                          value={cementery}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`font-noto block truncate w-[235px] ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {cementery.name}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      )}
                    </>
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
